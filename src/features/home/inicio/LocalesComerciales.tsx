import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch, FaTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { useComerciosPublicos } from '../../../services/comerciosService';
import { Comercio } from '../../../shared/types/comercioInterface';
import Skeleton from '../../../utils/Skeleton';
import { BASE_URL } from '../../../utils/baseUrl';
import { getEstadoComercio } from '../../../utils/getEstadoComercio';

/** ------- Tipos y helpers ------- */

type ComercioConEstado = Comercio & {
  _estado: 'abierto' | 'cerrado';
  _isOpen: boolean;
};

const ordenarLocales = (arr: ComercioConEstado[]) =>
  [...arr].sort((a, b) => Number(b._isOpen) - Number(a._isOpen));

const anotarEstado = (arr: Comercio[]): ComercioConEstado[] =>
  arr.map((c) => {
    const estado = getEstadoComercio(c.horarios);
    return { ...c, _estado: estado, _isOpen: estado === 'abierto' };
  });

type ListaState = {
  search: string;
  page: number;
  locales: ComercioConEstado[];
  scrollY: number;
};

const KEY = (servicioId?: number | null) => `listaLocales:${servicioId ?? 'null'}`;

const saveState = (servicioId: number | null, s: ListaState) => {
  try {
    sessionStorage.setItem(KEY(servicioId), JSON.stringify(s));
  } catch {}
};

