import React, { forwardRef } from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | boolean | File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  accept?: string;
}

const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder = '',
  accept
}, ref) => {
  return (
    <div className="w-full mb-5">
      <label htmlFor={name} className="block text-left text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value as string}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition shadow-sm resize-none"
          rows={4}
        />
      ) : type === 'checkbox' ? (
        <div className="flex items-center gap-2">
          <input
            id={name}
            type="checkbox"
            name={name}
            checked={value as boolean}
            onChange={onChange}
            ref={ref as React.Ref<HTMLInputElement>}
            className="h-5 w-5 text-[#E63946] border-gray-300 rounded focus:ring-[#E63946]"
          />
          <label htmlFor={name} className="text-sm text-gray-800">{label}</label>
        </div>
      ) : type === 'file' ? (
        <input
          id={name}
          type="file"
          name={name}
          onChange={onChange}
          required={required}
          accept={accept}
          ref={ref as React.Ref<HTMLInputElement>}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#E63946] file:text-white hover:file:bg-red-600 cursor-pointer"
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value as string}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          ref={ref as React.Ref<HTMLInputElement>}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition shadow-sm"
        />
      )}
    </div>
  );
});

export default InputField;
