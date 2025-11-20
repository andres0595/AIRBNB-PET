// useTranslate.ts
import translationService from "@/Util/translationService";
import { useEffect, useState } from "react";

/**
 * Hook para traducir un texto individual
 * @param text - Texto a traducir
 * @param dependencies - Dependencias adicionales para re-traducir
 * @returns Objeto con el texto traducido y estado de carga
 */
export const useTranslate = (text: string, dependencies: any[] = []) => {
  const [translatedText, setTranslatedText] = useState<string>(text);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const doTranslation = async () => {
      setLoading(true);
      try {
        const result = await translationService.translate(text);
        if (isMounted) {
          setTranslatedText(result);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error en useTranslate:", error);
        if (isMounted) {
          setTranslatedText(text); // Fallback al texto original
          setLoading(false);
        }
      }
    };

    doTranslation();

    return () => {
      isMounted = false;
    };
  }, [text, ...dependencies]);

  return { text: translatedText, loading };
};

/**
 * Componente helper para traducir texto inline
 * @example <T>Hola mundo</T>
 */
interface TProps {
  children: string;
}

export const T = ({ children }: TProps): string => {
  const { text, loading } = useTranslate(children);
  return loading ? children : text;
};

/**
 * Hook para traducir múltiples textos de una vez (más eficiente)
 * @param texts - Array de textos a traducir
 * @returns Objeto con los textos traducidos y estado de carga
 */
export const useTranslateBatch = (texts: string[]) => {
  const [translatedTexts, setTranslatedTexts] = useState<string[]>(texts);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const doTranslation = async () => {
      setLoading(true);
      try {
        const results = await translationService.translateBatch(texts);
        if (isMounted) {
          setTranslatedTexts(results);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error en useTranslateBatch:", error);
        if (isMounted) {
          setTranslatedTexts(texts); // Fallback a textos originales
          setLoading(false);
        }
      }
    };

    doTranslation();

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(texts)]);

  return { texts: translatedTexts, loading };
};

/**
 * Hook para obtener el idioma actual del dispositivo
 */
export const useDeviceLanguage = () => {
  const [language, setLanguage] = useState<string>(
    translationService.getDeviceLanguage()
  );

  useEffect(() => {
    setLanguage(translationService.getDeviceLanguage());
  }, []);

  return language;
};

/**
 * Hook para traducción condicional (solo traduce si la condición es true)
 * Útil para optimizar cuando no siempre necesitas traducir
 */
export const useTranslateIf = (
  text: string,
  condition: boolean,
  dependencies: any[] = []
) => {
  const [translatedText, setTranslatedText] = useState<string>(text);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!condition) {
      setTranslatedText(text);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const doTranslation = async () => {
      setLoading(true);
      try {
        const result = await translationService.translate(text);
        if (isMounted) {
          setTranslatedText(result);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error en useTranslateIf:", error);
        if (isMounted) {
          setTranslatedText(text);
          setLoading(false);
        }
      }
    };

    doTranslation();

    return () => {
      isMounted = false;
    };
  }, [text, condition, ...dependencies]);

  return { text: translatedText, loading };
};
