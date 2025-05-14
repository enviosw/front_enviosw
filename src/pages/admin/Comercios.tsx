import React from 'react'
import TablaComercios from '../../features/comercios/TablaComercios'

const Comercios: React.FC = () => {
    return (
        <div className='w-full'>

            <h1 className="text-3xl font-bold mb-6 text-gray-800">Comercios</h1>

            <TablaComercios />
        </div>
    )
}

export default Comercios