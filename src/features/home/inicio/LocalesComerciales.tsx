import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaSearch, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { useComerciosPublicos } from '../../../services/comerciosService';
import { Comercio } from '../../../shared/types/comercioInterface';
import Skeleton from '../../../utils/Skeleton';
import { BASE_URL } from '../../../utils/baseUrl';
import { getEstadoComercio } from '../../../utils/getEstadoComercio';

// ================= Tipos =================
type ComercioConEstado = Comercio & {
  _estado: 'abierto' | 'cerrado';
  _isOpen: boolean;
};

type ScrollState = {
  y: number;
  page: number;
  search: string;
};

// ================= Utilidades =================
const ordenarLocales = (arr: ComercioConEstado[]) =>
  [...arr].sort((a, b) => Number(b._isOpen) - Number(a._isOpen));

const anotarEstado = (arr: Comercio[]): ComercioConEstado[] =>
  arr.map((c) => {
    const estado = getEstadoComercio(c.horarios);
    return { ...c, _estado: estado, _isOpen: estado === 'abierto' };
  });

const uniqById = (arr: any[]): any[] => {
  const m = new Map<string, any>();
  for (const item of arr) m.set(String(item.id), item);
  return Array.from(m.values());
};

// ---- Persistencia por servicio (páginas)
const getPaginasGuardadas = (): Record<number, number> => {
  const data = sessionStorage.getItem('paginasPorServicio');
  return data ? JSON.parse(data) : {};
};

const guardarPaginaServicio = (servicioId: number, pagina: number) => {
  const data = getPaginasGuardadas();
  data[servicioId] = pagina;
  sessionStorage.setItem('paginasPorServicio', JSON.stringify(data));
};

// ---- Persistencia de scroll/búsqueda/página por servicio
const SCROLL_KEY = 'scrollLocales';

const getScrollLocales = (): Record<number, ScrollState> => {
  const raw = sessionStorage.getItem(SCROLL_KEY);
  return raw ? JSON.parse(raw) : {};
};

const saveScrollLocales = (servicioId: number, s: ScrollState) => {
  const all = getScrollLocales();
  all[servicioId] = s;
  sessionStorage.setItem(SCROLL_KEY, JSON.stringify(all));
};

const getScrollForServicio = (servicioId: number): ScrollState | null => {
  const all = getScrollLocales();
  return all[servicioId] ?? null;
};

const clearScrollForServicio = (servicioId: number) => {
  const all = getScrollLocales();
  delete all[servicioId];
  sessionStorage.setItem(SCROLL_KEY, JSON.stringify(all));
};

