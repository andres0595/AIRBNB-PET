import AuthLayout from "@/components/AuthLayout";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ClientIcon from "../../assets/Icons/Cliente.svg";
import CaregiverIcon from "../../assets/Icons/Cuidador.svg";

export default function UsersRegister() {
  const { userType } = useLocalSearchParams();
  
  console.log('Tipo de usuario recibido:', userType);
  
  // Determinar si es cliente o cuidador
  const isClient = userType === 'client';
  const isCaretaker = userType === 'caretaker';
  
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

  // Limpiar errores cuando el componente se monta
  useEffect(() => {
    setErrors({});
  }, [userType]); // Se ejecuta cada vez que cambia userType (cuando regresa y vuelve a entrar)

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
      console.log("✅ Registro exitoso:", { ...form, userType });
      alert(`Registro exitoso como ${isClient ? 'Cliente' : 'Cuidador'}!`);
    }
  };

  // Funciones para obtener contenido dinámico
  const getTitle = () => {
    if (isClient) return "Regístrate en PuppyPo como cliente";
    if (isCaretaker) return "Regístrate en PuppyPo como cuidador";
    return "Regístrate en PuppyPo";
  };

  const getIcon = () => {
    if (isClient) return <ClientIcon width={60} height={60} />;
    if (isCaretaker) return <CaregiverIcon width={60} height={60} />;
    return null;
  };

  const getButtonStyle = () => {
    if (isClient) return [styles.button, styles.clientButton];
    if (isCaretaker) return [styles.button, styles.caretakerButton];
    return styles.button;
  };

  const handleGoBack = () => {
    router.push('/(Users)/Home_Register'); // Navega específicamente a Home_Register
  };

  return (
    <AuthLayout contentStyle={styles.container}>
      <View style={styles.inner}>
        {/* Botón de regresar */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.header}>
          {/* Icono dinámico basado en userType */}
          <View style={styles.iconContainer}>
            {getIcon()}
          </View>
          
          {/* Título dinámico */}
          <Text style={styles.title}>{getTitle()}</Text>
        </View>

        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre *"
          value={form.nombre}
          onChangeText={(text) => handleChange("nombre", text)}
        />
        {errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}

        <Text style={styles.label}>Apellido *</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellido *"
          value={form.apellido}
          onChangeText={(text) => handleChange("apellido", text)}
        />
        {errors.apellido && <Text style={styles.error}>{errors.apellido}</Text>}

        <Text style={styles.label}>Código postal *</Text>
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

        <Text style={styles.label}>Correo electrónico *</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico *"
          keyboardType="email-address"
          value={form.correo}
          onChangeText={(text) => handleChange("correo", text)}
        />
        {errors.correo && <Text style={styles.error}>{errors.correo}</Text>}

        <Text style={styles.label}>Crear una contraseña *</Text>
        <TextInput
          style={styles.input}
          placeholder="Crear una contraseña *"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <Text style={styles.label}>Repite contraseña *</Text>
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
            color={isClient ? "#F6C3CC" : isCaretaker ? "#36EBD8" : "#007AFF"}
          />
          <Text style={styles.checkboxLabel}>
            Aceptar política privacidad de datos
          </Text>
        </View>
        {errors.aceptaPolitica && (
          <Text style={styles.error}>{errors.aceptaPolitica}</Text>
        )}

        {/* Botón con color dinámico */}
        <TouchableOpacity style={getButtonStyle()} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isClient ? "Registrarme como Cliente" : 
             isCaretaker ? "Registrarme como Cuidador" : 
             "Registrarme"}
          </Text>
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
    marginBottom: 30,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    // Contenedor para el icono con un poco de padding
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
    lineHeight: 26,
  },
  label: { 
    fontSize: 14, 
    color: "#333", 
    marginBottom: 8,
    marginLeft: 5,
    fontWeight: "500"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 29,
    marginBottom: 15,
    backgroundColor: "#f8f8f8",
    color: "#000",
    fontSize: 16,
  },
  error: {
    color: "#e74c3c",
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 12,
    color: "#555",
    fontSize: 14,
    flex: 1,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 29,
    alignItems: "center",
    marginTop: 10,
    // Estilo base del botón
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  clientButton: {
    backgroundColor: "#F6C3CC",
  },
  caretakerButton: {
    backgroundColor: "#36EBD8",
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
  position: "absolute",
  top: 20,
  left: 5,
  zIndex: 10,
  padding: 10,
  borderRadius: 20,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
}
});