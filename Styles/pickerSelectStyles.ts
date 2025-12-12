import { fontFamily } from "@/Config/typography";
import { StyleSheet } from "react-native";

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    color: "#333",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#E4E4E4",
    marginBottom: 15,
    fontFamily: fontFamily.medium,
    paddingVertical: 14,
    paddingHorizontal: 15,
    paddingRight: 30, // Para el icono
  },
  inputAndroid: {
    fontSize: 14,
    color: "#333",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#E4E4E4",
    marginBottom: 15,
    fontFamily: fontFamily.medium,
    paddingVertical: 8,
    paddingHorizontal: 15,
    paddingRight: 30, // Para el icono
  },
  placeholder: {
    color: "#999",
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});
