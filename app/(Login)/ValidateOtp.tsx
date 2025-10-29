import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AuthLayout from "@/components/AuthLayout";
import { useGoogleAuth } from "@/hooks/useSocialAuth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import CustomModal from "../(CustomModal)/CustomModal";
import FacebookIcon from "../../assets/Icons/Facebook.svg";
import GoogleIcon from "../../assets/Icons/google.svg";
import IOSIconfrom from "../../assets/Icons/IOS.svg";
import PuppySvg from "../../assets/Icons/PuppySvg.svg";
import { login } from "../Service/Service-Login/authService";

export default function ValidateOtp() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
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

  // Verificar si todos los dígitos están completos
  const isOtpComplete = useMemo(() => {
    return otp.every((digit) => digit !== "");
  }, [otp]);

  const handleChange = (text: string, index: number) => {
    // Solo permitir números
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus al siguiente input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Retroceder al anterior input al presionar backspace
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
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
      },
    });
    setModalVisibleAlert(true);
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      Toast.show({
        type: "info",
        text1: "Código incompleto",
        text2: "Por favor ingresa el código completo de 6 dígitos",
      });
      return;
    }

    setLoading(true);
    try {
      console.log("Código OTP:", otpCode);
      // Aquí va tu lógica de verificación
      // await verifyOTP(otpCode);
      setOtp(["", "", "", "", "", ""]);
      router.push("/(Login)/ConfirmChange");
    } catch (error) {
      console.error("Error al verificar:", error);
      showInfoModal(
        "Por favor verifica tu conexión a internet",
        "close-circle",
        "Error al verificar"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    console.log("Reenviar código");
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    showInfoModal(
      "Revisa tu correo electrónico",
      "checkmark-circle",
      "Código reenviado"
    );
  };
  const handleGoBack = () => {
    router.push("/(Login)/ChangePassword");
  };

  return (
    <AuthLayout contentStyle={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.inner}>
          <View style={styles.formContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            {/* Header */}
            <View style={styles.header}>
              <PuppySvg />
            </View>

            {/* Título y descripción */}
            <Text style={styles.title}>Verificación</Text>
            <Text style={styles.description}>
              Ingresa el código de verificación que enviamos a tu correo
              electrónico para continuar con la recuperación de tu cuenta.
            </Text>

            {/* Inputs OTP - 6 dígitos */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[styles.otpInput, digit && styles.otpInputFilled]}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  textContentType="oneTimeCode"
                />
              ))}
            </View>

            {/* Link reenviar */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>¿No te llegó? </Text>
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>Volver a enviar</Text>
              </TouchableOpacity>
            </View>

            {/* Botón verificar */}
            <TouchableOpacity
              style={[
                styles.verifyButton,
                !isOtpComplete && styles.verifyButtonDisabled,
                loading && styles.verifyButtonDisabled,
              ]}
              onPress={handleVerify}
              disabled={!isOtpComplete || loading}
            >
              <Text
                style={[
                  styles.verifyButtonText,
                  !isOtpComplete && styles.verifyButtonTextDisabled,
                ]}
              >
                {loading ? "Verificando..." : "Verificar"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>O Continuar con</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.socialIconContainer}>
                <FacebookIcon width={40} height={40} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => googleAuth.promptAsync()}
            >
              <View style={styles.socialIconContainer}>
                <GoogleIcon width={40} height={40} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.socialIconContainer}>
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
        <Text style={styles.dividerText}>{modalConfig.message}</Text>
      </CustomModal>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    paddingHorizontal: 11,
    paddingVertical: 20,
  },

  keyboardView: {
    flex: 1,
    paddingHorizontal: 20,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF0000",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: "#DDD",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    backgroundColor: "#fff",
    color: "#333",
  },
  otpInputFilled: {
    borderColor: "#FF0000",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  resendText: {
    fontSize: 14,
    color: "#666",
  },
  resendLink: {
    fontSize: 14,
    color: "#FF0000",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  verifyButton: {
    backgroundColor: "#FF0000",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  verifyButtonDisabled: {
    backgroundColor: "#CCCCCC",
    opacity: 0.7,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  verifyButtonTextDisabled: {
    color: "#999",
  },
  separator: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 20,
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    fontSize: 14,
    color: "#FF0000",
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 100,
  },

  inner: {
    flex: 1,
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    marginTop: 40,
    padding: 10,
  },

  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },

  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
    color: "#666",
  },

  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 24,
  },

  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff0000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ff0000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  socialIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    color: "#fffff",
  },
});
