import { useImagenes, useCrearImagen, useEliminarImagen } from '../../services/imagenesService';

const ImagenesPage = () => {
  const { data: imagenes, isLoading } = useImagenes();
  const crearImagen = useCrearImagen();
  const eliminarImagen = useEliminarImagen();

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    crearImagen.mutate(formData);
    e.currentTarget.reset();
  };

  console.log(imagenes)
  return (
    <div className="w-full mx-auto p-6 space-y-8">
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-md space-y-4 border">
        <h2 className="text-xl font-semibold text-gray-700">Subir nueva imagen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la imagen"
            required
            className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="file"
            name="archivo"
            accept="image/*"
            required
            className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:text-sm file:bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded transition duration-200"
        >
          Subir Imagen
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Listado de imágenes</h2>
        {isLoading ? (
          <p className="text-gray-500">Cargando imágenes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {imagenes?.map((img: any) => (
              <div key={img.id} className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition">
                <img
                  src={`${img.ruta}`}
                  alt={img.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col items-start">
                  <h3 className="text-sm font-medium text-gray-800 mb-2 truncate w-full">{img.nombre}</h3>
                  <button
                    onClick={() => eliminarImagen.mutate(img.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded transition duration-200 self-end"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagenesPage;
