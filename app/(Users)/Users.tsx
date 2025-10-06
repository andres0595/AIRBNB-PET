import AuthLayout from "@/components/AuthLayout";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import Checkbox from "expo-checkbox";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ClientIcon from "../../assets/Icons/Cliente.svg";
import CaregiverIcon from "../../assets/Icons/Cuidador.svg";
import { UserRole } from "../Models/Model-Enums/EnumSystem";
import { CreateOrUpdateUsers, GetDocumentTypes } from "../Service/Service-Users/UsersService";
import { UsersStyles } from "../Styles/components/Users/UsersStyles";

export default function UsersRegister() {
  const { userType } = useLocalSearchParams();
  // Determinar si es cliente o cuidador
  const isClient = userType === "client";
  const isCaretaker = userType === "caretaker";
  const [loadingDocTypes, setLoadingDocTypes] = useState(true);
  const [form, setForm] = useState({
    tipoDocumento: 0,
    documento: "",
    nombre: "",
    apellido: "",
    codigoPostal: "",
    correo: "",
    password: "",
    confirmPassword: "",
    aceptaPolitica: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [documentTypes, setDocumentTypes] = useState<any>([]);

  // Limpiar errores cuando el componente se monta
  useEffect(() => {
    setErrors({});
    loadDocumentTypes();
  }, [userType]); // Se ejecuta cada vez que cambia userType (cuando regresa y vuelve a entrar)

  const handleChange = (field: string, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

  // Función para limpiar el formulario
  const resetForm = () => {
    setForm({
      nombre: "",
      apellido: "",
      tipoDocumento: 0,
      documento: "",
      codigoPostal: "",
      correo: "",
      password: "",
      confirmPassword: "",
      aceptaPolitica: false,
    });
    setErrors({}); // Limpiar errores también
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

  const handleSubmit = async () => {
    if (validate()) {
      setIsLoading(true);

      try {
        // Preparar datos para enviar
        const registerData = {
          id: 0,
          idRol: userType == 'client' ? UserRole.CLIENT : UserRole.CARETAKER,
          IdDocumentType: +form.tipoDocumento,
          DocumentNumber: form.documento,
          FullName: `${form.nombre.trim()} ${form.apellido.trim()}`, // trim para quitar espacios
          zipCode: form.codigoPostal,
          Email: form.correo.toLowerCase().trim(), // normalizar email
          Password: form.password
        };
        // Llamar al servicio
        const response = await CreateOrUpdateUsers(registerData);
        resetForm();
        // Navegación según tipo de usuario
        if (isCaretaker) {
          router.push("/(Service)/Services");
        } else {
          // router.push("/dashboard"); // o donde vayas con clientes
        }
      } catch (error) {
        alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      } finally {
        setIsLoading(false);
      }
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
    if (isClient) return [UsersStyles.button, UsersStyles.clientButton];
    if (isCaretaker) return [UsersStyles.button, UsersStyles.caretakerButton];
    return UsersStyles.button;
  };

  const handleGoBack = () => {
    router.push("/(Users)/Home_Register"); // Navega específicamente a Home_Register
  };

  const loadDocumentTypes = async () => {
    try {
      setLoadingDocTypes(true);
      const response = await GetDocumentTypes();

      if (response.flag && response.data) {

        setDocumentTypes(response.data);
      } else {
        console.log('Error', 'No se pudieron cargar los tipos de documento');
      }
    } catch (error) {
      console.error('Error cargando tipos de documento:', error);
      console.log('Error', 'Error al cargar tipos de documento');
    } finally {
      setLoadingDocTypes(false);
    }
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
          <Text style={UsersStyles.label}>Tipo Documento *</Text>
          {loadingDocTypes ? (
            <View style={UsersStyles.input}>
              <ActivityIndicator size="small" color="#999" />
            </View>
          ) : (
            <View style={UsersStyles.input} >
              <Picker
                selectedValue={form.tipoDocumento}
                onValueChange={(itemValue:any) => 
                  handleChange("tipoDocumento", itemValue)
                }
                style={UsersStyles.picker}
              >
                <Picker.Item label="Seleccione tipo de documento" value=""  />
                {documentTypes.map((docType: any) => (
                  <Picker.Item
                    key={docType.IdType}
                    label={docType.Code+' - '+docType.Description}
                    value={docType.IdType.toString()}
                  />
                ))}
              </Picker>
            </View>
          )}

          {errors.tipoDocumento && (
            <Text style={UsersStyles.error}>{errors.tipoDocumento}</Text>
          )}


          {/* Campos del formulario */}
          <Text style={UsersStyles.label}>Documento *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder="Documento"
            value={form.documento}
                 placeholderTextColor="#999"
            onChangeText={(text) => handleChange("documento", text)}
          />
          {errors.nombre && (
            <Text style={UsersStyles.error}>{errors.nombre}</Text>
          )}

          {/* Campos del formulario */}
          <Text style={UsersStyles.label}>Nombres *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder="Nombres"
            value={form.nombre}
                 placeholderTextColor="#999"
            onChangeText={(text) => handleChange("nombre", text)}
          />
          {errors.nombre && (
            <Text style={UsersStyles.error}>{errors.nombre}</Text>
          )}

          <Text style={UsersStyles.label}>Apellidos *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder="Apellidos"
            value={form.apellido}
                placeholderTextColor="#999"
            onChangeText={(text) => handleChange("apellido", text)}
          />
          {errors.apellido && (
            <Text style={UsersStyles.error}>{errors.apellido}</Text>
          )}

          <Text style={UsersStyles.label}>Código postal *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder="Código postal"
            keyboardType="numeric"
                 placeholderTextColor="#999"
            value={form.codigoPostal}
            onChangeText={(text) => handleChange("codigoPostal", text)}
          />
          {errors.codigoPostal && (
            <Text style={UsersStyles.error}>{errors.codigoPostal}</Text>
          )}

          <Text style={UsersStyles.label}>Correo electrónico *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
                 placeholderTextColor="#999"
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
                 placeholderTextColor="#999"
            onChangeText={(text) => handleChange("password", text)}
          />
          {errors.password && (
            <Text style={UsersStyles.error}>{errors.password}</Text>
          )}

          <Text style={UsersStyles.label}>Repite contraseña *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder="Repite contraseña"
            secureTextEntry
            value={form.confirmPassword}
                 placeholderTextColor="#999"
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
