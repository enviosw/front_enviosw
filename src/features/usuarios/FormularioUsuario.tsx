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

        if (!comercioId) {
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
            <div>
                <label>Nombre</label>
                <input
                    {...register('nombre')}
                    className="input input-bordered w-full"
                    placeholder="Nombre completo"
                />
                {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
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
                <select {...register('rol')} className="select select-bordered w-full">
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
                    <label>Estado</label>
                    <select {...register('estado')} className="select select-bordered w-full">
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                    {errors.estado && <p className="text-red-500">{errors.estado.message}</p>}
                </div>
            )}

            {/* Nuevos campos: Telefono y Dirección */}
            <div>
                <label>Teléfono</label>
                <input
                    {...register('telefono')}
                    className="input input-bordered w-full"
                    placeholder="Teléfono"
                />
                {errors.telefono && <p className="text-red-500">{errors.telefono.message}</p>}
            </div>

            <div>
                <label>Dirección</label>
                <input
                    {...register('direccion')}
                    className="input input-bordered w-full"
                    placeholder="Dirección"
                />
                {errors.direccion && <p className="text-red-500">{errors.direccion.message}</p>}
            </div>

            <BuscarComercioSelect onSelect={handleComercioSelect} />
            {comercioError && <p className="text-red-500">{comercioError}</p>}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="btn btn-success"
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
