// TablaProductos.tsx
import React, { useState } from 'react';
import { useProductos } from '../../services/productosServices';
import { formatDate } from '../../utils/formatearFecha';
import { useModal } from '../../context/ModalContext';
import DataTable from '../../shared/components/DataTable';
import TableCell from '../../shared/components/TableCell';
import Modal from '../../shared/components/Modal';
import FormularioProductos from './FormularioProductos';
import { FaPen, FaRegCheckSquare } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { formatMiles } from '../../utils/numberFormat';

const TablaProductos: React.FC = () => {

    const {user} = useAuth()
    const comercioId = user?.comercioId || 0

    
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ search: '', estado: '', categoriaId: undefined });
  const [appliedFilters, setAppliedFilters] = useState({ ...filters });
  const { openModal, setModalTitle, setModalContent } = useModal();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);



  const { data: productos, isLoading, error } = useProductos({ page, ...appliedFilters, comercioId: comercioId });

  const headers = ['ID', 'Acciones', 'Nombre', 'Descripción', 'Precio', 'Estado', 'Unidad', 'Fecha', 'Categoría', 'Comercio'];

  const openCustomModal = (producto?: any) => {
    const isEdit = !!producto;
    const key = isEdit ? `edit-${producto.id}` : `create-${Date.now()}`;
    setModalTitle(isEdit ? 'Actualizar Producto' : 'Registrar Producto');
    setModalContent(<FormularioProductos key={key} producto={producto} />);
    openModal();
  };
  
  const allSelected = !!productos?.data && productos.data.length > 0 && selectedIds.length === productos.data.length;
  
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(productos?.data.map((p) => p.id) || []);
    }
  };

  const renderRow = (producto: any) => (
    <tr key={producto.id} className="hover:bg-gray-100 bg-white">
       
      <TableCell>{producto.id}</TableCell>
      <TableCell>
        <button onClick={() => openCustomModal(producto)}><FaPen /></button>
      </TableCell>
      <TableCell>{producto.nombre}</TableCell>
      <TableCell>{producto.descripcion}</TableCell>
      <TableCell>{formatMiles(producto.precio)}</TableCell>
      <TableCell>{producto.estado}</TableCell>
      <TableCell>{producto.unidad}</TableCell>
      <TableCell>{formatDate(producto.fecha_creacion)}</TableCell>
      <TableCell>{producto.categoria?.nombre}</TableCell>
      <TableCell>{producto.comercio?.nombre_comercial}</TableCell>
    </tr>
  );

  const multiOption = false;

  return (
    <div className="overflow-x-auto space-y-4">
      <div className="flex gap-3">
        <button onClick={() => openCustomModal()} className="btn btn-success">
          <FaRegCheckSquare className="mr-2" /> Registrar Producto
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-end">
        <input
          type="text"
          placeholder="Buscar..."
          value={filters.search}
          onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="input input-bordered input-sm"
        />
        <select
          value={filters.estado}
          onChange={e => setFilters(prev => ({ ...prev, estado: e.target.value }))}
          className="select select-sm"
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <button onClick={() => { setAppliedFilters({ ...filters }); setPage(1); }} className="btn btn-sm btn-primary">
          Filtrar
        </button>
        <button onClick={() => { const reset = { search: '', estado: '', categoriaId: undefined, comercioId: undefined }; setFilters(reset); setAppliedFilters(reset); setPage(1); }} className="btn btn-sm btn-secondary">
          Limpiar
        </button>
      </div>

      {isLoading ? (
        <div className="text-center">Cargando productos...</div>
      ) : error ? (
        <p className="text-red-600">Error: {(error as Error).message}</p>
      ) : (
        <>
          <DataTable
            headers={headers}
            data={productos?.data ?? []}
            renderRow={renderRow}
            allSelected={allSelected}
            toggleSelectAll={toggleSelectAll}
            multiOption={multiOption}
          />
          <div className="join mt-4">
            <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="btn join-item">Anterior</button>
            <button className="btn join-item btn-disabled">{page} / {productos?.lastPage}</button>
            <button onClick={() => setPage(page + 1)} disabled={page >= (productos?.lastPage ?? 1)} className="btn join-item">Siguiente</button>
          </div>
        </>
      )}
      <Modal />
    </div>
  );
};

export default TablaProductos;
