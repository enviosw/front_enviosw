import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaSync } from "react-icons/fa";
import DataTable from "../../shared/components/DataTable";
import TableCell from "../../shared/components/TableCell";
import { AlertService } from "../../utils/AlertService";
import { useSumasHoyPorDomiciliario } from "../../services/preciosServices";

const currency = (v: string | number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
    typeof v === "string" ? Number(v) : v
  );

const TablaSumasHoyPorDomiciliario: React.FC = () => {
  const { data, isLoading, isError, refetch } = useSumasHoyPorDomiciliario(true, false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isError) {
      AlertService.error("Error", "No se pudieron cargar las sumas de hoy");
    }
  }, [isError]);

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!search) return data;
    const s = search.toLowerCase().trim();
    return data.filter((d) => d.numero_domiciliario.toLowerCase().includes(s));
  }, [data, search]);

  const totalGeneral = useMemo(() => {
    return filtered.reduce((acc, item) => acc + Number(item.total), 0);
  }, [filtered]);

  const headers = ["Número domiciliario", "Total (hoy)"];

  const renderRow = (row: { numero_domiciliario: string; total: string }) => (
    <tr key={row.numero_domiciliario} className="hover:bg-gray-100 bg-white">
      <TableCell><p className="text-center font-mono">{row.numero_domiciliario}</p></TableCell>
      <TableCell><p className="text-center font-semibold">{currency(row.total)}</p></TableCell>
    </tr>
  );

  return (
    <div className="overflow-x-auto space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Sumas de hoy por domiciliario</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <FaSearch className="text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por número..."
              className="input input-bordered input-sm"
            />
          </div>
          <button className="btn btn-sm" onClick={() => refetch()}>
            <FaSync className="mr-2" /> Refrescar
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-blue-600">Cargando...</div>
      ) : (
        <>
          <DataTable
            headers={headers}
            data={filtered}
            renderRow={(row) => renderRow(row)}
            allSelected={false}
            toggleSelectAll={() => {}}
            multiOption={false}
          />

          <div className="flex justify-end">
            <div className="mt-2 px-3 py-2 bg-gray-50 border rounded-md text-sm">
              <span className="mr-2 text-gray-600">Total general:</span>
              <strong>{currency(totalGeneral)}</strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TablaSumasHoyPorDomiciliario;
