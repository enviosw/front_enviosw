import React, { useState } from 'react';

const RegistrarNegocioPage: React.FC = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        email: '',
        descripcion: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos del negocio:', formData);
        // Aquí puedes agregar la lógica para enviar los datos al backend
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 font-sans">


            {/* Contenedor principal de la página */}
            <div className="w-full max-w-8xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12 my-8">
                {/* Título de la página de registro de negocio */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center leading-tight">
                    Solicitud de Registro de Negocio
                </h1>

                <hr />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                    <section className="col-span-1 bg-gradient-to-br from-gray-500 to-gray-300 text-white p-6 rounded-lg mb-10">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 text-center">
                            Ventajas de Registrar tu Negocio
                        </h2>

                        <div className="grid gap-y-12">

                            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-lg md:text-xl font-bold text-green-600 mb-2 flex items-center">
                                    <svg className="w-7 h-7 mr-3 text-advantage-green" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                    Publicidad Gratuita
                                </h3>
                                <p className="text-gray-700 text-md">
                                    Al unirte a nuestra plataforma, tu negocio y tus productos serán promocionados sin costo adicional a nuestra creciente base de usuarios. ¡Más visibilidad para ti!
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-lg md:text-xl font-bold text-indigo-600 mb-2 flex items-center">
                                    <svg className="w-7 h-7 mr-3 text-advantage-indigo" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.5 14 6.357 14H13.5a.5.5 0 000-1H6.357c-.908 0-1.474-.464-1.75-1.25L4.72 10.5l1.474-1.473A1 1 0 007.5 8h4.5a2 2 0 002-2V4a2 2 0 00-2-2H9.809l-2.767 3.59A1.5 1.5 0 014.217 6H3zm2.76 8.204l-1.474 1.473A1 1 0 004.5 12h1.5a.5.5 0 000-1H4.5zm10.5 0l-1.474 1.473A1 1 0 0015.5 12h1.5a.5.5 0 000-1H15.5z" clipRule="evenodd"></path><path d="M15 14a1 1 0 100 2 1 1 0 000-2zm0 0l-1.474 1.473A1 1 0 0015.5 12h1.5a.5.5 0 000-1H15.5zM6 14a1 1 0 100 2 1 1 0 000-2zm0 0l-1.474 1.473A1 1 0 004.5 12h1.5a.5.5 0 000-1H4.5z"></path></svg>
                                    Vende tus Productos por Internet
                                </h3>
                                <p className="text-gray-700 text-md">
                                    Tendrás la capacidad de registrar tu catálogo de productos directamente en nuestra plataforma, permitiendo a los clientes realizar pedidos online de forma sencilla y segura.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-lg md:text-xl font-bold text-yellow-600 mb-2 flex items-center">
                                    <svg className="w-7 h-7 mr-3 text-advantage-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 9a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                    Tu Negocio y Productos Visibles
                                </h3>
                                <p className="text-gray-700 text-md">
                                    Tu negocio contará con una página dedicada dentro de nuestro sitio web, donde los usuarios podrán explorar tus productos, conocer tu oferta y realizar pedidos directamente.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-lg md:text-xl font-bold text-red-600 mb-2 flex items-center">
                                    <svg className="w-7 h-7 mr-3 text-advantage-red" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd"></path></svg>
                                    Prioridad en el Servicio de Domicilio
                                </h3>
                                <p className="text-gray-700 text-md">
                                    Al ser nuestro socio, tus pedidos recibirán prioridad en nuestra red de domiciliarios, asegurando entregas más rápidas y eficientes para tus clientes.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-lg md:text-xl font-bold text-teal-500 mb-2 flex items-center">
                                    <svg className="w-7 h-7 mr-3 text-advantage-teal" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 00-1-1h-3.118l-.718-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                    Paquete Asegurado y Rápido
                                </h3>
                                <p className="text-gray-700 text-md">
                                    Garantizamos la seguridad de tus paquetes durante el transporte y nos esforzamos por realizar las entregas en el menor tiempo posible, manteniendo la calidad del servicio.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="col-span-1">
                        <p className="text-gray-600 mb-8 text-center text-md">
                            Por favor, llena los siguientes datos para registrar tu negocio en nuestra plataforma.
                        </p>

                        {/* Sección de información sobre requisitos para Domiciliarios (integrada aquí) */}
                        {/* <section className="bg-blue-50 p-6 rounded-lg shadow-inner mb-10 border border-blue-200">
                    <h2 className="text-xl md:text-2xl font-bold text-accent-blue mb-4">
                        Requisitos para ser Domiciliario
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2 text-md">
                        <li>Estar ubicado en pitalito y alrededores.</li>
                        <li>Tener un medio de transporte propio (motocicleta).</li>
                        <li>Contar con un teléfono móvil con acceso a internet.</li>
                        <li>Poseer documentos de identificación válidos.</li>
                        <li>Disponibilidad para trabajar en horarios flexibles.</li>
                    </ul>
                </section> */}

                        {/* Formulario de registro de negocio */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Grupo de formulario: Nombre del Negocio */}
                            <div>
                                <label htmlFor="nombre" className="block text-gray-800 text-md font-semibold mb-2">
                                    Nombre del Negocio:
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition duration-200"
                                />
                            </div>
                            {/* Grupo de formulario: Dirección */}
                            <div>
                                <label htmlFor="direccion" className="block text-gray-800 text-md font-semibold mb-2">
                                    Dirección:
                                </label>
                                <input
                                    type="text"
                                    id="direccion"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    required
                                    className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition duration-200"
                                />
                            </div>
                            {/* Grupo de formulario: Teléfono */}
                            <div>
                                <label htmlFor="telefono" className="block text-gray-800 text-md font-semibold mb-2">
                                    Teléfono:
                                </label>
                                <input
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    required
                                    className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition duration-200"
                                />
                            </div>
                            {/* Grupo de formulario: Correo Electrónico */}
                            <div>
                                <label htmlFor="email" className="block text-gray-800 text-md font-semibold mb-2">
                                    Correo Electrónico:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition duration-200"
                                />
                            </div>
                            {/* Grupo de formulario: Descripción del Negocio */}
                            <div>
                                <label htmlFor="descripcion" className="block text-gray-800 text-md font-semibold mb-2">
                                    Descripción del Negocio:
                                </label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    required
                                    placeholder="Describe brevemente tu negocio..."
                                    className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition duration-200 min-h-[150px]"
                                />
                            </div>
                            {/* Botón de envío */}
                            <button
                                type="submit"
                                className="w-full py-4 px-6 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white transition duration-300 ease-in-out transform hover:scale-105 text-lg"
                            >
                                Registrar Negocio
                            </button>
                        </form>
                    </section>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                    ¿Tienes dudas? <a href="/contacto" className="text-primary underline">Contáctanos</a>
                </p>
            </div>
        </div>
    );
};

export default RegistrarNegocioPage;