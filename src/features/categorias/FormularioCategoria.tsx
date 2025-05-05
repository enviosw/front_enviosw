import React from 'react';
import { useRegistrarCategoria, useActualizarCategoria } from '../../services/categoriasServices';
import { CategoriaType } from '../../shared/types/categoriaInterface';

const FormularioCategoria: React.FC<{ categoria?: CategoriaType }> = ({ categoria }) => {
    const { mutate: registrarCategoria } = useRegistrarCategoria();
    const { mutate: actualizarCategoria } = useActualizarCategoria();

    const onSubmit = (data: CategoriaType) => {
        if (categoria?.id) {
            // Si existe un id, actualiza la categoría
            actualizarCategoria(data);
        } else {
            // Si no existe un id, registra una nueva categoría
            registrarCategoria(data);
        }
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;  // Type assertion
            const formData = new FormData(form);  // Usa el formulario con el tipo correcto
            const data: CategoriaType = {
                nombre: formData.get('nombre') as string,
                descripcion: formData.get('descripcion') as string,
            };
            onSubmit(data);
        }}>
            <input type="text" name="nombre" defaultValue={categoria?.nombre || ''} placeholder="Nombre" />
            <textarea name="descripcion" defaultValue={categoria?.descripcion || ''} placeholder="Descripción" />
            <button type="submit">{categoria ? 'Actualizar' : 'Registrar'} Categoría</button>
        </form>
        
    );
};

export default FormularioCategoria;
