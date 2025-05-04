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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label>Nombre Comercial</label>
                    <input {...register('nombre_comercial')} className="input input-bordered w-full" />
                    {errors.nombre_comercial && <p className="text-red-500">{errors.nombre_comercial.message}</p>}
                </div>

                <div>
                    <label>Razón Social</label>
                    <input {...register('razon_social')} className="input input-bordered w-full" />
                    {errors.razon_social && <p className="text-red-500">{errors.razon_social.message}</p>}
                </div>

                <div>
                    <label>NIT</label>
                    <input {...register('nit')} className="input input-bordered w-full" />
                    {errors.nit && <p className="text-red-500">{errors.nit.message}</p>}
                </div>

                <div>
                    <label>Responsable</label>
                    <input {...register('responsable')} className="input input-bordered w-full" />
                    {errors.responsable && <p className="text-red-500">{errors.responsable.message}</p>}
                </div>

                <div>
                    <label>Email de Contacto</label>
                    <input type="email" {...register('email_contacto')} className="input input-bordered w-full" />
                    {errors.email_contacto && <p className="text-red-500">{errors.email_contacto.message}</p>}
                </div>

                <div>
                    <label>Teléfono</label>
                    <input {...register('telefono')} className="input input-bordered w-full" />
                    {errors.telefono && <p className="text-red-500">{errors.telefono.message}</p>}
                </div>

                <div>
                    <label>Teléfono Secundario</label>
                    <input {...register('telefono_secundario')} className="input input-bordered w-full" />
                </div>

                <div>
                    <label>Dirección</label>
                    <input {...register('direccion')} className="input input-bordered w-full" />
                    {errors.direccion && <p className="text-red-500">{errors.direccion.message}</p>}
                </div>

                <div>
                    <label>Logo</label>
                    <input type="file" name="logo" onChange={handleLogoChange} accept="image/*" className="file-input file-input-bordered w-full" />
                </div>

                {comercio?.id && (
                    <div>
                        <label>Estado</label>
                        <select {...register('estado')} className="select select-bordered w-full">
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                        {errors.estado && <p className="text-red-500">{errors.estado.message}</p>}
                    </div>
                )}


                <div>
                    <label>Tipo de Comercio</label>
                    <select {...register('servicio_id')} className="select select-bordered w-full">
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
                <label>Descripción</label>
                <textarea {...register('descripcion')} className="textarea textarea-bordered w-full" rows={4} />
                {errors.descripcion && <p className="text-red-500">{errors.descripcion.message}</p>}
            </div>

            <button type="submit" className="btn btn-success" disabled={isPending}>
                {isPending
                    ? comercio?.id ? 'Actualizando...' : 'Registrando...'
                    : comercio?.id ? 'Actualizar Comercio' : 'Registrar Comercio'}
            </button>

            {isError && <p className="text-red-500 mt-4">{error?.message}</p>}
        </form>
    );
};

export default FormularioComercio;
