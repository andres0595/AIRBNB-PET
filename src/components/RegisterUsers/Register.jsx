// src/components/Register.tsx
import React from "react";
import { motion } from "framer-motion";

function Register() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <motion.div
        initial={{ opacity: 0 }} // Estado inicial invisible
        animate={{ opacity: 1 }} // Estado final visible
        transition={{ duration: 1 }} // Duración 1s
        className="w-1/2 flex flex-col justify-center items-center bg-white p-10"
      > */}
      {/* Columna izquierda */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Regístrate en PuppyPo
        </h2>

        <form className="w-full max-w-sm space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre *
            </label>
            <input
              type="text"
              placeholder="Nombre"
              className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido *
            </label>
            <input
              type="text"
              placeholder="Apellido"
              className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Código postal */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Código postal *
            </label>
            <input
              type="text"
              placeholder="Código postal"
              className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Correo electrónico */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico *
            </label>
            <input
              type="email"
              placeholder="Usuario"
              className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Crear una contraseña *
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Repite contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Repite contraseña *
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="text-sm text-gray-600">
              Aceptar{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                política privacidad de datos
              </a>
            </label>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full rounded-full bg-gray-700 text-white py-2 text-sm font-medium hover:bg-gray-800 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
      {/* </motion.div> */}

      {/* Columna derecha */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-300">
        <div className="w-3/4 h-60 bg-white rounded-xl shadow-md mb-6"></div>
        <p className="text-sm text-gray-700">
          ¿No tienes una cuenta de PuppyPo?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
