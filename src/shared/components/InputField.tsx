import React, { forwardRef } from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string | boolean | File | null;  // Permitimos File | null para manejar el archivo
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    required?: boolean;
    placeholder?: string;
    accept?: string;  // Añadimos 'accept' para especificar el tipo de archivo
}

const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(({
    label,
    name,
    type,
    value,
    onChange,
    required = false,
    placeholder = '',
    accept
}: InputFieldProps, ref: any) => {
    return (
        <div className="mb-4 relative bg-[#ffffff] w-full shadow rounded-lg py-2 border border-gray-400 hover:bg-gray-50">
            <label className="block text-sm font-medium text-white absolute left-1 px-2 rounded-2xl bg-[#ff6600] -top-2">{label}</label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value as string} // El valor para textarea sigue siendo un string
                    onChange={onChange}
                    className="mt-1 block w-full px-3 py-2 border-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required={required}
                    placeholder={placeholder}
                    ref={ref}  // Asignamos la referencia al textarea
                />
            ) : type === 'checkbox' ? (
                <label className="label cursor-pointer">
                    <span className="label-text">{label}</span>
                    <input
                        type="checkbox"
                        name={name}
                        checked={value as boolean} // Usamos 'checked' en lugar de 'value' para los checkbox
                        onChange={onChange}
                        className="checkbox checkbox-primary ml-2"
                        ref={ref}  // Asignamos la referencia al checkbox
                    />
                </label>
            ) : type === 'file' ? (
                <input
                    type="file"
                    name={name}
                    onChange={onChange}
                    className="mt-1 block w-full px-3 py-2 border-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required={required}
                    accept={accept} // Añadimos el atributo accept para filtrar los tipos de archivo
                    ref={ref}  // Asignamos la referencia al input de tipo file
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value as string} // Convertimos a string para otros tipos de input
                    onChange={onChange}
                    className="mt-1 block w-full px-3 py-2 border-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required={required}
                    placeholder={placeholder}
                    ref={ref}  // Asignamos la referencia al input normal
                />
            )}
        </div>
    );
});

export default InputField;
