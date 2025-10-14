import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LegalConsentsFormProps {
  onSave?: (data: LegalConsentsData) => void;
  onProgressChange?: (percentage: number) => void;
}

interface LegalConsentsData {
  termsAndConditions: boolean;
  privacyPolicy: boolean;
  independentContractor: boolean;
  animalSafetyPolicy: boolean;
}

export const LegalConsentsForm: React.FC<LegalConsentsFormProps> = ({
  onSave,
  onProgressChange,
}) => {
  const [formData, setFormData] = useState<LegalConsentsData>({
    termsAndConditions: false,
    privacyPolicy: false,
    independentContractor: false,
    animalSafetyPolicy: false,
  });

  // Calcular porcentaje de completitud
  useEffect(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(
      (value) => value === true
    ).length;

    const percentage = Math.round((filledFields / totalFields) * 100);

    onProgressChange?.(percentage);
  }, [
    formData.termsAndConditions,
    formData.privacyPolicy,
    formData.independentContractor,
    formData.animalSafetyPolicy,
  ]);

  const toggleConsent = (field: keyof LegalConsentsData) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleLinkPress = (label: string) => {
    // Aquí puedes abrir el documento correspondiente
    console.log(`Abrir: ${label}`);
    // Ejemplo: Linking.openURL('https://tupagina.com/terminos.pdf');
  };

  const consentOptions = [
    {
      id: "termsAndConditions" as keyof LegalConsentsData,
      label: "Términos y condiciones de la plataforma",
    },
    {
      id: "privacyPolicy" as keyof LegalConsentsData,
      label: "Política de privacidad (PIPEDA en Canadá)",
    },
    {
      id: "independentContractor" as keyof LegalConsentsData,
      label: "Acuerdo de contratista independiente",
    },
    {
      id: "animalSafetyPolicy" as keyof LegalConsentsData,
      label: "Política de seguridad animal y emergencias",
    },
  ];

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>
        15. Acepto los siguientes documentos obligatorios: *
      </Text>

      <View style={styles.consentsContainer}>
        {consentOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.radioOption}
            onPress={() => toggleConsent(option.id)}
            activeOpacity={0.7}
          >
            <View style={styles.radioCircle}>
              {formData[option.id] && <View style={styles.radioSelected} />}
            </View>
            <TouchableOpacity
              onPress={() => handleLinkPress(option.label)}
              activeOpacity={0.7}
            >
              <Text style={styles.linkText}>{option.label}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
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
    marginBottom: 20,
    fontWeight: "500",
    lineHeight: 20,
  },
  consentsContainer: {
    gap: 14,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 2,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D1D6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#333",
  },
  linkText: {
    fontSize: 14,
    color: "#000",
    textDecorationLine: "underline",
    flex: 1,
    lineHeight: 20,
  },
});
