import React from 'react';

interface DataTableProps<T> {
    headers: string[];
    data: T[];
    renderRow: (item: T) => React.ReactNode;
}

const DataTable = <T,>({ headers, data, renderRow }: DataTableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-[#F8F8F8] rounded-t-md overflow-hidden">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 bg-[#E63946] h-10 text-white text-left text-sm font-semibold uppercase tracking-wider border-b"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderRow)}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
