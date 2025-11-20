import { ResponseRequest } from "@/Models/Model-Response/Response";
import { ServiceData } from "@/Models/Model-Users/ServiceData";
import Constants from "expo-constants";
const { apiUrl } = Constants.expoConfig?.extra || {};

export async function GetServices(): Promise<ResponseRequest<ServiceData[]>> {
  try {
    const response = await fetch(`${apiUrl}Services/ListServices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los servicios");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
