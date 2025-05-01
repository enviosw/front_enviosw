import React, { forwardRef } from 'react';

type InputFieldProps = {
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  accept?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'type'>;

const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(
  ({ label, type = 'text', required = false, placeholder = '', accept, ...rest }, ref) => {
    return (
      <div className="w-full mb-5">
        <label htmlFor={rest.name} className="block text-left text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {type === 'textarea' ? (
          <textarea
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            placeholder={placeholder}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition shadow-sm resize-none"
          />
        ) : type === 'file' ? (
          <input
            type="file"
            accept={accept}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
            ref={ref as React.Ref<HTMLInputElement>}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#E63946] file:text-white hover:file:bg-red-600 cursor-pointer"
          />
        ) : (
          <input
            type={type}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
            ref={ref as React.Ref<HTMLInputElement>}
            placeholder={placeholder}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition shadow-sm"
          />
        )}
      </div>
    );
  }
);

export default InputField;
