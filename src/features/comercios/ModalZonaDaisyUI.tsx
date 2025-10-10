// src/shared/components/ModalZonaDaisyUI.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useZonas, useActualizarZonaComercio } from '../../services/useZonas';

interface ModalZonaProps {
  comercio: any;                       // tipa si tienes interfaz
  onSuccess?: () => void;              // opcional: callback luego de guardar
}

const ModalZonaDaisyUI: React.FC<ModalZonaProps> = ({ comercio, onSuccess }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);


  console.log('Comercio en ModalZonaDaisyUI:', comercio);

  const { data: zonas = [], isLoading: zonasLoading, error: zonasError } = useZonas();
  const { mutateAsync: actualizarZona, isPending: updatingZona } = useActualizarZonaComercio();

  // ❗valor seleccionado: '' = Sin zona, o el id como string
  const [selectedZonaId, setSelectedZonaId] = useState<string>('');

  // id único del modal (uno por fila/componente)
  const modalId = useMemo(() => `modal-zona-${comercio?.id}`, [comercio?.id]);

  // Preselección: zona actual si existe; si no, '' (Sin zona)
  useEffect(() => {
    const current = comercio?.zona?.id ? String(comercio.zona.id) : '';
    setSelectedZonaId(current);
  }, [comercio?.zona?.id]);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  const handleSave = async () => {
    try {
      const zonaId = selectedZonaId === '' ? null : Number(selectedZonaId);
      await actualizarZona({ comercioId: comercio.id, zonaId });
      close();
      onSuccess?.();
    } catch (e) {
      // podrías usar tu AlertService aquí si quieres
      console.error(e);
    }
  };

  return (
    <>
      {/* Botón para abrir modal */}
      <button
        className="btn btn-xs btn-outline"
        onClick={open}
        disabled={zonasLoading || updatingZona}
        title="Asignar/editar zona"
      >
        Zona
      </button>

      {/* Modal DaisyUI */}
      <dialog id={modalId} className="modal" ref={dialogRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ubicación de {comercio?.nombre_comercial}</h3>

          {zonasError && (
            <div className="alert alert-error my-3">
              <span>No se pudieron cargar las zonas.</span>
            </div>
          )}

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Zona</span>
            </label>

            <select
              className="select select-bordered w-full"
              value={selectedZonaId}
              onChange={(e) => setSelectedZonaId(e.target.value)}
              disabled={zonasLoading || updatingZona}
            >

              {/* Zonas por id/nombre */}
              {zonas.map((z: any) => (
                <option key={z.id} value={String(z.id)}>
                  {z.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
                disabled={zonasLoading || updatingZona}
              >
                {updatingZona ? 'Guardando...' : 'Guardar'}
              </button>
              <button className="btn" onClick={close}>Cancelar</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ModalZonaDaisyUI;
