import React from "react";
import { motion } from "framer-motion";

const servicios = [
  {
    titulo: "Alojamiento de mascotas",
    descripcion:
      "Pero debo explicarte cómo nació toda esta idea equivocada de denunciar el placer...",
    imagen: "/img/alojamiento.png",
  },
  {
    titulo: "Guardería de día",
    descripcion:
      "Los placeres son mayores cuando la mascota recibe atención personalizada...",
    imagen: "/img/guarderia.png",
  },
  {
    titulo: "Pasear perros",
    descripcion:
      "Nuestros cuidadores llevan a tu perro a dar paseos seguros y divertidos...",
    imagen: "/img/paseo.png",
  },
  {
    titulo: "Visita en tu casa",
    descripcion:
      "Un cuidador certificado puede visitar tu hogar y atender a tu mascota...",
    imagen: "/img/visita.png",
  },
];

function OurServices() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-left mb-8">Nuestros servicios</h2>

      <div className="flex flex-col gap-6">
        {servicios.map((service, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.01 }}
            className="flex flex-col md:flex-row items-center justify-between 
                       bg-gray-100 rounded-xl shadow-md p-6"
          >
            {/* Imagen de ejemplo (bloque gris por ahora) */}
            <div className="w-full md:w-1/3 h-40 bg-white rounded-lg shadow-inner flex items-center justify-center">
              <span className="text-gray-400">Imagen</span>
            </div>

            {/* Contenido */}
            <div className="w-full md:w-2/3 mt-4 md:mt-0 md:ml-6">
              <h3 className="text-lg font-semibold">{service.titulo}</h3>
              <p className="text-sm text-gray-700 mt-2">
                {service.descripcion}
              </p>

              <div className="flex gap-3 mt-4">
                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow">
                  Haz una reserva
                </button>
                <button className="bg-white border border-gray-400 text-gray-700 px-4 py-2 rounded-lg shadow">
                  Conviértete en cuidador
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    // <section className="w-full py-10 bg-gray-50">
    //   <div className="max-w-6xl mx-auto px-6">
    //     {/* Título */}
    //     <h2 className="text-2xl font-bold text-gray-800 mb-8">
    //       Nuestros servicios
    //     </h2>

    //     {/* Lista de servicios */}
    //     <div className="space-y-10">
    //       {servicios.map((servicio, index) => (
    //         <div
    //           key={index}
    //           className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-2xl overflow-hidden"
    //         >
    //           {/* Imagen */}
    //           <div className="w-full md:w-1/3 h-48 md:h-56 bg-gray-200 flex items-center justify-center">
    //             <img
    //               src={servicio.imagen}
    //               alt={servicio.titulo}
    //               className="object-contain h-32"
    //             />
    //           </div>

    //           {/* Texto */}
    //           <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
    //             <h3 className="text-lg font-semibold text-gray-800 mb-2">
    //               {servicio.titulo}
    //             </h3>
    //             <p className="text-sm text-gray-600 mb-4 text-justify">
    //               {servicio.descripcion}
    //             </p>

    //             {/* Botones */}
    //             <div className="flex gap-4">
    //               <button className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition">
    //                 Hacer una reserva
    //               </button>
    //               <button className="px-6 py-2 border border-gray-400 text-gray-800 rounded-full hover:bg-gray-100 transition">
    //                 Conviértete en cuidador
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>

    //     {/* Paginación (simulada con dots) */}
    //     <div className="flex justify-center mt-8 space-x-2">
    //       <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
    //       <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
    //       <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
    //       <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
    //     </div>
    //   </div>
    // </section>
  );
}
export default OurServices;
