import React from "react";

const LinksTratamientoDeDatos: React.FC = () => {
    return (
        <aside id="text-2" className="widget f-full widget-small widget_text">
            <section className="textwidget">
                <ul className="list-none p-0 space-y-2">
                    <li>
                        <a 
                            href="/terminos-y-condiciones-domiciliosw" 
                            title="Términos y Condiciones de Uso de la Plataforma Domicilios W"
                            className="block py-2 px-4 text-gray-700 no-underline rounded-md hover:bg-gray-200 hover:text-gray-900 transition duration-150 ease-in-out"
                        >
                            Términos y Condiciones de Uso de la Plataforma Domicilios W
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/autorizacion-tratmiento-de-datos-personales-domiciliosw"
                            title="Autorización de Tratamiento de datos personales Usuarios – Domicilios W S.A.S."
                            className="block py-2 px-4 text-gray-700 no-underline rounded-md hover:bg-gray-200 hover:text-gray-900 transition duration-150 ease-in-out"
                        >
                            Autorización de Tratamiento de datos personales Usuarios – Domicilios W S.A.S.
                        </a>
                    </li>
                    <li className="current">
                        <a 
                            href="/politicas-de-privacidad"
                            title="Política de Tratamiento de Datos Personales (Política de Privacidad)"
                            className="block py-2 px-4 text-gray-700 no-underline rounded-md hover:bg-gray-200 hover:text-gray-900 transition duration-150 ease-in-out"
                        >
                            Política de Tratamiento de Datos Personales (Política de Privacidad)
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/politicas-de-cookies-domiciliosw"
                            title="Política de Cookies – Colombia"
                            className="block py-2 px-4 text-gray-700 no-underline rounded-md hover:bg-gray-200 hover:text-gray-900 transition duration-150 ease-in-out"
                        >
                            Política de Cookies – Colombia
                        </a>
                    </li>
                </ul>
            </section>
        </aside>
    );
};

export default LinksTratamientoDeDatos;