import React from 'react'
import TablaUsuarios from '../../features/usuarios/TablaUsuarios'

const Usuarios: React.FC = () => {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Usuarios</h1>

            <TablaUsuarios />
        </>
    )
}

export default Usuarios