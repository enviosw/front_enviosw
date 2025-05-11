import React from 'react';

interface TableCellProps {
  children: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ children }) => {
  return (
    <td className="px-6 py-1 text-sm text-gray-700 border-gray-300 border-b">
      {children}
    </td>
  );
};

export default TableCell;
