import { ResponseRequest } from "@/Models/Model-Response/Response";
import { RegisterData } from "@/Models/Model-Users/RegisterData";
import Constants from "expo-constants";
const { apiUrl } = Constants.expoConfig?.extra || {};

export async function CreateOrUpdateUsers(
  _DataRegister: RegisterData
): Promise<ResponseRequest> {
  try {
    const response = await fetch(`${apiUrl}Users/CrearOrUpdateUsers`, {
      // Cambié a /register
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_DataRegister),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrar usuario");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function GetDocumentTypes(): Promise<ResponseRequest> {
  try {
    const url = `${apiUrl}users/ListDocumentTypes`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error("❌ Respuesta no OK:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function GetDocumentTypesWithRetry(
  retries = 3
): Promise<ResponseRequest> {
  for (let i = 0; i < retries; i++) {
    try {
      return await GetDocumentTypes();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Reintento ${i + 1}/${retries}...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1))); // Backoff exponencial
    }
  }
  throw new Error("Todos los reintentos fallaron");
}
