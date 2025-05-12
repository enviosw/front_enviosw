import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FormRegisterInterface } from "../../../shared/types/registerLoginInterface";
import { z } from "zod";
import { formRegisterLoginSchema, formRegisterSchema } from "../../../shared/schemas/formLoginSchema";

type FormRegisterSchema = z.infer<typeof formRegisterSchema>;
type FormRegisterLoginSchema = z.infer<typeof formRegisterLoginSchema>;

const FormRegister: React.FC<FormRegisterInterface> = ({ onInputChange, handleRegister, toggleForm, form }) => {

    const [typeInputPassword, setTypeInputPassword] = useState('password');
    const [userCompleted, setUserCompleted] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormRegisterSchema, string>>>({});
    const [err, setErr] = useState<Partial<Record<keyof FormRegisterLoginSchema, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(e.target.name, e.target.value);
    };

    const handleContinue = () => {
        const result = formRegisterSchema.safeParse({
            name: form.nombre,
            lastName: form.apellido,
            phone: form.telefono,
            phone_2: form.telefono2,
            address: form.direccion,
        });

        if (result.success) {
            setErrors({});
            setUserCompleted(true);
        } else {
            const fieldErrors: Partial<Record<keyof FormRegisterSchema, string>> = {};
            result.error.errors.forEach((err) => {
                const field = err.path[0] as keyof FormRegisterSchema;
                fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
            setUserCompleted(false);
        }
    }

    const handleBack = () => {
        setUserCompleted(false);
    }


    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setTypeInputPassword('text');
        } else {
            setTypeInputPassword('password');
        }
    };

    const handleCompleteRegister = () => {
        const result = formRegisterLoginSchema.safeParse({
            email: form.email,
            password: form.password,
        });

        if (result.success) {
            setErr({});
            handleRegister()
        } else {
            const fieldErrors: Partial<Record<keyof FormRegisterLoginSchema, string>> = {};
            result.error.errors.forEach((err) => {
                const field = err.path[0] as keyof FormRegisterLoginSchema;
                fieldErrors[field] = err.message;
            });
            setErr(fieldErrors);
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
                <h2 className="text-2xl font-bold text-gray-800">Crear Cuenta</h2>
                <p className="text-sm text-gray-500">Regístrate para comenzar a ordenar</p>
            </div>

            <AnimatePresence mode="wait">
                {userCompleted ? (
                    <motion.div
                        key="dataCustomer"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-lg space-y-1 lg:shadow-xl p-6 lg:p-12 rounded-2xl lg:border border-gray-200"
                    >
                        <button
                            onClick={() => handleBack()}
                            className="bg-amber-950 text-white"
                        >
                            back
                        </button>

                        <legend className="fieldset-legend">Correo</legend>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Correo electrónico"
                            className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
                        />
                        {err.email && (
                            <p className="text-red-500 text-sm">{err.email}</p>
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
                        {err.password && (
                            <p className="text-red-500 text-sm">{err.password}</p>
                        )}

                        <input
                            type="checkbox"
                            onChange={handleCheck}
                            className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                        />
                        <label className="ml-2 text-sm text-gray-600">
                            ver contraseña
                        </label>

                        <button
                            onClick={handleCompleteRegister}
                            className="btn w-full bg-gradient-to-r mt-2 from-orange-500 via-pink-500 to-purple-600 text-white border-none"
                        >
                            REGISTRARSE
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="authCustomer"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-lg space-y-1 lg:shadow-xl p-6 lg:p-12 rounded-2xl lg:border border-gray-200"
                    >
                        <legend className="fieldset-legend">Nombre</legend>
                        <input
                            type="text"
                            name="nombre"
                            key="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                            className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name}</p>
                        )}

                        <legend className="fieldset-legend">Apellido</legend>
                        <input
                            type="text"
                            name="apellido"
                            key="apellido"
                            value={form.apellido}
                            onChange={handleChange}
                            placeholder="Apellido"
                            className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm">{errors.lastName}</p>
                        )}

                        <legend className="fieldset-legend">Dirección</legend>
                        <input
                            type="text"
                            name="direccion"
                            key="direccion"
                            value={form.direccion}
                            onChange={handleChange}
                            placeholder="Dirección"
                            className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address}</p>
                        )}

                        <legend className="fieldset-legend">Teléfono</legend>
                        <input
                            type="number"
                            name="telefono"
                            key="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                            placeholder="Número telefónico"
                            className="input w-full bg-gray-50 border border-gray-300 text-gray-700 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}

                        <legend className="fieldset-legend">Teléfono Secundario <span className="font-light text-gray-600">(opcional)</span></legend>
                        <input
                            type="number"
                            name="telefono2"
                            key="telefono2"
                            value={form.telefono2}
                            onChange={handleChange}
                            placeholder="Número telefónico"
                            className="input w-full bg-gray-50 border border-gray-300 text-gray-700 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        {errors.phone_2 && (
                            <p className="text-red-500 text-sm">{errors.phone_2}</p>
                        )}

                        <button
                            onClick={() => handleContinue()}
                            className="btn w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white border-none"
                        >
                            CONTINUAR
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="text-sm text-center text-gray-600">
                ¿Ya tienes una cuenta?
                <button
                    onClick={() => toggleForm()}
                    className="ml-2 text-pink-500 hover:underline font-medium"
                >
                    INICIAR SESIÓN
                </button>
            </div>
        </>
    );
}

export default FormRegister;