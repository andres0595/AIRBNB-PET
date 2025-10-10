import { router } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ClientIcon from "../../assets/Icons/Cliente.svg";
import CaregiverIcon from "../../assets/Icons/Cuidador.svg";
import { HomeRegisterStyles } from "../Styles/components/Users/Home_RegisterStyles";

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
          <Text style={HomeRegisterStyles.title}>Regístrate</Text>
          <Text style={HomeRegisterStyles.title}>como</Text>
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
                Cliente
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
                  Quiero ser cliente
                </Text>
              </TouchableOpacity>

              <Text style={HomeRegisterStyles.descriptionText}>
                Encuentra cuidadores y alojamientos de confianza para tu
                compañero peludo, justo donde estés.
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
                Cuidador
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
                  Quiero ser cuidador
                </Text>
              </TouchableOpacity>

              <Text style={HomeRegisterStyles.descriptionText}>
                Únete como cuidador y ofrece un hogar seguro y lleno de cariño
                para las mascotas de tu ciudad.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default UserTypeSelectionScreen;
