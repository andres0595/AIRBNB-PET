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
    const response = await fetch(`${apiUrl}users/ListDocumentTypes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener tipos de documento");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
