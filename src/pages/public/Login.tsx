import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => setIsRegistering((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col justify-center md:flex-row">
      {/* Form Container */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center px-6 py-6 lg:py-12">
        <AnimatePresence mode="wait">
          {isRegistering ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg space-y-6 lg:shadow-xl p-6 lg:p-12 rounded-2xl lg:border border-gray-200"
            >
              <div className="flex flex-col items-center space-y-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoXnWNMmlDU1_f09QOXMzs5xRx5lT7IaEVEQ&s"
                  alt="Lotus Logo"
                  className="w-24 h-24"
                />
                <h2 className="text-2xl font-bold text-gray-800">Crear Cuenta</h2>
                <p className="text-sm text-gray-500">Regístrate para comenzar a ordenar</p>
              </div>

              <legend className="fieldset-legend">Username</legend>
              <input
                type="text"
                placeholder="Usuario"
                className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
              />
              <legend className="fieldset-legend">Correo</legend>

              <input
                type="email"
                placeholder="Correo electrónico"
                className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
              />
              <legend className="fieldset-legend">Direccion</legend>

              <input
                type="text"
                placeholder="Dirección"
                className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
              />
              <legend className="fieldset-legend">Password</legend>

              <input
                type="password"
                placeholder="Contraseña"
                className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
              />

              <button className="btn w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white border-none">
                REGISTRARSE
              </button>

              <div className="text-sm text-center text-gray-600">
                ¿Ya tienes una cuenta?
                <button
                  onClick={toggleForm}
                  className="ml-2 text-pink-500 hover:underline font-medium"
                >
                  INICIAR SESIÓN
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg space-y-6 lg:shadow-xl p-6 lg:p-12 rounded-2xl lg:border border-gray-200"
            >
              <div className="flex flex-col items-center space-y-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoXnWNMmlDU1_f09QOXMzs5xRx5lT7IaEVEQ&s"
                  alt="Lotus Logo"
                  className="w-24 h-24"
                />
                <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
                <p className="text-sm text-gray-500">Inicia sesión para continuar</p>
              </div>

              <legend className="fieldset-legend">Username</legend>
              <input
                type="text"
                placeholder="Usuario"
                className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
              />
              <legend className="fieldset-legend">Password</legend>

              <input
                type="password"
                placeholder="Contraseña"
                className="input w-full bg-gray-50 border border-gray-300 text-gray-700"
              />

              <button className="btn w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white border-none">
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
                  onClick={toggleForm}
                  className="ml-2 text-pink-500 hover:underline font-medium"
                >
                  REGÍSTRATE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Side - Background Image with Overlay */}
      <div className="hidden md:flex relative w-1/2 bg-[url('/login.png')] bg-cover bg-center justify-center items-center px-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-pink-800/40"></div>

        <div className="relative z-10 bg-white/90 p-10 rounded-3xl shadow-2xl text-center max-w-md backdrop-blur-md border border-white/40">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 mb-4">
            Servicio de Domicilios Express
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Únete a nuestra plataforma para <span className="font-semibold text-pink-600">gestionar tus pedidos</span> de forma rápida y eficiente. Entrega tus productos justo donde tus clientes los necesitan.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
