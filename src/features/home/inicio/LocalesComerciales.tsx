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

 const mensaje = `🚨 NUEVO CLIENTE 🚨
🌐 DomiciliosW.com
📲 313 408 9563

👋 Hola, quiero hacer un pedido.

📋 ¿Podrías enviarme la carta o el catálogo, por favor?

😊 Quedo atent@.
¡Gracias!`;

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
      onClick={() => handleOpenWhatsapp(comercio)}
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
        </div>

        {/* ⭐️ Botón solo visual, sin romper click de tarjeta */}
       {/* ⭐ Botón flotante WhatsApp - pequeño, abajo derecha */}
<div
  className="
    absolute bottom-2 right-2
    flex items-center gap-1
    bg-green-500 text-white
    text-[10px] sm:text-xs font-semibold
    px-2 py-1 rounded-full
    shadow-md shadow-green-400/30
    pointer-events-none
  "
>
  <FaWhatsapp className="text-xs" />
  <span>WhatsApp</span>
</div>

      </div>
    </div>
  ))}
</div>


      {/* Botón: Click ver más (carga todas las páginas restantes) */}
      {page < lastPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleClickVerMas}
            disabled={isLoading}
            className={`bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-full shadow-md`}
          >
            {isLoading ? 'Cargando el resto…' : 'Click ver más'}
          </button>
        </div>
      )}

      {/* Estado de carga */}
      {isLoading && (
        <div className="h-10 mt-8 flex justify-center items-center">
          <p className="text-gray-500 text-sm">Cargando locales…</p>
        </div>
      )}
    </div>
  );
};

export default LocalesComerciales;
