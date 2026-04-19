import React, { useState } from 'react';
import { FaWhatsapp, FaMapMarkerAlt, FaPhone, FaClipboardList } from 'react-icons/fa';

interface TramitesFormProps {
  tipoString: string;
}

const TramitesForm: React.FC<TramitesFormProps> = ({ tipoString }) => {
  const [formData, setFormData] = useState({
    descripcionTramite: '',
    direccionEntrega: '',
    telefonoEntrega: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (tipoString !== 'envios') return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.descripcionTramite.trim())
      newErrors.descripcionTramite = 'Describe el trámite o envío que necesitas.';
    if (!formData.direccionEntrega.trim())
      newErrors.direccionEntrega = 'Ingresa la dirección de entrega.';
    if (!formData.telefonoEntrega.trim())
      newErrors.telefonoEntrega = 'Ingresa el teléfono de contacto.';
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
      `📦 ¡Hola! Me gustaría realizar un trámite:\n\n` +
      `🔧 Descripción del Trámite: ${formData.descripcionTramite}\n` +
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
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl shrink-0">
          📦
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#1A1208] leading-tight">Envíos y Trámites</h2>
          <p className="text-xs text-[#6B5E52]">Describe tu trámite y te ayudamos</p>
        </div>
      </div>

      <form
        className="bg-white border border-[#EDE8E3] rounded-2xl p-5 shadow-sm space-y-4"
        onSubmit={e => { e.preventDefault(); handleSubmit(); }}
        noValidate
      >
        {/* Descripción del trámite */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1208] mb-1.5">
            <FaClipboardList className="text-[#E8622A]" size={13} />
            Descripción del Trámite o Envío
          </label>
          <textarea
            name="descripcionTramite"
            value={formData.descripcionTramite}
            onChange={handleChange}
            placeholder="Explica el envío o trámite que necesitas realizar..."
            rows={4}
            className={`
              w-full px-4 py-3 rounded-xl text-sm font-medium text-[#1A1208]
              border-2 bg-[#FAFAF7] placeholder:text-[#6B5E52]/50
              focus:outline-none focus:bg-white resize-none
              transition-all duration-200
              ${errors.descripcionTramite
                ? 'border-red-400 focus:border-red-400'
                : 'border-[#EDE8E3] focus:border-[#E8622A]'}
            `}
          />
          {errors.descripcionTramite && (
            <p className="text-xs text-red-500 mt-1">⚠ {errors.descripcionTramite}</p>
          )}
        </div>

        {/* Dirección y teléfono */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1208] mb-1.5">
              <FaMapMarkerAlt className="text-[#E8622A]" size={13} />
              Dirección de Entrega
            </label>
            <input
              type="text"
              name="direccionEntrega"
              value={formData.direccionEntrega}
              onChange={handleChange}
              placeholder="Dirección final"
              className={inputClass('direccionEntrega')}
            />
            {errors.direccionEntrega && (
              <p className="text-xs text-red-500 mt-1">⚠ {errors.direccionEntrega}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1208] mb-1.5">
              <FaPhone className="text-[#E8622A]" size={12} />
              Teléfono de Contacto
            </label>
            <input
              type="tel"
              name="telefonoEntrega"
              value={formData.telefonoEntrega}
              onChange={handleChange}
              placeholder="Teléfono de contacto"
              className={inputClass('telefonoEntrega')}
            />
            {errors.telefonoEntrega && (
              <p className="text-xs text-red-500 mt-1">⚠ {errors.telefonoEntrega}</p>
            )}
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
          Confirmar Envío por WhatsApp
        </button>
      </form>
    </div>
  );
};

export default TramitesForm;
