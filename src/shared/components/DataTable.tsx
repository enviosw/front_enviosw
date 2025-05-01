import React from 'react';

interface DataTableProps<T> {
    headers: string[];
    data: T[];
    renderRow: (item: T, isSelected: boolean, toggleSelect: () => void) => React.ReactNode;
    allSelected?: boolean;
    toggleSelectAll?: () => void;
}

const DataTable = <T,>({
    headers,
    data,
    renderRow,
    allSelected,
    toggleSelectAll
}: DataTableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-[#F8F8F8] rounded-t-md overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-2">
                            <input type="checkbox" className="checkbox" checked={allSelected} onChange={toggleSelectAll} />
                        </th>
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
                    {data.map((item: any) => {
                        const isSelected = allSelected || item.selected;
                        return renderRow(item, isSelected, () => item.toggle());
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
