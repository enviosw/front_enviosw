import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogin } from "../../services/authServices";
import { useRegister } from "../../services/authServices";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FormRegister from "./Login/FormRegister";
import FormLogin from "./Login/FormLogin";

const Login: React.FC = () => {

const {isAuthenticated} =  useAuth()

const navigate = useNavigate();

useEffect(() => {
  if (isAuthenticated) {
    navigate(-1); // Navega a la página anterior si el usuario ya está autenticado
  }
}, [isAuthenticated, navigate]);

  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ nombre: "", apellido: "", direccion: "", telefono: "", telefono2: "", email: "", password: ""});

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleChange = (input:string, value:string) => {
    setForm({ ...form, [input]: value });
  };

  const handleLogin = () => {
    // e.preventDefault(); // Prevenir el comportamiento por defecto de recarga

    loginMutation.mutate({
      email: form.email,
      password: form.password,
    });
  };

  const handleRegister = () => {
    registerMutation.mutate({
      nombre: form.nombre,
      apellido: form.apellido,
      direccion: form.direccion,
      telefono: form.telefono,
      telefono2: form.telefono2,
      email: form.email,
      password: form.password,
      rol: "cliente",
    });
  };

  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
    setForm({ nombre: "", apellido: "", direccion: "", telefono: "", telefono2: "", email: "", password: ""});
  };

  return (
    <div className="min-h-screen flex flex-col justify-center md:flex-row">
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center px-6 py-6 lg:py-12">
        <AnimatePresence mode="wait">
          {isRegistering ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg space-y-1 lg:shadow-xl p-6 lg:p-12 rounded-2xl lg:border border-gray-200"
            >
              <FormRegister 
                onInputChange={handleChange} 
                handleRegister={handleRegister} 
                toggleForm={toggleForm}
                form={form} 
              />
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
              <FormLogin 
                onInputChange={handleChange} 
                handleLogin={handleLogin} 
                toggleForm={toggleForm}
                form={form} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Imagen de fondo */}
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
