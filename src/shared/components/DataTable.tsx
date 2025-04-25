import React, { useState } from 'react';

interface DataTableProps<T> {
    headers: string[];
    data: T[];
    renderRow: (item: T) => React.ReactNode;
}

const DataTable = <T,>({ headers, data, renderRow }: DataTableProps<T>) => {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Paginación
    const startIndex = (page - 1) * rowsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

    // Manejo de página
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= Math.ceil(data.length / rowsPerPage)) {
            setPage(newPage);
        }
    };

    // Manejo de filas por página
    const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1); // Resetear la página
    };

    return (
       <div>
         <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-t-md overflow-hidden">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 bg-sky-700 text-white text-left text-sm font-semibold uppercase tracking-wider border-b"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{paginatedData.map(renderRow)}</tbody>
            </table>

            {/* Paginación */}
           
        </div>

<div className="flex justify-between items-center mt-4">
<div className="flex items-center">
    <span className="mr-2">Filas por página:</span>
    <select
        value={rowsPerPage}
        onChange={handleRowsPerPageChange}
        className="px-4 py-2 border rounded-lg"
    >
        {[5, 10, 15, 20].map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>
</div>
<div>
    <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
    >
        Anterior
    </button>
    <span className="mx-2">{page}</span>
    <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === Math.ceil(data.length / rowsPerPage)}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
    >
        Siguiente
    </button>
</div>
</div>
       </div>
    );
};

export default DataTable;
