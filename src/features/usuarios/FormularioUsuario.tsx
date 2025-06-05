import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usuarioSchema } from '../../shared/schemas/usuarioSchema'; // Asegúrate de tener este esquema de validación
import { useCrearUsuario, useActualizarUsuario } from '../../services/usuariosServices'; // Hooks para crear y actualizar usuarios
import { useRolesUsuario } from '../../services/rolesServices'; // Hook para obtener los roles de los usuarios
import { Usuario } from '../../shared/types/usuariosInterface';
import BuscarComercioSelect from '../../shared/components/BuscarComercioSelect';

interface FormularioUsuarioProps {
    usuario?: Usuario; // Usuario opcional para editar
}

type UsuarioFormData = z.infer<typeof usuarioSchema>;

const FormularioUsuario: React.FC<FormularioUsuarioProps> = ({ usuario }) => {
    const { mutate: crearUsuario, isPending: isCreating, isError: isErrorCreating, error: errorCreating } = useCrearUsuario();
    const { mutate: actualizarUsuario, isPending: isUpdating, isError: isErrorUpdating, error: errorUpdating } = useActualizarUsuario();
    const { data: roles, isLoading } = useRolesUsuario(); // Obtenemos los roles de los usuarios
    const [comercioId, setComercioId] = useState<number | null>(null);
    const [comercioError, setComercioError] = useState('');

    // Hook de react-hook-form con validaciones usando Zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<UsuarioFormData>({
        resolver: zodResolver(usuarioSchema),
        defaultValues: usuario // Directamente tomamos los datos del usuario para pre-cargar el formulario
    });

    useEffect(() => {
        if (usuario) {
            reset(usuario); // Resetear los valores del formulario cuando el `usuario` cambia
        }
    }, [usuario, reset]);

    const onSubmit = (data: UsuarioFormData) => {
        const payload = {
            ...data,
            ...(comercioId && { comercio_id: comercioId }), // ⬅️ Solo si hay comercio
        };


        if (!usuario?.id && !comercioId) {
            setComercioError('Debes seleccionar un comercio');
            return;
        }

        if (usuario?.id) {
            actualizarUsuario({ ...payload, id: usuario.id });
        } else {
            crearUsuario(payload);
        }
    };

    if (isLoading) {
        return <div>Cargando roles...</div>;
    }

    const handleComercioSelect = (id: number | null, comercio?: any) => {
        setComercioId(id);
        console.log('Comercio seleccionado:', comercio);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Nombre</label>
                    <input
                        {...register('nombre')}
                        className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        placeholder="Nombre completo"
                    />
                    {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
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

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Contraseña</label>
                    <input
                        {...register('password')}
                        type="password"
                        className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        placeholder="Contraseña"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Rol</label>
                    <select {...register('rol')}
                        className="p-3 border border-gray-300 rounded-lg w-full transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                    >
                        {roles?.map(role => (
                            <option key={role.id} value={role.nombre}>
                                {role.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.rol && <p className="text-red-500">{errors.rol.message}</p>}
                </div>

                {usuario?.id && (
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">Estado</label>
                        <select {...register('estado')}
                            className="p-3 border border-gray-300 rounded-lg w-full transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        >
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                        {errors.estado && <p className="text-red-500">{errors.estado.message}</p>}
                    </div>
                )}

                {/* Nuevos campos: Telefono y Dirección */}
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Teléfono</label>
                    <input
                        {...register('telefono')}
                        className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        placeholder="Teléfono"
                    />
                    {errors.telefono && <p className="text-red-500">{errors.telefono.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Dirección</label>
                    <input
                        {...register('direccion')}
                        className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        placeholder="Dirección"
                    />
                    {errors.direccion && <p className="text-red-500">{errors.direccion.message}</p>}
                </div>

                <BuscarComercioSelect onSelect={handleComercioSelect} />
                {comercioError && <p className="text-red-500">{comercioError}</p>}

            </div>

            <div className="flex justify-center mt-8">
                <button
                    type="submit"

                    className="py-3 px-8 bg-orange-500 text-white font-bold rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isCreating || isUpdating}
                >
                    {isCreating || isUpdating ? 'Procesando...' : usuario?.id ? 'Actualizar Usuario' : 'Registrar Usuario'}
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

export default FormularioUsuario;
