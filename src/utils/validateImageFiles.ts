// utils/validateImageFiles.ts
import Swal from 'sweetalert2';

export const validateImageFilesWithClean = (
  e: React.ChangeEvent<HTMLInputElement>,
  maxSizeKB: number = 500,
  onValid: (file: File) => void
) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const file = files[0];
  const sizeInKB = file.size / 1024;

  if (sizeInKB > maxSizeKB) {
    Swal.fire({
      icon: 'error',
      title: 'Archivo demasiado grande',
      html: `"${file.name}" supera los ${maxSizeKB} KB permitidos`,
      confirmButtonColor: '#f97316',
      confirmButtonText: 'Aceptar',
    });

    e.target.value = ''; // 👈 limpia el input para que no quede cargado
    return;
  }

  onValid(file); // solo se llama si el archivo es válido
};
