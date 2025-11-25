import { StyleSheet } from "react-native";
import { fontFamily } from "../../../Config/typography";

export const loginStyles = StyleSheet.create({
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
    marginBottom: 40,
  },

  logo: {
    width: 100,
    height: 60,
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginTop: 20,
    fontFamily: fontFamily.bold,
  },

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

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
    marginLeft: 10,
    fontFamily: fontFamily.medium,
  },

  textModal: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
    marginLeft: 10,
    textAlign: "center",
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

  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 12,
    fontFamily: fontFamily.medium,
  },

  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginVertical: 12,
  },

  forgotPasswordText: {
    color: "#ff0000",
    fontSize: 12,
    textDecorationLine: "underline",
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
    fontSize: 14,
    fontWeight: "600",
    fontFamily: fontFamily.medium,
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
    fontFamily: fontFamily.medium,
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

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  registerText: {
    fontSize: 10,
    color: "#000",
    fontFamily: fontFamily.medium,
  },

  registerLink: {
    fontSize: 10,
    color: "#ff0000",
    fontWeight: "600",
    textDecorationLine: "underline",
    fontFamily: fontFamily.medium,
  },
});
