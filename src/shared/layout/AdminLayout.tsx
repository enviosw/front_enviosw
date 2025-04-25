import React from 'react';
import Sidebar from '../components/Sidebar';
import { Contenido } from '../types/childrenInterface';
import { SidebarProvider } from '../../context/SidebarContext';
import Navbar from '../components/Navbar';

const AdminLayout: React.FC<Contenido> = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="flex max-w-full min-h-screen overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-y-auto h-screen p-4">
                    <Navbar />
                    {children}
                </div>
            </div>
        </SidebarProvider>


    );
};

export default AdminLayout;
