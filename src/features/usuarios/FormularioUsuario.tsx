import React, { useState, useEffect } from 'react';
import { Usuario } from '../../shared/types/usuariosInterface'; // Asegúrate de que la ruta sea correcta
import InputField from '../../shared/components/InputField'; // Importamos el componente InputField
import SelectField from '../../shared/components/SelectField'; // Importamos el componente SelectField
import { useCrearUsuario } from '../../services/usuariosServices'; // Hook para crear usuarios
import { useRolesUsuario } from '../../services/rolesServices'; // Hook para obtener los roles de usuario

const FormularioUsuario: React.FC<{ usuario?: Usuario }> = ({ usuario }) => {
    const { mutate, isPending, isError, error } = useCrearUsuario(); // Hook para crear el usuario
    const { data: roles, isLoading } = useRolesUsuario(); // Obtenemos los roles de los usuarios

    // Inicializamos el estado con los valores del formulario, si es para editar un usuario
    const [formulario, setFormulario] = useState<Omit<Usuario, 'id' | 'fecha_creacion' | 'fecha_actualizacion'>>({
        nombre: '',
        email: '',
        password: '',
        rol: 'usuario',
        estado: 'activo',
    });

    // Si se pasa un usuario, pre-cargamos los datos en el formulario
    useEffect(() => {
        if (usuario) {
            setFormulario({
                nombre: usuario.nombre,
                email: usuario.email,
                password: '',  // En el caso de edición, el campo password podría dejarse vacío
                rol: usuario.rol,
                estado: usuario.estado,
            });
        }
    }, [usuario]);

    // Manejamos los cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormulario(prev => ({
            ...prev,
            [name]: value, // Para todos los inputs y selects, usamos el 'value'
        }));
    };

    // Manejamos el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formulario); // Enviamos los datos del formulario
    };

    if (isLoading) {
        return <div>Cargando Roles...</div>;
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField
                    label="Nombre"
                    name="nombre"
                    type="text"
                    value={formulario.nombre}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formulario.email}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={String(formulario.password)}
                    onChange={handleChange}
                    required={!usuario} // Solo es requerido para crear, no para editar
                />
                <SelectField
                    label="Rol"
                    name="rol"
                    value={formulario.rol}
                    onChange={handleChange}
                    options={roles?.map(role => ({
                        value: role.id ?? '0',
                        label: role.nombre ?? 'Sin nombre',
                    })) || []}
                    required
                />
                <SelectField
                    label="Estado"
                    name="estado"
                    value={formulario.estado}
                    onChange={handleChange}
                    options={[
                        { value: 'activo', label: 'Activo' },
                        { value: 'inactivo', label: 'Inactivo' },
                    ]}
                    required
                />
            </form>

            <div className="flex justify-end w-full mt-6">
                <button onClick={handleSubmit} className="btn btn-success" disabled={isPending}>
                    {isPending ? 'Registrando...' : 'Registrar Usuario'}
                </button>
            </div>

            {isError && <p className="text-red-500 mt-4">{error?.message}</p>}
        </>
    );
};

export default FormularioUsuario;
