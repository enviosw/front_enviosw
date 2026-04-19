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
  ruta?: string;
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


  const buildMensajeWhatsapp = () => {
    return `👋 Hola!
Vi el anuncio en enviosw.com soy cliente nuevo 😊
¿Me puedes enviar la carta o el catálogo, por favor? 📄📲

🛵 Cuando tengas mi orden lista, pide el domicilio por envíosw
3171530428`;
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
      {/* Contenedor principal */}
      <div
        className="
          w-full
          h-[38vh] sm:h-[42vh] md:h-[46vh] lg:h-[52vh]
          relative overflow-hidden
          bg-black
          shadow-[0_8px_40px_rgba(28,14,6,0.22)]
        "
      >
        {isLoading ? (
          <div className="w-full h-full bg-gradient-to-br from-[#EDE8E3] to-[#FAFAF7] animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-[#E8622A]/30 border-t-[#E8622A] animate-spin" />
          </div>
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center bg-red-50 text-red-700 px-4 text-center text-sm border border-red-100">
            Error cargando publicidades: {(error as Error).message}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1}
            loop={slides.length > 1}
            speed={900}
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
                    className="w-full h-full relative block text-left cursor-pointer"
                    onClick={() => handleClickPublicidad(s.ruta, s.isFallback)}
                    aria-label={s.isFallback ? "Imagen de ejemplo" : "Abrir publicidad en WhatsApp"}
                  >
                    {/* Imagen */}
                    {!isBroken ? (
                      <img
                        src={s.image}
                        alt={s.isFallback ? "Publicidad de ejemplo" : "Publicidad"}
                        className="w-full h-full object-cover lg:object-contain transition-transform duration-700 hover:scale-[1.02]"
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

                    {/* Gradiente inferior */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/92 backdrop-blur border border-white/50 px-3 py-1 text-[10px] sm:text-xs font-semibold tracking-wide text-[#1A1208] shadow-sm">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                        <span>{s.isFallback ? "Ejemplo de publicidad" : "Publicidad destacada"}</span>
                      </div>
                    </div>

                    {/* Botón WhatsApp */}
                    {!s.isFallback && (
                      <div className="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:left-4 flex justify-center sm:justify-start pointer-events-none">
                        <div className="
                          inline-flex items-center justify-center gap-2
                          w-full sm:w-auto
                          bg-[#25D366] text-white
                          text-[13px] sm:text-sm font-semibold
                          px-5 py-2.5 rounded-full
                          shadow-[0_4px_20px_rgba(37,211,102,0.45)]
                          transition-all duration-300
                        ">
                          <FaWhatsapp className="text-base sm:text-lg" />
                          <span className="whitespace-nowrap">Contactar por WhatsApp</span>
                        </div>
                      </div>
                    )}

                    {/* Texto fallback */}
                    {s.isFallback && (
                      <div className="absolute left-4 bottom-4 pointer-events-none bg-white/92 backdrop-blur text-[#1A1208] text-xs sm:text-sm px-3 py-2 rounded-xl shadow-md font-medium">
                        Publicidad
                      </div>
                    )}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {/* Botones nav desktop */}
        <button
          onClick={goToPreviousSlide}
          className="
            hidden lg:flex
            absolute left-4 top-1/2 -translate-y-1/2
            h-11 w-11 items-center justify-center
            rounded-full
            bg-white/92 hover:bg-white
            border border-[#EDE8E3]
            text-[#1A1208]
            shadow-lg
            z-20
            transition-all duration-200
            hover:scale-110 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-[#E8622A]/50
          "
          aria-label="Anterior"
          type="button"
        >
          <FaChevronLeft size={14} />
        </button>

        <button
          onClick={goToNextSlide}
          className="
            hidden lg:flex
            absolute right-4 top-1/2 -translate-y-1/2
            h-11 w-11 items-center justify-center
            rounded-full
            bg-white/92 hover:bg-white
            border border-[#EDE8E3]
            text-[#1A1208]
            shadow-lg
            z-20
            transition-all duration-200
            hover:scale-110 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-[#E8622A]/50
          "
          aria-label="Siguiente"
          type="button"
        >
          <FaChevronRight size={14} />
        </button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type as any} />}
    </div>
  );
};

export default Slider2;
