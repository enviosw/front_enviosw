import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',  // Permite que Vite sea accesible desde cualquier dispositivo en tu red
    port: 3000,  // El puerto en el que el servidor de desarrollo estará escuchando
    strictPort: true,  // Fuerza el uso del puerto definido, sin intentar puertos alternativos
    open: true,  // Abre automáticamente el navegador en el servidor de desarrollo
  },
  build: {
    outDir: 'dist',  // Directorio de salida para los archivos de producción
    sourcemap: false,  // Desactiva los mapas de fuentes en producción (opcional)
    minify: 'terser',  // Usa Terser para minificar el código en producción
  },
  base: './',  // Asegura que la base de los recursos sea relativa
});
