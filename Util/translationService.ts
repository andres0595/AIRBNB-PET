// translationService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";

const GOOGLE_API_KEY = "TU_API_KEY_AQUI"; // Obtén una gratis en Google Cloud
const BASE_URL = "https://translation.googleapis.com/language/translate/v2";

interface TranslationResponse {
  data: {
    translations: Array<{
      translatedText: string;
    }>;
  };
}

class TranslationService {
  deviceLanguage: string;
  sourceLanguage: string;
  cache: Map<string, string>;

  constructor() {
    // Forma correcta de obtener el idioma del dispositivo
    const locales = getLocales();
    this.deviceLanguage = locales[0]?.languageCode || "en";
    this.sourceLanguage = "es"; // Idioma en que escribes tu app
    this.cache = new Map(); // Cache en memoria
  }

  // Traduce un texto automáticamente
  async translate(
    text: string,
    targetLang: string = this.deviceLanguage
  ): Promise<string> {
    // Si el idioma objetivo es el mismo que el original, retorna el texto
    if (targetLang === this.sourceLanguage) {
      return text;
    }

    // Verifica cache primero
    const cacheKey = `${text}_${targetLang}`;

    // Intenta obtener de AsyncStorage (cache persistente)
    try {
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) return cached;
    } catch (e) {
      console.log("Error leyendo cache:", e);
    }

    // Verifica cache en memoria
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const response = await fetch(`${BASE_URL}?key=${GOOGLE_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: this.sourceLanguage,
          target: targetLang,
          format: "text",
        }),
      });

      const data: TranslationResponse = await response.json();
      const translatedText = data.data.translations[0].translatedText;

      // Guarda en ambos caches
      this.cache.set(cacheKey, translatedText);
      await AsyncStorage.setItem(cacheKey, translatedText);

      return translatedText;
    } catch (error) {
      console.error("Error traduciendo:", error);
      return text; // Retorna el texto original si falla
    }
  }

  // Traduce múltiples textos de una vez (más eficiente)
  async translateBatch(
    texts: string[],
    targetLang: string = this.deviceLanguage
  ): Promise<string[]> {
    if (targetLang === this.sourceLanguage) {
      return texts;
    }

    // Verificar cuáles textos ya están en cache
    const cachedResults: string[] = [];
    const textsToTranslate: string[] = [];
    const textsToTranslateIndices: number[] = [];

    for (let i = 0; i < texts.length; i++) {
      const cacheKey = `${texts[i]}_${targetLang}`;

      // Verificar cache en memoria primero
      if (this.cache.has(cacheKey)) {
        cachedResults[i] = this.cache.get(cacheKey)!;
        continue;
      }

      // Verificar AsyncStorage
      try {
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          cachedResults[i] = cached;
          this.cache.set(cacheKey, cached); // Agregar a cache en memoria
          continue;
        }
      } catch (e) {
        console.log("Error leyendo cache:", e);
      }

      // Si no está en cache, agregar a lista para traducir
      textsToTranslate.push(texts[i]);
      textsToTranslateIndices.push(i);
    }

    // Si todos están en cache, retornar
    if (textsToTranslate.length === 0) {
      return cachedResults;
    }

    try {
      const response = await fetch(`${BASE_URL}?key=${GOOGLE_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: textsToTranslate,
          source: this.sourceLanguage,
          target: targetLang,
          format: "text",
        }),
      });

      const data: TranslationResponse = await response.json();
      const translations = data.data.translations.map((t) => t.translatedText);

      // Guardar traducciones en cache y combinar con resultados cacheados
      for (let i = 0; i < translations.length; i++) {
        const originalIndex = textsToTranslateIndices[i];
        const cacheKey = `${textsToTranslate[i]}_${targetLang}`;

        cachedResults[originalIndex] = translations[i];
        this.cache.set(cacheKey, translations[i]);
        await AsyncStorage.setItem(cacheKey, translations[i]);
      }

      return cachedResults;
    } catch (error) {
      console.error("Error traduciendo batch:", error);
      // Completar con textos originales donde falló la traducción
      for (const index of textsToTranslateIndices) {
        if (!cachedResults[index]) {
          cachedResults[index] = texts[index];
        }
      }
      return cachedResults;
    }
  }

  // Obtiene el idioma del dispositivo
  getDeviceLanguage(): string {
    return this.deviceLanguage;
  }

  // Obtiene información completa del locale
  getLocaleInfo() {
    return getLocales()[0];
  }

  // Limpia el cache
  async clearCache(): Promise<void> {
    this.cache.clear();
    try {
      const keys = await AsyncStorage.getAllKeys();
      const translationKeys = keys.filter((k) => k.includes("_"));
      await AsyncStorage.multiRemove(translationKeys);
    } catch (e) {
      console.error("Error limpiando cache:", e);
    }
  }
}

export default new TranslationService();
