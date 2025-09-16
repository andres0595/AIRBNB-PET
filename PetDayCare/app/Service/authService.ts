import { LoginResponse } from "../Models/LoginResponse";
import Constants from "expo-constants";
const { apiUrl } = Constants.expoConfig?.extra || {};
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function changePassword(email: string): Promise<any> {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  } catch (error) {
    throw error;
  }
}
