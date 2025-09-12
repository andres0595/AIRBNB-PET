import { Link } from "react-router-dom";
import { Search, User } from "lucide-react"; // íconos
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
function Navbar() {
  const { t } = useTranslation();
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center z-50 bg-transparent">
      <div className="w-full max-w-6xl px-6 py-3 shadow-md bg-white rounded-full mt-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/Dashboard" className="flex items-center space-x-2">
          <img src="/logoPuppy.png" alt="PuppyPo" className="h-10" />
        </Link>

        {/* Links */}
        <div className="flex space-x-8 text-gray-700 font-medium">
          <Link to="/cuidador" className="hover:text-gray-900">
            {t("caregiver")}
          </Link>
          <Link to="/OurService" className="hover:text-gray-900">
            {t("services")}
          </Link>
          <Link to="/Blog" className="hover:text-gray-900">
            {t("blog")}
          </Link>
          <Link to="/Support" className="hover:text-gray-900">
            {t("soporte")}
          </Link>
        </div>

        {/* Acciones */}
        <div className="flex items-center space-x-6 text-gray-700">
          <Link to="/register" className="hover:text-gray-900">
            {t("register")}
          </Link>
          <Link
            to="/login"
            className="flex items-center space-x-1 hover:text-gray-900"
          >
            <User size={18} />
            <span>{t("login")}</span>
          </Link>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-900">
            {/* Idioma */}
            <LanguageSelector />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Search size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
