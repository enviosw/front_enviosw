import React from 'react'
import LinksTratamientoDeDatos from '../../shared/components/LinksTratamientoDeDatos'
import NavTratamientoDeDatos from '../../shared/components/NavTratamiendoDeDatos'

const AutorizacionDatosPersonales: React.FC = () => {
  return (
    <>
      <NavTratamientoDeDatos />
      <section className="grid grid-cols-10 gap-4 font-sans leading-relaxed text-gray-800 bg-gray-100 p-8">

        <article className="container col-span-7 m-auto px-15 bg-white p-20 rounded-lg shadow-md max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Autorización de Tratamiento de Datos Personales – Usuarios</h1>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">DomiciliosW S.A.S.</h2>

        <p className="mb-4 text-sm text-gray-600 text-center">Fecha de entrada en vigor: 14 de mayo de 2025</p>

        <p className="mb-4">Para DomiciliosW S.A.S., sociedad legalmente constituida conforme a las leyes de la República de Colombia, identificada con NIT No. [TU NIT], y con domicilio principal en Pitalito, Huila, Colombia (en adelante, “DOMICILIOSW”), la protección de la privacidad de sus usuarios es una prioridad. Por ello, DOMICILIOSW cumple de forma estricta lo dispuesto en la Ley Estatutaria 1581 de 2012, el Decreto 1377 de 2013, el Decreto 886 de 2014, el Decreto 1074 de 2015 y cualquier otra norma que los modifique o sustituya.</p>
        <p className="mb-4">DOMICILIOSW actúa como Responsable del Tratamiento de los Datos Personales y se compromete a almacenarlos y tratarlos de manera confidencial, adoptando todas las medidas de seguridad exigidas por la ley.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">✅ Tratamiento y Finalidades</h2>
        <p className="mb-4">Los datos personales que DOMICILIOSW podrá recolectar (como nombre completo, número celular, dirección de entrega, correo electrónico, número de identificación, ubicación en tiempo real, referencias adicionales, entre otros) serán tratados mediante su recolección, almacenamiento, uso, análisis, circulación y supresión, a través de servidores propios o de terceros autorizados ubicados dentro o fuera del territorio colombiano, para las siguientes finalidades:</p>
        <ul className="list-disc pl-5 mb-4">
            <li className="mb-1">Registrar al usuario en la plataforma de DomiciliosW.</li>
            <li className="mb-1">Coordinar y realizar la entrega de productos o servicios solicitados.</li>
            <li className="mb-1">Gestionar el historial de pedidos, pagos y comunicaciones.</li>
            <li className="mb-1">Validar la identidad del usuario y evitar fraudes.</li>
            <li className="mb-1">Contactar al usuario en relación con su pedido o con fines informativos.</li>
            <li className="mb-1">Evaluar la calidad del servicio a través de encuestas o mecanismos similares.</li>
            <li className="mb-1">Analizar comportamiento de uso para mejorar la experiencia del usuario.</li>
            <li className="mb-1">Realizar actividades de mercadeo, promociones o beneficios del programa de lealtad.</li>
            <li className="mb-1">Gestionar solicitudes, quejas, reclamos y peticiones de los usuarios.</li>
            <li className="mb-1">Realizar estudios de mercado, segmentación de usuarios y análisis de consumo.</li>
            <li className="mb-1">Cumplir con obligaciones legales, fiscales, contractuales o regulatorias.</li>
            <li className="mb-1">Transferir o transmitir la información a terceros aliados, proveedores o encargados del tratamiento para fines operativos, comerciales o publicitarios, bajo acuerdos de confidencialidad y protección de datos.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">🌎 Transferencia Internacional</h2>
        <p className="mb-4">El titular autoriza expresamente a DOMICILIOSW para que pueda transferir y/o transmitir sus datos personales a terceros ubicados en países que, a juicio de la Superintendencia de Industria y Comercio, garanticen un nivel adecuado de protección de datos, así como a aliados comerciales que ofrezcan sus productos y servicios a través de la plataforma de DOMICILIOSW, en los términos del artículo 53 de la Ley 1480 de 2011.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">👤 Derechos del Titular</h2>
        <p className="mb-4">El titular tiene los siguientes derechos:</p>
        <ul className="list-disc pl-5 mb-4">
            <li className="mb-1">Conocer, actualizar, rectificar y suprimir sus datos personales.</li>
            <li className="mb-1">Solicitar prueba de esta autorización.</li>
            <li className="mb-1">Ser informado sobre el uso que se le ha dado a sus datos.</li>
            <li className="mb-1">Presentar quejas ante la SIC por infracciones a la ley.</li>
            <li className="mb-1">Revocar la autorización en cualquier momento, salvo obligaciones contractuales.</li>
            <li className="mb-1">Acceder en forma gratuita a sus datos personales.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">🛠 Ejercicio de Derechos</h2>
        <p className="mb-4">El titular podrá ejercer sus derechos mediante:</p>
        <ul className="list-disc pl-5 mb-4">
            <li className="mb-1"><strong className="font-semibold">Correo electrónico:</strong> domicilioswexpress@gmail.com</li>
            <li className="mb-1"><strong className="font-semibold"></strong> +57 313 4089563</li>
            <li className="mb-1"><strong className="font-semibold">Dirección física:</strong> Carrera 5a #2a-79, Pitalito, Huila, Colombia</li>
            <li className="mb-1"><strong className="font-semibold">SIC Facilita:</strong> El titular puede acudir a este canal oficial de la Superintendencia de Industria y Comercio.</li>
        </ul>
        <p className="mb-4">El titular podrá ejercer sus derechos directamente, o a través de su causahabiente, representante legal o apoderado, acreditando tal condición mediante los documentos requeridos.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">⏳ Conservación</h2>
        <p className="mb-4">DOMICILIOSW conservará los datos personales durante el tiempo que sea razonable y necesario para cumplir con las finalidades mencionadas, o según lo exijan normas específicas. En particular, la información contable y de pedidos será almacenada por un período mínimo de diez (10) años conforme al artículo 28 de la Ley 962 de 2005.</p>

        <p className="mt-8 text-sm text-gray-600">Fecha de última actualización: 14 de mayo de 2025</p>
        </article>

        <aside className='col-span-3'>
          <LinksTratamientoDeDatos />
        </aside>

      </section>

    </>
  )
}

export default AutorizacionDatosPersonales