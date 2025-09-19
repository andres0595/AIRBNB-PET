import React from "react";
import { TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";

export function HapticTab(props: any) {
  return (
    <TouchableOpacity
      {...props}
      onPress={(e) => {
        Haptics.selectionAsync(); // vibración ligera
        props.onPress?.(e);
      }}
    >
      {props.children}
    </TouchableOpacity>
  );
}
