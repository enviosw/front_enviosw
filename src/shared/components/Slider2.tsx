// src/pages/(ruta-donde-lo-tengas)/Slider2.tsx
import React, { useMemo, useRef, useState } from "react";
import Toast from "../../utils/Toast";

// ✅ Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  // ✅ Util: saludo según hora (igual a tu otro componente)
  const getSaludo = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return "Hola, buenos días";
    if (h >= 12 && h < 19) return "Hola, buenas tardes";
    return "Hola, buenas noches";
  };

  // ✅ Util: limpiar teléfono
  const limpiarTelefono = (telefono?: string | null) => {
    if (!telefono) return "";
    return String(telefono).replace(/\D/g, "");
  };

  // ✅ Mensaje EXACTO que usas en LocalesComerciales (mismo texto)
  const buildMensajeWhatsapp = () => {
    return `🚨 NUEVO CLIENTE DE DOMICILIOS W 🛵💨
📲 313 408 9563 | 🌐 domiciliosw.com

${getSaludo()} 👋
Quiero hacer un pedido ahora mismo 🛒🍔
👉 ¿Me envías el menú o catálogo disponible, por favor? 📋✨

¡Quedo atento! 😃🚀`;
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

    // ✅ IMPORTANTE:
    // tu ruta ya viene con 57 (ej: 573133112345)
    // entonces NO le agregamos otro 57
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
      {/* ✅ Slider listo para banners */}
      <div className="w-full h-[28vh] md:h-[36vh] lg:h-[40vh] relative">
        {isLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center bg-black text-white px-4 text-center">
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
                    {!isBroken ? (
                      <img
                        src={s.image}
                        alt={s.isFallback ? "Publicidad de ejemplo" : "Publicidad"}
                        className="w-full h-full object-contain"
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

                    <div className="absolute inset-0 bg-black/25" />

                    {s.isFallback ? (
                      <div className="absolute left-4 bottom-4 bg-black/60 text-white text-xs sm:text-sm px-3 py-2 rounded-lg">
                        Publicidad de ejemplo
                      </div>
                    ) : (
                      <div className="absolute left-4 bottom-4 bg-black/60 text-white text-xs sm:text-sm px-3 py-2 rounded-lg">
                        Toca para WhatsApp (con mensaje)
                      </div>
                    )}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {/* Botones custom (desktop) */}
        <button
          onClick={goToPreviousSlide}
          className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/80 text-[#FFB84D] rounded-full z-20"
          aria-label="Anterior"
          type="button"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={goToNextSlide}
          className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/80 text-[#FFB84D] rounded-full z-20"
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
