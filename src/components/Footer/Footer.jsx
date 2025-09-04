import React from "react";
// import logo from "../../assets/logo-blanco.png"; // tu logo blanco

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo y redes */}
        <div>
          {/* <img src={logo} alt="PuppyPo" className="h-12 mb-4" /> */}
          <p className="mb-3">Síguenos en:</p>
          <div className="flex space-x-4 text-2xl">
            <span className="hover:text-blue-400 cursor-pointer">○</span>
            <span className="hover:text-pink-400 cursor-pointer">○</span>
            <span className="hover:text-green-400 cursor-pointer">○</span>
            <span className="hover:text-yellow-400 cursor-pointer">○</span>
          </div>
        </div>

        {/* Mapa del sitio */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Mapa del sitio</h4>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Lorem ipsum dolor</li>
            <li className="hover:text-white cursor-pointer">Lorem ipsum dolor</li>
            <li className="hover:text-white cursor-pointer">Lorem ipsum dolor</li>
            <li className="hover:text-white cursor-pointer">Lorem ipsum dolor</li>
            <li className="hover:text-white cursor-pointer">Lorem ipsum dolor</li>
          </ul>
        </div>

        {/* Más información */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Más información</h4>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Política de Privacidad</li>
            <li className="hover:text-white cursor-pointer">Lorem ipsum dolor</li>
            <li className="hover:text-white cursor-pointer">Lorem ipsum dolor</li>
            <li className="hover:text-white cursor-pointer">Lorem ipsum dolor</li>
            <li className="hover:text-white cursor-pointer">Lorem ipsum dolor</li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>2025 - Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
