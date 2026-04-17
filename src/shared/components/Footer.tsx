import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-black text-white/80">
            {/* Línea superior decorativa */}
            <div className="h-[3px] bg-gradient-to-r from-[#E8622A] via-amber-400 to-[#E8622A]" />

            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    {/* Columna marca */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg">
                                <FaWhatsapp size={22} className="text-white" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-base leading-tight">Domicilios W</p>
                                <p className="text-white/50 text-xs">Pitalito, Huila</p>
                            </div>
                        </div>
                        <p className="text-white/65 text-sm leading-relaxed">
                            Pedidos rápidos, seguros y sin complicaciones. Tu servicio de domicilios de confianza en Pitalito.
                        </p>
                        <div className="text-xs text-white/50 space-y-1">
                            <p>📍 Calle José Hilario López, Main Park, Pitalito, Huila</p>
                            <p>📞 +57 3171530428</p>
                        </div>
                    </div>

                    {/* Columna servicios */}
                    <div className="flex flex-col gap-3">
                        <h6 className="text-white font-semibold text-sm tracking-wider uppercase mb-1">
                            Servicios en Pitalito
                        </h6>
                        {['Restaurantes', 'Droguerías', 'Compras y Pagos', 'Trámites y Envíos'].map((s) => (
                            <span key={s} className="text-white/60 text-sm hover:text-[#E8622A] transition-colors duration-200 cursor-default">
                                {s}
                            </span>
                        ))}
                    </div>

                    {/* Columna redes */}
                    <div className="flex flex-col gap-4">
                        <h6 className="text-white font-semibold text-sm tracking-wider uppercase mb-1">
                            Síguenos
                        </h6>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://wa.me/3171530428"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="w-10 h-10 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] flex items-center justify-center transition-all duration-300 hover:scale-110 border border-[#25D366]/30"
                            >
                                <FaWhatsapp size={18} className="text-[#25D366] hover:text-white transition-colors" />
                            </a>
                            <a
                                href="https://www.instagram.com/envioswpitalito/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-full bg-white/8 hover:bg-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10"
                            >
                                <FaInstagram size={18} className="text-white/70 hover:text-white transition-colors" />
                            </a>
                            <a
                                href="https://www.facebook.com/envioswexpress/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-full bg-white/8 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10"
                            >
                                <FaFacebook size={18} className="text-white/70 hover:text-white transition-colors" />
                            </a>
                        </div>

                        <a
                            href="https://wa.me/573171530428"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Contactar por WhatsApp"
                            className="
                                inline-flex items-center justify-center gap-2 w-fit
                                bg-[#25D366] hover:bg-[#1EB555] text-white
                                font-semibold text-sm
                                px-5 py-2.5 rounded-full
                                shadow-[0_4px_16px_rgba(37,211,102,0.35)]
                                hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)]
                                transition-all duration-300 hover:scale-105
                            "
                        >
                            <FaWhatsapp size={16} />
                            Contactar ahora
                        </a>
                    </div>
                </div>

                {/* Divisor */}
                <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p className="text-white/40 text-xs text-center sm:text-left">
                        &copy; {new Date().getFullYear()} Domicilios W. Todos los derechos reservados.
                    </p>
                    <p className="text-white/35 text-xs text-center">
                        Desarrollado por{' '}
                        <strong className="text-white/55">Dev M Desarrollo de Software</strong>
                        {' '}·{' '}
                        <a href="tel:+573208729276" className="underline hover:text-white/70 transition-colors">
                            3208729276
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
