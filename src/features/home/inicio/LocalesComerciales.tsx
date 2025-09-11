// LocalesComerciales.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch, FaTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { useComerciosPublicos } from '../../../services/comerciosService';
import { Comercio } from '../../../shared/types/comercioInterface';
import Skeleton from '../../../utils/Skeleton';
import { BASE_URL } from '../../../utils/baseUrl';
import { getEstadoComercio } from '../../../utils/getEstadoComercio';

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

// ---- Persistencia de página por servicio ----
const getPaginasGuardadas = (): Record<number, number> => {
  const data = sessionStorage.getItem('paginasPorServicio');
  return data ? JSON.parse(data) : {};
};

const guardarPaginaServicio = (servicioId: number, pagina: number) => {
  const data = getPaginasGuardadas();
  data[servicioId] = pagina;
  sessionStorage.setItem('paginasPorServicio', JSON.stringify(data));
};

// ---- Persistencia de scroll por servicio ----
const getScrollGuardado = (servicioId: number) =>
  Number(sessionStorage.getItem(`scroll:serv:${servicioId}`) ?? 0);

const guardarScroll = (servicioId: number, y: number) =>
  sessionStorage.setItem(`scroll:serv:${servicioId}`, String(y));

const LocalesComerciales: React.FC<{ servicioId: number | null }> = ({ servicioId }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [locales, setLocales] = useState<ComercioConEstado[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 🔒 bloquea auto-carga mientras se restaura estado/scroll
  const isRestoringRef = useRef<boolean>(true);

  const { data, isLoading, isError } = useComerciosPublicos({ servicioId, search, page });
  const lastPage = data?.lastPage || 1;

  // Restaura página + scroll cuando cambia servicio (sin auto-paginación en bucle)
  useEffect(() => {
    if (!servicioId) return;

    isRestoringRef.current = true; // bloquear infinitescroll
    const paginasGuardadas = getPaginasGuardadas();
    const paginaFinal = paginasGuardadas[servicioId] || 1;

    setPage(paginaFinal);
    guardarPaginaServicio(servicioId, paginaFinal);

    const y = getScrollGuardado(servicioId);

    // 2 frames para asegurar layout estable antes de habilitar el observer
    requestAnimationFrame(() => {
      window.scrollTo(0, y);
      requestAnimationFrame(() => {
        isRestoringRef.current = false; // desbloquear
      });
    });
  }, [servicioId]);

  // Actualiza locales cuando llega data nueva
  useEffect(() => {
    if (!data) return;
    const lote = anotarEstado(data.data);
    if (page === 1) setLocales(ordenarLocales(lote));
    else setLocales((prev) => ordenarLocales([...prev, ...lote]));
  }, [data, page]);

  // Si se borra el input, reinicia búsqueda y scroll
  useEffect(() => {
    if (searchValue === '') {
      setSearch('');
      setPage(1);
      if (servicioId) {
        guardarPaginaServicio(servicioId, 1);
        sessionStorage.removeItem(`scroll:serv:${servicioId}`);
      }
      window.scrollTo({ top: 0 });
    }
  }, [searchValue, servicioId]);

  // Debounce búsqueda (300ms)
  useEffect(() => {
    const v = searchValue.trim();
    if (v === '' || v === search) return;

    const t = setTimeout(() => {
      setSearch(v);
      setPage(1);
      if (servicioId) {
        guardarPaginaServicio(servicioId, 1);
        sessionStorage.removeItem(`scroll:serv:${servicioId}`);
      }
      window.scrollTo({ top: 0 });
    }, 300);

    return () => clearTimeout(t);
  }, [searchValue, search, servicioId]);

  // IntersectionObserver para auto-cargar más (evita disparo “en frío” al volver)
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isRestoringRef.current) return; // no auto-cargar durante restauración
        const first = entries[0];
        if (first.isIntersecting && page < lastPage && !isLoading) {
          const nuevaPagina = page + 1;
          setPage(nuevaPagina);
          if (servicioId) guardarPaginaServicio(servicioId, nuevaPagina);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -40% 0px', // evita que el sentinel cuente como visible demasiado pronto
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [page, lastPage, isLoading, servicioId]);

  const handleSearch = () => {
    setSearch(searchValue.trim());
    setPage(1);
    if (servicioId) {
      guardarPaginaServicio(servicioId, 1);
      sessionStorage.removeItem(`scroll:serv:${servicioId}`);
    }
    window.scrollTo({ top: 0 });
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSearch('');
    setPage(1);
    if (servicioId) {
      guardarPaginaServicio(servicioId, 1);
      sessionStorage.removeItem(`scroll:serv:${servicioId}`);
    }
    window.scrollTo({ top: 0 });
  };

  const handleLoadMore = () => {
    if (page < lastPage && servicioId) {
      const nuevaPagina = page + 1;
      setPage(nuevaPagina);
      guardarPaginaServicio(servicioId, nuevaPagina);
    }
  };

  const defaultImage = '/logo_w_fondo_negro.jpeg';

  if (isLoading && page === 1) return <Skeleton />;
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
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-6"
        style={{ overflowAnchor: 'none' }} // evita que el navegador empuje el viewport al agregar ítems
      >
        {locales?.map((comercio: ComercioConEstado) => (
          <div
            key={comercio.id}
            onClick={() => {
              if (servicioId) guardarScroll(servicioId, window.scrollY);
              navigate(`/comercio/${comercio.id}/productos`, { state: { comercio } });
            }}
            className="cursor-pointer bg-white border-[1px] shadow-lg border-gray-200 rounded-2xl transition duration-300 overflow-hidden relative"
          >
            <div className="relative h-[120px] lg:h-[180px]">
              <img
                loading="lazy"
                decoding="async"
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
                <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full" aria-live="polite">
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

      {/* Ver más locales (fallback manual oculto) */}
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

      {/* Sentinel para IntersectionObserver */}
      <div ref={loaderRef} className="h-10 mt-8 flex justify-center items-center">
        {isLoading && <p className="text-gray-500 text-sm">Cargando más locales...</p>}
      </div>
    </div>
  );
};

export default LocalesComerciales;
