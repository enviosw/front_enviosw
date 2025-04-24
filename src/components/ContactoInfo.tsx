import React from 'react'
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'

const ContactoInfo: React.FC = () => {
    return (
        <section className="bg-white/70 shadow-md rounded-xl p-2 items-end mx-auto flex gap-2">

            <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-red-500 text-lg" />
                <div className="flex flex-col leading-tight">
                    <span className="text-gray-700 text-xs text-start">Telefono</span>
                    <a
                        href="tel:+573001234567"
                        className="text-sm font-medium text-black hover:underline"
                    >
                        +57 300 123 4567
                    </a>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-red-500 text-lg" />
                <div className="flex flex-col leading-tight">
                    <span className="text-gray-700 text-xs text-start">Dirección</span>
                    <span className="text-sm font-medium text-black">
                        Calle 123 #45-67, Bogotá
                    </span>
                </div>
            </div>
        </section>
    )
}

export default ContactoInfo
