import React from 'react';
import Sidebar from '../components/Sidebar';
import { Contenido } from '../types/childrenInterface';
import { SidebarProvider } from '../../context/SidebarContext';
// import Navbar from '../components/Navbar';

const AdminLayout: React.FC<Contenido> = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="flex max-w-full min-h-screen overflow-hidden  bg-[#F7F7F7]">
                <Sidebar />
                <div className="flex-1 overflow-y-auto h-[95vh] p-10 mt-[5vh]  bg-[#FDFDFD] border-1 border-gray-300 rounded-tl-3xl">
                    {/* <Navbar /> */}
                    {children}
                </div>
            </div>
        </SidebarProvider>


    );
};

export default AdminLayout;