// ================= Componente =================
const LocalesComerciales: React.FC<{ servicioId: number | null }> = ({ servicioId }) => {
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [locales, setLocales] = useState<ComercioConEstado[]>([]);

  // Para restaurar scroll una sola vez
  const targetScrollYRef = useRef<number | null>(null);
  const targetPageRef = useRef<number>(1);
  const didRestoreRef = useRef(false);

  const { data, isLoading, isError } = useComerciosPublicos({ servicioId, search, page });
  const lastPage = data?.lastPage || 1;

  // Al iniciar, restaurar página y scroll/búsqueda guardados
  useEffect(() => {
    if (!servicioId) return;

    const paginasGuardadas = getPaginasGuardadas();
    const paginaFinal = paginasGuardadas[servicioId] || 1;

    const saved = getScrollForServicio(servicioId);
    if (saved) {
      if (saved.search && saved.search !== searchValue) {
        setSearchValue(saved.search);
        setSearch(saved.search);
      }
      targetScrollYRef.current = saved.y;
      targetPageRef.current = Math.max(saved.page, 1);
    } else {
      targetScrollYRef.current = null;
      targetPageRef.current = 1;
    }

    // arrancar en 1 y avanzar hasta la página objetivo (si corresponde)
    const objetivo = Math.max(paginaFinal, targetPageRef.current);
    setPage(1);

    if (objetivo > 1) {
      let actual = 1;
      const cargarPaginas = () => {
        actual++;
        setPage((prev) => {
          const nueva = prev + 1;
          if (servicioId) guardarPaginaServicio(servicioId, nueva);
          return nueva;
        });
        if (actual < objetivo) setTimeout(cargarPaginas, 250);
      };
      setTimeout(cargarPaginas, 250);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicioId]);

  // Acumular resultados por página
  useEffect(() => {
    if (!data) return;
    const lote = anotarEstado(data.data);
    if (page === 1) setLocales(ordenarLocales(uniqById(lote)));
    else setLocales((prev) => ordenarLocales(uniqById([...prev, ...lote])));
  }, [data, page]);

  // Restaurar scroll cuando corresponde
  useEffect(() => {
    if (didRestoreRef.current) return;
    if (isLoading) return;
    if (targetScrollYRef.current == null) return;
    if (page < targetPageRef.current) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: targetScrollYRef.current as number, behavior: 'auto' });
      didRestoreRef.current = true;
      if (servicioId) clearScrollForServicio(servicioId);
      targetScrollYRef.current = null;
    });
  }, [isLoading, page, servicioId]);

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

  // Debounce a medida que se escribe
  const DEBOUNCE_MS = 300;
  useEffect(() => {
    const v = searchValue.trim();
    if (v === '' || v === search) return;

    const t = setTimeout(() => {
      setSearch(v);
      setPage(1);
      if (servicioId) guardarPaginaServicio(servicioId, 1);
    }, DEBOUNCE_MS);

    return () => clearTimeout(t);
  }, [searchValue, search, servicioId]);



  const limpiarTelefono = (telefono?: string | null) => {
    if (!telefono) return '';
    // deja solo números
    return String(telefono).replace(/\D/g, '');
  };

