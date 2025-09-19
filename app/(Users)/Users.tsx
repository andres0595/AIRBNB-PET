import AuthLayout from "@/components/AuthLayout";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function UsersRegister() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    codigoPostal: "",
    correo: "",
    password: "",
    confirmPassword: "",
    aceptaPolitica: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!form.apellido) newErrors.apellido = "El apellido es obligatorio.";
    if (!form.codigoPostal)
      newErrors.codigoPostal = "El código postal es obligatorio.";

    if (!form.correo) {
      newErrors.correo = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(form.correo)) {
      newErrors.correo = "El correo no es válido.";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (form.password.length < 6) {
      newErrors.password = "Debe tener al menos 6 caracteres.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Debes repetir la contraseña.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    if (!form.aceptaPolitica) {
      newErrors.aceptaPolitica = "Debes aceptar la política de privacidad.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("✅ Registro exitoso:", form);
      alert("Registro exitoso!");
    }
  };

  return (
    <AuthLayout contentStyle={styles.container}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/Icono_Puppy.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Regístrate en PuppyPo</Text>
        </View>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre *"
          value={form.nombre}
          onChangeText={(text) => handleChange("nombre", text)}
        />
        {errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Apellido *"
          value={form.apellido}
          onChangeText={(text) => handleChange("apellido", text)}
        />
        {errors.apellido && <Text style={styles.error}>{errors.apellido}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Código postal *"
          keyboardType="numeric"
          value={form.codigoPostal}
          onChangeText={(text) => handleChange("codigoPostal", text)}
        />
        {errors.codigoPostal && (
          <Text style={styles.error}>{errors.codigoPostal}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico *"
          keyboardType="email-address"
          value={form.correo}
          onChangeText={(text) => handleChange("correo", text)}
        />
        {errors.correo && <Text style={styles.error}>{errors.correo}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Crear una contraseña *"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Repite contraseña *"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={form.aceptaPolitica}
            onValueChange={(newValue) =>
              handleChange("aceptaPolitica", newValue)
            }
          />
          <Text style={styles.checkboxLabel}>
            Aceptar política privacidad de datos
          </Text>
        </View>
        {errors.aceptaPolitica && (
          <Text style={styles.error}>{errors.aceptaPolitica}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ingresar</Text>
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
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 25,
    marginBottom: 15,
    // backgroundColor: "#fafafa",
    color: "#000",
  },
  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: "#555",
  },
  button: {
    backgroundColor: "#555",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
  label: { fontSize: 14, color: "#555", marginBottom: 5 },
});
