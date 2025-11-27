import { Dimensions, StyleSheet } from "react-native";
import { fontFamily } from "../../../Config/typography";
const { width, height } = Dimensions.get("window");

export const UsersStyles = StyleSheet.create({
  container: {
    flexGrow: 2,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 25,
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
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginTop: 20,
    fontFamily: fontFamily.bold,
  },

  label: {
    fontSize: 15,
    color: "#0000",
    marginBottom: 6,
    fontFamily: fontFamily.light,
    letterSpacing: 0,
    textAlign: "left",
    opacity: 1,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#E4E4E4",
    marginBottom: 15,
    fontFamily: fontFamily.medium,
    paddingHorizontal: 15, // Agrega espacio interno a los lados
    paddingVertical: 30, // Opcional: también da espacio arriba y abajo
  },
  error: {
    color: "#e74c3c",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 8,
    marginTop: -5,
    fontFamily: fontFamily.medium,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 15,
    paddingHorizontal: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: "#555",
    fontSize: 14,
    flex: 1,
    lineHeight: 18,
    fontFamily: fontFamily.medium,
  },
  button: {
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  clientButton: {
    backgroundColor: "#F6C3CC",
  },
  caretakerButton: {
    backgroundColor: "#36EBD8",
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fontFamily.medium,
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
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    gap: 5,
  },
  loginText: {
    color: "#000",
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
  loginLink: {
    color: "#e74c3c",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 8,
    paddingTop: 30,
    paddingBottom: 100,
    flex: 1,
    justifyContent: "center",
  },

  continueButtonText: {
    color: "#0000",
    fontSize: 16,
    fontFamily: fontFamily.bold,
  },

  // Para Picker nativo
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },

  // Para CustomPicker
  pickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#333",
    fontFamily: fontFamily.medium,
  },
  pickerPlaceholder: {
    color: "#999",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: fontFamily.medium,
  },
});
