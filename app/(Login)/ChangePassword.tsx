import { useModalToast } from "@/components/ModalToast";
import { useGoogleAuth } from "@/hooks/useSocialAuth";
import { i18n } from "@/i18n/translations";
import { GenetateOtp, login } from "@/Service/Service-Login/authService";
import { setEmailForOtp } from "@/Store/authSlice";
import { changeStyles } from "@/Styles/components/ChangePassword/changeStyles";
import { UsersStyles } from "@/Styles/components/Users/UsersStyles";
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
import PuppySvg from "../../assets/images/LogoPuppyPo.svg";
import AuthLayout from "../../components/AuthLayout";
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
    router.replace("/(tabs)/perfil");
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
        i18n.t("alerts.alertemailInvalid"),
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
      dispatch(setEmailForOtp(email));
      const response = await GenetateOtp(email);
      if (!response.flag) {
        showInfoModal(
          i18n.t("alerts.alertemailInvalid"),
          "alert-circle",
          i18n.t("alerts.userNotFound")
        );
        return;
      } else {
        /// setModalVisible(true);
        showInfoModal(
          i18n.t("alerts.passwordResetSent", { email: maskEmail(email) }),
          "",
          i18n.t("login.forgotPasswordChange"),
          true
        );
        router.replace("/(Login)/ValidateOtp");
      }
    } catch (error: any) {
      showInfoModal(
        i18n.t("alerts.errorChangePassword"),
        "",
        i18n.t("alerts.checkInternetConnection"),
        false
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
              <Ionicons name="chevron-back" size={24} color="#707070" />
            </TouchableOpacity>
            <ToastComponent />
            {/* Header */}
            <View style={changeStyles.header}>
              <PuppySvg />
            </View>
            <Text style={changeStyles.title}>
              {i18n.t("login.forgotPasswordChange")}
            </Text>
            <Text style={changeStyles.description}>
              {i18n.t("login.textChangeDescription")}
            </Text>

            <Text style={changeStyles.label}>{i18n.t("login.email")} *</Text>
            <View style={changeStyles.inputContainer}>
              <Text style={changeStyles.inputIcon}>
                <ArrobaIcon width={40} height={40} />
              </Text>
              <TextInput
                placeholder={i18n.t("login.user")}
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
                {loading
                  ? i18n.t("general.sending") ?? "..."
                  : i18n.t("general.send")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={changeStyles.dividerContainer}>
            <View style={changeStyles.divider} />
            <Text style={changeStyles.dividerText}>
              {" "}
              {i18n.t("general.continue")}
            </Text>
            <View style={changeStyles.divider} />
          </View>

          {/* Social Buttons */}
          <View style={changeStyles.socialButtonsContainer}>
            <TouchableOpacity style={changeStyles.socialButton}>
              <View style={changeStyles.socialIconContainer}>
                <FacebookIcon width={70} height={70} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={changeStyles.socialButton}
              onPress={() => googleAuth.promptAsync()}
            >
              <View style={changeStyles.socialIconContainer}>
                <GoogleIcon width={70} height={70} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={changeStyles.socialButton}>
              <View style={changeStyles.socialIconContainer}>
                <IOSIconfrom width={70} height={70} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={UsersStyles.loginLinkContainer}>
            <Text style={UsersStyles.loginText}>
              {i18n.t("login.account")}{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={UsersStyles.loginLink}>
                {i18n.t("general.register")}
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
          text: i18n.t("general.understood"),
          onPress: modalConfig.onPress || (() => setModalVisibleAlert(false)),
        }}
      >
        <Text style={changeStyles.questionAnswer}>{modalConfig.message}</Text>
      </CustomModal>
    </AuthLayout>
  );
}
function dispatch(arg0: { payload: string; type: "auth/setEmailForOtp" }) {
  throw new Error("Function not implemented.");
}
