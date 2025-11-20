import Constants from "expo-constants";
import { LoginResponse } from "../../Models/Model-Login/LoginResponse";
import { Response } from "../../Models/Model-Response/Response";

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

export async function GenetateOtp(email: string): Promise<Response> {
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
  email: string,
  newPassword: string
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${apiUrl}auth/ChangePassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, email, newPassword }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function loginGoogle(token: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${apiUrl}auth/AuthGoogle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
export async function validateOtp(
  email: string,
  otp: number
): Promise<Response> {
  try {
    const response = await fetch(`${apiUrl}auth/ConfirmOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
