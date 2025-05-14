import React from 'react';

const PoliticasDePrivacidad: React.FC = () => {
    return (
        <section className="font-sans leading-relaxed text-gray-800 bg-gray-100">

            <nav className="w-full bg-white shadow-md">
                <div className="container mx-auto px-5 py-4 flex justify-between items-center max-w-4xl">
                    <div className="text-xl font-bold">DomiciliosW</div>
                    <div>
                        <a href="/" className="rounded-md text-gray-800 no-underline py-2 px-4 hover:bg-gray-100 transition duration-150 ease-in-out">Inicio</a>
                    </div>
                </div>
            </nav>

            <article className="container mx-auto px-12 mt-8 bg-white p-15 rounded-lg shadow-md max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Políticas de Privacidad</h1>
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">DomiciliosW – Pitalito, Huila, Colombia</h2>

                <p className="mb-4">En DomiciliosW, nos comprometemos a proteger la privacidad, integridad y confidencialidad de los datos personales de nuestros clientes, usuarios y terceros relacionados, conforme a lo dispuesto en la Ley 1581 de 2012, el Decreto 1377 de 2013, y demás normativas colombianas aplicables sobre protección de datos personales.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-800">1. Información que Recopilamos</h2>
                <p className="mb-4">Con el fin de prestar nuestros servicios de manera adecuada y segura, recolectamos los siguientes datos personales, de manera directa o a través de nuestros canales digitales o físicos:</p>
                <ul className="list-disc pl-5 mb-4">
                    <li className="mb-1">Nombre completo</li>
                    <li className="mb-1">Número de teléfono</li>
                    <li className="mb-1">Dirección exacta de entrega</li>
                    <li className="mb-1">Indicaciones adicionales para facilitar la ubicación del domicilio (opcional)</li>
                    <li className="mb-1">Información de contacto en caso de reclamos o devoluciones (cuando aplique)</li>
                    <li className="mb-1">Información técnica como dirección IP, tipo de navegador, y datos de uso (cuando interactúe con nuestras plataformas digitales)</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-800">2. Finalidades del Tratamiento de Datos</h2>
                <p className="mb-4">Utilizamos su información personal exclusivamente para los siguientes propósitos:</p>
                <ul className="list-disc pl-5 mb-4">
                    <li className="mb-1">Procesar y gestionar los pedidos realizados a través de nuestra plataforma.</li>
                    <li className="mb-1">Facilitar la entrega efectiva mediante la comunicación con domiciliarios.</li>
                    <li className="mb-1">Brindar atención al cliente y gestionar reclamaciones o sugerencias.</li>
                    <li className="mb-1">Mejorar la calidad de nuestros servicios, analizar métricas de desempeño y experiencia del usuario.</li>
                    <li className="mb-1">Cumplir con obligaciones legales, contractuales y regulatorias.</li>
                    <li className="mb-1">Enviar notificaciones importantes relacionadas con el servicio, como confirmaciones de pedido, actualizaciones o cambios.</li>
                    <li className="mb-1">Gestionar encuestas de satisfacción, previo consentimiento.</li>
                </ul>
                <p className="mb-4">No se realizará tratamiento de sus datos para fines distintos sin su consentimiento previo, salvo obligación legal.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-800">3. Transferencia y Comunicación de Datos a Terceros</h2>
                <p className="mb-4">Compartimos información únicamente con terceros que colaboran directamente en la operación del servicio, incluyendo:</p>
                <ul className="list-disc pl-5 mb-4">
                    <li className="mb-1">Domiciliarios autorizados que requieren nombre, número de contacto y dirección para completar las entregas.</li>
                    <li className="mb-1">Proveedores tecnológicos que procesan datos en nuestra plataforma bajo acuerdos de confidencialidad y seguridad.</li>
                </ul>
                <p className="mb-4">No vendemos, alquilamos ni compartimos su información con fines comerciales ni publicitarios sin su consentimiento expreso.</p>
                <p className="mb-4">Podremos compartir información si es requerida por autoridades competentes, en cumplimiento de obligaciones legales o judiciales.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-800">4. Almacenamiento y Seguridad de la Información</h2>
                <p className="mb-4">Implementamos medidas técnicas, administrativas y físicas razonables para proteger su información personal. Algunas de estas medidas incluyen:</p>
                <ul className="list-disc pl-5 mb-4">
                    <li className="mb-1">Uso de servidores seguros y protocolos cifrados (HTTPS).</li>
                    <li className="mb-1">Acceso restringido a datos personales por parte del personal autorizado.</li>
                    <li className="mb-1">Copias de seguridad periódicas.</li>
                    <li className="mb-1">Eliminación segura de la información cuando ya no sea necesaria.</li>
                </ul>
                <p className="mb-4">La información será conservada únicamente por el tiempo necesario para cumplir las finalidades del tratamiento o conforme a la ley aplicable.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-800">5. Derechos de los Titulares de Datos</h2>
                <p className="mb-4">Como titular de datos personales, usted tiene derecho a:</p>
                <ul className="list-disc pl-5 mb-4">
                    <li className="mb-1">Acceder gratuitamente a su información.</li>
                    <li className="mb-1">Conocer, actualizar y rectificar los datos tratados.</li>
                    <li className="mb-1">Solicitar la supresión de sus datos o revocar la autorización.</li>
                    <li className="mb-1">Ser informado sobre el uso de su información.</li>
                    <li className="mb-1">Presentar quejas ante la Superintendencia de Industria y Comercio por presuntas infracciones.</li>
                </ul>
                <p className="mb-4">Para ejercer estos derechos, puede dirigir una solicitud escrita a través de los canales especificados en la sección de Contacto. El trámite será gratuito y será atendido en los plazos establecidos por la ley.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-800">6. Menores de Edad</h2>
                <p className="mb-4">Nuestros servicios no están dirigidos a menores de 18 años. En caso de recopilar accidentalmente información de un menor sin autorización de sus padres o tutores, procederemos a su eliminación inmediata tras su verificación.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-800">7. Uso de Cookies y Tecnologías Similares</h2>
                <p className="mb-4">En nuestras plataformas digitales, podemos usar cookies u otras tecnologías de rastreo para mejorar la experiencia de navegación, recordar preferencias, y analizar patrones de uso. Puede configurar su navegador para rechazar estas tecnologías, aunque esto podría afectar el funcionamiento de algunos servicios.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-800">8. Cambios a esta Política de Privacidad</h2>
                <p className="mb-4">Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. En caso de cambios sustanciales, informaremos mediante nuestros canales oficiales. La nueva versión entrará en vigor desde su publicación. Se recomienda revisarla periódicamente.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-800">9. Contacto</h2>
                <p className="mb-4">Para cualquier solicitud relacionada con el tratamiento de datos personales o para ejercer sus derechos, puede contactarnos a través de los siguientes medios:</p>
                <ul className="list-disc pl-5 mb-4">
                    <li className="mb-1">Correo electrónico: contacto@domiciliosw.com</li>
                    <li className="mb-1">Teléfono: +57 311 000 0000</li>
                    <li className="mb-1">Dirección: Carrera XX #XX-XX, Pitalito, Huila, Colombia</li>
                    <li className="mb-1">Horario de atención: Lunes a viernes de 8:00 a.m. a 6:00 p.m.</li>
                </ul>

                <p className="mt-8 text-sm text-gray-600">Fecha de última actualización: 14 de mayo de 2025</p>

            </article>
        </section>
    );
};

export default PoliticasDePrivacidad;
