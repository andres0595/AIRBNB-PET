import { useGoogleAuth } from "@/hooks/useSocialAuth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomModal from "../(CustomModal)/CustomModal";
import ArrobaIcon from "../../assets/Icons/arroba.svg";
import FacebookIcon from "../../assets/Icons/Facebook.svg";
import GoogleIcon from "../../assets/Icons/google.svg";
import IOSIconfrom from "../../assets/Icons/IOS.svg";
import LlaveIcon from "../../assets/Icons/Llave.svg";
import PuppySvg from "../../assets/Icons/PuppySvg.svg";
import AuthLayout from "../../components/AuthLayout";
import { login } from "../Service/Service-Login/authService";
import { changeStyles } from "../Styles/components/ChangePassword/changeStyles";

export default function ConfirmChange() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    iconName: null as keyof typeof Ionicons.glyphMap | null,
    iconColor: "#00D9C5",
    onPress: undefined as (() => void) | undefined,
  });
  const googleAuth = useGoogleAuth(async (token: string) => {
    const data = await login("google", token);
    console.log("Usuario Google:", data);
    router.replace("/(tabs)/explore");
  });

  const handleGoBack = () => {
    router.push("/login");
  };
  const validateEmail = (email: string) => {
    if (!email) return false;
    const emailTrimmed = email.trim();
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/;
    return emailRegex.test(emailTrimmed);
  };

  const handleChange = async () => {
    // if (!email) {
    //     Toast.show({
    //         type: "info",
    //         text1: "Faltan datos",
    //         text2: "Por favor digita tu correo",
    //     });
    //     return;
    // }
    // if (!validateEmail(email)) {
    //     Toast.show({
    //         type: "error",
    //         text1: "Correo inválido",
    //         text2: "Por favor ingresa un correo válido",
    //     });
    //     return;
    // }

    setLoading(true);
    //setModalVisible(true);
    showInfoModal(
      " ¡Tu contraseña ha sido cambiada con éxito!",
      "checkmark-circle",
      "",
      true
    );
    // try {
    //   await ChangePassword(+otp, email,newpassword);
    //   router.replace("/login");
    // } catch (error: any) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Error al intentar cambiar contraseña",
    //     text2: "Por favor verifica tu conexión a internet",
    //     position: "top",
    //     topOffset: 60,
    //   });
    // } finally {
    //   setLoading(false);
    //   setModalVisible(false);
    // }
  };

  const showInfoModal = (
    message: string,
    icon: any,
    titulo: string,
    shouldCall: boolean = false
  ) => {
    setModalConfig({
      title: titulo,
      message: message,
      iconName: icon,
      iconColor: "#00D9C5",
      onPress: () => {
        handleGoBack();
        setModalVisible(false);
        setLoading(false);
      },
    });
    setModalVisible(true);
  };

  return (
    <AuthLayout contentStyle={changeStyles.container}>
      <ScrollView
        style={changeStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={changeStyles.scrollContent}
      >
        <View style={changeStyles.inner}>
          <View style={changeStyles.formContainer}>
            <TouchableOpacity
              style={changeStyles.backButton}
              onPress={handleGoBack}
            >
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>

            {/* Header */}
            <View style={changeStyles.header}>
              <PuppySvg />
            </View>
            <Text style={changeStyles.title}>Cambia tu contraseña</Text>

            <Text style={changeStyles.label}>Correo electrónico*</Text>
            <View style={changeStyles.inputContainer}>
              <Text style={changeStyles.inputIcon}>
                <ArrobaIcon width={25} height={25} />
              </Text>
              <TextInput
                placeholder="Usuario"
                value={email}
                onChangeText={setEmail}
                style={changeStyles.input}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                textContentType="none"
                returnKeyType="done"
              />
            </View>

            <Text style={changeStyles.label}>
              Ingresa tu nueva contraseña *
            </Text>
            <View style={changeStyles.inputContainer}>
              <Text style={changeStyles.inputIcon}>
                <LlaveIcon width={25} height={25} />
              </Text>
              <TextInput
                placeholder="Contraseña"
                value={newpassword}
                onChangeText={setPassword}
                secureTextEntry
                style={changeStyles.input}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                textContentType="none"
                returnKeyType="done"
              />
            </View>
            <Text style={changeStyles.label}>
              Debe contener al menos 8 caracteres, incluir una mayúscula, un
              número y un símbolo.
            </Text>

            <Text style={changeStyles.label}>Confirmar nueva contraseña *</Text>
            <View style={changeStyles.inputContainer}>
              <Text style={changeStyles.inputIcon}>
                <LlaveIcon width={25} height={25} />
              </Text>
              <TextInput
                placeholder="Contraseña"
                value={confirmpassword}
                onChangeText={setconfirmPassword}
                secureTextEntry
                style={changeStyles.input}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                textContentType="none"
                returnKeyType="done"
              />
            </View>
            <Text style={changeStyles.label}>Repite tu nueva contraseña.</Text>
            <TouchableOpacity
              style={changeStyles.loginButton}
              disabled={loading}
              onPress={handleChange}
            >
              <Text style={changeStyles.loginButtonText}>
                {loading ? "Guardando..." : "Guardar nueva contraseña"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={changeStyles.dividerContainer}>
            <View style={changeStyles.divider} />
            <Text style={changeStyles.dividerText}>O Continuar con</Text>
            <View style={changeStyles.divider} />
          </View>

          {/* Social Buttons */}
          <View style={changeStyles.socialButtonsContainer}>
            <TouchableOpacity style={changeStyles.socialButton}>
              <View style={changeStyles.socialIconContainer}>
                <FacebookIcon width={40} height={40} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={changeStyles.socialButton}
              onPress={() => googleAuth.promptAsync()}
            >
              <View style={changeStyles.socialIconContainer}>
                <GoogleIcon width={40} height={40} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={changeStyles.socialButton}>
              <View style={changeStyles.socialIconContainer}>
                <IOSIconfrom width={40} height={40} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* Modal de información */}

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalConfig.title}
        iconName={
          modalConfig.iconName as keyof typeof Ionicons.glyphMap | undefined
        }
        iconColor={modalConfig.iconColor}
        primaryButton={{
          text: "Ok",
          onPress: modalConfig.onPress || (() => setModalVisible(false)),
        }}
      >
        <Text style={changeStyles.questionAnswer}>{modalConfig.message}</Text>
      </CustomModal>

      {/* <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title=""
        primaryButton={{
          text: "Ok",
          onPress: () => handleGoBack(),
        }}
      >
        <Text style={changeStyles.questionAnswer}>
          ¡Tu contraseña ha sido cambiada con éxito!
        </Text>
      </CustomModal> */}
    </AuthLayout>
  );
}
