import { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const UserTypeSelectionScreen = () => {
  const [selectedType, setSelectedType] = useState(null);

  //   const handleClientPress = () => {
  //     setSelectedType('client');
  //     // Aquí puedes agregar la navegación o lógica para cliente
  //     console.log('Usuario seleccionó: Cliente');
  //   };

  //   const handleCaretakerPress = () => {
  //     setSelectedType('caretaker');
  //     // Aquí puedes agregar la navegación o lógica para cuidador
  //     console.log('Usuario seleccionó: Cuidador');
  //   };

  return (
    <ImageBackground
      source={require("../../assets/images/Registrate.png")} // Cambia por tu imagen de fondo
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Overlay oscuro para mejor legibilidad */}
      <View style={styles.overlay} />

      <SafeAreaView style={styles.container}>
        {/* Título principal */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Regístrate</Text>
          <Text style={styles.title}>como</Text>
        </View>

        {/* Contenedor de las opciones */}
        <View style={styles.optionsContainer}>
          {/* Opción Cliente */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              styles.clientCard,
              selectedType === "client" && styles.selectedCard,
            ]}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, styles.clientTitle]}>
                Cliente
              </Text>

              {/* Icono Cliente */}
              <View style={styles.iconContainer}>
                <View style={[styles.iconBackground, styles.clientIcon]}>
                  {/* Aquí puedes usar un icono SVG o una imagen */}
                  <Text style={styles.iconText}>👨‍👩‍👧‍👦</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.actionButton, styles.clientButton]}
              >
                <Text style={[styles.buttonText, styles.clientButtonText]}>
                  Quiero ser cliente
                </Text>
              </TouchableOpacity>

              <Text style={styles.descriptionText}>
                Encuentra cuidadores y alojamientos de confianza para tu
                compañero peludo, justo donde estés.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Opción Cuidador */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              styles.caretakerCard,
              selectedType === "caretaker" && styles.selectedCard,
            ]}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, styles.caretakerTitle]}>
                Cuidador
              </Text>

              {/* Icono Cuidador */}
              <View style={styles.iconContainer}>
                <View style={[styles.iconBackground, styles.caretakerIcon]}>
                  {/* Aquí puedes usar un icono SVG o una imagen */}
                  <Text style={styles.iconText}>🏠</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.actionButton, styles.caretakerButton]}
              >
                <Text style={[styles.buttonText, styles.caretakerButtonText]}>
                  Quiero ser cuidador
                </Text>
              </TouchableOpacity>

              <Text style={styles.descriptionText}>
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 50,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    paddingBottom: 50,
  },
  optionCard: {
    flex: 1,
    height: height * 0.55,
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-between",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  clientCard: {
    backgroundColor:
      " var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;",
    boxShadow: "10px 10px 6px var(--unnamed-color-ffffff);",
    borderRadius: "12px",
    opacity: 1,
    backdropFilter: "blur(5px)",
  },
  caretakerCard: {
    backgroundColor:
      " var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;",
    boxShadow: "10px 10px 6px var(--unnamed-color-ffffff);",
    borderRadius: "12px",
    opacity: 1,
    backdropFilter: "blur(5px)",
  },
  selectedCard: {
    transform: [{ scale: 1.02 }],
    elevation: 12,
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  clientTitle: {
    color: "#F6C3CC",
  },
  caretakerTitle: {
    color: "#36EBD8",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  clientIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 2,
    borderColor: "#FF69B4",
  },
  caretakerIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 2,
    borderColor: "#00D4AA",
  },
  iconText: {
    fontSize: 32,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 20,
    minWidth: 140,
  },
  clientButton: {
    backgroundColor: "#F6C3CC",
  },
  caretakerButton: {
    backgroundColor: "#36EBD8",
  },
  buttonText: {
    fontSize: 10.7,
    fontWeight: "bold",
    textAlign: "center",
  },
  clientButtonText: {
    color: "black",
  },
  caretakerButtonText: {
    color: "black",
  },
  descriptionText: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 13,
    color: "#ffff",
    fontWeight: "500",
  },
});

export default UserTypeSelectionScreen;
