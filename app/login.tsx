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
        <Text style={styles.label}>Correo electrónico</Text>
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
        />

        <Text style={styles.label}>Contraseña</Text>
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
        />

        <TouchableOpacity
          style={{ alignSelf: "flex-end", marginBottom: 15 }}
          onPress={() => router.push("/(Login)/ChangePassword")}
        >
          <Text style={styles.link}>¿Has olvidado tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            {loading ? "Ingresando..." : "Ingresar"}
          </Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>o</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.textCenter}>¿No tienes una cuenta de PuppyPo?</Text>
        <TouchableOpacity
          style={{ alignSelf: "center", marginBottom: 15 }}
          onPress={() => router.push("/(Users)/Users")}
        >
          <Text style={styles.link}>Registrate ahora</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <FacebookIcon width={24} height={24} />
          <Text style={styles.socialText}>Continuar con Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => googleAuth.promptAsync()}
        >
          <GoogleIcon width={24} height={24} />
          <Text style={styles.socialText}>Continuar con Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AppleIcon width={24} height={24} />
          <Text style={styles.socialText}>Continuar con Apple</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  logo: {
    width: 120,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  label: { fontSize: 14, color: "#555", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 25,
    marginBottom: 15,
    backgroundColor: "#fafafa",
    color: "#000", // asegura que se vea el texto
  },
  link: { color: "#666", fontSize: 13, textDecorationLine: "underline" },
  button: {
    backgroundColor: "#555",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#ddd" },
  dividerText: { marginHorizontal: 10, color: "#888" },
  textCenter: { textAlign: "center", marginBottom: 15, color: "#444" },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: "#f5f5f5",
  },
  socialText: { marginLeft: 10, fontSize: 16, fontWeight: "500" },
});
