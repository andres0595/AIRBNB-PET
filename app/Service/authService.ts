import Constants from "expo-constants";
import { LoginResponse } from "../Models/LoginResponse";
const { apiUrl } = Constants.expoConfig?.extra || {};
export async function login(
  correo: string,
  contrasena: string
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${apiUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contrasena }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function GenetateOtp(email: string): Promise<any> {
  const response = await fetch(`${apiUrl}auth/SendOtp?email=${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}


export async function ChangePassword(
  otp: number,
  email:string,
  newPassword: string
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${apiUrl}auth/ChangePassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, email,newPassword }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
