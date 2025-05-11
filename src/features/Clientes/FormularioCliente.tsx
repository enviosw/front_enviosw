import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCrearCliente, useActualizarCliente } from '../../services/clientesServices'; // Hooks para crear y actualizar clientes
// import BuscarComercioSelect from '../../shared/components/BuscarComercioSelect';
import { Cliente } from '../../shared/types/clienteInterface';
import { clienteSchema } from '../../shared/schemas/clienteSchema';
// import { useRolesUsuario } from '../../services/rolesServices';

interface FormularioClienteProps {
    cliente?: Cliente; // Cliente opcional para editar
}

type ClienteFormData = z.infer<typeof clienteSchema>;

const FormularioCliente: React.FC<FormularioClienteProps> = ({ cliente }) => {
    const { mutate: crearCliente, isPending: isCreating, isError: isErrorCreating, error: errorCreating } = useCrearCliente();
    const { mutate: actualizarCliente, isPending: isUpdating, isError: isErrorUpdating, error: errorUpdating } = useActualizarCliente();

    // Hook de react-hook-form con validaciones usando Zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ClienteFormData>({
        resolver: zodResolver(clienteSchema),
        defaultValues: cliente // Directamente tomamos los datos del cliente para pre-cargar el formulario
    });

    useEffect(() => {
        if (cliente) {
            reset(cliente); // Resetear los valores del formulario cuando el `cliente` cambia
        }
    }, [cliente, reset]);

    const onSubmit = (data: ClienteFormData) => {
        console.log('dfsd', data);
        
        const payload = {
            ...data
        };

        if (cliente?.id) {
            actualizarCliente({ ...payload, id: cliente.id });
        } else {
            crearCliente(payload);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white">
            <div>
                <label>Nombre</label>
                <input
                    {...register('name')}
                    className="input input-bordered w-full"
                    placeholder="Nombres"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div>
                <label>Apellido</label>
                <input
                    {...register('lastName')}
                    className="input input-bordered w-full"
                    placeholder="Apellidos"
                />
                {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
            </div>

            <div>
                <label>Email</label>
                <input
                    {...register('email')}
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="Email"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label>Contraseña</label>
                <input
                    {...register('password')}
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Contraseña"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div>
                <label>Rol</label>
                <select {...register('rol_id')} value={cliente?.rol_id} className="select select-bordered w-full">
                    <option value={cliente?.rol?.id ?? 3}>{cliente?.rol?.name ?? 'Cliente'}</option>
                </select>
                {errors.rol_id && <p className="text-red-500">{errors.rol_id.message}</p>}
            </div>

            {cliente?.id && (
                <div>
                    <label>Estado</label>
                    <select {...register('status')} className="select select-bordered w-full">
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                    {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                </div>
            )}

            {/* Nuevos campos: Telefono y Dirección */}
            <div>
                <label>Teléfono</label>
                <input
                    {...register('phone')}
                    className="input input-bordered w-full"
                    placeholder="Teléfono"
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>

            <div>
                <label>Teléfono</label>
                <input
                    {...register('phone_2')}
                    className="input input-bordered w-full"
                    placeholder="Teléfono"
                />
                {errors.phone_2 && <p className="text-red-500">{errors.phone_2.message}</p>}
            </div>

            <div>
                <label>Dirección</label>
                <input
                    {...register('address')}
                    className="input input-bordered w-full"
                    placeholder="Dirección"
                />
                {errors.address && <p className="text-red-500">{errors.address.message}</p>}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isCreating || isUpdating}
                >
                    {isCreating || isUpdating ? 'Procesando...' : cliente?.id ? 'Actualizar Cliente' : 'Registrar Cliente'}
                </button>
            </div>

            {(isErrorCreating || isErrorUpdating) && (
                <p className="text-red-500 mt-4">
                    {(errorCreating || errorUpdating)?.message}
                </p>
            )}
        </form>
    );
};

export default FormularioCliente;
