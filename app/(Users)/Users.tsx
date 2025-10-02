import AuthLayout from "@/components/AuthLayout";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ClientIcon from "../../assets/Icons/Cliente.svg";
import CaregiverIcon from "../../assets/Icons/Cuidador.svg";
import { UsersStyles } from "../Styles/components/Users/UsersStyles";

export default function UsersRegister() {
  const { userType } = useLocalSearchParams();

  console.log("Tipo de usuario recibido:", userType);

  // Determinar si es cliente o cuidador
  const isClient = userType === "client";
  const isCaretaker = userType === "caretaker";

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
    //if (validate()) {
    if (isCaretaker) {
      router.push("/(Service)/Services");
    }
    console.log("✅ Registro exitoso:", { ...form, userType });
    alert(`Registro exitoso como ${isClient ? "Cliente" : "Cuidador"}!`);
    //}
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
    if (isClient) return [UsersStyles.button, UsersStyles.clientButton];
    if (isCaretaker) return [UsersStyles.button, UsersStyles.caretakerButton];
    return UsersStyles.button;
  };

  const handleGoBack = () => {
    router.push("/(Users)/Home_Register"); // Navega específicamente a Home_Register
  };

  return (
    <AuthLayout contentStyle={UsersStyles.container}>
      <ScrollView
        style={UsersStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={UsersStyles.scrollContent}
      >
        <View style={UsersStyles.inner}>
          {/* Botón de regresar */}
          <TouchableOpacity
            style={UsersStyles.backButton}
            onPress={handleGoBack}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>

          <View style={UsersStyles.header}>
            {/* Icono dinámico basado en userType */}
            <View style={UsersStyles.iconContainer}>{getIcon()}</View>

            {/* Título dinámico */}
            <Text style={UsersStyles.title}>{getTitle()}</Text>
          </View>

          {/* Campos del formulario */}
          <Text style={UsersStyles.label}>Nombre *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder="Nombre *"
            value={form.nombre}
            onChangeText={(text) => handleChange("nombre", text)}
          />
          {errors.nombre && (
            <Text style={UsersStyles.error}>{errors.nombre}</Text>
          )}

          <Text style={UsersStyles.label}>Apellido *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder="Apellido *"
            value={form.apellido}
            onChangeText={(text) => handleChange("apellido", text)}
          />
          {errors.apellido && (
            <Text style={UsersStyles.error}>{errors.apellido}</Text>
          )}

          <Text style={UsersStyles.label}>Código postal *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder="Código postal *"
            keyboardType="numeric"
            value={form.codigoPostal}
            onChangeText={(text) => handleChange("codigoPostal", text)}
          />
          {errors.codigoPostal && (
            <Text style={UsersStyles.error}>{errors.codigoPostal}</Text>
          )}

          <Text style={UsersStyles.label}>Correo electrónico *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder="Correo electrónico *"
            keyboardType="email-address"
            value={form.correo}
            onChangeText={(text) => handleChange("correo", text)}
          />
          {errors.correo && (
            <Text style={UsersStyles.error}>{errors.correo}</Text>
          )}

          <Text style={UsersStyles.label}>Contraseña</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          {errors.password && (
            <Text style={UsersStyles.error}>{errors.password}</Text>
          )}

          <Text style={UsersStyles.label}>Repite contraseña *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder="Repite contraseña *"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
          />
          {errors.confirmPassword && (
            <Text style={UsersStyles.error}>{errors.confirmPassword}</Text>
          )}

          <View style={UsersStyles.checkboxContainer}>
            <Checkbox
              value={form.aceptaPolitica}
              onValueChange={(newValue) =>
                handleChange("aceptaPolitica", newValue)
              }
              color={isClient ? "#F6C3CC" : isCaretaker ? "#36EBD8" : "#007AFF"}
            />
            <Text style={UsersStyles.checkboxLabel}>
              Aceptar política privacidad de datos
            </Text>
          </View>
          {errors.aceptaPolitica && (
            <Text style={UsersStyles.error}>{errors.aceptaPolitica}</Text>
          )}

          {/* Botón con color dinámico */}

          <TouchableOpacity style={getButtonStyle()} onPress={handleSubmit}>
            <Text style={[UsersStyles.continueButtonText]}>
              {isClient
                ? "Registrate como cliente"
                : isCaretaker
                ? "Registrate como cuidador"
                : "Registrarme"}
            </Text>
          </TouchableOpacity>
          {/* Enlace "¿Ya tienes una cuenta?" */}
          <View style={UsersStyles.loginLinkContainer}>
            <Text style={UsersStyles.loginText}>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity onPress={handleGoBack}>
              <Text style={UsersStyles.loginLink}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AuthLayout>
  );
}
