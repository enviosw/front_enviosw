import React from 'react'
import { Navbar } from '../components/Navbar'
import Topvar from '../components/Topbar'

interface Contenido {
    children: React.ReactNode
}

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