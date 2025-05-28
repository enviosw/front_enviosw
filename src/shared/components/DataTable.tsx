import React from 'react';

interface DataTableProps<T> {
    headers: string[];
    data: T[];
    renderRow: (item: T, isSelected: boolean, toggleSelect: () => void) => React.ReactNode;
    allSelected?: boolean;
    toggleSelectAll?: () => void;
    multiOption?: boolean;
}

const DataTable = <T,>({
    headers,
    data,
    renderRow,
    allSelected,
    toggleSelectAll,
    multiOption
}: DataTableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-[#F8F8F8] rounded-t-md overflow-hidden">
                <thead>
                    <tr className='bg-gray-800 text-white border-b'>
                        {
                            multiOption ?
                            <th className="px-2 py-0 h-10">
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="checkbox" 
                                        className="checkbox bg-white focus:bg-white focus:outline-none focus:ring-0" 
                                        checked={allSelected} 
                                        onChange={toggleSelectAll} 
                                    />
                                    <span className='text-sm'>ACCIONES</span>
                                </div>
                            </th>
                            : ''
                        }
                        
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 h-10 text-center text-sm font-semibold uppercase tracking-wider border-b"
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
