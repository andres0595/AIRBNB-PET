import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Icono_Puppy.png")}
        style={{ width: 120, height: 50, alignSelf: "center", marginBottom: 5 }}
      />
      <Text style={styles.title}>Iniciar sesión</Text>

      {/* Correo */}
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        placeholder="Usuario"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Contraseña */}
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Link olvidaste tu contraseña */}
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          marginBottom: 15,
        }}
        onPress={() => router.push("/(Login)/ChangePassword")}
      >
        <Text style={styles.link}>¿Has olvidado tu contraseña?</Text>
      </TouchableOpacity>

      {/* Botón ingresar con icono */}
      <TouchableOpacity style={styles.button}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </View>
      </TouchableOpacity>

      {/* Línea divisoria */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>o</Text>
        <View style={styles.divider} />
      </View>

      {/* Registro */}
      <Text style={styles.textCenter}>¿No tienes una cuenta de PuppyPo? </Text>

      {/* Botones sociales */}
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Continuar con Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Continuar con Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Continuar con Apple</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
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
  registerLink: { color: "#007BFF", fontWeight: "500" },
  socialButton: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  socialText: { color: "#333", fontSize: 15 },
});
