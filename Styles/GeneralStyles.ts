import { Dimensions, StyleSheet } from "react-native";
import { fontFamily } from "../Config/typography";
const { width, height } = Dimensions.get("window");

export const generalStyles = StyleSheet.create({
  // Containers
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },

  containerWhite: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },

  inner: {
    flex: 1,
    justifyContent: "center",
  },

  // Form Containers
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

  // Header
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    marginTop: 40,
    padding: 10,
  },

  headerCenter: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  // Logo
  logo: {
    width: 120,
    height: 50,
    marginBottom: 10,
  },

  logoSmall: {
    width: 100,
    height: 60,
    marginBottom: 20,
  },

  // Titles
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
    marginBottom: 30,
    fontFamily: fontFamily.bold,
  },

  titleSmall: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginTop: 20,
    fontFamily: fontFamily.medium,
  },

  // Inputs
  label: {
    fontSize: 13,
    color: "#333",
    marginBottom: 6,
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    fontFamily: fontFamily.medium,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 4,
    minHeight: 50,
  },

  inputIcon: {
    fontSize: 16,
    color: "#ff0000",
    marginRight: 12,
    fontWeight: "600",
  },

  inputError: {
    borderColor: "red",
  },

  // Buttons
  button: {
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fontFamily.medium,
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
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fontFamily.medium,
  },

  // Dividers
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },

  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
    color: "#666",
    fontFamily: fontFamily.medium,
  },

  // Social Buttons
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 24,
  },

  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
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

  // Back Button
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  backButtonTop: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
    padding: 4,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 100,
  },

  // Continue Button
  continueButton: {
    backgroundColor: "#00D9C5",
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#00D9C5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  continueButtonDisabled: {
    backgroundColor: "#D0D0D0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 2,
  },

  continueButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fontFamily.medium,
  },

  continueButtonTextDisabled: {
    color: "#888888",
  },

  // Description
  description: {
    fontSize: 14,
    textAlign: "justify",
    color: "#666",
    marginBottom: 25,
    lineHeight: 17,
    fontFamily: fontFamily.medium,
  },

  // Register Links
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  registerText: {
    fontSize: 10,
    color: "#666",
    fontFamily: fontFamily.medium,
  },

  registerLink: {
    fontSize: 10,
    color: "#ff0000",
    fontWeight: "600",
    textDecorationLine: "underline",
    fontFamily: fontFamily.medium,
  },

  // Error
  error: {
    color: "#e74c3c",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 8,
    marginTop: -5,
    fontFamily: fontFamily.medium,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: "90%",
    maxHeight: "80%",
    padding: 24,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  modalIconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: fontFamily.bold,
  },

  modalScroll: {
    maxHeight: 400,
  },

  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
    padding: 5,
  },

  // Text styles
  infoText: {
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
    marginBottom: 25,
    fontFamily: fontFamily.medium,
  },

  infoTextCenter: {
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
    marginBottom: 25,
    textAlign: "center",
    fontFamily: fontFamily.medium,
  },

  // Button variants
  primaryButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 28,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: fontFamily.medium,
  },

  secondaryButton: {
    backgroundColor: "#00D9C5",
    borderRadius: 28,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  secondaryButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: fontFamily.medium,
  },

  disabledButton: {
    backgroundColor: "#D3D3D3",
  },

  disabledButtonText: {
    color: "#888",
    fontFamily: fontFamily.medium,
  },

  // Layout
  row: {
    flexDirection: "row",
    gap: 12,
  },

  // Icon container
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2.5,
    borderColor: "#00D9C5",
  },
});
