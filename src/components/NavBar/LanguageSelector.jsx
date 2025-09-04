import { useState } from "react";
import { ChevronDown } from "lucide-react";

function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("Español");

  const handleSelect = (lang) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1 hover:text-gray-900"
      >
        <span>{language}</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2">
          <button
            onClick={() => handleSelect("Español")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Español
          </button>
          <button
            onClick={() => handleSelect("Inglés")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Inglés
          </button>
          <button
            onClick={() => handleSelect("Francés")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Francés
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
