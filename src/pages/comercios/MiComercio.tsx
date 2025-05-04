import React from 'react'
import TablaProductos from '../../features/productos/TablaProductos'

const MiComercio: React.FC = () => {
    return (
        <>

            {/* name of each tab group should be unique */}
            <div className="tabs tabs-border">
                <input type="radio" name="my_tabs_2" className="tab" aria-label="Productos" defaultChecked />
                <div className="tab-content border-base-300 bg-base-100 p-10">

                    <TablaProductos />

                </div>

                <input type="radio" name="my_tabs_2" className="tab" aria-label="Categorias" />
                <div className="tab-content border-base-300 bg-base-100 p-10">



                </div>
                {/* 
                <input type="radio" name="my_tabs_2" className="tab" aria-label="Tab 3" />
                <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 3</div> */}
            </div>



        </>
    )
}

export default MiComercio