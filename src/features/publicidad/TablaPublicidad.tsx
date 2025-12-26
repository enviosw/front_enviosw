// src/pages/publicidad/TablaPublicidad.tsx
import React from "react";
import { usePublicidades, useEliminarPublicidad } from "../../services/PublicidadServices";
import Loader from "../../utils/Loader";
import DataTable from "../../shared/components/DataTable";
import TableCell from "../../shared/components/TableCell";
import Modal from "../../shared/components/Modal";
import { useModal } from "../../context/ModalContext";
import FormularioPublicidad from "./FormularioPublicidad";
import { FaPen } from "react-icons/fa";
import Swal from "sweetalert2";

// ✅ Igual que en el formulario: construye URL completa si viene "uploads/xxx.jpg" o "/uploads/xxx.jpg"
// Si ya viene URL completa (http/https), la deja igual.
const buildImageUrl = (value?: string) => {
  if (!value) return "";

  // Si ya es una URL completa, no tocarla
  if (/^https?:\/\//i.test(value)) return value;

  // Elimina "/uploads/" si viene
  const filename = value.replace(/^\/?uploads\//, "");

  // Usa el BASE_URL directamente
  return `${import.meta.env.VITE_API_URL}/${filename}`;
};
const TablaPublicidad: React.FC = () => {
  const { data: publicidades, isLoading, error } = usePublicidades();
  const { mutate: eliminarPublicidad, isPending: isDeleting } = useEliminarPublicidad();

  const { openModal, setModalTitle, setModalContent } = useModal();

  const headers = ["ID", "Acciones", "Imagen", "Ruta", "Estado", "Orden", "Inicio", "Fin"];

  const openCustomModal = (publicidad?: any) => {
    const isEdit = publicidad?.id !== undefined;
    const key = isEdit ? `edit-${publicidad.id}` : `create-${Date.now()}`;
    setModalTitle(isEdit ? "Actualizar Publicidad" : "Registrar Publicidad");
    setModalContent(<FormularioPublicidad key={key} publicidad={publicidad} />);
    openModal();
  };

  const renderRow = (p: any) => (
    <tr key={p.id} className="hover:bg-gray-100 bg-white">
      <TableCell>{p.id}</TableCell>

      <td className="px-2 text-sm text-gray-700 border-gray-300 border-b">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-1 hover:underline cursor-pointer text-orange-600 hover:text-orange-900"
            onClick={() => openCustomModal(p)}
          >
            <FaPen /> <span>Editar</span>
          </button>

          <button
            className="btn btn-error btn-xs"
            disabled={isDeleting}
            onClick={() => {
              Swal.fire({
                title: "¿Eliminar publicidad?",
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) eliminarPublicidad(p.id);
              });
            }}
          >
            Eliminar
          </button>
        </div>
      </td>

      <TableCell>
        {p.imagen ? (
          <img
            src={buildImageUrl(p.imagen)}
            alt="pub"
            className="h-12 w-20 object-cover rounded-md border"
            onError={(e) => {
              // ✅ fallback visual si la URL falla
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <span className="text-gray-400">Sin imagen</span>
        )}
      </TableCell>

      <TableCell>{p.ruta}</TableCell>
      <TableCell>{Number(p.estado) === 1 ? "Activo" : "Inactivo"}</TableCell>
      <TableCell>{p.orden}</TableCell>
      <TableCell>{p.fecha_inicio ?? "-"}</TableCell>
      <TableCell>{p.fecha_fin ?? "-"}</TableCell>
    </tr>
  );

  return (
    <div className="overflow-x-auto w-full space-y-4">
      <button
        onClick={() => openCustomModal()}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-orange-600 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Registrar
      </button>

      {isLoading ? (
        <div className="text-center text-blue-600">
          Cargando Publicidad... <Loader />
        </div>
      ) : error ? (
        <p className="text-red-600">Error: {(error as Error).message}</p>
      ) : (
        <DataTable headers={headers} data={publicidades ?? []} renderRow={renderRow} />
      )}

      <Modal />
    </div>
  );
};

export default TablaPublicidad;
