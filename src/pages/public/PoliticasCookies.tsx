import React from 'react'
import LinksTratamientoDeDatos from '../../shared/components/LinksTratamientoDeDatos'
import NavTratamientoDeDatos from '../../shared/components/NavTratamiendoDeDatos'

const PoliticasPrivacidad: React.FC = () => {
  return (
    <>
      <NavTratamientoDeDatos />
      <section className="grid grid-cols-10 gap-4 font-sans leading-relaxed text-gray-800 bg-gray-100 p-8">

        <article className="container col-span-7 m-auto px-15 bg-white p-20 rounded-lg shadow-md max-w-4xl">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Política de Cookies</h1>
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">DomiciliosW S.A.S. – Pitalito, Huila, Colombia</h2>

          <p className="mb-2 text-sm text-gray-600 text-center">Fecha de entrada en vigor: 14 de mayo de 2025</p>
          <p className="mb-4 text-sm text-gray-600 text-center">Última actualización: 14 de mayo de 2025</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">1. Introducción</h2>
          <p className="mb-4">En DomiciliosW S.A.S. (en adelante, "DomiciliosW"), utilizamos cookies y tecnologías similares en nuestro sitio web y aplicación móvil para mejorar la experiencia de nuestros usuarios, analizar el tráfico y personalizar el contenido. Esta Política de Cookies explica qué son las cookies, cómo las utilizamos y cómo puedes gestionarlas.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">2. ¿Qué son las cookies?</h2>
          <p className="mb-4">Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, smartphone, tablet) cuando visitas un sitio web. Estas cookies permiten que el sitio web recuerde tus acciones y preferencias durante un período de tiempo, facilitando tu próxima visita y haciendo que el sitio te resulte más útil.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">3. ¿Qué tipos de cookies utilizamos?</h2>
          <p className="mb-4">En DomiciliosW, utilizamos los siguientes tipos de cookies:</p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-1"><strong className="font-semibold">Cookies esenciales:</strong> Son necesarias para el funcionamiento básico del sitio web y la aplicación, permitiéndote navegar y utilizar sus funciones.</li>
            <li className="mb-1"><strong className="font-semibold">Cookies de rendimiento:</strong> Recopilan información sobre cómo utilizas nuestro sitio web, como las páginas que visitas y los errores que puedas encontrar. Estas cookies nos ayudan a mejorar el rendimiento del sitio.</li>
            <li className="mb-1"><strong className="font-semibold">Cookies de funcionalidad:</strong> Permiten que el sitio web recuerde las elecciones que haces (como tu nombre de usuario, idioma o región) y proporcionan características mejoradas y más personales.</li>
            <li className="mb-1"><strong className="font-semibold">Cookies de publicidad y marketing:</strong> Se utilizan para mostrar anuncios relevantes para ti y tus intereses. También se utilizan para limitar el número de veces que ves un anuncio y para medir la efectividad de las campañas publicitarias.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">4. ¿Cómo utilizamos las cookies?</h2>
          <p className="mb-4">Utilizamos cookies para:</p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-1">Recordar tus preferencias y configuraciones.</li>
            <li className="mb-1">Mejorar la seguridad y prevenir actividades fraudulentas.</li>
            <li className="mb-1">Analizar el tráfico y las tendencias de uso para mejorar nuestros servicios.</li>
            <li className="mb-1">Proporcionarte contenido y publicidad personalizados.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">5. ¿Cómo puedes gestionar las cookies?</h2>
          <p className="mb-4">Puedes controlar y/o eliminar las cookies según tus preferencias. La mayoría de los navegadores te permiten aceptar o rechazar cookies, así como eliminar las que ya están almacenadas en tu dispositivo. Ten en cuenta que, si desactivas las cookies, es posible que algunas funciones de nuestro sitio web o aplicación no estén disponibles o no funcionen correctamente.</p>
          <p className="mb-4">A continuación, te proporcionamos enlaces a las páginas de ayuda de los navegadores más comunes para que puedas gestionar las cookies:</p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-1"><a href="https://support.google.com/chrome/answer/95647?hl=es" className="text-blue-600 hover:underline" target="_blank">Google Chrome</a></li>
            <li className="mb-1"><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" className="text-blue-600 hover:underline" target="_blank">Mozilla Firefox</a></li>
            <li className="mb-1"><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" className="text-blue-600 hover:underline" target="_blank">Safari</a></li>
            <li className="mb-1"><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline" target="_blank">Microsoft Edge</a></li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">6. Cambios en la Política de Cookies</h2>
          <p className="mb-4">Podemos actualizar esta Política de Cookies en cualquier momento. Te notificaremos sobre cualquier cambio publicando la nueva política en esta página. Te recomendamos revisar esta política periódicamente para estar informado sobre cómo utilizamos las cookies.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">7. Contacto</h2>
          <p className="mb-4">Si tiene alguna pregunta sobre nuestra Política de Cookies, puede contactarnos a través de:</p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-1"><strong className="font-semibold">Correo electrónico:</strong> domicilioswexpress@gmail.com</li>
            <li className="mb-1"><strong className="font-semibold">Teléfono:</strong> +57 313 4089563</li>
            <li className="mb-1"><strong className="font-semibold">Dirección:</strong> Carrera 5a #2a-79, Pitalito, Huila, Colombia</li>
          </ul>

          <p className="mt-8 text-sm text-gray-600">Fecha de última actualización: 14 de mayo de 2025</p>

        </article>

        <aside className='col-span-3'>
          <LinksTratamientoDeDatos />
        </aside>

      </section>

    </>
  )
}

export default PoliticasPrivacidad