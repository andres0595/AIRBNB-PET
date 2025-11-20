import { useGoogleAuth } from "@/hooks/useSocialAuth";
import { i18n } from "@/i18n/translations";
import { login, loginGoogle } from "@/Service/Service-Login/authService";
import { setCredentials } from "@/Store/authSlice";
import { loginStyles } from "@/Styles/components/Login/loginStyles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import ArrobaIcon from "../assets/Icons/arroba.svg";
import FacebookIcon from "../assets/Icons/Facebook.svg";
import GoogleIcon from "../assets/Icons/google.svg";
import IOSIconfrom from "../assets/Icons/IOS.svg";
import LlaveIcon from "../assets/Icons/Llave.svg";
import PuppySvg from "../assets/Icons/PuppySvg.svg";
import AuthLayout from "../components/AuthLayout";
import { useModalToast } from "../components/ModalToast";
import CustomModal from "./(CustomModal)/CustomModal";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast, ToastComponent } = useModalToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    iconName: null as keyof typeof Ionicons.glyphMap | null,
    iconColor: "#00D9C5",
  });

  const validateEmail = (email: string) => {
    if (!email) return false;
    const emailTrimmed = email.trim();
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/;
    return emailRegex.test(emailTrimmed);
  };

  const showInfoModal = (message: string, icon: any, titulo: string) => {
    setModalConfig({
      title: titulo,
      message: message,
      iconName: icon,
      iconColor: "#00D9C5",
    });
    setModalVisible(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showInfoModal(
        i18n.t("alerts.nodata"),
        "information-circle",
        i18n.t("general.Data_missing")
      );
      return;
    }
    if (!validateEmail(email)) {
      showInfoModal(
        i18n.t("alerts.alertemailInvalid"),
        "alert-circle",
        i18n.t("alerts.emailInvalid")
      );
      return;
    }
    setLoading(true);
    try {
      const data = await login(email, password);
      dispatch(setCredentials({ token: data.token, user: data.user }));
      router.replace("/(tabs)/perfil");
    } catch (error: any) {
      showInfoModal(
        i18n.t("alerts.error"),
        "alert-circle",
        i18n.t("login.errorlogin")
      );
    } finally {
      setLoading(false);
    }
  };

  const googleAuth = useGoogleAuth(async (token: string) => {
    const data = await loginGoogle(token);
    console.log("Usuario Google:", data);
    router.replace("/(tabs)/perfil");
  });

  return (
    <AuthLayout contentStyle={loginStyles.container}>
      <View style={loginStyles.inner}>
        <ToastComponent />
        {/* Form */}
        <View style={loginStyles.formContainer}>
          {/* Header */}
          <View style={loginStyles.header}>
            <PuppySvg />
            <Text style={loginStyles.title}>{i18n.t("login.title")}</Text>
          </View>
          <Text style={loginStyles.label}>{i18n.t("login.email")} *</Text>
          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.inputIcon}>
              <ArrobaIcon width={25} height={25} />
            </Text>
            <TextInput
              placeholder={i18n.t("login.email")}
              value={email}
              onChangeText={setEmail}
              style={loginStyles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              textContentType="none"
              importantForAutofill="no"
              returnKeyType="next"
              placeholderTextColor="#999"
            />
          </View>

          <Text style={loginStyles.label}>{i18n.t("login.password")} *</Text>
          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.inputIcon}>
              <LlaveIcon width={25} height={25} />
            </Text>
            <TextInput
              placeholder={i18n.t("login.password")}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={loginStyles.input}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              textContentType="none"
              returnKeyType="done"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={loginStyles.forgotPasswordContainer}
            onPress={() => router.push("/(Login)/ChangePassword")}
          >
            <Text style={loginStyles.forgotPasswordText}>
              {i18n.t("login.forgotPassword")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={loginStyles.loginButton}
            disabled={loading}
            onPress={handleLogin}
          >
            <Text style={loginStyles.loginButtonText}>
              {loading
                ? i18n.t("general.logging_in") ?? "..."
                : i18n.t("general.log_in")}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Social Buttons */}
        <View style={loginStyles.dividerContainer}>
          <View style={loginStyles.divider} />
          <Text style={loginStyles.dividerText}>
            {" "}
            {i18n.t("general.continue")}
          </Text>
          <View style={loginStyles.divider} />
        </View>
        <View style={loginStyles.socialButtonsContainer}>
          <TouchableOpacity style={loginStyles.socialButton}>
            <View style={loginStyles.socialIconContainer}>
              <FacebookIcon width={40} height={40} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={loginStyles.socialButton}
            onPress={() => googleAuth.promptAsync()}
          >
            <View style={loginStyles.socialIconContainer}>
              <GoogleIcon width={40} height={40} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={loginStyles.socialButton}>
            <View style={loginStyles.socialIconContainer}>
              <IOSIconfrom width={40} height={40} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={loginStyles.registerContainer}>
          <Text style={loginStyles.registerText}>
            {" "}
            {i18n.t("login.account")}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(Users)/Users")}>
            <Text style={loginStyles.registerLink}>
              {i18n.t("general.register")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalConfig.title}
        iconName={
          modalConfig.iconName as keyof typeof Ionicons.glyphMap | undefined
        }
        iconColor={modalConfig.iconColor}
        primaryButton={{
          text: i18n.t("general.understood"),
          onPress: () => setModalVisible(false),
        }}
      >
        <Text style={loginStyles.textModal}>{modalConfig.message}</Text>
      </CustomModal>
    </AuthLayout>
  );
}
