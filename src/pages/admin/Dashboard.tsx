import React from 'react';
import { FaUsers, FaStore, FaMotorcycle, FaBoxOpen } from 'react-icons/fa';

const stats = [
  { label: 'Clientes', value: 1240, icon: FaUsers },
  { label: 'Comercios', value: 42, icon: FaStore },
  { label: 'Domicilios hoy', value: 312, icon: FaMotorcycle },
  { label: 'Órdenes activas', value: 86, icon: FaBoxOpen },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen p-0 lg:p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel de Administración</h1>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between hover:shadow-xl transition"
          >
            <div>
              <h2 className="text-sm text-gray-500">{label}</h2>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
            <Icon className="w-8 h-8 text-indigo-500" />
          </div>
        ))}
      </div>

      {/* Gráfico falso */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Órdenes por día</h2>
        <div className="flex items-end justify-between h-40">
          {[100, 70, 50, 80, 65, 95, 40].map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-6 bg-indigo-500 rounded-t-xl"
                style={{ height: `${val}px` }}
              ></div>
              <span className="text-xs mt-2 text-gray-500">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla de órdenes */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Últimas órdenes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 px-4">Cliente</th>
                <th className="py-2 px-4">Comercio</th>
                <th className="py-2 px-4">Estado</th>
                <th className="py-2 px-4">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Juan Pérez', 'Farmacia Central', 'Entregado', '2025-05-04'],
                ['Luisa Gómez', 'Restaurante Sabor', 'En camino', '2025-05-04'],
                ['Carlos Ruiz', 'Minimarket 24H', 'Pendiente', '2025-05-03'],
              ].map(([cliente, comercio, estado, fecha], i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-4">{cliente}</td>
                  <td className="py-2 px-4">{comercio}</td>
                  <td className={`py-2 px-4 font-medium ${estado === 'Entregado' ? 'text-green-600' : estado === 'En camino' ? 'text-yellow-600' : 'text-red-500'}`}>
                    {estado}
                  </td>
                  <td className="py-2 px-4">{fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
