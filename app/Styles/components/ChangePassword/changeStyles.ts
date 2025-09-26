import { StyleSheet } from "react-native";

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
    backgroundColor: "#f5f5f5",
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
    marginBottom: 70,
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
    color: "#333",
    marginBottom: 70,
  },

  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
    lineHeight: 20,
  },

  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 12,
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
    fontSize: 16,
    fontWeight: "600",
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
    height: 1,
    backgroundColor: "#e0e0e0",
  },

  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
    color: "#666",
  },

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
});
