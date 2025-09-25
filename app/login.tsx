import { useGoogleAuth } from "@/hooks/useSocialAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { login } from "../app/Service/authService";
import AppleIcon from "../assets/Icons/apple.svg";
import FacebookIcon from "../assets/Icons/facebook.svg";
import GoogleIcon from "../assets/Icons/google.svg";
import AuthLayout from "../components/AuthLayout";
import { setCredentials } from "./(Store)/authSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) return false;
    const emailTrimmed = email.trim();
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/;
    return emailRegex.test(emailTrimmed);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "info",
        text1: "Faltan datos",
        text2: "Ingresa correo y contraseña",
      });
      return;
    }
    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Correo inválido",
        text2: "Ingresa un correo válido",
      });
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
    const data = await login("google", token);
    console.log("Usuario Google:", data);
    router.replace("/(tabs)/explore");
  });

  return (
    <AuthLayout contentStyle={styles.container}>
      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/Icono_Puppy.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Iniciar sesión</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Correo electrónico *</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>@</Text>
            <TextInput
              placeholder="Usuario"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
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

          <Text style={styles.label}>Contraseña *</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔑</Text>
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              textContentType="none"
              returnKeyType="done"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => router.push("/(Login)/ChangePassword")}
          >
            <Text style={styles.forgotPasswordText}>
              ¿Has olvidado tu contraseña?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            disabled={loading}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              {loading ? "Ingresando..." : "Ingresar"}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>O Continuar con</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.socialIconContainer}>
                <FacebookIcon width={20} height={20} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => googleAuth.promptAsync()}
            >
              <View style={styles.socialIconContainer}>
                <GoogleIcon width={20} height={20} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.socialIconContainer}>
                <AppleIcon width={20} height={20} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => router.push("/(Users)/Users")}>
              <Text style={styles.registerLink}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 4,
    minHeight: 50,
  },
  inputIcon: {
    fontSize: 16,
    color: "#ff0000",
    marginRight: 12,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 12,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginVertical: 12,
  },
  forgotPasswordText: {
    color: "#ff0000",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#ff0000",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginVertical: 16,
    shadowColor: "#ff0000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#666",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 24,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff0000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ff0000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  socialIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    color: "#fffff",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    fontSize: 14,
    color: "#ff0000",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