const handleOpenWhatsapp = (comercio: ComercioConEstado) => {
  // Guarda scroll actual
  if (servicioId) {
    saveScrollLocales(servicioId, {
      y: window.scrollY,
      page,
      search: searchValue.trim(),
    });
  }

  const phoneRaw: any =
    (comercio as any).telefono || (comercio as any).telefono_secundario;

  const phone = limpiarTelefono(phoneRaw);

  if (!phone) {
    alert('Este comercio no tiene número de teléfono disponible.');
    return;
  }

const mensaje = `👋 *Hola!*
Vi el anuncio en Domiciliosw.com soy cliente nuevo 😊
¿Me puedes enviar la carta o el catálogo, por favor? 📄📲

🛵 Cuando tengas mi orden lista, pide el domicilio por enviosw
3108857311`;



const url = `https://wa.me/57${phone}?text=${encodeURIComponent(mensaje)}`;
window.open(url, '_blank', 'noopener,noreferrer');

};


  // 🔍  NUEVO: botón "Click ver más" que lista TODAS las páginas restantes
  const handleClickVerMas = () => {
    if (page >= lastPage) return;

    let current = page;
    const loadNext = () => {
      current += 1;
      setPage((prev) => {
        const next = prev + 1;
        if (servicioId) guardarPaginaServicio(servicioId, next);
        return next;
      });
      if (current < lastPage) {
        setTimeout(loadNext, 200);
      }
    };

    setTimeout(loadNext, 0);
  };

  const defaultImage = '/logo_w_fondo_negro.jpeg';

  if (isLoading && page === 1) return <Skeleton />;
  if (isError) return <div>Error al cargar locales</div>;

  return (
    <div className='w-full'>
      {/* Buscador */}
      <div className="flex justify-center items-center mb-5">
        <div className="relative w-full max-w-full lg:max-w-md flex items-center">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Buscar negocio o servicio…"
            className="
              w-full py-3 pl-5 pr-12
              bg-white border-2 border-[#EDE8E3]
              rounded-full
              text-[#1A1208] placeholder-[#6B5E52]/60
              font-medium text-sm
              focus:outline-none focus:ring-2 focus:ring-[#E8622A]/40 focus:border-[#E8622A]
              shadow-sm hover:shadow-md
              transition-all duration-300
            "
          />
          {searchValue ? (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B5E52] hover:text-red-500 transition-all duration-200 hover:scale-110"
              aria-label="Limpiar búsqueda"
            >
              <FaTimes size={14} />
            </button>
          ) : (
            <button
              onClick={handleSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E8622A] hover:text-[#C4501E] transition-all duration-200 hover:scale-110"
              aria-label="Realizar búsqueda"
            >
              <FaSearch size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Grid de locales */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-5">
        {locales?.map((comercio: ComercioConEstado) => (
          <div
            key={comercio.id}
            onClick={() => handleOpenWhatsapp(comercio)}
            className="
              group cursor-pointer
              bg-white border border-[#EDE8E3]
              rounded-2xl overflow-hidden relative
              shadow-[0_2px_12px_rgba(30,20,10,0.07)]
              hover:shadow-[0_8px_28px_rgba(30,20,10,0.15)]
              hover:scale-[1.02] hover:-translate-y-1
              transition-all duration-300 ease-in-out
            "
          >
            {/* Imagen */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE8E3]">
              <img
                src={comercio.logo_url ? `${BASE_URL}/${comercio.logo_url}` : defaultImage}
                alt={comercio.nombre_comercial}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Estado abierto/cerrado */}
              {/* <div className={`
                absolute top-2 left-2 z-10
                text-[10px] font-bold px-2 py-0.5 rounded-full
                shadow-sm
                ${comercio._isOpen
                  ? 'bg-[#2D6A4F] text-white'
                  : 'bg-[#1A1208]/70 text-white/80'}
              `}>
                {comercio._isOpen ? 'Abierto' : 'Cerrado'}
              </div> */}
              {/* Badge categoría */}
              <div className="absolute bottom-2 right-2 z-10 bg-white/95 backdrop-blur text-[#2D6A4F] font-semibold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <AiFillStar className="text-[#2D6A4F]" size={10} />
                <span>{comercio.servicio?.nombre || 'Sin tipo'}</span>
              </div>
            </div>

            {/* Contenido */}
            <div className="pb-3 pt-2.5 px-3">
              <h3 className="text-sm font-bold text-[#1A1208] line-clamp-1 leading-snug mb-0.5">
                {comercio.nombre_comercial}
              </h3>

              <p className="text-xs text-[#6B5E52] line-clamp-2 leading-relaxed mb-2">
                {comercio.descripcion || 'Toca para contactar por WhatsApp'}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] text-[#6B5E52] truncate flex-1 min-w-0">
                  <FaMapMarkerAlt className="text-[#2D6A4F] shrink-0" size={10} />
                  <span className="truncate">{comercio.direccion || 'Sin dirección'}</span>
                </div>
                {/* Badge WhatsApp */}
                <div className="
                  flex items-center gap-1 shrink-0
                  bg-[#25D366] text-white
                  text-[9px] sm:text-[10px] font-bold
                  px-2 py-0.5 rounded-full ml-1
                  shadow-sm
                  pointer-events-none
                ">
                  <FaWhatsapp size={9} />
                  <span>WA</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón: Ver más */}
      {page < lastPage && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleClickVerMas}
            disabled={isLoading}
            className="
              bg-[#E8622A] hover:bg-[#C4501E]
              disabled:opacity-60 disabled:cursor-not-allowed
              text-white font-semibold
              py-3 px-8 rounded-full
              shadow-md hover:shadow-lg
              transition-all duration-300
              hover:scale-105 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-[#E8622A]/50
            "
          >
            {isLoading ? 'Cargando…' : 'Ver más negocios'}
          </button>
        </div>
      )}

      {/* Estado de carga */}
      {isLoading && (
        <div className="h-12 mt-8 flex justify-center items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-[#E8622A]/30 border-t-[#E8622A] animate-spin" />
          <p className="text-[#6B5E52] text-sm font-medium">Cargando locales…</p>
        </div>
      )}
    </div>
  );
};

export default LocalesComerciales;
