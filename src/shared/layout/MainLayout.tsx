import React from 'react';
import { Navbar } from '../../features/home/inicio/Navbar';
import { Contenido } from '../types/childrenInterface';

const MainLayout: React.FC<Contenido> = ({ children }) => {
  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <div className="w-full overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
