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
import { login, validateOtp } from "@/Service/Service-Login/authService";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import CustomModal from "../(CustomModal)/CustomModal";
import PuppySvg from "../../assets/images/LogoPuppyPo.svg";
import { fontFamily } from "../../Config/typography";

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
    router.replace("/(tabs)/perfil");
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
      await validateOtp(otpCode);
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
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleGoBack}
            >
              <Ionicons name="chevron-back" size={24} color="#707070" />
            </TouchableOpacity>

            {/* Header */}
            <View style={styles.header}>
              <PuppySvg />
            </View>

            {/* Título y descripción */}
            <Text style={styles.title}>Verificación</Text>
            <Text style={styles.description}>
              Ingresa el código de verificación que enviamos a tu correo electrónico para continuar con la recuperación de tu cuenta.
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
    flex: 1,
    backgroundColor: "#E4E4E4",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

 backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 24,
    backgroundColor: "#F7F7F7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    color: "#000",
    marginBottom: 16,
    fontFamily: fontFamily.bold,
  },

  description: {
    fontSize: 13,
    textAlign: "center",
    color: "#000",
    lineHeight: 18,
    marginBottom: 40,
 marginTop:23,
    fontFamily: fontFamily.regular,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 32,
    paddingHorizontal: 10,
  },

otpInput: {
  width: 46,
  height: 63,
  borderWidth: 0.5,
  borderColor: "#00000029",
  borderRadius: 8,
  textAlign: "center",
  fontSize: 24,
  fontWeight: "600",
  backgroundColor: "#F8F8F8",
  color: "#000",
  fontFamily: fontFamily.semiBold,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4, // Aumentado de 2 a 4
  },
  shadowOpacity: 0.25, // Aumentado de 0.1 a 0.25
  shadowRadius: 6, // Aumentado de 4 a 6
  elevation: 5, // Aumentado de 3 a 5 (para Android)
},
  otpInputFilled: {
    borderColor: "#FF0000",
    backgroundColor: "#FFF",
    shadowColor: "#FF0000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    marginTop:35
  },

  resendText: {
    fontSize: 13,
    color: "#666",
    fontFamily: fontFamily.regular,
  },

  resendLink: {
    fontSize: 13,
    color: "#000",
    fontWeight: "600",
    textDecorationLine: "underline",
    fontFamily: fontFamily.semiBold,
  },

  verifyButton: {
    backgroundColor: "#FF0000",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,    
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginTop:15
  },

  verifyButtonDisabled: {
    backgroundColor: "#CCCCCC",
    
    shadowOpacity: 0,
  },

  verifyButtonText: {
    color: "#FFF",
    fontSize: 16,   
    fontFamily: fontFamily.bold,
  },

  verifyButtonTextDisabled: {
    color: "#000",
    fontFamily: fontFamily.bold,
     fontSize: 16,  
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },

  inner: {
    flex: 1,
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },

  formContainer: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    paddingVertical: 40,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  dividerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontFamily: fontFamily.regular,
  },
});