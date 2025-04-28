import React, { useState } from 'react';
import { TipoServicios } from '../../../shared/types/tipos';
import InputField from '../../../shared/components/InputField';

const normalizeString = (str: string): string => {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
};

const TipoServicio: React.FC<TipoServicios> = ({ tipo }) => {
  const tipoString = normalizeString(String(tipo));

  const [formData, setFormData] = useState({
    direccionRecoger: '',
    telefonoRecoger: '',
    direccionEntrega: '',
    telefonoEntrega: '',
    listaCompras: '',
    descripcionTramite: '',
    direccionRecogidaPago: '',
    telefonoRecogidaPago: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
};



  return (
    <div className="space-y-8 w-full p-6 bg-gray-50 rounded-lg shadow">
      {tipoString === 'recogidas' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Recogidas 🛵</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Dirección de Recoger"
              name="direccionRecoger"
              value={formData.direccionRecoger}
              onChange={handleChange}
              placeholder="¿Dónde recogemos?"
            />
            <InputField
              label="Teléfono de Recoger"
              name="telefonoRecoger"
              value={formData.telefonoRecoger}
              onChange={handleChange}
              placeholder="Teléfono contacto"
            />
            <InputField
              label="Dirección de Entrega"
              name="direccionEntrega"
              value={formData.direccionEntrega}
              onChange={handleChange}
              placeholder="¿Dónde entregamos?"
            />
            <InputField
              label="Teléfono de Entrega"
              name="telefonoEntrega"
              value={formData.telefonoEntrega}
              onChange={handleChange}
              placeholder="Teléfono destino"
            />
          </form>
        </div>
      )}

      {tipoString === 'compras' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Compras 🛒</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Lista de Compras"
              name="listaCompras"
              value={formData.listaCompras}
              onChange={handleChange}
              placeholder="¿Qué necesitas comprar?"
            />
            <InputField
              label="Dirección de Entrega"
              name="direccionEntrega"
              value={formData.direccionEntrega}
              onChange={handleChange}
              placeholder="Dirección para entregar"
            />
            <InputField
              label="Teléfono de Entrega"
              name="telefonoEntrega"
              value={formData.telefonoEntrega}
              onChange={handleChange}
              placeholder="Teléfono de contacto"
            />
          </form>
        </div>
      )}

      {tipoString === 'tramites' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Trámites 🖥</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Descripción del Trámite"
              name="descripcionTramite"
              value={formData.descripcionTramite}
              onChange={handleChange}
              placeholder="Explica el trámite que necesitas"
            />
            <InputField
              label="Dirección de Entrega"
              name="direccionEntrega"
              value={formData.direccionEntrega}
              onChange={handleChange}
              placeholder="Dirección final"
            />
            <InputField
              label="Teléfono de Entrega"
              name="telefonoEntrega"
              value={formData.telefonoEntrega}
              onChange={handleChange}
              placeholder="Teléfono de contacto"
            />
          </form>
        </div>
      )}

      {tipoString === 'pagos' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Pagos 💰</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Dirección de Recogida"
              name="direccionRecogidaPago"
              value={formData.direccionRecogidaPago}
              onChange={handleChange}
              placeholder="¿Dónde recogemos el dinero?"
            />
            <InputField
              label="Teléfono de Recogida"
              name="telefonoRecogidaPago"
              value={formData.telefonoRecogidaPago}
              onChange={handleChange}
              placeholder="Teléfono contacto"
            />
          </form>
        </div>
      )}

      {tipoString === 'envios' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Envíos 📦</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Dirección de Recoger"
              name="direccionRecoger"
              value={formData.direccionRecoger}
              onChange={handleChange}
              placeholder="¿Dónde recogemos el envío?"
            />
            <InputField
              label="Teléfono de Recoger"
              name="telefonoRecoger"
              value={formData.telefonoRecoger}
              onChange={handleChange}
              placeholder="Teléfono contacto"
            />
            <InputField
              label="Dirección de Entrega"
              name="direccionEntrega"
              value={formData.direccionEntrega}
              onChange={handleChange}
              placeholder="¿Dónde entregamos el envío?"
            />
            <InputField
              label="Teléfono de Entrega"
              name="telefonoEntrega"
              value={formData.telefonoEntrega}
              onChange={handleChange}
              placeholder="Teléfono destino"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default TipoServicio;
