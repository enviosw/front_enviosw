import React, { useEffect, useMemo, useState } from "react";
import { FaCalendarAlt, FaDownload, FaSearch } from "react-icons/fa";
import { useSumasPorDia } from "../../services/preciosServices";
import DataTable from "../../shared/components/DataTable";
import TableCell from "../../shared/components/TableCell";
import { AlertService } from "../../utils/AlertService";

const currency = (v: string | number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
    typeof v === "string" ? Number(v) : v
  );

const toCsv = (rows: { dia: string; total: string }[]) => {
  const head = ["dia", "total"];
  const body = rows.map((r) => [r.dia, r.total]);
  const all = [head, ...body].map((arr) => arr.join(",")).join("\n");
  return new Blob([all], { type: "text/csv;charset=utf-8;" });
};

const SumasPorDia: React.FC = () => {
  // por defecto, vacío → el backend devuelve solo el día actual (America/Bogota)
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [search, setSearch] = useState(""); // buscar por YYYY-MM-DD exacto o parcial

  const { data, isLoading, isError, refetch } = useSumasPorDia(
    {
      start: start || undefined,
      end: end || undefined,
    },
    true,
    false
  );

  useEffect(() => {
    if (isError) {
      AlertService.error("Error", "No se pudieron cargar las sumas por día");
    }
  }, [isError]);

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!search) return data;
    const s = search.trim();
    return data.filter((d) => d.dia.includes(s));
  }, [data, search]);

  const totalRango = useMemo(
    () => filtered.reduce((acc, item) => acc + Number(item.total), 0),
    [filtered]
  );

  const headers = ["Día (America/Bogota)", "Total del día"];

  const renderRow = (row: { dia: string; total: string }) => (
    <tr key={row.dia} className="hover:bg-gray-100 bg-white">
      <TableCell><p className="text-center">{row.dia}</p></TableCell>
      <TableCell><p className="text-center font-semibold">{currency(row.total)}</p></TableCell>
    </tr>
  );

  const handleExport = () => {
    const blob = toCsv(filtered);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const name = `sumas-por-dia${start ? `_${start}` : ""}${end ? `_${end}` : ""}.csv`;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-x-auto space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Sumas por día</h2>

        <div className="flex flex-wrap items-end gap-2">
          <label className="text-sm text-gray-600 flex items-center gap-2">
            <FaCalendarAlt />
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="input input-bordered input-sm"
            />
          </label>

          <label className="text-sm text-gray-600 flex items-center gap-2">
            <FaCalendarAlt />
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="input input-bordered input-sm"
            />
          </label>

          <button className="btn btn-sm" onClick={() => refetch()}>
            Aplicar
          </button>

          <button className="btn btn-sm btn-outline" onClick={handleExport} title="Exportar CSV">
            <FaDownload className="mr-2" />
            Exportar
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <FaSearch className="text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por fecha (YYYY-MM-DD)..."
          className="input input-bordered input-sm"
        />
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
              <span className="mr-2 text-gray-600">Total en rango:</span>
              <strong>{currency(totalRango)}</strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SumasPorDia;
