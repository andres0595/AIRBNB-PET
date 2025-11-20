import { i18n } from "@/i18n/translations";
import { HomeRegisterStyles } from "@/Styles/components/Users/Home_RegisterStyles";
import { router } from "expo-router";
import { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ClientIcon from "../../assets/Icons/Cliente.svg";
import CaregiverIcon from "../../assets/Icons/Cuidador.svg";

const UserTypeSelectionScreen = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Función para manejar la navegación del cliente
  const handleClientPress = () => {
    setSelectedType("client");
    console.log("Usuario seleccionó: Cliente");
    router.push({
      pathname: "/(Users)/Users",
      params: { userType: "client" },
    });
  };

  // Función para manejar la navegación del cuidador
  const handleCaretakerPress = () => {
    setSelectedType("caretaker");
    console.log("Usuario seleccionó: Cuidador");
    router.push({
      pathname: "/(Users)/Users",
      params: { userType: "caretaker" },
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/registrate2.png")} // Cambia por tu imagen de fondo
      style={HomeRegisterStyles.backgroundImage}
      resizeMode="cover"
    >
      {/* Overlay oscuro para mejor legibilidad */}
      <View style={HomeRegisterStyles.overlay} />

      <SafeAreaView style={HomeRegisterStyles.container}>
        {/* Título principal */}
        <View style={HomeRegisterStyles.titleContainer}>
          <Text style={HomeRegisterStyles.title}>
            {" "}
            {i18n.t("user.registeras")}
          </Text>
        </View>

        {/* Contenedor de las opciones */}
        <View style={HomeRegisterStyles.optionsContainer}>
          {/* Opción Cliente */}
          <TouchableOpacity
            style={[
              HomeRegisterStyles.optionCard,
              HomeRegisterStyles.clientCard,
              selectedType === "client" && HomeRegisterStyles.selectedCard,
            ]}
            activeOpacity={0.8}
            onPress={handleClientPress}
          >
            <View style={HomeRegisterStyles.cardContent}>
              <Text
                style={[
                  HomeRegisterStyles.cardTitle,
                  HomeRegisterStyles.clientTitle,
                ]}
              >
                {i18n.t("user.customer")}
              </Text>

              {/* Icono Cliente */}
              <View style={HomeRegisterStyles.iconContainer}>
                <ClientIcon width={160} height={140} />
              </View>

              <TouchableOpacity
                style={[
                  HomeRegisterStyles.actionButton,
                  HomeRegisterStyles.clientButton,
                  selectedType === "client" && HomeRegisterStyles.selectedCard,
                ]}
                onPress={handleClientPress}
              >
                <Text
                  style={[
                    HomeRegisterStyles.buttonText,
                    HomeRegisterStyles.clientButtonText,
                  ]}
                >
                  {i18n.t("user.descriptionCustomer")}
                </Text>
              </TouchableOpacity>

              <Text style={HomeRegisterStyles.descriptionText}>
                {i18n.t("user.textdescription")}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Opción Cuidador */}
          <TouchableOpacity
            style={[
              HomeRegisterStyles.optionCard,
              HomeRegisterStyles.caretakerCard,
              selectedType === "caretaker" && HomeRegisterStyles.selectedCard,
            ]}
            activeOpacity={0.8}
            onPress={handleCaretakerPress}
          >
            <View style={HomeRegisterStyles.cardContent}>
              <Text
                style={[
                  HomeRegisterStyles.cardTitle,
                  HomeRegisterStyles.caretakerTitle,
                ]}
              >
                {i18n.t("user.caregiver")}
              </Text>

              {/* Icono Cuidador */}
              <View style={HomeRegisterStyles.iconContainer}>
                <CaregiverIcon width={160} height={140} />
              </View>

              <TouchableOpacity
                style={[
                  HomeRegisterStyles.actionButton,
                  HomeRegisterStyles.caretakerButton,
                ]}
                onPress={handleCaretakerPress}
              >
                <Text
                  style={[
                    HomeRegisterStyles.buttonText,
                    HomeRegisterStyles.caretakerButtonText,
                  ]}
                >
                  {i18n.t("user.descriptionCaregiver")}
                </Text>
              </TouchableOpacity>

              <Text style={HomeRegisterStyles.descriptionText}>
                {i18n.t("user.subtitle")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default UserTypeSelectionScreen;
