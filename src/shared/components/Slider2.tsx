// src/pages/(ruta-donde-lo-tengas)/Slider2.tsx
import React, { useMemo, useRef, useState } from "react";
import Toast from "../../utils/Toast";

// ✅ Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight, FaWhatsapp } from "react-icons/fa";

// ✅ Hook de publicidades
import { usePublicidades } from "../../services/PublicidadServices";

// ✅ Igual que en el formulario/tabla
const buildImageUrl = (value?: string) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  const filename = value.replace(/^\/?uploads\//, "");
  return `${import.meta.env.VITE_API_URL}/${filename}`;
};

type PublicidadItem = {
  id?: number;
  imagen?: string;
  ruta?: string; // teléfono whatsapp (ej: 573133112345)
  estado?: number;
  orden?: number;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
};

const Slider2: React.FC = () => {
  const swiperRef = useRef<any>(null);

  const [toast, setToast] = useState<{ message: string; type?: string } | null>(null);
  const [brokenIds, setBrokenIds] = useState<Record<string, boolean>>({});

  const { data: publicidadesRaw, isLoading, error } = usePublicidades();

  // ✅ Util: limpiar teléfono
  const limpiarTelefono = (telefono?: string | null) => {
    if (!telefono) return "";
    return String(telefono).replace(/\D/g, "");
  };

  // ✅ Mensaje EXACTO que usas en LocalesComerciales
// ✅ Mensaje con palabras en *bold* (WhatsApp)
// ✅ Mensaje actualizado para WhatsApp
const buildMensajeWhatsapp = () => {
  return `👋 Hola!
Vi el anuncio en Domiciliosw.com soy cliente nuevo 😊
¿Me puedes enviar la carta o el catálogo, por favor? 📄📲

🛵 Cuando tengas mi orden lista, pide el domicilio por enviosw
👉 Envía el número ( 1 ) al 📲 3218689914, ✅confirma y ¡listo!
🚀 En segundos va el domiciliario.`;
};


  // ✅ Filtra activas y ordena por "orden"
  const publicidades = useMemo(() => {
    const list = (publicidadesRaw ?? []) as PublicidadItem[];
    return list
      .filter((p) => Number(p.estado) === 1 && !!p.imagen)
      .sort((a, b) => Number(a.orden ?? 9999) - Number(b.orden ?? 9999));
  }, [publicidadesRaw]);

  // ✅ Si NO hay publicidades, mostramos 1 slide de ejemplo
  const slides = useMemo(() => {
    if (publicidades.length === 0) {
      return [
        {
          key: "fallback",
          image: "pitalito.png",
          ruta: "",
          isFallback: true,
        },
      ];
    }

    return publicidades.map((p) => ({
      key: String(p.id ?? Math.random()),
      image: buildImageUrl(p.imagen),
      ruta: (p.ruta ?? "").trim(),
      isFallback: false,
    }));
  }, [publicidades]);

  const goToPreviousSlide = () => swiperRef.current?.slidePrev();
  const goToNextSlide = () => swiperRef.current?.slideNext();

  const handleClickPublicidad = (ruta: string, isFallback: boolean) => {
    if (isFallback) return;

    const phone = limpiarTelefono(ruta);
    if (!phone) {
      setToast({ message: "Esta publicidad no tiene número de WhatsApp.", type: "info" });
      setTimeout(() => setToast(null), 3500);
      return;
    }

    const mensaje = buildMensajeWhatsapp();

    // ✅ tu ruta ya viene con 57 (ej: 573133112345)
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Mensajito opcional si no hay publicidades
  React.useEffect(() => {
    if (!isLoading && !error && publicidades.length === 0) {
      setToast({
        message: "No hay publicidades activas. Mostrando imagen de ejemplo.",
        type: "info",
      });
      setTimeout(() => setToast(null), 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, error, publicidades.length]);

  return (
    <div className="w-full relative overflow-x-hidden">
      {/* Contenedor principal – tema CLARO y mobile-first */}
      <div
        className="
          w-full
          h-[36vh] sm:h-[34vh] md:h-[36vh] lg:h-[40vh]
          relative
          overflow-hidden
          bg-white
          shadow-[0_10px_35px_rgba(15,23,42,0.12)]
          border border-slate-200
        "
      >
        {isLoading ? (
          // Skeleton claro
          <div className="w-full h-full bg-slate-100 animate-pulse" />
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center bg-red-50 text-red-700 px-4 text-center text-sm sm:text-base border border-red-200">
            Error cargando publicidades: {(error as Error).message}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1}
            loop={slides.length > 1}
            speed={850}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="w-full h-full"
          >
            {slides.map((s) => {
              const isBroken = brokenIds[s.key];

              return (
                <SwiperSlide key={s.key}>
                  <button
                    type="button"
                    className="w-full h-full relative block text-left"
                    onClick={() => handleClickPublicidad(s.ruta, s.isFallback)}
                    aria-label={s.isFallback ? "Imagen de ejemplo" : "Abrir publicidad en WhatsApp"}
                  >
                    {/* Imagen principal */}
                    {!isBroken ? (
                      <img
                        src={s.image}
                        alt={s.isFallback ? "Publicidad de ejemplo" : "Publicidad"}
                        className="w-full h-full object-cover lg:object-contain"
                        loading="lazy"
                        onError={() => setBrokenIds((prev) => ({ ...prev, [s.key]: true }))}
                      />
                    ) : (
                      <img
                        src={"/pitalito.png"}
                        alt="Publicidad (fallback)"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}

                    {/* Capa de gradiente sutil para texto y botón (mantiene look claro) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                    {/* Badge de publicidad (claro) */}
                    <div className="absolute top-3 left-3">
                      <div
                        className="
                          inline-flex items-center gap-2
                          rounded-full
                          bg-white/90
                          border border-slate-200
                          px-3 py-1
                          text-[10px] sm:text-xs
                          font-semibold tracking-wide
                          text-slate-700
                          backdrop-blur
                        "
                      >
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{s.isFallback ? "Ejemplo de publicidad" : "Publicidad destacada"}</span>
                      </div>
                    </div>

                    {/* Botón WhatsApp – mobile first (ancho casi completo en móvil) */}
                    {!s.isFallback && (
                      <div
                        className="
                          absolute
                          inset-x-4 bottom-4
                          sm:inset-x-auto sm:left-4
                          flex justify-center sm:justify-start
                        "
                      >
                      <div
  className="
    flex items-center justify-center gap-2
    w-full sm:w-auto
    bg-green-500 hover:bg-green-600
    text-white text-[13px] sm:text-sm font-semibold
    px-4 sm:px-5 py-2.5
    rounded-full
    transition-all duration-200
    hover:scale-[1.02]
    active:scale-95
    backdrop-blur
  "
>
  <FaWhatsapp className="text-base sm:text-lg" />
  <span className="whitespace-nowrap">Ir a WhatsApp</span>
</div>

                      </div>
                    )}

                    {/* Texto pequeño para fallback */}
                    {s.isFallback && (
                      <div className="absolute left-4 bottom-4 bg-white/90 text-slate-800 text-xs sm:text-sm px-3 py-2 rounded-lg shadow">
                        Publicidad
                      </div>
                    )}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {/* Botones custom (desktop) – adaptados a tema claro */}
        <button
          onClick={goToPreviousSlide}
          className="
            hidden lg:flex
            absolute left-4 top-1/2 -translate-y-1/2
            h-10 w-10 items-center justify-center
            rounded-full
            bg-white/90 hover:bg-white
            border border-slate-300
            text-slate-700
            shadow-md
            z-20
            transition-all duration-150
            hover:scale-105 active:scale-95
          "
          aria-label="Anterior"
          type="button"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={goToNextSlide}
          className="
            hidden lg:flex
            absolute right-4 top-1/2 -translate-y-1/2
            h-10 w-10 items-center justify-center
            rounded-full
            bg-white/90 hover:bg-white
            border border-slate-300
            text-slate-700
            shadow-md
            z-20
            transition-all duration-150
            hover:scale-105 active:scale-95
          "
          aria-label="Siguiente"
          type="button"
        >
          <FaChevronRight />
        </button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type as any} />}
    </div>
  );
};

export default Slider2;
