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

export default function FaqCarousel() {
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
    <div className="w-full flex flex-col items-center justify-center py-10">
      <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>

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
              transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
              width: `${(faqs.length * 100) / visibleCards}%`,
            }}
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="w-1/3 flex-shrink-0 px-2" // ✅ cada card ocupa 1/3
              >
                <div className="bg-white shadow-lg rounded-2xl p-6 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-5xl mb-4 text-pink-500">❓</div>
                    <h3 className="font-semibold mb-4">{faq.question}</h3>
                    <p className="text-gray-600 text-justify">{faq.answer}</p>
                  </div>
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
  );
}
