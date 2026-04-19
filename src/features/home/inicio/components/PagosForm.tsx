import React, { useState } from 'react';
import { FaWhatsapp, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

interface PagosFormProps {
  tipoString: string;
}

const PagosForm: React.FC<PagosFormProps> = ({ tipoString }) => {
  const [formData, setFormData] = useState({
    direccionRecogidaPago: '',
    telefonoRecogidaPago: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (tipoString !== 'pagos') return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.direccionRecogidaPago.trim())
      newErrors.direccionRecogidaPago = 'Por favor ingresa la dirección de recogida.';
    if (!formData.telefonoRecogidaPago.trim())
      newErrors.telefonoRecogidaPago = 'Por favor ingresa el teléfono de contacto.';
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
      `💰¡Hola! Me gustaría solicitar el servicio de pagos:\n\n` +
      `🛵📍Dirección de Recogida: ${formData.direccionRecogidaPago}\n` +
      `📞 Teléfono: ${formData.telefonoRecogidaPago}`;

    const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full">
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl shrink-0">
          💰
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#1A1208] leading-tight">Trámite de Pagos</h2>
          <p className="text-xs text-[#6B5E52]">Completa los datos y te contactamos</p>
        </div>
      </div>

      <form
        className="bg-white border border-[#EDE8E3] rounded-2xl p-5 shadow-sm space-y-4"
        onSubmit={e => { e.preventDefault(); handleSubmit(); }}
        noValidate
      >
        {/* Dirección de recogida */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1208] mb-1.5">
            <FaMapMarkerAlt className="text-[#E8622A]" size={13} />
            Dirección de Recogida
          </label>
          <input
            type="text"
            name="direccionRecogidaPago"
            value={formData.direccionRecogidaPago}
            onChange={handleChange}
            placeholder="¿Dónde recogemos el dinero?"
            className={`
              w-full px-4 py-3 rounded-xl text-sm font-medium text-[#1A1208]
              border-2 bg-[#FAFAF7] placeholder:text-[#6B5E52]/50
              focus:outline-none focus:bg-white
              transition-all duration-200
              ${errors.direccionRecogidaPago
                ? 'border-red-400 focus:border-red-400'
                : 'border-[#EDE8E3] focus:border-[#E8622A]'}
            `}
          />
          {errors.direccionRecogidaPago && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <span>⚠</span> {errors.direccionRecogidaPago}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1208] mb-1.5">
            <FaPhone className="text-[#E8622A]" size={12} />
            Teléfono de Contacto
          </label>
          <input
            type="tel"
            name="telefonoRecogidaPago"
            value={formData.telefonoRecogidaPago}
            onChange={handleChange}
            placeholder="Número de contacto"
            className={`
              w-full px-4 py-3 rounded-xl text-sm font-medium text-[#1A1208]
              border-2 bg-[#FAFAF7] placeholder:text-[#6B5E52]/50
              focus:outline-none focus:bg-white
              transition-all duration-200
              ${errors.telefonoRecogidaPago
                ? 'border-red-400 focus:border-red-400'
                : 'border-[#EDE8E3] focus:border-[#E8622A]'}
            `}
          />
          {errors.telefonoRecogidaPago && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <span>⚠</span> {errors.telefonoRecogidaPago}
            </p>
          )}
        </div>

        {/* Botón WhatsApp */}
        <button
          type="submit"
          className="
            w-full flex items-center justify-center gap-2
            bg-[#25D366] hover:bg-[#1EB555] text-white
            font-bold text-sm py-3.5 rounded-xl mt-2
            shadow-[0_4px_16px_rgba(37,211,102,0.35)]
            hover:shadow-[0_6px_24px_rgba(37,211,102,0.5)]
            transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
            focus:outline-none focus:ring-2 focus:ring-[#25D366]/50
          "
        >
          <FaWhatsapp size={18} />
          Confirmar Servicio por WhatsApp
        </button>
      </form>
    </div>
  );
};

export default PagosForm;
