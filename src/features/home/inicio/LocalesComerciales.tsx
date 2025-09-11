import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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

const getPaginasGuardadas = (): Record<number, number> => {
  const data = sessionStorage.getItem('paginasPorServicio');
  return data ? JSON.parse(data) : {};
};

const guardarPaginaServicio = (servicioId: number, pagina: number) => {
  const data = getPaginasGuardadas();
  data[servicioId] = pagina;
  sessionStorage.setItem('paginasPorServicio', JSON.stringify(data));
};

const PAGINATION_DELAY_MS = 1000; // 1s entre páginas
const DEBOUNCE_MS = 300; // ya lo tenías

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const LocalesComerciales: React.FC<{ servicioId: number | null }> = ({ servicioId }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [locales, setLocales] = useState<ComercioConEstado[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // flags/refs para controlar paginación y scroll
  const [isPaging, setIsPaging] = useState(false);
  const preserveScrollRef = useRef(false);
  const pendingScrollTopRef = useRef<number | null>(null);

  const { data, isLoading, isError } = useComerciosPublicos({ servicioId, search, page });
  const lastPage = data?.lastPage || 1;

  // Al iniciar, recupera la página guardada por servicio si no hay búsqueda
  useEffect(() => {
    if (servicioId && search === '') {
      const paginasGuardadas = getPaginasGuardadas();
      const paginaFinal = paginasGuardadas[servicioId] || 1;

      // Arranca en la página 1 y carga hasta la última que tenía guardada
      setPage(1);

      if (paginaFinal > 1) {
        preserveScrollRef.current = true; // anclamos scroll durante la recuperación

        (async () => {
          for (let target = 2; target <= paginaFinal; target++) {
            // guardamos el scroll actual y esperamos 1s antes de pedir la siguiente página
            pendingScrollTopRef.current = window.scrollY;
            setIsPaging(true);
            await wait(PAGINATION_DELAY_MS);
            setPage((prev) => {
              const nueva = prev + 1;
              guardarPaginaServicio(servicioId, nueva);
              return nueva;
            });
            setIsPaging(false);
          }

          // al terminar, desanclamos
          preserveScrollRef.current = false;
          pendingScrollTopRef.current = null;
        })();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicioId]);

  // Actualiza los locales cuando llega data nueva
  useEffect(() => {
    if (!data) return;
    const lote = anotarEstado(data.data);

    if (page === 1) {
      setLocales(ordenarLocales(lote));
    } else {
      setLocales((prev) => ordenarLocales([...prev, ...lote]));
    }
  }, [data, page]);

  // Restaurar el scroll si estamos en recuperación automática (antes de pintar para evitar "saltos")
  useLayoutEffect(() => {
    if (!preserveScrollRef.current) return;
    if (pendingScrollTopRef.current == null) return;
    window.scrollTo(0, pendingScrollTopRef.current);
  }, [locales]);

  // Si se borra el input, reinicia búsqueda
  useEffect(() => {
    if (searchValue === '') {
      setSearch('');
      setPage(1);
      if (servicioId) guardarPaginaServicio(servicioId, 1);
    }
  }, [searchValue, servicioId]);

  const handleSearch = () => {
    setSearch(searchValue.trim());
    setPage(1);
    if (servicioId) guardarPaginaServicio(servicioId, 1);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSearch('');
    setPage(1);
    if (servicioId) guardarPaginaServicio(servicioId, 1);
  };

  const handleLoadMore = async () => {
    if (isPaging || isLoading) return;
    if (page < lastPage && servicioId) {
      setIsPaging(true);
      await wait(PAGINATION_DELAY_MS);
      setPage((prev) => {
        const nuevaPagina = prev + 1;
        guardarPaginaServicio(servicioId, nuevaPagina);
        return nuevaPagina;
      });
      setIsPaging(false);
    }
  };

  // Infinite scroll con IntersectionObserver y delay de 1s
  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting;
        // Solo pagina si el usuario llegó al sentinel (bajó),
        // y no estamos ya paginando ni cargando.
        if (isVisible && page < lastPage && !isLoading && !isPaging) {
          setIsPaging(true);
          setTimeout(() => {
            setPage((prev) => {
              const nueva = prev + 1;
              if (servicioId) guardarPaginaServicio(servicioId, nueva);
              return nueva;
            });
            setIsPaging(false);
          }, PAGINATION_DELAY_MS);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [page, lastPage, isLoading, isPaging, servicioId]);

  // Búsqueda con debounce (manteniendo tu lógica)
  useEffect(() => {
    const v = searchValue.trim();

    // si quedó vacío, ya lo manejas en el otro useEffect (el que limpia search)
    if (v === '') return;

    // evita llamadas innecesarias si no cambió realmente
    if (v === search) return;

    const t = setTimeout(() => {
      setSearch(v);
      setPage(1);
      if (servicioId) guardarPaginaServicio(servicioId, 1);
    }, DEBOUNCE_MS);

    return () => clearTimeout(t);
  }, [searchValue, search, servicioId]);

  if (isLoading && page === 1) return <Skeleton />;
  if (isError) return <div>Error al cargar locales</div>;

  const defaultImage = '/logo_w_fondo_negro.jpeg';

  return (
    <div className='w-full'>
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
        {locales?.map((comercio: ComercioConEstado) =>  (
          <div
            key={comercio.id}
            onClick={() => navigate(`/comercio/${comercio.id}/productos`, { state: { comercio } })}
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
                <span className="flex items-center text-green-600 gap-1 bg-gray-50 px-3 py-1 rounded-full" aria-live="polite">
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

      {/* Ver más locales */}
      {page < lastPage && (
        <div className=" justify-center mt-8 hidden">
          <button
            onClick={handleLoadMore}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-md"
          >
            Ver más locales
          </button>
        </div>
      )}

      <div ref={loaderRef} className="h-10 mt-8 flex justify-center items-center">
        {(isLoading || isPaging) && <p className="text-gray-500 text-sm">Cargando más locales...</p>}
      </div>

    </div>
  );
};

export default LocalesComerciales;
