import React from 'react'
import TablaPublicidad from '../../features/publicidad/TablaPublicidad'

const Publicidad: React.FC = () => {
  return (
     <div className='w-full'>

            <h1 className="text-3xl font-bold mb-6 text-gray-800">Publicidad</h1>

            <TablaPublicidad />
        </div>
  )
}

export default Publicidad