import React from 'react';
import { motion } from 'framer-motion'; // 👈 importar framer motion

interface ComercioHeaderProps {
  nombre: string;
  descripcion: string;
  horario: string;
  imagen?: string;
}

const defaultImage = '/logo_w_fondo_negro.jpeg';

const ComercioHeader: React.FC<ComercioHeaderProps> = ({
  nombre,
  descripcion,
  imagen,
}) => {
  const imagenFinal =
    imagen && imagen.trim() !== '' && imagen !== 'null' && imagen !== 'undefined'
      ? imagen
      : defaultImage;

  return (
    <div
      className="w-full relative mb-8 overflow-hidden"
      style={{
        backgroundImage: `url(${imagenFinal})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Capa oscura de fondo */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />

      {/* Contenido sobre la imagen */}
      <div className="relative z-10 container mx-auto px-4 py-10 md:py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        
        {/* Información del comercio */}
        <div className="text-white flex-1 text-center md:text-left space-y-2 md:space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
            {nombre}
          </h1>
          <p className="text-base md:text-lg text-gray-300 tracking-wide">
            {descripcion}
          </p>
        </div>

        {/* Imagen circular animada */}
        <motion.div
          className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.img
            src={imagenFinal}
            alt={`Foto del comercio ${nombre}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ComercioHeader;
