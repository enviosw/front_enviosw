import React, { useState } from 'react';
import { FaWhatsapp, FaMapMarkerAlt, FaPhone, FaShoppingCart } from 'react-icons/fa';

interface ComprasFormProps {
  tipoString: string;
}

const ComprasForm: React.FC<ComprasFormProps> = ({ tipoString }) => {
  const [formData, setFormData] = useState({
    listaCompras: '',
    direccionEntrega: '',
    telefonoEntrega: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (tipoString !== 'compras') return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.listaCompras.trim())
      newErrors.listaCompras = 'Describe qué necesitas comprar.';
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

    const numeroWhatsApp = '3171530428';
    const mensaje =
      `*PEDIDO* desde la pagina\n\n` +
      `🛒 ¡Hola! Me gustaría realizar una compra:\n\n` +
      `🛍️ Lista de Compras: ${formData.listaCompras}\n` +
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
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl shrink-0">
          🛒
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#1A1208] leading-tight">Compras</h2>
          <p className="text-xs text-[#6B5E52]">Dinos qué necesitas y te lo llevamos</p>
        </div>
      </div>

      <form
        className="bg-white border border-[#EDE8E3] rounded-2xl p-5 shadow-sm space-y-4"
        onSubmit={e => { e.preventDefault(); handleSubmit(); }}
        noValidate
      >
        {/* Lista de compras */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1208] mb-1.5">
            <FaShoppingCart className="text-[#E8622A]" size={13} />
            Lista de Compras
          </label>
          <textarea
            name="listaCompras"
            value={formData.listaCompras}
            onChange={handleChange}
            placeholder="Ej: 2 litros de leche, 1 kg de arroz, jabón de manos..."
            rows={4}
            className={`
              w-full px-4 py-3 rounded-xl text-sm font-medium text-[#1A1208]
              border-2 bg-[#FAFAF7] placeholder:text-[#6B5E52]/50
              focus:outline-none focus:bg-white resize-none
              transition-all duration-200
              ${errors.listaCompras
                ? 'border-red-400 focus:border-red-400'
                : 'border-[#EDE8E3] focus:border-[#E8622A]'}
            `}
          />
          {errors.listaCompras && (
            <p className="text-xs text-red-500 mt-1">⚠ {errors.listaCompras}</p>
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
              placeholder="Dirección para entregar"
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
          Confirmar Compra por WhatsApp
        </button>
      </form>
    </div>
  );
};

export default ComprasForm;
