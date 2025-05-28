import { useState } from "react";
import { FormLoginInterface } from "../../../shared/types/registerLoginInterface";
import { z } from "zod";
import { formLoginSchema } from "../../../shared/schemas/formLoginSchema";

type FormLoginSchema = z.infer<typeof formLoginSchema>;


const FormLogin: React.FC<FormLoginInterface> = ({ onInputChange, handleLogin, toggleForm, form }) => {

  const [typeInputPassword, setTypeInputPassword] = useState('password');    
  const [errors, setErrors] = useState<Partial<Record<keyof FormLoginSchema, string>>>({});
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onInputChange(e.target.name, e.target.value);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setTypeInputPassword('text');
    } else {
      setTypeInputPassword('password');
    }
  };

  const handleCompletedLogin = () => {
    const result = formLoginSchema.safeParse({
      email: form.email,
      password: form.password,
    });

    if (result.success) {
      setErrors({});
      handleLogin()
    } else {
      const fieldErrors: Partial<Record<keyof FormLoginSchema, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormLoginSchema;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
    }

  }

  return (
    <>
      <div className="flex flex-col items-center space-y-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoXnWNMmlDU1_f09QOXMzs5xRx5lT7IaEVEQ&s"
          alt="Logo"
          className="w-24 h-24"
        />
        <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
        <p className="text-sm text-gray-500">Inicia sesión para continuar</p>
      </div>

      <legend className="fieldset-legend">Correo</legend>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
        className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
      />
      {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
      )}

      <legend className="fieldset-legend">Contraseña</legend>
      <input
        type={typeInputPassword}
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Contraseña"
        className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
      />
      {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
      )}

      <div className="flex items-center">
        <input
          type="checkbox"
          onChange={handleCheck}
          className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
        />

        <label className="ml-2 text-sm text-gray-600">
          ver contraseña
        </label>

      </div>


      <button
        onClick={handleCompletedLogin}
        className="btn w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white border-none"
      >
        INICIAR SESIÓN
      </button>

      <div className="text-right">
        <a href="#" className="text-sm text-pink-500 hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <div className="text-sm text-center text-gray-600">
        ¿No tienes una cuenta?
        <button
          onClick={() => toggleForm()}
          className="ml-2 text-pink-500 hover:underline font-medium"
        >
          REGÍSTRATE
        </button>
      </div>
    </>
  )
}

export default FormLogin;