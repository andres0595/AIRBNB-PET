import { i18n } from "@/i18n/translations";
import { login, loginGoogle } from "@/Service/Service-Login/authService";
import { setCredentials } from "@/Store/authSlice";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useLogin = (showModal: Function) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) return false;
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/;
    return emailRegex.test(email.trim());
  };

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      showModal(
        i18n.t("alerts.nodata"),
        "information-circle",
        i18n.t("general.Data_missing")
      );
      return;
    }

    if (!validateEmail(email)) {
      showModal(
        i18n.t("alerts.alertemailInvalid"),
        "alert-circle",
        i18n.t("alerts.emailInvalid")
      );
      return;
    }

    setLoading(true);
    try {
      const response = await login(email, password);

      if (!response.flag) {
        showModal(
          "Usuario no encontrado",
          "alert-circle",
          i18n.t("login.errorlogin")
        );
        return;
      }

      dispatch(
        setCredentials({
          token: response.data.access_token,
          user: response.data.user,
        })
      );

      router.replace("/(tabs)/HomeScreen");
    } catch (error) {
      showModal(
        i18n.t("alerts.error"),
        "alert-circle",
        i18n.t("login.errorlogin")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (googleToken: string) => {
    setLoading(true);
    try {
      const data = await loginGoogle(googleToken);
      console.log("Usuario Google:", data);
      router.replace("/(tabs)/perfil");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
    handleGoogleLogin,
  };
};
