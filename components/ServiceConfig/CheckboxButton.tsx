import { fontFamily } from "@/Config/typography";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CheckboxButtonProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export const CheckboxButton: React.FC<CheckboxButtonProps> = ({
  label,
  checked,
  onToggle,
}) => {
  return (
    <TouchableOpacity style={styles.checkboxOption} onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checkboxSelected]}>
        {checked && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#36ebd8",
    borderColor: "#36ebd8",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#4B5563",
    flex: 1,
    fontFamily: fontFamily.medium,
  },
});
