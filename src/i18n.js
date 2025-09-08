import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: {
        welcome: "Bienvenido a PuppyPo",
        login: "Iniciar sesión",
        register: "Registrarse",
        blog: "Blog",
        services: "Conoce nuestros servicios",
        caregiver: "Conviértete en cuidador",
      },
    },
    en: {
      translation: {
        welcome: "Welcome to PuppyPo",
        login: "Login",
        register: "Register",
        blog: "Blog",
        services: "Discover our services",
        caregiver: "Become a caregiver",
      },
    },
    fr: {
      translation: {
        welcome: "Bienvenue à PuppyPo",
        login: "Se connecter",
        register: "S'inscrire",
        blog: "Blog",
        services: "Découvrez nos services",
        caregiver: "Devenez gardien",
      },
    },
  },
  lng: "es", // idioma inicial
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
