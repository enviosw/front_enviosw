import React from 'react'
import TablaClientes from '../../features/Clientes/TablaClientes';

const Clientes: React.FC = () => {

    return (
        <section>
            
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Clientes</h1>

            <TablaClientes />

        </section>
    )
}

export default Clientes