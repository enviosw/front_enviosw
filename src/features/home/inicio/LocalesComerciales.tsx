import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { FaMapMarkerAlt, FaSearch, FaTimes, FaWhatsapp, FaRedo } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { useComerciosPublicos } from '../../../services/comerciosService';
import { Comercio } from '../../../shared/types/comercioInterface';
import Skeleton from '../../../utils/Skeleton';
import { BASE_URL } from '../../../utils/baseUrl';
import { getEstadoComercio } from '../../../utils/getEstadoComercio';

// ── Imagen con shimmer + fade-in ──
// Componente aislado: cada imagen gestiona su propio estado
// sin afectar el re-render de las demás cards.
const CardImage = memo(({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) => {
  const [loaded, setLoaded] = useState(false);
  const [error,  setError]  = useState(false);

  const fallback = '/logo_w_fondo_negro.jpeg';

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#EDE8E3]">
      {/* Shimmer mientras carga */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#EDE8E3] via-[#F5F1EC] to-[#EDE8E3]" />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
        className={`
          w-full h-full object-cover
          group-hover:scale-105
          transition-all duration-500
          ${loaded ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
});

// ================= Tipos =================
type ComercioConEstado = Comercio & {
  _estado: 'abierto' | 'cerrado';
  _isOpen: boolean;
};
type ScrollState = { y: number; page: number; search: string };

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

// ---- Persistencia ----
const getPaginasGuardadas = (): Record<number, number> => {
  try { return JSON.parse(sessionStorage.getItem('paginasPorServicio') || '{}'); }
  catch { return {}; }
};
const guardarPaginaServicio = (id: number, p: number) => {
  const d = getPaginasGuardadas(); d[id] = p;
  sessionStorage.setItem('paginasPorServicio', JSON.stringify(d));
};
const SCROLL_KEY = 'scrollLocales';
const getScrollLocales = (): Record<number, ScrollState> => {
  try { return JSON.parse(sessionStorage.getItem(SCROLL_KEY) || '{}'); }
  catch { return {}; }
};
const saveScrollLocales = (id: number, s: ScrollState) => {
  const a = getScrollLocales(); a[id] = s;
  sessionStorage.setItem(SCROLL_KEY, JSON.stringify(a));
};
const getScrollForServicio = (id: number): ScrollState | null =>
  getScrollLocales()[id] ?? null;
const clearScrollForServicio = (id: number) => {
  const a = getScrollLocales(); delete a[id];
  sessionStorage.setItem(SCROLL_KEY, JSON.stringify(a));
};

// ================= Componente =================
const LocalesComerciales: React.FC<{ servicioId: number | null }> = ({ servicioId }) => {
  const [search, setSearch]           = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage]               = useState(1);
  const [locales, setLocales]         = useState<ComercioConEstado[]>([]);

  // ── Refs siempre actualizados (sin recrear listeners) ──
  const pageRef     = useRef(1);
  const lastPageRef = useRef(1);
  // lockRef: true desde que disparamos setPage hasta que isLoading vuelve a false.
  // Evita disparar dos setPage() antes de que React re-renderice.
  const lockRef     = useRef(false);
  // wantMoreRef: el usuario llegó al fondo mientras se cargaba → cargar en cuanto termine.
  // Soluciona el scroll rápido: aunque lockRef esté activo, guardamos la intención.
  const wantMoreRef = useRef(false);

  // Restauración de scroll
  const targetScrollYRef = useRef<number | null>(null);
  const targetPageRef    = useRef<number>(1);
  const didRestoreRef    = useRef(false);
  const prevLoadingRef   = useRef(false);

  const { data, isLoading, isError, refetch } = useComerciosPublicos({
    servicioId,
    search,
    page,
  });

  const lastPage = data?.lastPage ?? 1;
  const hasMore  = page < lastPage;

  // Mantener refs en sync
  useEffect(() => { pageRef.current = page; },         [page]);
  useEffect(() => { lastPageRef.current = lastPage; }, [lastPage]);


  // ── Función central de carga ──
  const tryLoadNext = useCallback(() => {
    // Sin más páginas → limpiar intención y salir
    if (pageRef.current >= lastPageRef.current) {
      wantMoreRef.current = false;
      return;
    }
    // Si hay una petición en vuelo, solo registrar la intención y esperar
    if (lockRef.current) {
      wantMoreRef.current = true;
      return;
    }
    // Disparar siguiente página
    wantMoreRef.current = false;
    lockRef.current     = true;
    setPage((prev) => {
      const next = prev + 1;
      if (servicioId) guardarPaginaServicio(servicioId, next);
      return next;
    });
  }, [servicioId]);

  // ── Post-carga: solo para respuestas de RED (isLoading true→false) ──
  // Para respuestas de caché el lock se libera en el efecto de acumulación.
  useEffect(() => {
    const wasLoading = prevLoadingRef.current;
    prevLoadingRef.current = isLoading;

    if (!wasLoading || isLoading) return;

    lockRef.current = false;

    if (isError) return;

    if (wantMoreRef.current) {
      requestAnimationFrame(() => tryLoadNext());
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const distBottom =
          document.documentElement.scrollHeight -
          window.scrollY -
          window.innerHeight;
        if (distBottom < 600) tryLoadNext();
      });
    });
  }, [isLoading, isError, tryLoadNext]);

  // ── Listener de scroll (window) — funciona en todos los dispositivos ──
  useEffect(() => {
    const THRESHOLD = 600; // px antes del fondo real

    const onScroll = () => {
      const distBottom =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;
      if (distBottom < THRESHOLD) tryLoadNext();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tryLoadNext]);

  // ── Resetear al cambiar servicioId ──
  useEffect(() => {
    if (!servicioId) return;

    lockRef.current     = false;
    wantMoreRef.current = false;
    didRestoreRef.current = false;

    const paginasGuardadas = getPaginasGuardadas();
    const paginaFinal      = paginasGuardadas[servicioId] || 1;
    const saved            = getScrollForServicio(servicioId);

    if (saved) {
      if (saved.search && saved.search !== searchValue) {
        setSearchValue(saved.search);
        setSearch(saved.search);
      }
      targetScrollYRef.current = saved.y;
      targetPageRef.current    = Math.max(saved.page, 1);
    } else {
      targetScrollYRef.current = null;
      targetPageRef.current    = 1;
    }

    const objetivo = Math.max(paginaFinal, targetPageRef.current);
    setPage(1);
    setLocales([]);

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

  // ── Acumular resultados ──
  // También libera el lock aquí: cubre respuestas de CACHÉ donde isLoading
  // nunca se pone en true (staleTime activo) y prevLoadingRef jamás detecta
  // la transición → lockRef se quedaría true para siempre sin este release.
  useEffect(() => {
    if (!data) return;
    const lote = anotarEstado(data.data);
    if (page === 1) setLocales(ordenarLocales(uniqById(lote)));
    else            setLocales((prev) => ordenarLocales(uniqById([...prev, ...lote])));

    // Liberar lock (cubre caché + red)
    lockRef.current = false;

    if (wantMoreRef.current) {
      requestAnimationFrame(() => tryLoadNext());
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const distBottom =
          document.documentElement.scrollHeight -
          window.scrollY -
          window.innerHeight;
        if (distBottom < 600) tryLoadNext();
      });
    });
  }, [data, page, tryLoadNext]);

  // ── Restaurar posición de scroll ──
  useEffect(() => {
    if (didRestoreRef.current)           return;
    if (isLoading)                       return;
    if (targetScrollYRef.current == null) return;
    if (page < targetPageRef.current)    return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: targetScrollYRef.current as number, behavior: 'auto' });
      didRestoreRef.current    = true;
      targetScrollYRef.current = null;
      if (servicioId) clearScrollForServicio(servicioId);
    });
  }, [isLoading, page, servicioId]);

  // ── Búsqueda ──
  useEffect(() => {
    if (searchValue === '') {
      setSearch('');
      setPage(1);
      if (servicioId) guardarPaginaServicio(servicioId, 1);
    }
  }, [searchValue, servicioId]);

  useEffect(() => {
    const v = searchValue.trim();
    if (v === '' || v === search) return;
    const t = setTimeout(() => {
      setSearch(v);
      setPage(1);
      if (servicioId) guardarPaginaServicio(servicioId, 1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchValue, search, servicioId]);

  const handleSearch = () => {
    lockRef.current = false; wantMoreRef.current = false;
    setSearch(searchValue.trim());
    setPage(1);
    if (servicioId) guardarPaginaServicio(servicioId, 1);
  };
  const handleClearSearch = () => {
    lockRef.current = false; wantMoreRef.current = false;
    setSearchValue('');
    setSearch('');
    setPage(1);
    if (servicioId) guardarPaginaServicio(servicioId, 1);
  };

  // ── WhatsApp ──
  const limpiarTelefono = (t?: string | null) =>
    t ? String(t).replace(/\D/g, '') : '';

  const handleOpenWhatsapp = (comercio: ComercioConEstado) => {
    if (servicioId)
      saveScrollLocales(servicioId, { y: window.scrollY, page, search: searchValue.trim() });

    const phone = limpiarTelefono(
      (comercio as any).telefono || (comercio as any).telefono_secundario
    );
    if (!phone) { alert('Este comercio no tiene número de teléfono disponible.'); return; }

    const msg =
      `👋 *Hola!*\nVi el anuncio en Domiciliosw.com soy cliente nuevo 😊\n` +
      `¿Me puedes enviar la carta o el catálogo, por favor? 📄📲\n\n` +
      `🛵 Cuando tengas mi orden lista, pide el domicilio por enviosw\n3108857311`;
    window.open(`https://wa.me/57${phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  // ── Pantallas de estado ──
  if (isLoading && page === 1) return <Skeleton />;

  if (isError && page === 1) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-2xl">⚠️</div>
        <p className="text-[#1A1208] font-semibold">Error al cargar los negocios</p>
        <p className="text-[#6B5E52] text-sm max-w-xs">
          No pudimos conectar con el servidor. Verifica tu conexión e intenta de nuevo.
        </p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 bg-[#E8622A] hover:bg-[#C4501E] text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
        >
          <FaRedo size={13} /> Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* ── Buscador ── */}
      <div className="flex justify-center items-center mb-5">
        <div className="relative w-full max-w-full lg:max-w-md flex items-center">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar negocio o servicio…"
            className="
              w-full py-3 pl-5 pr-12
              bg-white border-2 border-[#EDE8E3] rounded-full
              text-[#1A1208] placeholder-[#6B5E52]/60 font-medium text-sm
              focus:outline-none focus:ring-2 focus:ring-[#E8622A]/40 focus:border-[#E8622A]
              shadow-sm hover:shadow-md transition-all duration-300
            "
          />
          {searchValue ? (
            <button onClick={handleClearSearch} aria-label="Limpiar"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B5E52] hover:text-red-500 transition-colors">
              <FaTimes size={14} />
            </button>
          ) : (
            <button onClick={handleSearch} aria-label="Buscar"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E8622A] hover:text-[#C4501E] transition-colors">
              <FaSearch size={15} />
            </button>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-5">
        {locales.map((comercio, idx) => (
          <div
            key={comercio.id}
            onClick={() => handleOpenWhatsapp(comercio)}
            className="
              group cursor-pointer bg-white border border-[#EDE8E3]
              rounded-2xl overflow-hidden relative
              shadow-[0_2px_12px_rgba(30,20,10,0.07)]
              hover:shadow-[0_8px_28px_rgba(30,20,10,0.15)]
              hover:scale-[1.02] hover:-translate-y-1
              transition-all duration-300 ease-in-out
            "
          >
            <div className="relative aspect-[4/3]">
              <CardImage
                src={comercio.logo_url ? `${BASE_URL}/${comercio.logo_url}` : '/logo_w_fondo_negro.jpeg'}
                alt={comercio.nombre_comercial}
                priority={idx < 6}
              />
              <div className="absolute bottom-2 right-2 z-10 bg-white/95 backdrop-blur text-[#2D6A4F] font-semibold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <AiFillStar className="text-[#2D6A4F]" size={10} />
                <span>{comercio.servicio?.nombre || 'Sin tipo'}</span>
              </div>
            </div>
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
                <div className="flex items-center gap-1 shrink-0 bg-[#25D366] text-white text-[9px] font-bold px-2 py-0.5 rounded-full ml-1 shadow-sm pointer-events-none">
                  <FaWhatsapp size={9} /><span>WA</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Sin resultados ── */}
      {!isLoading && locales.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <span className="text-4xl">🔍</span>
          <p className="text-[#1A1208] font-semibold">No encontramos negocios</p>
          <p className="text-[#6B5E52] text-sm">
            {search ? `No hay resultados para "${search}"` : 'No hay negocios en esta categoría'}
          </p>
          {search && (
            <button onClick={handleClearSearch} className="text-[#E8622A] font-medium text-sm hover:underline">
              Limpiar búsqueda
            </button>
          )}
        </div>
      )}

      {/* ── Zona inferior ── */}
      <div>
        {/* Spinner carga páginas 2+ */}
        {isLoading && page > 1 && (
          <div className="flex items-center justify-center gap-3 py-8">
            <div className="w-6 h-6 rounded-full border-[3px] border-[#E8622A]/20 border-t-[#E8622A] animate-spin" />
            <span className="text-[#6B5E52] text-sm font-medium">Cargando más negocios…</span>
          </div>
        )}

        {/* Error al cargar más */}
        {isError && page > 1 && (
          <div className="flex justify-center py-6">
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-3">
              <span>⚠️</span>
              <p className="text-red-600 text-sm font-medium">Error al cargar más</p>
              <button
                onClick={() => { lockRef.current = false; refetch(); }}
                className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
              >
                <FaRedo size={10} /> Reintentar
              </button>
            </div>
          </div>
        )}

        {/* Fin del listado — solo visible cuando ya no hay más páginas */}
        {!isLoading && !isError && !hasMore && locales.length > 0 && (
          <div className="flex items-center gap-3 justify-center py-8">
            <div className="flex-1 max-w-[80px] h-px bg-[#EDE8E3]" />
            <span className="text-[#6B5E52]/60 text-xs font-medium">
              {locales.length} {locales.length === 1 ? 'negocio' : 'negocios'} en total
            </span>
            <div className="flex-1 max-w-[80px] h-px bg-[#EDE8E3]" />
          </div>
        )}
      </div>

    </div>
  );
};

export default LocalesComerciales;
