import AuthLayout from "@/components/AuthLayout";
import { i18n } from "@/i18n/translations";
import { GetDocumentTypes } from "@/Service/Service-Users/UsersService";
import { UsersStyles } from "@/Styles/components/Users/UsersStyles";
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
import RNPickerSelect from "react-native-picker-select";
import PuppySvg from "../../assets/Icons/PuppySvg.svg";

export default function UsersRegister() {
  const { userType } = useLocalSearchParams();

  const isClient = "client";
  const isCaretaker = "caretaker";

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

  useEffect(() => {
    setErrors({});
    loadDocumentTypes();
  }, [userType]);

  const handleChange = (field: string, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

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
    setErrors({});
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.nombre) newErrors.nombre = i18n.t("user.requiredName");
    if (!form.apellido) newErrors.apellido = i18n.t("user.requiredLastName");
    if (!form.codigoPostal)
      newErrors.codigoPostal = i18n.t("user.requiredPostal");

    if (!form.correo) {
      newErrors.correo = i18n.t("login.email");
    } else if (!/\S+@\S+\.\S+/.test(form.correo)) {
      newErrors.correo = i18n.t("alerts.emailInvalid");
    }

    if (!form.password) {
      newErrors.password = i18n.t("user.requiredPassword");
    } else if (form.password.length < 6) {
      newErrors.password = i18n.t("user.minPassword");
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = i18n.t("user.repeatPassword");
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = i18n.t("user.passwordNotMatch");
    }

    if (!form.aceptaPolitica) {
      newErrors.aceptaPolitica = i18n.t("user.acceptPolicy");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // if (validate()) {
    //   setIsLoading(true);

    //   try {
    //     const registerData = {
    //       id: 0,
    //       idRol: userType == "client" ? UserRole.CLIENT : UserRole.CARETAKER,
    //       FullName: `${form.nombre.trim()} ${form.apellido.trim()}`,
    //       zipCode: form.codigoPostal,
    //       Email: form.correo.toLowerCase().trim(),
    //       Password: form.password,
    //     };
    //     const response = await CreateOrUpdateUsers(registerData);
    //     resetForm();
    //     if (isCaretaker) {
    //       router.push("/(Service)/Services");
    //     }
    //   } catch (error) {
    //     alert(`Error: ${error instanceof Error ? error.message : "Error desconocido"}`);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }

    if (isCaretaker) {
      router.push("/(Service)/Services");
    }
  };

  const getTitle = () => {
    if (isClient) return `${i18n.t("user.registergeneral")}`;
    if (isCaretaker) return `${i18n.t("user.registergeneral")}`;
    return i18n.t("general.register");
  };

  const getIcon = () => {
    if (isClient) return <PuppySvg width={120} height={120} />;
    if (isCaretaker) return <PuppySvg width={60} height={60} />;
    return null;
  };

  const getButtonStyle = () => {
    if (isClient) return [UsersStyles.button, UsersStyles.clientButton];
    if (isCaretaker) return [UsersStyles.button, UsersStyles.caretakerButton];
    return UsersStyles.button;
  };

  const handleGoBack = () => {
    router.push("/");
  };

  const loadDocumentTypes = async () => {
    try {
      setLoadingDocTypes(true);
      const response = await GetDocumentTypes();

      if (response.flag && response.data) {
        setDocumentTypes(response.data);
      } else {
        console.log("Error", i18n.t("alerts.error"));
      }
    } catch (error) {
      console.error("Error cargando tipos de documento:", error);
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
          {/* Botón Regresar */}
          <TouchableOpacity
            style={UsersStyles.backButton}
            onPress={handleGoBack}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>

          <View style={UsersStyles.header}>
            <View style={UsersStyles.iconContainer}>{getIcon()}</View>
            <Text style={UsersStyles.title}>{getTitle()}</Text>
          </View>

          {/* tipo de documento */}
          <Text style={UsersStyles.label}>
            {i18n.t("user.IdentityDocument")} *
          </Text>

          <RNPickerSelect
            onValueChange={(value) => handleChange("tipodocumento", value)}
            items={documentTypes.map(
              (doc: { Description: any; IdDocumentType: any }) => ({
                label: doc.Description,
                value: doc.IdDocumentType,
              })
            )}
            placeholder={{ label: "Seleccione un tipo...", value: null }}
            style={{
              inputIOS: UsersStyles.input,
              inputAndroid: UsersStyles.input,
            }}
            value={form.tipoDocumento}
          />
          {errors.tipoDocumento && (
            <Text style={UsersStyles.error}>{errors.tipoDocumento}</Text>
          )}

          {/* numero de documento */}
          <Text style={UsersStyles.label}>
            {i18n.t("user.Documentnumber")} *
          </Text>
          <TextInput
            style={UsersStyles.input}
            placeholder={i18n.t("user.Documentnumber")}
            value={form.documento}
            placeholderTextColor="#999"
            onChangeText={(text) => handleChange("documento", text)}
          />
          {errors.documento && (
            <Text style={UsersStyles.error}>{errors.documento}</Text>
          )}

          {/* Nombre */}
          <Text style={UsersStyles.label}>{i18n.t("user.firstName")} *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder={i18n.t("user.firstName")}
            value={form.nombre}
            placeholderTextColor="#999"
            onChangeText={(text) => handleChange("nombre", text)}
          />
          {errors.nombre && (
            <Text style={UsersStyles.error}>{errors.nombre}</Text>
          )}

          {/* Apellidos */}
          <Text style={UsersStyles.label}>{i18n.t("user.lastName")} *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder={i18n.t("user.lastName")}
            value={form.apellido}
            placeholderTextColor="#999"
            onChangeText={(text) => handleChange("apellido", text)}
          />
          {errors.apellido && (
            <Text style={UsersStyles.error}>{errors.apellido}</Text>
          )}

          {/* Código Postal */}
          <Text style={UsersStyles.label}>{i18n.t("user.zipCode")} *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder={i18n.t("user.zipCode")}
            keyboardType="numeric"
            placeholderTextColor="#999"
            value={form.codigoPostal}
            onChangeText={(text) => handleChange("codigoPostal", text)}
          />
          {errors.codigoPostal && (
            <Text style={UsersStyles.error}>{errors.codigoPostal}</Text>
          )}

          {/* Correo */}
          <Text style={UsersStyles.label}>{i18n.t("login.email")} *</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder={i18n.t("login.email")}
            keyboardType="email-address"
            placeholderTextColor="#999"
            value={form.correo}
            onChangeText={(text) => handleChange("correo", text)}
          />
          {errors.correo && (
            <Text style={UsersStyles.error}>{errors.correo}</Text>
          )}

          {/* Contraseña */}
          <Text style={UsersStyles.label}>{i18n.t("login.password")}</Text>
          <TextInput
            style={UsersStyles.input}
            placeholder={i18n.t("login.password")}
            secureTextEntry
            value={form.password}
            placeholderTextColor="#999"
            onChangeText={(text) => handleChange("password", text)}
          />
          {errors.password && (
            <Text style={UsersStyles.error}>{errors.password}</Text>
          )}

          {/* Confirmar Contraseña */}
          <Text style={UsersStyles.label}>
            {i18n.t("user.repeatPassword")} *
          </Text>
          <TextInput
            style={UsersStyles.input}
            placeholder={i18n.t("user.repeatPassword")}
            secureTextEntry
            value={form.confirmPassword}
            placeholderTextColor="#999"
            onChangeText={(text) => handleChange("confirmPassword", text)}
          />
          {errors.confirmPassword && (
            <Text style={UsersStyles.error}>{errors.confirmPassword}</Text>
          )}

          {/* Política de privacidad */}
          <View style={UsersStyles.checkboxContainer}>
            <Checkbox
              value={form.aceptaPolitica}
              onValueChange={(newValue) =>
                handleChange("aceptaPolitica", newValue)
              }
              color={isClient ? "#F6C3CC" : isCaretaker ? "#36EBD8" : "#007AFF"}
            />
            <Text style={UsersStyles.checkboxLabel}>
              {i18n.t("user.acceptPolicy")}
            </Text>
          </View>
          {errors.aceptaPolitica && (
            <Text style={UsersStyles.error}>{errors.aceptaPolitica}</Text>
          )}

          {/* Botón */}
          <TouchableOpacity style={getButtonStyle()} onPress={handleSubmit}>
            <Text style={[UsersStyles.continueButtonText]}>
              {i18n.t("user.registeras")}
            </Text>
          </TouchableOpacity>

          {/* ¿Ya tienes una cuenta? */}
          <View style={UsersStyles.loginLinkContainer}>
            <Text style={UsersStyles.loginText}>
              {i18n.t("login.account")}{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={UsersStyles.loginLink}>
                {i18n.t("login.loginButton")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AuthLayout>
  );
}
