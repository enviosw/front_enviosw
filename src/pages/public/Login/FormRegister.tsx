import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FormRegisterInterface } from "../../../shared/types/registerLoginInterface";

const FormRegister: React.FC<FormRegisterInterface> = ({ onInputChange, handleRegister, toggleForm, form }) => {


    const [userCompleted, setUserCompleted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(e.target.name, e.target.value);
    };

    const handleContinue = () => {
        if (   form.nombre !== "" 
            && form.apellido !== ""
            && form.direccion !== ""
            && form.telefono !== ""
        ) {
            setUserCompleted(true);
        } else {
            setUserCompleted(false);
        }
    }

    const handleBack = () => {
        setUserCompleted(false);
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

                    <legend className="fieldset-legend">Contraseña</legend>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
                    />

                    <button
                        onClick={() => handleRegister()}
                        className="btn w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white border-none"
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
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
                    />

                    <legend className="fieldset-legend">Apellido</legend>
                    <input
                        type="text"
                        name="apellido"
                        value={form.apellido}
                        onChange={handleChange}
                        placeholder="Apellido"
                        className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
                    />

                    <legend className="fieldset-legend">Dirección</legend>
                    <input
                        type="text"
                        name="direccion"
                        value={form.direccion}
                        onChange={handleChange}
                        placeholder="Dirección"
                        className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
                    />

                    <legend className="fieldset-legend">Celular</legend>
                    <input
                        type="number"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        placeholder="Número telefónico"
                        className="input w-full bg-gray-50 border border-gray-300 text-gray-700 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />

                    <legend className="fieldset-legend">Teléfono</legend>
                    <input
                        type="number"
                        name="telefono2"
                        value={form.telefono2}
                        onChange={handleChange}
                        placeholder="Número telefónico"
                        className="input w-full bg-gray-50 border border-gray-300 text-gray-700 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />

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