import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface PersonalInfoFormProps {
  onSave?: (data: PersonalInfoData) => void;
  onProgressChange?: (percentage: number) => void;
}

interface PersonalInfoData {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postCode: string;
  housingType: "casa" | "apartamento" | "";
  idDocument: string;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  onSave,
  onProgressChange,
}) => {
  const [formData, setFormData] = useState<PersonalInfoData>({
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
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Calcular porcentaje de completitud
  useEffect(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(
      (value) => value !== ""
    ).length;

    const percentage = Math.round((filledFields / totalFields) * 100);

    if (onProgressChange) {
      onProgressChange(percentage);
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
    formData.idDocument,
  ]);

  const updateField = (field: keyof PersonalInfoData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Función para seleccionar archivos
  const pickDocument = async () => {
    try {
      // Solicitar permisos
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permisos necesarios",
          "Se necesita acceso a la galería para cargar documentos"
        );
        return;
      }

      // Abrir selector de documentos
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];

        // Agregar el archivo a la lista
        setUploadedFiles((prev) => [...prev, file.name]);

        // Marcar como completado en el formulario
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

  // Función alternativa usando ImagePicker para solo imágenes
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permisos necesarios",
          "Se necesita acceso a la galería para cargar imágenes"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const fileName = file.uri.split("/").pop() || "documento.jpg";

        setUploadedFiles((prev) => [...prev, fileName]);

        if (uploadedFiles.length === 0) {
          updateField("idDocument", fileName);
        }

        Alert.alert("Éxito", `Imagen cargada correctamente`);
      }
    } catch (error) {
      console.error("Error al seleccionar imagen:", error);
      Alert.alert("Error", "No se pudo cargar la imagen");
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

      <Text style={styles.label}>2. Fecha de nacimiento *</Text>
      <TextInput
        style={styles.input}
        value={formData.birthDate}
        onChangeText={(value) => updateField("birthDate", value)}
        placeholder="DD/MM/AAAA"
      />

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
          // Aquí abrirías un picker/modal
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
          // Aquí abrirías un picker/modal
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

      {/* Sección de carga de documentos */}
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

      {/* Lista de archivos cargados */}
      {uploadedFiles.length > 0 && (
        <View style={styles.uploadedFilesContainer}>
          {uploadedFiles.map((fileName, index) => (
            <View key={index} style={styles.fileItem}>
              <Ionicons name="document-text" size={20} color="#00D9C5" />
              <Text style={styles.fileName} numberOfLines={1}>
                {fileName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const newFiles = uploadedFiles.filter((_, i) => i !== index);
                  setUploadedFiles(newFiles);
                  if (newFiles.length === 0) {
                    updateField("idDocument", "");
                  }
                }}
              >
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
});
