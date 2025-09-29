import { useModalToast } from "@/components/ModalToast";
import { useGoogleAuth } from "@/hooks/useSocialAuth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import ArrobaIcon from "../../assets/Icons/arroba.svg";
import FacebookIcon from "../../assets/Icons/Facebook.svg";
import GoogleIcon from "../../assets/Icons/google.svg";
import IOSIconfrom from "../../assets/Icons/IOS.svg";
import AuthLayout from "../../components/AuthLayout";
import { GenetateOtp, login } from "../Service/authService";
import { changeStyles } from "../Styles/components/ChangePassword/changeStyles";

export default function ChangePassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
 const { showToast, ToastComponent } = useModalToast();

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
    router.push('/login'); // Navega específicamente a Home_Register
  };

  const handleChange = async () => {
    if (!email) {
       showToast.info("Faltan datos", "Por favor digita tu correo");  
      return;
    }
    if (!validateEmail(email)) {
      showToast.error("Correo inválido", "Por favor ingresa un correo válido");   
      return;
    }

    setLoading(true);
    try {
      await GenetateOtp(email);
      router.replace("/(Login)/ValidateOtp");
    } catch (error: any) {
       showToast.error("Error al intentar cambiar contraseña", "Por favor verifica tu conexión a internet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout contentStyle={changeStyles.container}>
      <View style={changeStyles.inner}>
        {/* Form */}
        <View style={changeStyles.formContainer}>
                <TouchableOpacity style={changeStyles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
              <ToastComponent />
          {/* Header */}
          <View style={changeStyles.header}>
            <Image
              source={require("../../assets/images/PupyPoRed.png")}
              style={changeStyles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={changeStyles.title}>¿Has olvidado tu contraseña?</Text>
          <Text style={changeStyles.description}>
            Para restablecer tu contraseña, escribe la dirección de correo
            electrónico completa que usaste para registrarte en PuppyPo.com y te
            enviaremos un correo que te ayudará a restablecer tu contraseña paso
            por paso.
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
      </View>
    </AuthLayout>
  );
}
