import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  FaUser,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaSignOutAlt,
  FaTachometerAlt,
  FaStore,
  FaChevronDown,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { AlertService } from '../../../utils/AlertService';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Sombra al hacer scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Cierra dropdown al clic fuera */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    const confirmed = await AlertService.confirm(
      '¿Cerrar sesión?',
      '¿Estás seguro de que deseas salir de tu cuenta?'
    );
    if (confirmed) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav
      className={`
        sticky top-0 w-full z-[9999]
        transition-all duration-500
        ${scrolled
          ? 'bg-[#140A03]/98 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-[#1C0E06]/95'}
        backdrop-blur-xl border-b border-white/[0.06]
      `}
    >
      {/* Línea superior — gradiente animado */}
      <div className="h-[3px] bg-gradient-to-r from-[#E8622A] via-amber-300 to-[#E8622A] bg-[length:200%] animate-[shimmer_3s_linear_infinite]" />

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16">

        {/* ═══ LOGO + MARCA ═══ */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="Ir al inicio"
        >
          {/* Avatar logo */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-[#E8622A]/40 blur-md scale-110 group-hover:scale-125 transition-transform duration-500" />
            <img
              src="/d1.png"
              alt="Envios W"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#E8622A]/70 shadow-lg"
            />
          </div>

          {/* Texto marca */}
          <div className="flex flex-col leading-none">
            <img
              src="/dd4.png"
              alt="Envios W"
              className="h-7 sm:h-8 object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="flex items-center gap-1 text-[10px] text-white/45 mt-0.5 font-medium tracking-wide">
              <FaMapMarkerAlt size={8} className="text-[#E8622A]" />
              Pitalito · Huila
            </span>
          </div>
        </button>

        {/* ═══ REDES SOCIALES ═══ */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* WhatsApp */}
          <a
            href="https://wa.me/573134089563"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="
              group relative w-8 h-8 sm:w-9 sm:h-9
              flex items-center justify-center rounded-full
              bg-white/6 hover:bg-[#25D366]
              border border-white/10 hover:border-[#25D366]
              transition-all duration-250 hover:scale-110 hover:shadow-[0_0_14px_rgba(37,211,102,0.55)]
              focus:outline-none focus:ring-2 focus:ring-[#25D366]/50
            "
          >
            <FaWhatsapp
              size={16}
              className="text-white/70 group-hover:text-white transition-colors duration-200"
            />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/envioswpitalito/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="
              group relative w-8 h-8 sm:w-9 sm:h-9
              flex items-center justify-center rounded-full
              bg-white/6 hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400
              border border-white/10 hover:border-pink-400
              transition-all duration-250 hover:scale-110 hover:shadow-[0_0_14px_rgba(236,72,153,0.5)]
              focus:outline-none focus:ring-2 focus:ring-pink-400/50
            "
          >
            <FaInstagram
              size={16}
              className="text-white/70 group-hover:text-white transition-colors duration-200"
            />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/envioswexpress/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="
              group relative w-8 h-8 sm:w-9 sm:h-9
              flex items-center justify-center rounded-full
              bg-white/6 hover:bg-[#1877F2]
              border border-white/10 hover:border-[#1877F2]
              transition-all duration-250 hover:scale-110 hover:shadow-[0_0_14px_rgba(24,119,242,0.5)]
              focus:outline-none focus:ring-2 focus:ring-[#1877F2]/50
            "
          >
            <FaFacebook
              size={16}
              className="text-white/70 group-hover:text-white transition-colors duration-200"
            />
          </a>
        </div>

        {/* ═══ USUARIO ═══ */}
        <div className="flex items-center">
          {!user ? (
            /* Botón login */
            <button
              type="button"
              onClick={() => navigate('/login')}
              aria-label="Iniciar sesión"
              className="
                group flex items-center gap-2
                bg-[#E8622A] hover:bg-[#C4501E]
                text-white text-xs sm:text-sm font-semibold
                px-3 sm:px-4 py-2 rounded-full
                shadow-[0_2px_12px_rgba(232,98,42,0.4)]
                hover:shadow-[0_4px_20px_rgba(232,98,42,0.6)]
                transition-all duration-300 hover:scale-105 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-[#E8622A]/60
              "
            >
              <FaUser size={12} className="shrink-0" />
              <span className="hidden sm:inline">Ingresar</span>
            </button>
          ) : (
            /* Dropdown usuario */
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-label="Menú de usuario"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(v => !v)}
                className="
                  flex items-center gap-2
                  bg-white/8 hover:bg-white/12
                  border border-white/12 hover:border-[#E8622A]/50
                  text-white px-3 py-1.5 rounded-full
                  text-sm font-medium
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-[#E8622A]/50
                "
              >
                {/* Avatar inicial */}
                <span className="w-6 h-6 rounded-full bg-[#E8622A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {user.nombre?.charAt(0).toUpperCase()}
                </span>
                <span className="hidden sm:inline max-w-[70px] truncate text-white/90">
                  {user.nombre}
                </span>
                <FaChevronDown
                  size={10}
                  className={`text-white/50 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Panel dropdown */}
              {dropdownOpen && (
                <div
                  className="
                    absolute right-0 top-[calc(100%+10px)] w-60
                    bg-[#1C0E06]/98 backdrop-blur-xl
                    border border-white/10
                    rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)]
                    overflow-hidden
                    animate-in fade-in slide-in-from-top-2 duration-200
                  "
                >
                  {/* Cabecera usuario */}
                  <div className="px-4 py-3 border-b border-white/8">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E8622A] to-amber-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                        {user.nombre?.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{user.nombre}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E8622A]/20 text-[#E8622A] text-[10px] font-semibold mt-0.5 border border-[#E8622A]/30">
                          {user.rol || 'Usuario'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Opciones */}
                  <div className="p-2 space-y-0.5">
                    {user.rol === 'administrador' ? (
                      <button
                        type="button"
                        onClick={() => { navigate('/dashboard'); setDropdownOpen(false); }}
                        className="
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                          text-white/75 hover:text-white hover:bg-white/8
                          text-sm font-medium
                          transition-all duration-200 text-left
                        "
                      >
                        <FaTachometerAlt size={14} className="text-[#E8622A] shrink-0" />
                        Dashboard
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => { navigate('/mi-comercio'); setDropdownOpen(false); }}
                        className="
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                          text-white/75 hover:text-white hover:bg-white/8
                          text-sm font-medium
                          transition-all duration-200 text-left
                        "
                      >
                        <FaStore size={14} className="text-[#E8622A] shrink-0" />
                        Mi Comercio
                      </button>
                    )}

                    <div className="h-px bg-white/8 my-1" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                        text-red-400 hover:text-red-300 hover:bg-red-500/10
                        text-sm font-medium
                        transition-all duration-200 text-left
                      "
                    >
                      <FaSignOutAlt size={14} className="shrink-0" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};
