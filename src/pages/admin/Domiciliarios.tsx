import React from 'react'
import TablaDomiciliarios from '../../features/domiciliarios/TablaDomiciliarios'

const Domiciliarios: React.FC = () => {
  return (
       <section>
            
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Domiciliarios</h1>

            <TablaDomiciliarios />

        </section>
  )
}

export default Domiciliarios