import React, { useEffect, useState } from 'react';
import {
  useTelefonoCuentas,
  useActualizarTelefonoCuentas,
  useTelefonoQuejas,
  useActualizarTelefonoQuejas,
} from '../../services/telefonosServices';
import { AlertService } from '../../utils/AlertService';

const Telefonos: React.FC = () => {
  // GET
  const cuentasQuery = useTelefonoCuentas(true);
  const quejasQuery = useTelefonoQuejas(true);

  // PATCH
  const actualizarCuentas = useActualizarTelefonoCuentas();
  const actualizarQuejas = useActualizarTelefonoQuejas();

  // state inputs
  const [cuentasValue, setCuentasValue] = useState('');
  const [quejasValue, setQuejasValue] = useState('');

  // llenar inputs cuando llega data
  useEffect(() => {
    if (cuentasQuery.data?.value) setCuentasValue(cuentasQuery.data.value);
  }, [cuentasQuery.data?.value]);

  useEffect(() => {
    if (quejasQuery.data?.value) setQuejasValue(quejasQuery.data.value);
  }, [quejasQuery.data?.value]);

  const loading = cuentasQuery.isLoading || quejasQuery.isLoading;

  const handleGuardarCuentas = async () => {
    const confirmado = await AlertService.confirm(
      '¿Actualizar teléfono de CUENTAS?',
      `Se guardará: ${cuentasValue}`,
    );
    if (!confirmado) return;

    actualizarCuentas.mutate({ value: cuentasValue });
  };

  const handleGuardarQuejas = async () => {
    const confirmado = await AlertService.confirm(
      '¿Actualizar teléfono de QUEJAS?',
      `Se guardará: ${quejasValue}`,
    );
    if (!confirmado) return;

    actualizarQuejas.mutate({ value: quejasValue });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Teléfonos de soporte</h1>
        <button
          className="btn btn-sm"
          onClick={() => {
            cuentasQuery.refetch();
            quejasQuery.refetch();
          }}
        >
          Refrescar
        </button>
      </div>

      {/* Estados generales */}
      {loading && (
        <div className="alert alert-info">
          <span>Cargando teléfonos...</span>
        </div>
      )}

      {(cuentasQuery.isError || quejasQuery.isError) && (
        <div className="alert alert-error">
          <span>
            Error cargando teléfonos:{' '}
            {String(
              (cuentasQuery.error as any)?.response?.data?.message ||
                (quejasQuery.error as any)?.response?.data?.message ||
                'Error desconocido',
            )}
          </span>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CUENTAS */}
        <div className="card bg-base-100 shadow border">
          <div className="card-body space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="card-title">CUENTAS</h2>
              <span className="badge badge-primary">/phones/cuentas</span>
            </div>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Número (con 57)</span>
              </div>
              <input
                className="input input-bordered w-full"
                placeholder="Ej: 573108054942"
                value={cuentasValue}
                onChange={(e) => setCuentasValue(e.target.value)}
              />
              <div className="label">
                <span className="label-text-alt opacity-70">
                  Guardado actual: {cuentasQuery.data?.value ?? '—'}
                </span>
              </div>
            </label>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={handleGuardarCuentas}
                disabled={
                  actualizarCuentas.isPending ||
                  !cuentasValue ||
                  cuentasValue === cuentasQuery.data?.value
                }
              >
                {actualizarCuentas.isPending ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>

        {/* QUEJAS */}
        <div className="card bg-base-100 shadow border">
          <div className="card-body space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="card-title">QUEJAS</h2>
              <span className="badge badge-secondary">/phones/quejas</span>
            </div>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Número (con 57)</span>
              </div>
              <input
                className="input input-bordered w-full"
                placeholder="Ej: 573228689914"
                value={quejasValue}
                onChange={(e) => setQuejasValue(e.target.value)}
              />
              <div className="label">
                <span className="label-text-alt opacity-70">
                  Guardado actual: {quejasQuery.data?.value ?? '—'}
                </span>
              </div>
            </label>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={handleGuardarQuejas}
                disabled={
                  actualizarQuejas.isPending ||
                  !quejasValue ||
                  quejasValue === quejasQuery.data?.value
                }
              >
                {actualizarQuejas.isPending ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ayuda */}
      <div className="alert">
        <span className="text-sm opacity-80">
          Recuerda: el backend valida que el número venga con <b>57</b> (ej: <b>573108054942</b>).
        </span>
      </div>
    </div>
  );
};

export default Telefonos;
