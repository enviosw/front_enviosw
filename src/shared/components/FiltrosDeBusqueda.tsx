import React from "react";

interface Filtros {
    search: string;
    fechaInicio:string;
    fechaFin:string;
    estado: string;
    [key: string]: any; // si tiene más claves opcionales
  }

interface FiltrosDeBusquedaProps {
    filters: Filtros;
    setFilters: React.Dispatch<React.SetStateAction<Filtros>>;
}

const FiltrosDeBusqueda: React.FC<FiltrosDeBusquedaProps> = ({ filters, setFilters}) => {
    return (
        <>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Filtros de Búsqueda</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Buscador</label>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={filters.search}
                        onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        className="input input-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <select
                        value={filters.estado}
                        onChange={e => setFilters(prev => ({ ...prev, estado: e.target.value }))}
                        className="select select-sm"
                    >
                        <option value="">Todos los estados</option>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>                    </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Inicio</label>
                    <input
                        type="date"
                        value={filters.fechaInicio}
                        onChange={e => setFilters(prev => ({ ...prev, fechaInicio: e.target.value }))}
                        className="input input-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fin</label>
                    <input
                        type="date"
                        value={filters.fechaFin}
                        onChange={e => setFilters(prev => ({ ...prev, fechaFin: e.target.value }))}
                        className="input input-sm"
                    />
                </div>
            </div>
        </>
    )
};

export default FiltrosDeBusqueda;