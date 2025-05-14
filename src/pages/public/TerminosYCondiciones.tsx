import React from 'react'
import LinksTratamientoDeDatos from '../../shared/components/LinksTratamientoDeDatos'
import NavTratamientoDeDatos from '../../shared/components/NavTratamiendoDeDatos'

const TerminosYCondiciones: React.FC = () => {
  return (
    <>
      <NavTratamientoDeDatos />
      <section className="grid grid-cols-10 gap-4 font-sans leading-relaxed text-gray-800 bg-gray-100 p-8">

        <article className="container col-span-7 m-auto px-15 bg-white p-20 rounded-lg shadow-md max-w-4xl">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Términos y Condiciones de Uso</h1>
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">DomiciliosW S.A.S. – Pitalito, Huila, Colombia</h2>

          <p className="mb-2 text-sm text-gray-600 text-center">Fecha de entrada en vigor: 14 de mayo de 2025</p>
          <p className="mb-4 text-sm text-gray-600 text-center">Última actualización: 14 de mayo de 2025</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">1. Objeto</h2>
          <p className="mb-4">Los presentes Términos y Condiciones regulan el acceso y uso de la plataforma digital de DomiciliosW S.A.S. (en adelante, "DomiciliosW"), mediante la cual los usuarios pueden solicitar servicios de entrega de productos ofrecidos por aliados comerciales. Al acceder y utilizar la plataforma, el usuario acepta cumplir con estos Términos y Condiciones en su totalidad.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">2. Registro y Cuenta de Usuario</h2>
          <p className="mb-4">Para utilizar los servicios de DomiciliosW, el usuario debe registrarse proporcionando información veraz, actual y completa.</p>
          <p className="mb-4">El usuario es responsable de mantener la confidencialidad de su cuenta y contraseña, así como de todas las actividades que ocurran bajo su cuenta.</p>
          <p className="mb-4">DomiciliosW se reserva el derecho de suspender o cancelar cuentas que incumplan estos Términos y Condiciones o que presenten actividades sospechosas.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">3. Uso de la Plataforma</h2>
          <p className="mb-4">El usuario se compromete a:</p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-1">Utilizar la plataforma de manera lícita y conforme a la normativa vigente.</li>
            <li className="mb-1">No utilizar la plataforma para realizar actividades fraudulentas o ilícitas.</li>
            <li className="mb-1">No interferir con el funcionamiento de la plataforma ni intentar acceder a áreas restringidas sin autorización.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">4. Servicios de Entrega</h2>
          <p className="mb-4">DomiciliosW actúa como intermediario entre los usuarios y los aliados comerciales que ofrecen productos para entrega.</p>
          <p className="mb-4">Los tiempos de entrega son estimados y pueden variar según factores externos.</p>
          <p className="mb-4">DomiciliosW no garantiza la disponibilidad de todos los productos ofrecidos por los aliados comerciales.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">5. Pagos</h2>
          <p className="mb-4">El usuario se compromete a pagar el valor total de los productos y servicios solicitados, incluyendo tarifas de entrega y otros cargos aplicables.</p>
          <p className="mb-4">Los métodos de pago disponibles serán informados en la plataforma.</p>
          <p className="mb-4">En caso de errores en los precios debido a fallas tecnológicas, DomiciliosW se reserva el derecho de cancelar los pedidos afectados, informando al usuario.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">6. Propiedad Intelectual</h2>
          <p className="mb-4">Todos los derechos de propiedad intelectual relacionados con la plataforma y su contenido pertenecen a DomiciliosW o a sus licenciantes. El usuario se compromete a no reproducir, distribuir ni utilizar dicho contenido sin autorización previa.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">7. Responsabilidad</h2>
          <p className="mb-4">DomiciliosW no se hace responsable por daños o perjuicios derivados del uso de la plataforma o de los productos entregados, salvo en los casos expresamente establecidos por la ley.</p>
          <p className="mb-4">DomiciliosW no garantiza la disponibilidad ininterrumpida de la plataforma y se reserva el derecho de suspender su funcionamiento por mantenimiento u otras razones.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">8. Modificaciones</h2>
          <p className="mb-4">DomiciliosW podrá modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán publicadas en la plataforma y entrarán en vigor desde su publicación. El uso continuado de la plataforma implica la aceptación de las modificaciones.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">9. Legislación Aplicable y Jurisdicción</h2>
          <p className="mb-4">Estos Términos y Condiciones se rigen por las leyes de la República de Colombia. Cualquier controversia derivada de su interpretación o aplicación será sometida a la jurisdicción de los tribunales competentes en Colombia.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">10. Contacto</h2>
          <p className="mb-4">Para consultas o reclamos relacionados con estos Términos y Condiciones, puede contactarnos a través de:</p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-1"><strong className="font-semibold">Correo electrónico:</strong> domicilioswexpress@gmail.com</li>
            <li className="mb-1"><strong className="font-semibold">Teléfono:</strong> +57 313 4089563</li>
            <li className="mb-1"><strong className="font-semibold">Dirección:</strong> Carrera 5a #2a-79, Pitalito, Huila, Colombia</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">10. Vigencia y Modificaciones</h2>
          <p className="mb-4">Esta política entra en vigencia a partir del 14 de mayo de 2025 y podrá ser modificada en cualquier momento. Las modificaciones serán publicadas en nuestros canales oficiales. Se recomienda revisarla periódicamente.</p>

          <p className="mt-8 text-sm text-gray-600">Fecha de última actualización: 14 de mayo de 2025</p>

        </article>

        <aside className='col-span-3'>
          <LinksTratamientoDeDatos />
        </aside>

      </section>

    </>
  )
}

export default TerminosYCondiciones