import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  animationType?: "none" | "slide" | "fade";
  // Botones personalizables
  primaryButton?: {
    text: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
  };
  secondaryButton?: {
    text: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
  };
  // Estilos personalizables
  modalContentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  overlayStyle?: ViewStyle;
  // Configuración del icono de cerrar
  closeIconColor?: string;
  closeIconSize?: number;
}

export default function CustomModal({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  animationType = "fade",
  primaryButton,
  secondaryButton,
  modalContentStyle,
  titleStyle,
  overlayStyle,
  closeIconColor = "#333",
  closeIconSize = 28,
}: CustomModalProps) {
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalOverlay, overlayStyle]}>
        <View style={[styles.modalContent, modalContentStyle]}>
          {/* Botón cerrar */}
          {showCloseButton && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons
                name="close"
                size={closeIconSize}
                color={closeIconColor}
              />
            </TouchableOpacity>
          )}

          {/* Título */}
          {title && (
            <Text style={[styles.modalTitle, titleStyle]}>{title}</Text>
          )}

          {/* Contenido personalizado */}
          <View style={styles.content}>{children}</View>

          {/* Botones */}
          {(primaryButton || secondaryButton) && (
            <View style={styles.buttonsContainer}>
              {secondaryButton && (
                <TouchableOpacity
                  style={[styles.secondaryButton, secondaryButton.style]}
                  onPress={secondaryButton.onPress}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.secondaryButtonText,
                      secondaryButton.textStyle,
                    ]}
                  >
                    {secondaryButton.text}
                  </Text>
                </TouchableOpacity>
              )}

              {primaryButton && (
                <TouchableOpacity
                  style={[styles.primaryButton, primaryButton.style]}
                  onPress={primaryButton.onPress}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[styles.primaryButtonText, primaryButton.textStyle]}
                  >
                    {primaryButton.text}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
    paddingRight: 40, // Espacio para el botón de cerrar
  },
  content: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "column",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#00D9C5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
});
