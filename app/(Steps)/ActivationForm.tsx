import { ActivationData } from "@/Models/Models-Tabs/ActivationData";
import { RootState } from "@/Store/store";
import {
  setActivationData,
  setActivationPercentage,
} from "@/Store/validationsSlice";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface ActivationFormProps {
  onSave?: (data: ActivationData) => void;
  onProgressChange?: (percentage: number) => void;
}

const ActivationForm: React.FC<ActivationFormProps> = ({
  onSave,
  onProgressChange,
}) => {
  const dispatch = useDispatch();

  const activationData = useSelector(
    (state: RootState) =>
      state.validations.activationData || {
        finalConfirmation: false,
      }
  );

  const formData = activationData;

  useEffect(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(
      (value) => value === true
    ).length;

    const percentage = Math.round((filledFields / totalFields) * 100);
    dispatch(setActivationPercentage(percentage));
    onProgressChange?.(percentage);
  }, [formData.finalConfirmation]);

  // ✅ Solo actualiza Redux, no retorna nada
  const toggleConfirmation = () => {
    const updated = {
      ...formData,
      finalConfirmation: !formData.finalConfirmation,
    };
    dispatch(setActivationData(updated));
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>16. Confirmación final *</Text>

      <TouchableOpacity
        style={styles.confirmationCard}
        onPress={toggleConfirmation}
        activeOpacity={0.7}
      >
        <View style={styles.checkboxRow}>
          <View
            style={[
              styles.checkbox,
              formData.finalConfirmation && styles.checkboxSelected,
            ]}
          >
            {formData.finalConfirmation && (
              <Ionicons name="checkmark" size={20} color="#FFF" />
            )}
          </View>
          <Text style={styles.confirmationText}>
            Declaro que la información suministrada es verídica y acepto que mi
            perfil solo será activado tras verificación de identidad y
            antecedentes
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Ionicons name="shield-checkmark" size={32} color="#00D9C5" />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Proceso de activación</Text>
          <Text style={styles.infoText}>
            Una vez completes todos los pasos, nuestro equipo revisará tu
            información. Te notificaremos por correo electrónico cuando tu
            perfil sea activado.
          </Text>
        </View>
      </View>

      <View style={styles.warningBox}>
        <Ionicons
          name="alert-circle-outline"
          size={24}
          color="#FF3B30"
          style={styles.warningIcon}
        />
        <View style={styles.warningContent}>
          <Text style={styles.warningTitle}>Importante</Text>
          <Text style={styles.warningText}>
            • La verificación puede tomar de 2 a 5 días hábiles
          </Text>
          <Text style={styles.warningText}>
            • Proporcionar información falsa resultará en la suspensión
            permanente de tu cuenta
          </Text>
          <Text style={styles.warningText}>
            • Mantén tu información de contacto actualizada
          </Text>
        </View>
      </View>

      {formData.finalConfirmation && (
        <View style={styles.successBox}>
          <Ionicons name="checkmark-circle" size={24} color="#34C759" />
          <Text style={styles.successText}>
            ¡Listo! Puedes continuar para enviar tu solicitud
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 16,
  },
  label: {
    fontSize: 13,
    color: "#333",
    marginBottom: 16,
    fontWeight: "500",
    lineHeight: 20,
  },
  confirmationCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },

  checkboxSelected: {
    backgroundColor: "#00D9C5",
    borderColor: "#F3F4F6",
  },
  confirmationText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    lineHeight: 22,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#E8F9F7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#B8EDE7",
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#00A896",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: "#006B5F",
    lineHeight: 20,
  },
  warningBox: {
    flexDirection: "row",
    backgroundColor: "#FFF3F3",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FFCCCB",
    gap: 12,
  },
  warningIcon: {
    marginTop: 2,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FF3B30",
    marginBottom: 8,
  },
  warningText: {
    fontSize: 13,
    color: "#C41E3A",
    lineHeight: 22,
    marginBottom: 4,
  },
  successBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#A5D6A7",
  },
  successText: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "500",
    flex: 1,
  },
});
export default ActivationForm;
