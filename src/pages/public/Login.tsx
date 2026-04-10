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
    <div className="min-h-screen flex flex-col justify-center md:flex-row bg-[#FAFAF7]">
      {/* Panel formulario */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center px-6 py-8 lg:py-14">
        <AnimatePresence mode="wait">
          {isRegistering ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-md space-y-1 lg:shadow-[0_4px_32px_rgba(28,14,6,0.1)] p-6 lg:p-10 rounded-3xl lg:border border-[#EDE8E3]"
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
              transition={{ duration: 0.35 }}
              className="w-full max-w-md space-y-5 lg:shadow-[0_4px_32px_rgba(28,14,6,0.1)] p-6 lg:p-10 rounded-3xl lg:border border-[#EDE8E3]"
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

      {/* Panel decorativo */}
      <div className="hidden md:flex relative w-1/2 bg-[url('/login.png')] bg-cover bg-center justify-center items-center px-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C0E06]/70 to-[#E8622A]/30" />
        <div className="relative z-10 bg-white/92 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center max-w-md border border-white/50">
          <div className="w-14 h-14 rounded-full bg-[#E8622A]/10 flex items-center justify-center mx-auto mb-5">
            <span className="text-3xl">🛵</span>
          </div>
          <h2 className="text-3xl font-bold text-[#1A1208] mb-3 leading-tight">
            Domicilios Express<br />
            <span className="text-[#E8622A]">en Pitalito</span>
          </h2>
          <p className="text-[#6B5E52] text-sm leading-relaxed">
            Únete a nuestra plataforma para{' '}
            <span className="font-semibold text-[#1A1208]">gestionar tus pedidos</span>{' '}
            de forma rápida y eficiente. Entrega tus productos justo donde tus clientes los necesitan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
