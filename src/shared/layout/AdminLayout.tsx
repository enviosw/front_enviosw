import React from 'react';
import Sidebar from '../components/Sidebar';
import { Contenido } from '../types/childrenInterface';
import { SidebarProvider } from '../../context/SidebarContext';
// import Navbar from '../components/Navbar';

const AdminLayout: React.FC<Contenido> = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="flex max-w-full h-dvh relative bg-[#eeeeee]">
                <Sidebar />
                {/* <div className="flex-1 overflow-y-auto h-[95vh] p-10 mt-[5vh]  bg-[#FDFDFD] border-1 border-gray-300 rounded-tl-3xl"> */}
                <div className="w-full bg-white p-6 overflow-y-auto rounded-lg m-2">
                    {/* <Navbar /> */}
                    {children}
                </div>
            </div>
        </SidebarProvider>


    );
};

export default AdminLayout;
