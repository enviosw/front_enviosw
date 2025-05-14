import React from 'react'

const PoliticasPrivacidad: React.FC = () => {
  return (
    <section className="font-sans leading-relaxed text-gray-800 bg-gray-100 pb-8">

      <nav className="w-full bg-white shadow-md">
        <div className="container mx-auto px-5 py-4 flex justify-between items-center max-w-4xl">
          <div className="text-xl font-bold">DomiciliosW</div>
          <div>
            <a href="/" className="rounded-md text-gray-800 no-underline py-2 px-4 hover:bg-gray-100 transition duration-150 ease-in-out">Inicio</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-15 mt-8 bg-white p-20 rounded-lg shadow-md max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Política de Tratamiento de Datos Personales</h1>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">DomiciliosW S.A.S. – Pitalito, Huila, Colombia</h2>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">1. Introducción</h2>
        <p className="mb-4">En DomiciliosW S.A.S. (en adelante, "DomiciliosW"), nos comprometemos a proteger la privacidad y seguridad de los datos personales de nuestros usuarios, domiciliarios, aliados comerciales, proveedores y demás terceros con los que interactuamos. Esta política establece los lineamientos para el tratamiento de datos personales en cumplimiento de la legislación colombiana vigente.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">2. Definiciones</h2>
        <p className="mb-2"><strong className="font-semibold">Dato Personal:</strong> Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.</p>
        <p className="mb-2"><strong className="font-semibold">Tratamiento:</strong> Cualquier operación sobre datos personales, como la recolección, almacenamiento, uso, circulación o supresión.</p>
        <p className="mb-2"><strong className="font-semibold">Titular:</strong> Persona natural cuyos datos personales son objeto de tratamiento.</p>
        <p className="mb-2"><strong className="font-semibold">Responsable del Tratamiento:</strong> Persona natural o jurídica que decide sobre la base de datos y/o el tratamiento de los datos.</p>
        <p className="mb-4"><strong className="font-semibold">Encargado del Tratamiento:</strong> Persona natural o jurídica que realiza el tratamiento de datos por cuenta del responsable.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">3. Principios Rectores</h2>
        <p className="mb-4">DomiciliosW aplica los siguientes principios en el tratamiento de datos personales:</p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1"><strong className="font-semibold">Legalidad:</strong> El tratamiento se realiza conforme a la ley.</li>
          <li className="mb-1"><strong className="font-semibold">Finalidad:</strong> Los datos se recolectan con una finalidad legítima, informada al titular.</li>
          <li className="mb-1"><strong className="font-semibold">Libertad:</strong> El tratamiento solo se realiza con el consentimiento previo, expreso e informado del titular.</li>
          <li className="mb-1"><strong className="font-semibold">Veracidad:</strong> La información debe ser veraz, completa, exacta y actualizada.</li>
          <li className="mb-1"><strong className="font-semibold">Transparencia:</strong> Se garantiza el derecho del titular a obtener información sobre sus datos.</li>
          <li className="mb-1"><strong className="font-semibold">Seguridad:</strong> Se adoptan medidas para proteger los datos contra acceso no autorizado o fraudulento.</li>
          <li className="mb-1"><strong className="font-semibold">Confidencialidad:</strong> Todas las personas que intervienen en el tratamiento deben garantizar la reserva de la información.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">4. Datos Recolectados</h2>
        <p className="mb-4">DomiciliosW puede recolectar los siguientes datos personales:</p>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">Usuarios:</h3>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1">Nombre completo</li>
          <li className="mb-1">Número de teléfono</li>
          <li className="mb-1">Dirección de entrega</li>
          <li className="mb-1">Correo electrónico</li>
          <li className="mb-1">Información de geolocalización (cuando la aplicación lo requiera)</li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">Domiciliarios:</h3>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1">Nombre completo</li>
          <li className="mb-1">Número de teléfono</li>
          <li className="mb-1">Documento de identidad</li>
          <li className="mb-1">Fotografía</li>
          <li className="mb-1">Información bancaria para pagos</li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">Aliados Comerciales y Proveedores:</h3>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1">Nombre o razón social</li>
          <li className="mb-1">Datos de contacto</li>
          <li className="mb-1">Información financiera y tributaria</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">5. Finalidades del Tratamiento</h2>
        <p className="mb-4">Los datos personales recolectados serán utilizados para:</p>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">Usuarios:</h3>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1">Procesar y entregar pedidos.</li>
          <li className="mb-1">Brindar soporte y atención al cliente.</li>
          <li className="mb-1">Enviar notificaciones sobre el estado de los pedidos.</li>
          <li className="mb-1">Realizar encuestas de satisfacción.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">Domiciliarios:</h3>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1">Gestionar el registro y acceso a la plataforma.</li>
          <li className="mb-1">Procesar pagos y comisiones.</li>
          <li className="mb-1">Brindar soporte y capacitación.</li>
          <li className="mb-1">Realizar evaluaciones de desempeño.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">Aliados Comerciales y Proveedores:</h3>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1">Gestionar relaciones comerciales.</li>
          <li className="mb-1">Procesar pagos y facturación.</li>
          <li className="mb-1">Cumplir con obligaciones contractuales y legales.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">6. Transferencia y Transmisión de Datos</h2>
        <p className="mb-4">DomiciliosW podrá transferir o transmitir datos personales a terceros, dentro o fuera del país, en los siguientes casos:</p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1">A proveedores de servicios tecnológicos y logísticos que apoyen nuestras operaciones.</li>
          <li className="mb-1">A autoridades competentes, cuando sea requerido por ley.</li>
          <li className="mb-1">A aliados comerciales, previa autorización del titular.</li>
        </ul>
        <p className="mb-4">En todos los casos, se garantizará que los terceros cumplan con las medidas de seguridad y confidencialidad requeridas.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">7. Derechos de los Titulares</h2>
        <p className="mb-4">Los titulares de los datos personales tienen derecho a:</p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1">Conocer, actualizar y rectificar sus datos.</li>
          <li className="mb-1">Solicitar la supresión de sus datos cuando sea procedente.</li>
          <li className="mb-1">Revocar la autorización otorgada para el tratamiento de sus datos.</li>
          <li className="mb-1">Presentar quejas ante la Superintendencia de Industria y Comercio por presuntas infracciones.</li>
        </ul>
        <p className="mb-4">Para ejercer estos derechos, los titulares pueden contactar a DomiciliosW a través de los canales indicados en la sección 9.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">8. Seguridad de la Información</h2>
        <p className="mb-4">DomiciliosW implementa medidas técnicas, humanas y administrativas para proteger los datos personales contra acceso no autorizado, pérdida, alteración o destrucción.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">9. Contacto</h2>
        <p className="mb-4">Para consultas, reclamos o ejercicio de derechos relacionados con el tratamiento de datos personales, puede contactarnos en:</p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-1"><strong className="font-semibold">Correo electrónico:</strong> domicilioswexpress@gmail.com</li>
          <li className="mb-1"><strong className="font-semibold">Teléfono:</strong> +57 313 4089563</li>
          <li className="mb-1"><strong className="font-semibold">Dirección:</strong> Carrera 5a #2a-79, Pitalito, Huila, Colombia</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">10. Vigencia y Modificaciones</h2>
        <p className="mb-4">Esta política entra en vigencia a partir del 14 de mayo de 2025 y podrá ser modificada en cualquier momento. Las modificaciones serán publicadas en nuestros canales oficiales. Se recomienda revisarla periódicamente.</p>

        <p className="mt-8 text-sm text-gray-600">Fecha de última actualización: 14 de mayo de 2025</p>

      </div>

    </section>
  )
}

export default PoliticasPrivacidad