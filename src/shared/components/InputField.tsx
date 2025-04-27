import React from 'react';

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

const InputField: React.FC<InputFieldProps> = ({ label, name, type, value, onChange, required = false, placeholder = '', accept }) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value as string} // El valor para textarea sigue siendo un string
                    onChange={onChange}
                    className="textarea textarea-bordered w-full"
                    required={required}
                    placeholder={placeholder}
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
                    />
                </label>
            ) : type === 'file' ? (
                <input
                    type="file"
                    name={name}
                    onChange={onChange}
                    className="input input-bordered w-full"
                    required={required}
                    accept={accept} // Añadimos el atributo accept para filtrar los tipos de archivo
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value as string} // Convertimos a string para otros tipos de input
                    onChange={onChange}
                    className="input input-bordered w-full"
                    required={required}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};

export default InputField;
