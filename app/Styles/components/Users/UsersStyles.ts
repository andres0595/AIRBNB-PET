import { Dimensions, StyleSheet } from "react-native";
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
    marginTop: 40,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
    color: "#333",
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
    marginLeft: 8,
    fontWeight: "500",
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#f8f8f8",
    marginBottom: 15,
  },
  error: {
    color: "#e74c3c",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 8,
    marginTop: -5,
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
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 10,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
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
    color: "#555",
    fontSize: 14,
  },
  loginLink: {
    color: "#e74c3c",
    fontSize: 14,
    fontWeight: "500",
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
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
  },

  // Para Picker nativo
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },

  // Para CustomPicker
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  pickerPlaceholder: {
    color: '#999',
  },
});
