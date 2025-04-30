import React, { useState } from 'react';
import { Comercio } from '../../shared/types/comercioInterface';
import InputField from '../../shared/components/InputField'; // Importamos el nuevo componente
import SelectField from '../../shared/components/SelectField'; // Importamos el nuevo componente
import { useCrearComercio } from '../../services/comerciosService'; // Importamos el hook de la mutación
import { useServicios } from '../../services/serviciosServices';


const FormularioComercio: React.FC = () => {
    const { mutate, isPending, isError, error } = useCrearComercio(); // Usamos el hook
    const { data: tiposComercio, isLoading } = useServicios(); // Cargamos los tipos de comercio
    const [logo, setLogo] = useState<File | null>(null);  // Estado para manejar el archivo

    const [formulario, setFormulario] = useState<Omit<Comercio, 'id' | 'categoria' | 'fecha_creacion' | 'fecha_actualizacion' | 'tipo'>>({
        nombre_comercial: '',
        razon_social: '',
        nit: '',
        descripcion: '',
        responsable: '',
        email_contacto: '',
        telefono: '',
        telefono_secundario: '',
        direccion: '',
        logo_url: '',
        activo: '', // Utilizamos string para los valores del select
        servicio_id: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormulario(prev => ({
            ...prev,
            [name]: value, // Para todos los inputs y selects, usamos el 'value'
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        // Agregar todos los campos del formulario a FormData
        for (const key in formulario) {
            if (formulario.hasOwnProperty(key)) {
                formData.append(key, formulario[key as keyof typeof formulario]);
            }
        }

        // Agregar el archivo (logo) si está presente
        if (logo) {
            formData.append("logo", logo);
        }

        // Llamamos al mutate con FormData
        mutate(formData); // Los datos se envían como FormData, lo que incluye los archivos
    };


    if (isLoading) {
        return <div>Error cargando los tipos de comercio</div>;
    }


    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (e.target instanceof HTMLInputElement && e.target.files) {
            const file = e.target.files[0];
            setLogo(file);  // Asignamos el archivo seleccionado al estado
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
                <InputField
                    label="Nombre Comercial"
                    name="nombre_comercial"
                    type="text"
                    value={formulario.nombre_comercial}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Razón Social"
                    name="razon_social"
                    type="text"
                    value={formulario.razon_social}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="NIT"
                    name="nit"
                    type="text"
                    value={formulario.nit}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Responsable"
                    name="responsable"
                    type="text"
                    value={formulario.responsable}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Descripción"
                    name="descripcion"
                    type="textarea"
                    value={formulario.descripcion}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Email de Contacto"
                    name="email_contacto"
                    type="email"
                    value={formulario.email_contacto}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Teléfono"
                    name="telefono"
                    type="text"
                    value={formulario.telefono}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Teléfono Secundario"
                    name="telefono_secundario"
                    type="text"
                    value={formulario.telefono_secundario}
                    onChange={handleChange}
                />
                <InputField
                    label="Dirección"
                    name="direccion"
                    type="text"
                    value={formulario.direccion}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Logo"
                    name="logo"
                    type="file"
                    value={logo || null}  // Set the value to the file or null
                    onChange={handleLogoChange}
                    accept="image/*"  // Accept only image files
                />

                {/* Aquí usamos SelectField para el estado 'activo' */}
                <SelectField
                    label="Activo"
                    name="activo"
                    value={String(formulario.activo)}
                    onChange={handleChange}
                    options={[
                        { value: 'true', label: 'Activo' },
                        { value: 'false', label: 'Inactivo' },
                    ]}
                    required
                />
                <SelectField
                    label="Tipo de Comercio"
                    name="tipo"
                    value={formulario.servicio_id || 0}
                    onChange={handleChange}
                    options={tiposComercio?.filter(tipo => tipo.estado == 'activo').map(tipo => ({
                        value: tipo.id ?? 0,  // Si `tipo.id` es `undefined`, asigna `0` como valor por defecto
                        label: tipo.nombre ?? 'Sin nombre',  // Si `tipo.nombre` es `undefined`, asigna 'Sin nombre'
                    })) || []}
                    required
                />

            </form>

            <div className="flex justify-end w-full mt-6">
                <button onClick={handleSubmit} className="btn btn-success" disabled={isPending}>
                    {isPending ? 'Registrando...' : 'Registrar Comercio'}
                </button>
            </div>

            {isError && <p className="text-red-500 mt-4">{error?.message}</p>}
        </>
    );
};

export default FormularioComercio;
