import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../(Store)/store";
import {
  setPersonalInfoData,
  setPersonalInfoFiles,
  setPersonalInfoPercentage,
} from "../(Store)/validationsSlice";

interface PersonalInfoFormProps {
  onSave?: (data: any) => void;
  onProgressChange?: (percentage: number) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  onProgressChange,
}) => {
  const dispatch = useDispatch();

  // Obtener datos de Redux con valores por defecto seguros
  const personalInfoData = useSelector(
    (state: RootState) =>
      state.validations.personalInfoData || {
        fullName: "",
        birthDate: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        province: "",
        postCode: "",
        housingType: "",
        idDocument: "",
        uploadedFiles: [],
      }
  );

  const formData = personalInfoData;
  const uploadedFiles = personalInfoData.uploadedFiles || [];
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Calcular porcentaje de completitud
  useEffect(() => {
    const fields = [
      formData.fullName,
      formData.birthDate,
      formData.phone,
      formData.email,
      formData.address,
      formData.city,
      formData.province,
      formData.postCode,
      formData.housingType,
      uploadedFiles.length,
    ];

    const filled = fields.filter(Boolean).length;
    const percentage = Math.round((filled / fields.length) * 100);

    if (percentage !== personalInfoData.percentage) {
      dispatch(setPersonalInfoPercentage(percentage));
      if (onProgressChange) onProgressChange(percentage);
    }
  }, [
    formData.fullName,
    formData.birthDate,
    formData.phone,
    formData.email,
    formData.address,
    formData.city,
    formData.province,
    formData.postCode,
    formData.housingType,
    uploadedFiles.length,
  ]);

  const updateField = (field: string, value: string) => {
    dispatch(setPersonalInfoData({ [field]: value }));
  };

  const pickDocument = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permisos necesarios",
          "Se necesita acceso a la galería para cargar documentos"
        );
        return;
      }

      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const newFiles = [...uploadedFiles, file.name];

        dispatch(setPersonalInfoFiles(newFiles));

        if (uploadedFiles.length === 0) {
          updateField("idDocument", file.name);
        }

        Alert.alert("Éxito", `Archivo "${file.name}" cargado correctamente`);
      }
    } catch (error) {
      console.error("Error al seleccionar documento:", error);
      Alert.alert("Error", "No se pudo cargar el archivo");
    }
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    dispatch(setPersonalInfoFiles(newFiles));

    if (newFiles.length === 0) {
      updateField("idDocument", "");
    }
  };

  // Función para formatear la fecha
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Función para convertir string a Date
  const parseDate = (dateString: string): Date => {
    if (!dateString) return new Date();
    const [day, month, year] = dateString.split("/");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  // Handler para cuando cambia la fecha
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios"); // En iOS mantener abierto, en Android cerrar

    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      updateField("birthDate", formattedDate);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>1. Nombre completo legal *</Text>
      <TextInput
        style={styles.input}
        value={formData.fullName}
        onChangeText={(value) => updateField("fullName", value)}
        placeholder="Ingrese su nombre completo"
      />

      {/* <Text style={styles.label}>2. Fecha de nacimiento *</Text>
      <TextInput
        style={styles.input}
        value={formData.birthDate}
        onChangeText={(value) => updateField("birthDate", value)}
        placeholder="DD/MM/AAAA"
      /> */}

      <Text style={styles.label}>2. Fecha de nacimiento *</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text
          style={[styles.dateText, !formData.birthDate && styles.placeholder]}
        >
          {formData.birthDate || "DD/MM/AAAA"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={
            formData.birthDate ? parseDate(formData.birthDate) : new Date()
          }
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
          maximumDate={new Date()} // No permitir fechas futuras
          minimumDate={new Date(1900, 0, 1)} // Fecha mínima razonable
        />
      )}

      <Text style={styles.label}>3. Número de teléfono *</Text>
      <TextInput
        style={styles.input}
        value={formData.phone}
        onChangeText={(value) => updateField("phone", value)}
        placeholder="Ingrese su teléfono"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>4. Correo electrónico *</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(value) => updateField("email", value)}
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
      />

      <Text style={styles.label}>5. Dirección actual *</Text>
      <TextInput
        style={styles.input}
        value={formData.address}
        onChangeText={(value) => updateField("address", value)}
        placeholder="Ingrese su dirección"
      />

      <Text style={styles.label}>Ciudad *</Text>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => {
          updateField("city", "Bogotá");
        }}
      >
        <Text
          style={[styles.pickerText, formData.city && styles.pickerTextFilled]}
        >
          {formData.city || "Selecciona la ciudad"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      <Text style={styles.label}>Provincia *</Text>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => {
          updateField("province", "Cundinamarca");
        }}
      >
        <Text
          style={[
            styles.pickerText,
            formData.province && styles.pickerTextFilled,
          ]}
        >
          {formData.province || "Selecciona la provincia"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      <Text style={styles.label}>(post code) *</Text>
      <TextInput
        style={styles.input}
        value={formData.postCode}
        onChangeText={(value) => updateField("postCode", value)}
        placeholder="Código postal"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Tipo de vivienda *</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => updateField("housingType", "casa")}
        >
          <View style={styles.radioCircle}>
            {formData.housingType === "casa" && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Text style={styles.radioLabel}>Casa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => updateField("housingType", "apartamento")}
        >
          <View style={styles.radioCircle}>
            {formData.housingType === "apartamento" && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Text style={styles.radioLabel}>Apartamento</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>
        6. Documento de identidad (sube una foto de tu ID válido: pasaporte,
        licencia de conducir o ID provincial) *
      </Text>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={pickDocument}
        activeOpacity={0.7}
      >
        <Ionicons name="add-circle-outline" size={24} color="#00D9C5" />
        <Text style={styles.uploadText}>Agregar más archivos</Text>
      </TouchableOpacity>

      <Text style={styles.fileFormatHint}>
        Tamaño del archivo - PNG, JPG, PDF
      </Text>

      {uploadedFiles.length > 0 && (
        <View style={styles.uploadedFilesContainer}>
          {uploadedFiles.map((fileName, index) => (
            <View key={index} style={styles.fileItem}>
              <Ionicons name="document-text" size={20} color="#00D9C5" />
              <Text style={styles.fileName} numberOfLines={1}>
                {fileName}
              </Text>
              <TouchableOpacity onPress={() => removeFile(index)}>
                <Ionicons name="close-circle" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
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
    marginBottom: 8,
    fontWeight: "500",
    lineHeight: 20,
  },
  input: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  picker: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerText: {
    fontSize: 14,
    color: "#999",
  },
  pickerTextFilled: {
    color: "#333",
  },
  radioGroup: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 16,
  },
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
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#333",
  },
  radioLabel: {
    fontSize: 14,
    color: "#333",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    color: "#00D9C5",
    fontWeight: "500",
  },
  fileFormatHint: {
    fontSize: 12,
    color: "#999",
    marginBottom: 16,
  },
  uploadedFilesContainer: {
    gap: 8,
    marginTop: 8,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  fileName: {
    flex: 1,
    fontSize: 13,
    color: "#333",
  },

  dateInput: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  placeholder: {
    color: "#999",
  },
});
