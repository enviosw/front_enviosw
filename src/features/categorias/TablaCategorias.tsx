import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCategoriasPorComercio } from '../../services/categoriasServices';
import { useEliminarCategoria } from '../../services/categoriasServices';
import { CategoriaType } from '../../shared/types/categoriaInterface';
import { FaPen, FaTrashAlt, FaPlus } from 'react-icons/fa';
import DataTable from '../../shared/components/DataTable';
import TableCell from '../../shared/components/TableCell';
import { useModal } from '../../context/ModalContext';
import FormularioCategoria from './FormularioCategoria';
import Modal from '../../shared/components/Modal';
import { AlertService } from '../../utils/AlertService';


const TablaCategorias: React.FC = () => {
  const { user } = useAuth();
  const comercioId = user?.comercioId;

  const { data: categorias, isLoading, error } = useCategoriasPorComercio(comercioId);
  const [search, setSearch] = useState('');
  const [filteredCategorias, setFilteredCategorias] = useState<CategoriaType[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { openModal, setModalTitle, setModalContent } = useModal();
  const eliminarCategoriaMutation = useEliminarCategoria();

  useEffect(() => {
    if (!categorias) return;

    let filtered = categorias;

    if (search) {
      filtered = filtered.filter((cat) =>
        cat.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCategorias(filtered);
  }, [search, categorias]);

  const allSelected =
    filteredCategorias.length > 0 &&
    selectedIds.length === filteredCategorias.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCategorias.map((cat) => cat.id).filter((id) => id !== undefined) as number[]);
    }
  };

  const handleEliminarCategoria = async (categoriaId: number) => {
    // Confirmar antes de eliminar
    const confirmed = await AlertService.confirm('¿Estás seguro de eliminar esta categoría?', 'Esta acción no puede deshacerse.');
    if (confirmed) {
      eliminarCategoriaMutation.mutate(categoriaId);
    }
  };

  const openModalCategoria = (categoria?: CategoriaType) => {
    setModalTitle(categoria ? 'Actualizar Categoría' : 'Registrar Categoría');
    setModalContent(<FormularioCategoria categoria={categoria} />);
    openModal();
  };

  const renderRow = (categoria: CategoriaType) => (
    <tr key={categoria.id} className="hover:bg-gray-100 bg-white">
      
      <TableCell><p className="text-center">{categoria.id}</p></TableCell>
      <TableCell><p className="text-center">{categoria.nombre}</p></TableCell>
      <TableCell>
      <div className="text-center">
        <button
          onClick={() => openModalCategoria(categoria)}
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
          title="Editar"
        >
          <FaPen />
        </button>
        </div>
      </TableCell>
      <TableCell>
      <div className="text-center">
        <button
          onClick={() => handleEliminarCategoria(Number(categoria.id))} // Usar el nuevo método de eliminación
          className="text-red-600 hover:text-red-800 cursor-pointer"
          title="Eliminar"
        >
          <FaTrashAlt />
        </button>
        </div>
      </TableCell>
    </tr>
  );

  const headers = [
    'No.',
    'Categoría',
    'Editar',
    'Eliminar',
  ];

  const multiOption = false;

  return (
    <div className="overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <button onClick={() => openModalCategoria()} className="btn btn-success">
          <FaPlus className="mr-2" /> Registrar Categoría
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered input-sm"
        />
      </div>

      {/* Acción múltiple si hay selección */}
      {selectedIds.length > 0 && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-md flex items-center gap-2 text-sm mb-2">
          <span>{selectedIds.length} seleccionadas</span>
          <button
            onClick={() => console.log('Eliminar seleccionadas')}
            className="btn btn-xs btn-error"
          >
            Eliminar seleccionadas
          </button>
          <button
            onClick={() => setSelectedIds([])}
            className="text-red-500 hover:text-red-700 text-xs font-bold ml-1 cursor-pointer"
            title="Deseleccionar todo"
          >
            ✕
          </button>
        </div>
      )}

      {/* Tabla */}
      {isLoading ? (
        <div className="text-center text-blue-600">Cargando categorías...</div>
      ) : error ? (
        <div className="text-center text-red-600">Error: {(error as Error).message}</div>
      ) : (
        <DataTable
          headers={headers}
          data={filteredCategorias}
          renderRow={renderRow}
          allSelected={allSelected}
          toggleSelectAll={toggleSelectAll}
          multiOption={multiOption}
        />
      )}

      <Modal />
    </div>
  );
};

export default TablaCategorias;
