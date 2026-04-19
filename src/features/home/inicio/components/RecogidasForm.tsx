import React, { useState } from 'react';
import { FaWhatsapp, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

interface RecogidasFormProps {
  tipoString: string;
}

const RecogidasForm: React.FC<RecogidasFormProps> = ({ tipoString }) => {
  const [formData, setFormData] = useState({
    direccionRecoger: '',
    telefonoRecoger: '',
    direccionEntrega: '',
    telefonoEntrega: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (tipoString !== 'recogidas') return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.direccionRecoger.trim())
      newErrors.direccionRecoger = 'Ingresa la dirección de recogida.';
    if (!formData.telefonoRecoger.trim())
      newErrors.telefonoRecoger = 'Ingresa el teléfono de recogida.';
    if (!formData.direccionEntrega.trim())
      newErrors.direccionEntrega = 'Ingresa la dirección de entrega.';
    if (!formData.telefonoEntrega.trim())
      newErrors.telefonoEntrega = 'Ingresa el teléfono de entrega.';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const numeroWhatsApp = '3134089563';
    const mensaje =
      `*PEDIDO* desde la pagina\n\n` +
      `🛵 ¡Hola! Quiero coordinar una recogida y entrega:\n\n` +
      `📍 Dirección de Recogida: ${formData.direccionRecoger}\n` +
      `📞 Teléfono de Recogida: ${formData.telefonoRecoger}\n\n` +
      `📍 Dirección de Entrega: ${formData.direccionEntrega}\n` +
      `📞 Teléfono de Entrega: ${formData.telefonoEntrega}`;

    const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const inputClass = (field: string) => `
    w-full px-4 py-3 rounded-xl text-sm font-medium text-[#1A1208]
    border-2 bg-[#FAFAF7] placeholder:text-[#6B5E52]/50
    focus:outline-none focus:bg-white
    transition-all duration-200
    ${errors[field]
      ? 'border-red-400 focus:border-red-400'
      : 'border-[#EDE8E3] focus:border-[#E8622A]'}
  `;

  return (
    <div className="w-full">
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl shrink-0">
          🛵
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#1A1208] leading-tight">Recogidas</h2>
          <p className="text-xs text-[#6B5E52]">Indica origen y destino de tu envío</p>
        </div>
      </div>

      <form
        className="bg-white border border-[#EDE8E3] rounded-2xl p-5 shadow-sm space-y-4"
        onSubmit={e => { e.preventDefault(); handleSubmit(); }}
        noValidate
      >
        {/* Sección recogida */}
        <div className="pb-3 border-b border-[#EDE8E3]">
          <p className="text-xs font-bold text-[#E8622A] uppercase tracking-wider mb-3">
            📍 Punto de recogida
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dirección recoger */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1208] mb-1.5">
                <FaMapMarkerAlt className="text-[#E8622A]" size={13} />
                Dirección de Recogida
              </label>
              <input
                type="text"
                name="direccionRecoger"
                value={formData.direccionRecoger}
                onChange={handleChange}
                placeholder="¿Dónde recogemos?"
                className={inputClass('direccionRecoger')}
              />
              {errors.direccionRecoger && (
                <p className="text-xs text-red-500 mt-1">⚠ {errors.direccionRecoger}</p>
              )}
            </div>

            {/* Teléfono recoger */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1208] mb-1.5">
                <FaPhone className="text-[#E8622A]" size={12} />
                Teléfono de Recogida
              </label>
              <input
                type="tel"
                name="telefonoRecoger"
                value={formData.telefonoRecoger}
                onChange={handleChange}
                placeholder="Teléfono contacto"
                className={inputClass('telefonoRecoger')}
              />
              {errors.telefonoRecoger && (
                <p className="text-xs text-red-500 mt-1">⚠ {errors.telefonoRecoger}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sección entrega */}
        <div>
          <p className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider mb-3">
            🏁 Punto de entrega
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dirección entrega */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1208] mb-1.5">
                <FaMapMarkerAlt className="text-[#2D6A4F]" size={13} />
                Dirección de Entrega
              </label>
              <input
                type="text"
                name="direccionEntrega"
                value={formData.direccionEntrega}
                onChange={handleChange}
                placeholder="¿Dónde entregamos?"
                className={inputClass('direccionEntrega')}
              />
              {errors.direccionEntrega && (
                <p className="text-xs text-red-500 mt-1">⚠ {errors.direccionEntrega}</p>
              )}
            </div>

            {/* Teléfono entrega */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1208] mb-1.5">
                <FaPhone className="text-[#2D6A4F]" size={12} />
                Teléfono de Entrega
              </label>
              <input
                type="tel"
                name="telefonoEntrega"
                value={formData.telefonoEntrega}
                onChange={handleChange}
                placeholder="Teléfono destino"
                className={inputClass('telefonoEntrega')}
              />
              {errors.telefonoEntrega && (
                <p className="text-xs text-red-500 mt-1">⚠ {errors.telefonoEntrega}</p>
              )}
            </div>
          </div>
        </div>

        {/* Botón WhatsApp */}
        <button
          type="submit"
          className="
            w-full flex items-center justify-center gap-2
            bg-[#25D366] hover:bg-[#1EB555] text-white
            font-bold text-sm py-3.5 rounded-xl mt-1
            shadow-[0_4px_16px_rgba(37,211,102,0.35)]
            hover:shadow-[0_6px_24px_rgba(37,211,102,0.5)]
            transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
            focus:outline-none focus:ring-2 focus:ring-[#25D366]/50
          "
        >
          <FaWhatsapp size={18} />
          Confirmar Recogida por WhatsApp
        </button>
      </form>
    </div>
  );
};

export default RecogidasForm;
