import { useLogin } from "@/hooks/Login/useLogin";
import { useGoogleAuth } from "@/hooks/useSocialAuth";
import { i18n } from "@/i18n/translations";
import { loginStyles } from "@/Styles/components/Login/loginStyles";
import { UsersStyles } from "@/Styles/components/Users/UsersStyles";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ArrobaIcon from "../assets/Icons/arroba.svg";
import LlaveIcon from "../assets/Icons/Llave.svg";
import PuppySvg from "../assets/images/LogoPuppyPo.svg";
import AuthLayout from "../components/AuthLayout";
import CustomModal from "./(CustomModal)/CustomModal";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    iconName: null,
    iconColor: "#00D9C5",
  });

  const showModal = (message: string, icon: any, title: string) => {
    setModalConfig({ title, message, iconName: icon, iconColor: "#00D9C5" });
    setModalVisible(true);
  };

  const { loading, handleLogin, handleGoogleLogin } = useLogin(showModal);

  const googleAuth = useGoogleAuth(async (token: string) => {
    await handleGoogleLogin(token);
  });

  if (loading) {
    return (
      <AuthLayout contentStyle={UsersStyles.container}>
        <View style={loginStyles.fullScreenLoading}>
          <PuppySvg width={150} height={120} />
          <ActivityIndicator size="large" color="#F6C3CC" />
          <Text>Cargando información...</Text>
        </View>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout contentStyle={loginStyles.container}>
      <View style={loginStyles.inner}>
        {/* FORM */}
        <View style={loginStyles.formContainer}>
          <View style={loginStyles.header}>
            <PuppySvg />
            <Text style={loginStyles.title}>{i18n.t("login.title")}</Text>
          </View>

          {/* Campo Email */}
          <Text style={loginStyles.label}>{i18n.t("login.email")} *</Text>
          <View style={loginStyles.inputContainer}>
            <ArrobaIcon width={40} height={40} />
            <TextInput
              placeholder={i18n.t("login.email")}
              value={email}
              onChangeText={setEmail}
              style={loginStyles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          {/* Campo Password */}
          <Text style={loginStyles.label}>{i18n.t("login.password")} *</Text>
          <View style={loginStyles.inputContainer}>
            <LlaveIcon width={40} height={40} />
            <TextInput
              placeholder={i18n.t("login.password")}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={loginStyles.input}
              autoCapitalize="none"
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
            onPress={() => handleLogin(email, password)}
          >
            <Text style={loginStyles.loginButtonText}>
              {i18n.t("general.log_in")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalConfig.title}
        iconName={modalConfig.iconName as any}
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
