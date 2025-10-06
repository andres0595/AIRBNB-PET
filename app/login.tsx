import { useGoogleAuth } from "@/hooks/useSocialAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import ArrobaIcon from "../assets/Icons/arroba.svg";
import FacebookIcon from "../assets/Icons/Facebook.svg";
import GoogleIcon from "../assets/Icons/google.svg";
import IOSIconfrom from "../assets/Icons/IOS.svg";
import LlaveIcon from "../assets/Icons/Llave.svg";
import PuppySvg from "../assets/Icons/PuppySvg.svg";
import AuthLayout from "../components/AuthLayout";
import { useModalToast } from "../components/ModalToast";
import { setCredentials } from "./(Store)/authSlice";
import { login, loginGoogle } from "./Service/Service-Login/authService";
import { loginStyles } from "./Styles/components/Login/loginStyles";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast, ToastComponent } = useModalToast();

  const validateEmail = (email: string) => {
    if (!email) return false;
    const emailTrimmed = email.trim();
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/;
    return emailRegex.test(emailTrimmed);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showToast.info("Faltan datos", "Ingresa correo y contraseña");
      return;
    }
    if (!validateEmail(email)) {
      showToast.error("Correo inválido", "Ingresa un correo válido");
      return;
    }

    setLoading(true);
    try {
      const data = await login(email, password);
      dispatch(setCredentials({ token: data.token, user: data.user }));
      router.replace("/(tabs)/explore");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error al iniciar sesión",
        text2: error?.message ?? "Por favor verifica tus credenciales",
        position: "top",
        topOffset: 60,
      });
    } finally {
      setLoading(false);
    }
  };

  const googleAuth = useGoogleAuth(async (token: string) => {
    const data = await loginGoogle(token);
    console.log("Usuario Google:", data);
    router.replace("/(tabs)/explore");
  });

  return (
    <AuthLayout contentStyle={loginStyles.container}>
      <View style={loginStyles.inner}>
        <ToastComponent />
        {/* Form */}
        <View style={loginStyles.formContainer}>
          {/* Header */}
          <View style={loginStyles.header}>
            <PuppySvg />
            <Text style={loginStyles.title}>Iniciar sesión</Text>
          </View>
          <Text style={loginStyles.label}>Correo electrónico *</Text>
          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.inputIcon}>
              <ArrobaIcon width={25} height={25} />
            </Text>
            <TextInput
              placeholder="Usuario"
              value={email}
              onChangeText={setEmail}
              style={loginStyles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              textContentType="none"
              importantForAutofill="no"
              returnKeyType="next"
              placeholderTextColor="#999"
            />
          </View>

          <Text style={loginStyles.label}>Contraseña *</Text>
          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.inputIcon}>
              <LlaveIcon width={25} height={25} />
            </Text>
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={loginStyles.input}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              textContentType="none"
              returnKeyType="done"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={loginStyles.forgotPasswordContainer}
            onPress={() => router.push("/(Login)/ChangePassword")}
          >
            <Text style={loginStyles.forgotPasswordText}>
              ¿Has olvidado tu contraseña?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={loginStyles.loginButton}
            disabled={loading}
            onPress={handleLogin}
          >
            <Text style={loginStyles.loginButtonText}>
              {loading ? "Ingresando..." : "Ingresar"}
            </Text>
          </TouchableOpacity>

          <View style={loginStyles.dividerContainer}>
            <View style={loginStyles.divider} />
            <Text style={loginStyles.dividerText}>O Continuar con</Text>
            <View style={loginStyles.divider} />
          </View>

          {/* Social Buttons */}
          <View style={loginStyles.socialButtonsContainer}>
            <TouchableOpacity style={loginStyles.socialButton}>
              <View style={loginStyles.socialIconContainer}>
                <FacebookIcon width={40} height={40} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={loginStyles.socialButton}
              onPress={() => googleAuth.promptAsync()}
            >
              <View style={loginStyles.socialIconContainer}>
                <GoogleIcon width={40} height={40} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={loginStyles.socialButton}>
              <View style={loginStyles.socialIconContainer}>
                <IOSIconfrom width={40} height={40} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={loginStyles.registerContainer}>
            <Text style={loginStyles.registerText}>
              ¿No tienes una cuenta?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(Users)/Home_Register")}
            >
              <Text style={loginStyles.registerLink}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthLayout>
  );
}
