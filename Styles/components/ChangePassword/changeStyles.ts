import { StyleSheet } from "react-native";
import { fontFamily } from "../../../Config/typography";

export const changeStyles = StyleSheet.create({
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

  container: {
    flexGrow: 1,
    backgroundColor: "#E4E4E4",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
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

  logo: {
    width: 120,
    height: 50,
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#000000",
    marginBottom: 30,
    fontFamily: fontFamily.bold,
  },

  description: {
    fontSize: 14,
    textAlign: "justify",
    color: "#000000",
    marginBottom: 25,
    lineHeight: 17,
    fontFamily: fontFamily.light,
  },

  label: {
    fontSize: 14,
    color: "#0000",
    marginBottom: 8,
    fontFamily: fontFamily.medium,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 12,
    fontFamily: fontFamily.medium,
  },

  inputError: {
    borderColor: "red",
  },

  button: {
    backgroundColor: "#555",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  loginButton: {
    backgroundColor: "#ff0000",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginVertical: 16,
    shadowColor: "#ff0000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: fontFamily.medium,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    borderRadius: 25,
    paddingHorizontal: 6,
    marginBottom: 4,
    minHeight: 50,
  },

  inputIcon: {
    fontSize: 16,
    color: "#ff0000",
    marginRight: 12,
    fontWeight: "600",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  divider: {
    flex: 1,

    height: 0.5,
    backgroundColor: "#707070",
  },

  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
    color: "#0000",
    fontFamily: fontFamily.medium,
  },

  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 24,
  },

  socialButton: {
    width: 45,
    height: 45,
    borderRadius: 30,
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

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 100,
  },

  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    paddingTop: 50, // Espacio extra arriba para el botón X
    width: "85%",
    maxWidth: 400,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
    padding: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 25,
  },
  questionBlock: {
    width: "100%",
    marginBottom: 25,
  },
  questionAnswer: {
    fontSize: 14,
    color: "#0000",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: fontFamily.medium,
  },
  continueButton: {
    backgroundColor: "#00D9C5",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: "100%",
    alignItems: "center",
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  errorsContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  errorText: {
    color: "#e74c3c", // Rojo para errores
    fontSize: 12,
    marginBottom: 4,
    lineHeight: 16,
    fontFamily: fontFamily.medium,
  },
});
