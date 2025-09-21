import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import AuthLayout from "../../components/AuthLayout";
import { GenetateOtp } from "../Service/authService";

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
      await GenetateOtp(email);
      router.replace("/(Login)/ValidateOtp");
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
    <AuthLayout>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/Icono_Puppy.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>¿Has olvidado tu contraseña?</Text>
        </View>

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
            !validateEmail(email) && email.length > 0 && styles.inputError,
          ]}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
          returnKeyType="next"
          importantForAutofill="no"
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
      </KeyboardAwareScrollView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
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
    color: "#000",
  },
  inputError: {
    borderColor: "red",
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
});
