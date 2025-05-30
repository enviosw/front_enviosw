import React, { useState } from 'react';

const RegistrarDomiciliarioPage: React.FC = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        direccion: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos del domiciliario:', formData);
        // Aquí puedes agregar la lógica para enviar los datos al backend
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">

            {/* Contenedor principal de la página */}
            <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12 my-8">
                {/* Título de la página */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 text-center leading-tight">
                    Solicitud para ser Domiciliario
                </h1>

                {/* Sección de información sobre requisitos */}
                <section className="bg-blue-50 p-6 rounded-lg shadow-inner mb-10 border border-blue-200">
                    <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-4">
                        Requisitos para ser Domiciliario
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2 text-md">
                        <li>Ser mayor de edad.</li>
                        <li>Tener un medio de transporte propio.</li>
                        <li>Contar con un teléfono móvil con acceso a internet.</li>
                        <li>Poseer documentos de identificación válidos.</li>
                        <li>Disponibilidad para trabajar en horarios flexibles.</li>
                    </ul>
                </section>

                {/* Formulario de registro */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Grupo de formulario: Nombre */}
                    <div className="form-group">
                        <label htmlFor="nombre" className="block text-gray-800 text-md font-semibold mb-2">
                            Nombre:
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
                    {/* Grupo de formulario: Teléfono */}
                    <div className="form-group">
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
                    {/* Grupo de formulario: Dirección */}
                    <div className="form-group">
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
                    {/* Grupo de formulario: Email */}
                    <div className="form-group">
                        <label htmlFor="email" className="block text-gray-800 text-md font-semibold mb-2">
                            Email:
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
                    {/* Botón de envío */}
                    <button
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-full focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white transition duration-300 ease-in-out transform hover:scale-105 w-full text-lg shadow-lg"
                        type="submit"
                    >
                        Registrar
                    </button>
                </form>



                <p className="text-center text-sm text-gray-500 mt-4">
                    ¿Tienes dudas? <a href="/contacto" className="text-primary underline">Contáctanos</a>
                </p>
            </div>
        </div>
    );
};

export default RegistrarDomiciliarioPage;