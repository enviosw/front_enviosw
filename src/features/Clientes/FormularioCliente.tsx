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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Nombre</label>
                    <input
                        {...register('name')}
                        className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        placeholder="Nombres"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Apellido</label>
                    <input
                        {...register('lastName')}
                        className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        placeholder="Apellidos"
                    />
                    {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                    <input
                        {...register('email')}
                        type="email"
                        className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        placeholder="Email"

                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                {/* <div>
                    <label>Contraseña</label>
                    <input
                        {...register('password')}
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="Contraseña"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div> */}

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Rol</label>
                    <select {...register('rol_id')} value={cliente?.rol_id ?? 3} className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                        <option value={cliente?.rol?.id ?? 3}>{cliente?.rol?.name ?? 'Cliente'}</option>
                    </select>
                    {errors.rol_id && <p className="text-red-500">{errors.rol_id.message}</p>}
                </div>

                {cliente?.id && (
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">Estado</label>
                        <select {...register('status')} className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                        {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                    </div>
                )}


                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Teléfono</label>
                    <input
                        {...register('phone')}
                        className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        placeholder="Teléfono"
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Teléfono secundario  <span className="font-light text-gray-600">(opcional)</span></label>
                    <input
                        {...register('phone_2')}
                        className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        placeholder="Teléfono"
                    />
                    {errors.phone_2 && <p className="text-red-500">{errors.phone_2.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Dirección</label>
                    <input
                        {...register('address')}
                        className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        placeholder="Dirección"
                    />
                    {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                </div>

            </div>

            <div className="flex justify-center mt-8">
                <button
                    type="submit"
                    className="py-3 px-8 bg-orange-500 text-white font-bold rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
