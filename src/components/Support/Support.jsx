import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "¿Lorem ipsum dolor sit amet?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "¿Lorem ipsum dolor sit amet?",
    answer:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "¿Lorem ipsum dolor sit amet?",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question: "¿Lorem ipsum dolor sit amet?",
    answer:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    question: "¿Lorem ipsum dolor sit amet?",
    answer:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    question: "¿Lorem ipsum dolor sit amet?",
    answer:
      "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
];

function Support() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(faqs.length - visibleCards, 0) : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= faqs.length - visibleCards ? 0 : prev + 1
    );
  };
  return (
    <div className="w-full flex flex-col items-center bg-gray-50">
      {/* Sección de Preguntas frecuentes */}
      <div className="w-full flex flex-col items-center justify-center py-12 bg-white">
        <h2 className="text-2xl font-bold mb-10 text-gray-800">
          Preguntas frecuentes y soporte
        </h2>

        <h3 className="text-xl font-semibold mb-8 text-gray-700">
          Preguntas frecuentes
        </h3>

        <div className="relative w-3/4 flex items-center">
          {/* Botón Izquierdo */}
          <button
            onClick={prevSlide}
            className="absolute -left-6 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carrusel */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  (currentIndex * 100) / visibleCards
                }%)`,
                width: `${(faqs.length * 100) / visibleCards}%`,
              }}
            >
              {faqs.map((faq, index) => (
                <div key={index} className="w-1/3 flex-shrink-0 px-3">
                  <div className="bg-white border rounded-xl shadow p-6 h-full flex flex-col text-center">
                    <div className="text-4xl mb-4 text-gray-400">?</div>
                    <h4 className="font-semibold mb-3 text-gray-700">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 text-sm text-justify">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón Derecho */}
          <button
            onClick={nextSlide}
            className="absolute -right-6 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Sección de Centro de Soporte */}
      <div className="w-full flex flex-col items-center justify-center py-12 bg-gray-100">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow p-10">
          {/* Título y descripción */}
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            Centro de Soporte PuppyPo
          </h3>
          <p className="text-gray-600 text-sm mb-8">
            Estamos aquí para ayudarte. Si tienes algún problema con tu reserva,
            tu registro, el uso en la plataforma o cualquier otra inquietud, por
            favor completa el siguiente formulario. Nuestro equipo revisará tu
            solicitud y te responderá lo antes posible
          </p>

          {/* Formulario */}
          <form className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo:*
              </label>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Correo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico de contacto:*
              </label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción del problema:*
              </label>
              <textarea
                rows="5"
                placeholder="Cuéntanos qué pasó con el mayor detalle posible para poder ayudarte mejor"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
              ></textarea>
            </div>

            {/* Adjuntar archivo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adjuntar archivo/captura (opcional)
              </label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 
                           rounded-lg p-6 cursor-pointer hover:border-pink-400 transition"
              >
                <div className="text-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-10 w-10 mb-2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0112 3v1a4 4 0 013.09 6.917A4.992 4.992 0 0117 16H7zm5 4v-8m0 0l-3 3m3-3l3 3"
                    />
                  </svg>
                  <p className="text-sm">Tamaño del archivo - PNG, JPG, PDF</p>
                </div>
              </label>
            </div>

            {/* Botón */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md 
                           hover:bg-gray-900 transition"
              >
                Enviar solicitud
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Support;
