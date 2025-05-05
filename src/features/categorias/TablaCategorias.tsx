import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';  // Asegúrate de que tienes acceso al contexto de Auth
import { useCategoriasPorComercio } from '../../services/categoriasServices';
import { CategoriaType } from '../../shared/types/categoriaInterface';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import DataTable from '../../shared/components/DataTable';
import TableCell from '../../shared/components/TableCell';  // Asegúrate de que este componente esté disponible

const TablaCategorias: React.FC = () => {
  // Obtener el ID del comercio desde el contexto de autenticación
  const { user } = useAuth();
  const comercioId = user?.comercioId;

  const { data: categorias, isLoading, error } = useCategoriasPorComercio(comercioId);
  const [search, setSearch] = useState<string>('');
  const [estado, setEstado] = useState<string>('');
  const [filteredCategorias, setFilteredCategorias] = useState<CategoriaType[]>([]);

  // Filtrar las categorías en función de la búsqueda y el estado
  useEffect(() => {
    if (!categorias) return;

    let filteredData = categorias;

    if (search) {
      filteredData = filteredData.filter(categoria =>
        categoria.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (estado) {
      filteredData = filteredData.filter(categoria => categoria.estado === estado);
    }

    setFilteredCategorias(filteredData);
  }, [search, estado, categorias]);

  const renderRow = (categoria: CategoriaType) => (
    <tr key={categoria.id} className="hover:bg-gray-100 bg-white">
      <TableCell>{categoria.nombre}</TableCell>
      <TableCell>{categoria.descripcion}</TableCell>
      <TableCell>{categoria.estado}</TableCell>
      <TableCell>
        <button onClick={() => alert(`Editar categoría ${categoria.nombre}`)} className="text-blue-600 hover:text-blue-800">
          <FaPen />
        </button>
      </TableCell>
      <TableCell>
        <button onClick={() => alert(`Eliminar categoría ${categoria.nombre}`)} className="text-red-600 hover:text-red-800">
          <FaTrashAlt />
        </button>
      </TableCell>
    </tr>
  );

  if (isLoading) {
    return <div className="text-center text-blue-600">Cargando categorías...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error al cargar categorías: {(error as Error).message}</div>;
  }

  const headers = [
    'Nombre',
    'Descripción',
    'Estado',
    'Acciones',
    'Eliminar',
  ];

  return (
    <div className="overflow-x-auto space-y-4">
      {/* Filtros */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered input-sm"
        />
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="select select-bordered input-sm"
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      {/* DataTable para mostrar las categorías */}
      <DataTable
        headers={headers}
        data={filteredCategorias}
        renderRow={renderRow}
      />
    </div>
  );
};

export default TablaCategorias;
