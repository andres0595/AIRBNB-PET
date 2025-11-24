import { fontFamily } from "@/Config/typography";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  style?: any;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  selected,
  onSelect,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.radioOption, style]} onPress={onSelect}>
      <View
        style={[styles.radioCircle, selected && styles.radioCircleSelected]}
      >
        {selected && <View style={styles.radioDot} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    borderColor: "#36ebd8",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#36ebd8",
  },
  radioLabel: {
    fontSize: 14,
    color: "#4B5563",
    fontFamily: fontFamily.medium,
  },
});
