import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="footer sm:footer-horizontal mt-20 lg:mt-40 bg-neutral text-neutral-content p-10">
            <aside>
                <FaWhatsapp size={50} className="text-white" />
                <p>
                    Domicilios en Pitalito
                    <br />
                    ¡Pedidos rápidos, seguros y sin complicaciones!
                </p>
                <p className="mt-2">
                    📍 Calle José Hilario López Main Park, Pitalito, Huila, 417030
                    <br />
                    📞 +57 313 408 9563
                </p>
            </aside>

            <div>
                <h6 className="footer-title">Servicios en Pitalito</h6>
                <span className="link link-hover">Restaurantes</span>
                <span className="link link-hover">Droguerías</span>
                <span className="link link-hover">Compras y Pagos</span>
                <span className="link link-hover">Trámites y Envíos</span>
            </div>

            <nav>
                <h6 className="footer-title">Síguenos en Redes Sociales</h6>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://wa.me/573134089563" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <FaWhatsapp size={24} />
                    </a>
                    <a href="https://www.instagram.com/envioswpitalito/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram size={24} />
                    </a>
                    <a href="https://www.facebook.com/envioswexpress/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <FaFacebook size={24} />
                    </a>
                </div>
            </nav>

       <div className="mt-10 text-center">
    <p className="text-sm">
        &copy; {new Date().getFullYear()} Domicilios W. Todos los derechos reservados.
        <br />
        Desarrollado por <strong>Dev M Desarrollo de Software</strong>, Pitalito - Tel: 
        <a className="underline" href="tel:+573208729276">3208729276</a>
    </p>
    <div className="mt-4">
        <a 
            href="https://wa.me/573134089563" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center text-white bg-green-500 hover:bg-green-600 p-2 rounded"
            aria-label="Contactar por WhatsApp"
        >
            <FaWhatsapp size={24} className="mr-2" />
            Contactar por WhatsApp
        </a>
    </div>
</div>
        </footer>
    );
};

export default Footer;
