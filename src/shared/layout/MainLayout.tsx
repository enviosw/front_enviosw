import React from 'react'
import { Navbar } from '../../features/home/inicio/Navbar'
import Topvar from '../../features/home/inicio/Topbar'
import { Contenido } from '../types/childrenInterface'


const MainLayout: React.FC<Contenido> = ({ children }) => {
    return (
        <>
            <div className='w-full flex flex-col overflow-x-hidden'>
                <Topvar />
                <Navbar />
                {children}
            </div>
        </>
    )
}

export default MainLayout