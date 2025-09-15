import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";

export default function ChangePassword() {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Icono_Puppy.png")}
        style={{ width: 120, height: 50, alignSelf: "center", marginBottom: 5 }}
      />
      {/* Título */}
      <Text style={styles.title}>¿Has olvidado tu contraseña?</Text>

      {/* Texto explicativo */}
      <Text style={styles.description}>
        Para restablecer tu contraseña, escribe la dirección de correo
        electrónico completa que usaste para registrarte en PuppyPo.com y te
        enviaremos un correo que te ayudará a restablecer tu contraseña paso por
        paso.
      </Text>

      {/* Label */}
      <Text style={styles.label}>Correo electrónico</Text>

      {/* Input */}
      <TextInput
        placeholder="Usuario"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Botón */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
