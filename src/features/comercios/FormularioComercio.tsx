import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { comercioSchema } from '../../shared/schemas/comercioSchema';
import { useActualizarComercio, useCrearComercio } from '../../services/comerciosService';
import { useServicios } from '../../services/serviciosServices';


interface FormularioComercioProps {
    comercio?: Partial<ComercioFormData> & {
        id?: number;
        servicio?: { id: number } | any;
    };
}



type ComercioFormData = z.infer<typeof comercioSchema>;

const FormularioComercio: React.FC<FormularioComercioProps> = ({ comercio }) => {
    const crearMutation = useCrearComercio();
    const actualizarMutation = useActualizarComercio();

    const { data: tiposComercio, isLoading } = useServicios();


    const [logo, setLogo] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ComercioFormData>({
        resolver: zodResolver(comercioSchema),
        defaultValues: {
            ...comercio,
            servicio_id: comercio?.servicio?.id ?? comercio?.servicio_id ?? '',
        },
    });


    const onSubmit = (data: ComercioFormData) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key as keyof ComercioFormData] as string);
        }

        if (logo) {
            formData.append('logo', logo);
        }


        if (comercio?.id) {
            formData.append('id', comercio.id.toString()); // 👈 esto debe ir ANTES de llamar a mutate()
            actualizarMutation.mutate(formData);
            reset();
        } else {
            crearMutation.mutate(formData);
            reset();
        }
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setLogo(e.target.files[0]);
    };

    const isPending = comercio?.id ? actualizarMutation.isPending : crearMutation.isPending;
    const isError = comercio?.id ? actualizarMutation.isError : crearMutation.isError;
    const error = comercio?.id ? actualizarMutation.error : crearMutation.error;


    if (isLoading) return <p className="text-center">Cargando tipos de comercio...</p>;


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-0 lg:p-4 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Nombre Comercial</label>
                    <input {...register('nombre_comercial')}
                        className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                    />
                    {errors.nombre_comercial && <p className="text-red-500">{errors.nombre_comercial.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Razón Social</label>
                    <input {...register('razon_social')} className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50" />
                    {errors.razon_social && <p className="text-red-500">{errors.razon_social.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">NIT</label>
                    <input {...register('nit')} className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50" />
                    {errors.nit && <p className="text-red-500">{errors.nit.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Responsable</label>
                    <input {...register('responsable')} className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50" />
                    {errors.responsable && <p className="text-red-500">{errors.responsable.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Email de Contacto</label>
                    <input type="email" {...register('email_contacto')} className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50" />
                    {errors.email_contacto && <p className="text-red-500">{errors.email_contacto.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Teléfono</label>
                    <input {...register('telefono')} className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50" />
                    {errors.telefono && <p className="text-red-500">{errors.telefono.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Teléfono envios w</label>
                    <input
                        {...register('telefono_secundario')}
                        defaultValue={comercio?.id ? comercio.telefono_secundario : '3134089563'}
                        disabled={!comercio?.id}
                        className={`p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out 
    focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 
    ${!comercio?.id ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Dirección</label>
                    <input {...register('direccion')} className="p-3 border border-gray-300 rounded-lg w-full appearance-none transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50" />
                    {errors.direccion && <p className="text-red-500">{errors.direccion.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Logo</label>
                    <input type="file" name="logo" onChange={handleLogoChange} accept="image/*"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white
                        file:mr-4 file:py-3 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-gray-400 file:text-white
                        hover:file:bg-gray-800
                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
                        transition-all duration-300 ease-in-out"
                    />
                </div>

                {comercio?.id && (
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


                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Tipo de Comercio</label>
                    <select {...register('servicio_id')}
                        className="p-3 border border-gray-300 rounded-lg w-full transition-all duration-300 ease-in-out focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                    >
                        {tiposComercio?.filter(t => t.estado === 'activo').map(t => (
                            <option key={t.id} value={t.id}>
                                {t.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.servicio_id && <p className="text-red-500">{errors.servicio_id.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Descripción</label>
                <textarea {...register('descripcion')} className="textarea textarea-bordered w-full" rows={4} />
                {errors.descripcion && <p className="text-red-500">{errors.descripcion.message}</p>}
            </div>

            <div className="flex justify-center mt-8">
                <button type="submit"
                    className="py-3 px-8 bg-orange-500 text-white font-bold rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPending}
                >
                    {isPending
                        ? comercio?.id ? 'Actualizando...' : 'Registrando...'
                        : comercio?.id ? 'Actualizar Comercio' : 'Registrar Comercio'}
                </button>
            </div>

            {isError && <p className="text-red-500 mt-4">{error?.message}</p>}
        </form>
    );
};

export default FormularioComercio;
