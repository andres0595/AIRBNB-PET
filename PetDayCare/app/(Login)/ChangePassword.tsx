import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { changePassword } from "../Service/authService";

export default function ChangePassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) return false;
    const emailTrimmed = email.trim();
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/;
    return emailRegex.test(emailTrimmed);
  };

  const handleChange = async () => {
    if (!email) {
      Toast.show({
        type: "info",
        text1: "Faltan datos",
        text2: "Por favor digita tu correo",
      });
      return;
    }
    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Correo inválido",
        text2: "Por favor ingresa un correo válido",
      });
      return;
    }

    setLoading(true);
    try {
      await changePassword(email);
      router.replace("/(tabs)/explore");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error al intentar cambiar contraseña",
        text2: "Por favor verifica tu conexión a internet",
        position: "top",
        topOffset: 60,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../assets/images/Icono_Puppy.png")}
          style={{
            width: 120,
            height: 50,
            alignSelf: "center",
            marginBottom: 5,
          }}
        />
        <Text style={styles.title}>¿Has olvidado tu contraseña?</Text>
        <Text style={styles.description}>
          Para restablecer tu contraseña, escribe la dirección de correo
          electrónico completa que usaste para registrarte en PuppyPo.com y te
          enviaremos un correo que te ayudará a restablecer tu contraseña paso
          por paso.
        </Text>

        <Text style={styles.label}>Correo electrónico</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={[
            styles.input,
            !validateEmail(email) && email.length > 0 && styles.inputError, // 👈 borde rojo si email inválido
          ]}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={handleChange}
        >
          <Text style={styles.buttonText}>
            {loading ? "Enviando..." : "Enviar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 25,
    marginBottom: 20,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#555",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  inputError: {
    borderColor: "red",
  },
});
