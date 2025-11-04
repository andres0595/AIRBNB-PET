import { Dimensions, StyleSheet } from "react-native";
import { fontFamily } from "../../../Config/typography";
import { generalStyles } from "../../GeneralStyles";

const { width, height } = Dimensions.get("window");

export const HomeRegisterStyles = StyleSheet.create({
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
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: fontFamily.bold,
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
    // Efecto glassmorphism
    backgroundColor: "rgba(255, 255, 255, 0.28)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    // Sombras para el efecto de profundidad
    shadowColor: "rgba(255, 255, 255, 0)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },

  caretakerCard: {
    // Efecto glassmorphism
    backgroundColor: "rgba(255, 255, 255, 0.28)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    // Sombras para el efecto de profundidad
    shadowColor: "rgba(255, 255, 255, 0)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
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
    fontFamily: fontFamily.medium,
  },

  clientTitle: {
    color: "#F6C3CC",
    fontFamily: fontFamily.medium,
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
    fontFamily: fontFamily.medium,
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
    fontFamily: fontFamily.medium,
  },

  inner: generalStyles.inner,
});