const loadState = (servicioId: number | null): ListaState | null => {
  try {
    const raw = sessionStorage.getItem(KEY(servicioId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/** ------- Componente ------- */

const LocalesComerciales: React.FC<{ servicioId: number | null }> = ({ servicioId }) => {
  const navigate = useNavigate();
  const [sp, setSp] = useSearchParams();

  // URL como fuente de verdad inicial
  const qInicial = sp.get('q') ?? '';
  const pInicial = Math.max(1, Number(sp.get('p') ?? '1') || 1);

  // estado UI
  const [searchValue, setSearchValue] = useState(qInicial);
  const [search, setSearch] = useState(qInicial);
  const [page, setPage] = useState(pInicial);
  const [locales, setLocales] = useState<ComercioConEstado[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // fetch datos (no asumimos opciones extra del hook)
  const { data, isLoading, isError } = useComerciosPublicos({ servicioId, search, page });
  const lastPage = data?.lastPage || 1;

  const defaultImage = '/logo_w_fondo_negro.jpeg';
  const DEBOUNCE_MS = 300;

  /** ------ Restauración de snapshot (si existe) ------ */
  useEffect(() => {
    const st = loadState(servicioId);
    if (st) {
      // Si hay snapshot, úsalo completo
      setSearchValue(st.search);
      setSearch(st.search);
      setPage(st.page);
      setLocales(st.locales);
      // Restaurar scroll tras el primer paint
      requestAnimationFrame(() => {
        try {
          // @ts-ignore: 'instant' no está tipado pero funciona en navegadores modernos
          window.scrollTo({ top: st.scrollY, behavior: 'instant' });
        } catch {
          window.scrollTo(0, st.scrollY || 0);
        }
      });
    } else {
      // Si no hay snapshot, respeta lo que venga en URL
      setSearchValue(qInicial);
      setSearch(qInicial);
      setPage(pInicial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicioId]); // solo al montar/cambiar servicio

  /** ------ Sincroniza estado -> URL sin recargar ------ */
  useEffect(() => {
    const next = new URLSearchParams(sp);
    next.set('p', String(page));
    next.set('q', search);
    if (servicioId != null) next.set('servicio', String(servicioId));
    setSp(next, { replace: true }); // no contaminar historial en cada tecleo/página
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, servicioId]);

  /** ------ Debounce del input ------ */
  useEffect(() => {
    const v = searchValue.trim();
    if (v === search) return;
    const t = setTimeout(() => {
      setSearch(v);
      setPage(1);
      // no limpiamos locales aquí; dejamos que el efecto de datos se encargue
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [searchValue, search]);

  /** ------ Si input queda vacío, resetea búsqueda ------ */
  useEffect(() => {
    if (searchValue === '' && search !== '') {
      setSearch('');
      setPage(1);
    }
  }, [searchValue]); // intencional

  /** ------ Aplica lote nuevo al llegar data ------ */
  useEffect(() => {
    if (!data) return;
    const lote = anotarEstado(data.data);
    setLocales((prev) => (page === 1 ? ordenarLocales(lote) : [...prev, ...lote]));
  }, [data, page]);

  /** ------ Guardar snapshot al desmontar ------ */
  useEffect(() => {
    return () => {
      const s: ListaState = { search, page, locales, scrollY: window.scrollY };
      saveState(servicioId, s);
    };
    // incluir todas las dependencias que cambian la lista
  }, [search, page, locales, servicioId]);

  /** ------ Navegación al detalle: guarda snapshot antes ------ */
  const goToComercio = useCallback(
    (comercio: ComercioConEstado) => {
      const s: ListaState = { search, page, locales, scrollY: window.scrollY };
      saveState(servicioId, s);
      navigate(`/comercio/${comercio.id}/productos`, { state: { comercio } });
    },
    [navigate, search, page, locales, servicioId]
  );

  /** ------ Infinite scroll con IntersectionObserver ------ */
  useEffect(() => {
    if (!loaderRef.current) return;

    const el = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        if (isLoading) return;
        if (page >= lastPage) return;
        setPage((p) => Math.min(p + 1, lastPage));
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [isLoading, page, lastPage]);

  /** ------ Handlers de búsqueda manual ------ */
  const handleSearch = () => {
    const v = searchValue.trim();
    setSearch(v);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSearch('');
    setPage(1);
  };

  const handleLoadMore = () => {
    if (page < lastPage) setPage(page + 1);
  };

  /** ------ UI ------ */

  if (isLoading && page === 1 && locales.length === 0) return <Skeleton />;
  if (isError) return <div>Error al cargar locales</div>;

  return (
    <div className="w-full">
      {/* Buscador */}
      <div className="flex justify-center items-center mb-3.5">
        <div className="relative w-full max-w-full lg:max-w-sm flex items-center">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Buscar negocio o servicio"
            className="w-full py-3 pl-3 pr-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />

          <button
            onClick={handleSearch}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600 transition-all duration-300"
            aria-label="Realizar búsqueda"
          >
            <FaSearch />
          </button>

          {searchValue && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition-all duration-300"
              aria-label="Limpiar búsqueda"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Lista de locales */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-6">
        {locales?.map((comercio: ComercioConEstado) => (
          <div
            key={comercio.id}
            onClick={() => goToComercio(comercio)}
            className="cursor-pointer bg-[#ffffff] border-[1px] shadow-lg border-gray-200 rounded-2xl transition duration-300 overflow-hidden relative"
          >
            <div className="relative h-[120px] lg:h-[180px]">
              <img
                src={comercio.logo_url ? `${BASE_URL}/${comercio.logo_url}` : defaultImage}
                alt={comercio.nombre_comercial}
                className="w-full rounded-2xl bg-[#FFB84D] h-full object-cover transition-transform truncate"
              />
              <div className="absolute bottom-2 right-2 z-20 bg-white text-green-600 font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <AiFillStar className="text-green-500" /> {comercio.servicio?.nombre || 'Sin tipo'}
              </div>
            </div>

            <div className="pb-3 pt-1 px-2">
              <h3 className="text-base font-bold text-[#2E2C36] line-clamp-1 md:line-clamp-2 break-words max-w-full">
                {comercio.nombre_comercial}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-1 md:line-clamp-2 break-words max-w-full">
                {comercio.descripcion}
              </p>

              <div className="flex items-center justify-between text-xs font-medium text-gray-600 pt-2">
                <div className="flex items-center gap-1 truncate">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span>{comercio.direccion || 'Sin dirección'}</span>
                </div>

                <span
                  className="flex items-center text-green-600 gap-1 bg-gray-50 px-3 py-1 rounded-full"
                  aria-live="polite"
                >
                  {comercio._estado === 'abierto' ? (
                    <>
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-green-500 font-semibold">Abierto</span>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="text-red-500" />
                      <span className="text-red-500 font-semibold">Cerrado</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ver más locales (fallback al infinite scroll) */}
      {page < lastPage && (
        <div className="justify-center mt-8 hidden">
          <button
            onClick={handleLoadMore}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-md"
          >
            Ver más locales
          </button>
        </div>
      )}

      {/* Loader & target del IntersectionObserver */}
      <div ref={loaderRef} className="h-10 mt-8 flex justify-center items-center">
        {isLoading && <p className="text-gray-500 text-sm">Cargando más locales...</p>}
      </div>
    </div>
  );
};

export default LocalesComerciales;
