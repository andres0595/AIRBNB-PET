import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import en from "../translations/en.json";
import es from "../translations/es.json";

// Obtener idioma actual del sistema
const getDeviceLanguage = () => {
  const locales = Localization.getLocales();
  if (locales && locales.length > 0) {
    return locales[0].languageCode || "en";
  }
  return "en";
};

export const i18n = new I18n(
  { es, en },
  {
    defaultLocale: "en",
    enableFallback: true,
    locale: getDeviceLanguage(),
  }
);

// Función para refrescar idioma si el usuario cambia de idioma
export const setI18nConfig = () => {
  i18n.locale = getDeviceLanguage();
};
