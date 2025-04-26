import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type: string;
    value: string | boolean; // Aquí mantenemos el tipo string | boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    required?: boolean;
    placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, value, onChange, required = false, placeholder = '' }) => {
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
