import { useModalToast } from "@/components/ModalToast";
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
import PuppySvg from "../../assets/Icons/PuppySvg.svg";
import AuthLayout from "../../components/AuthLayout";
import { login } from "../Service/Service-Login/authService";
import { changeStyles } from "../Styles/components/ChangePassword/changeStyles";

export default function ChangePassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast, ToastComponent } = useModalToast();
  const [modalVisibleAlert, setModalVisibleAlert] = useState(false);
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

  const validateEmail = (email: string) => {
    if (!email) return false;
    const emailTrimmed = email.trim();
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/;
    return emailRegex.test(emailTrimmed);
  };

  const handleGoBack = () => {
    router.push("/login");
  };

  const handleChange = async () => {
    if (!email) {
      showInfoModal(
        "Por favor digita tu correo",
        "information-circle",
        "Faltan datos"
      );
      return;
    }
    if (!validateEmail(email)) {
      showInfoModal(
        "Por favor ingresa un correo válido",
        "alert-circle",
        "Correo inválido"
      );
      return;
    }

    setLoading(true);
    try {
      // setModalVisible(true);
      showInfoModal(
        `Te hemos enviado instrucciones para restablecer la contraseña, al correo ${maskEmail(
          email
        )} que se encuentra asociado a tu cuenta.`,
        "",
        "Restablecer contraseña",
        true
      );
      // await GenetateOtp(email);
      //router.replace("/(Login)/ValidateOtp");
    } catch (error: any) {
      showToast.error(
        "Error al intentar cambiar contraseña",
        "Por favor verifica tu conexión a internet"
      );
    } finally {
      setLoading(false);
    }
  };

  const maskEmail = (email: string): string => {
    if (!email || !email.includes("@")) return email;

    const [localPart, domain] = email.split("@");

    // Mostrar los primeros 4 caracteres y enmascarar el resto
    const visibleChars = 4;
    const maskedLocal =
      localPart.length > visibleChars
        ? localPart.substring(0, visibleChars) +
          "*".repeat(localPart.length - visibleChars)
        : localPart;

    return `${maskedLocal}@${domain}`;
  };

  const callFormOtp = async () => {
    setEmail("");
    router.replace("/(Login)/ValidateOtp");
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
        setModalVisibleAlert(false);
        if (shouldCall) callFormOtp();
      },
    });
    setModalVisibleAlert(true);
  };

  return (
    <AuthLayout contentStyle={changeStyles.container}>
      <ScrollView
        style={changeStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={changeStyles.scrollContent}
      >
        <View style={changeStyles.inner}>
          {/* Form */}
          <View style={changeStyles.formContainer}>
            <TouchableOpacity
              style={changeStyles.backButton}
              onPress={handleGoBack}
            >
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            <ToastComponent />
            {/* Header */}
            <View style={changeStyles.header}>
              <PuppySvg />
            </View>
            <Text style={changeStyles.title}>¿Has olvidado tu contraseña?</Text>
            <Text style={changeStyles.description}>
              Para restablecer tu contraseña, escribe la dirección de correo
              electrónico completa que usaste para registrarte en PuppyPo.com y
              te enviaremos un correo que te ayudará a restablecer tu contraseña
              paso por paso.
            </Text>

            <Text style={changeStyles.label}>Correo electrónico *</Text>
            <View style={changeStyles.inputContainer}>
              <Text style={changeStyles.inputIcon}>
                <ArrobaIcon width={25} height={25} />
              </Text>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={[
                  changeStyles.input,
                  !validateEmail(email) &&
                    email.length > 0 &&
                    changeStyles.inputError,
                ]}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                textContentType="none"
                returnKeyType="next"
                importantForAutofill="no"
                placeholderTextColor="#999"
              />
            </View>
            <TouchableOpacity
              style={changeStyles.loginButton}
              disabled={loading}
              onPress={handleChange}
            >
              <Text style={changeStyles.loginButtonText}>
                {loading ? "Enviando..." : "Enviar"}
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
      <CustomModal
        visible={modalVisibleAlert}
        onClose={() => setModalVisibleAlert(false)}
        title={modalConfig.title}
        iconName={
          modalConfig.iconName as keyof typeof Ionicons.glyphMap | undefined
        }
        iconColor={modalConfig.iconColor}
        primaryButton={{
          text: "Entendido",
          onPress: modalConfig.onPress || (() => setModalVisibleAlert(false)),
        }}
      >
        <Text style={changeStyles.questionAnswer}>{modalConfig.message}</Text>
      </CustomModal>
    </AuthLayout>
  );
}
