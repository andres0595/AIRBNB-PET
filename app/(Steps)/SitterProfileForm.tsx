import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../(Store)/store";
import {
  setSitterProfileData,
  setSitterProfilePercentage,
} from "../(Store)/validationsSlice";
import { SitterProfileData } from "../Models/Models-Tabs/SitterProfileData";

interface SitterProfileFormProps {
  onSave?: (data: any) => void;
  onProgressChange?: (percentage: number) => void;
}

export const SitterProfileForm: React.FC<SitterProfileFormProps> = ({
  onSave,
  onProgressChange,
}) => {
  const dispatch = useDispatch();

  const sitterProfileData: SitterProfileData = useSelector(
    (state: RootState) => ({
      profilePhoto: state.validations?.sitterProfileData?.profilePhoto ?? "",
      description: state.validations?.sitterProfileData?.description ?? "",
      services: state.validations?.sitterProfileData?.services ?? [],
      scheduleDay: state.validations?.sitterProfileData?.scheduleDay ?? "",
      scheduleHours: state.validations?.sitterProfileData?.scheduleHours ?? "",
      animalExperience:
        state.validations?.sitterProfileData?.animalExperience ?? "",
      percentage: 0,
    })
  );

  const formData = sitterProfileData;
  // Calcular porcentaje de completitud
  useEffect(() => {
    const fields = [
      formData.profilePhoto,
      formData.description,
      formData.services,
      formData.scheduleDay,
      formData.scheduleHours,
      formData.animalExperience,
    ];

    const filled = fields.filter((f) => {
      if (Array.isArray(f)) return f.length > 0;
      return f !== null && f !== undefined && f !== "";
    }).length;

    const percentage = Math.round((filled / fields.length) * 100);

    if (percentage !== sitterProfileData.percentage) {
      dispatch(setSitterProfilePercentage(percentage));
      if (onProgressChange) onProgressChange(percentage);
    }
  }, [
    formData.profilePhoto,
    formData.description,
    formData.services,
    formData.scheduleDay,
    formData.scheduleHours,
    formData.animalExperience,
  ]);

  const updateField = (field: keyof SitterProfileData, value: any) => {
    dispatch(setSitterProfileData({ [field]: value }));
  };

  const toggleService = (service: string) => {
    const currentServices = Array.isArray(formData.services)
      ? formData.services
      : [];

    const services = currentServices.includes(service)
      ? currentServices.filter((s) => s !== service)
      : [...currentServices, service];

    updateField("services", services);
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Se necesita acceso a la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1], // cuadrada (rostro)
      quality: 0.8,
    });

    if (!result.canceled) {
      const photoUri = result.assets[0].uri;
      updateField("profilePhoto", photoUri);
    }
  };

  const jornadas = [
    { id: "diurna", label: "Diurna (06:00 - 18:00)" },
    { id: "nocturna", label: "Nocturna (18:00 - 06:00)" },
  ];

  const serviceOptions = [
    { id: "hospedaje", label: "Hospedaje (en tu casa)" },
    { id: "paseos", label: "Paseos (en el barrio)" },
    { id: "banos", label: "Baños a domicilios" },
    { id: "daycare", label: "Cuidado de día (Day Care)" },
    { id: "ninera", label: "Niñera de noche (en casa del dueño)" },
  ];

  return (
    <View style={styles.formContainer}>
      {/* Foto de perfil */}
      <Text style={styles.label}>7. Foto de perfil *</Text>
      <TouchableOpacity style={styles.uploadCard} onPress={handleTakePhoto}>
        {formData.profilePhoto ? (
          <Image
            source={{ uri: formData.profilePhoto }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              marginBottom: 12,
            }}
          />
        ) : (
          <View style={styles.uploadIcon}>
            <Ionicons name="camera-outline" size={40} color="#00D9C5" />
            <Ionicons
              name="add-circle"
              size={24}
              color="#00D9C5"
              style={styles.addIconOverlay}
            />
          </View>
        )}

        <Text style={styles.uploadButtonText}>Agregar foto</Text>
        <Text style={styles.uploadHint}>(Rostro claro y fondo neutro)</Text>
        <Text style={styles.uploadHint}>Tamaño del archivo</Text>
        <Text style={styles.uploadHint}>PNG, JPG, PDF</Text>
      </TouchableOpacity>

      {/* Descripción personal */}
      <Text style={styles.label}>
        8. Descripción personal breve y habilidades *
      </Text>
      <TextInput
        style={styles.textArea}
        value={formData.description}
        onChangeText={(value) => updateField("description", value)}
        placeholder="Descríbete"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      {/* Servicios */}
      <Text style={styles.label}>9. Servicios que deseas ofrecer *</Text>
      <View style={styles.checkboxGroup}>
        {serviceOptions.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.checkboxOption}
            onPress={() => toggleService(service.id)}
            activeOpacity={0.7}
          >
            <View style={styles.checkbox}>
              {formData.services.includes(service.id) && (
                <Ionicons name="checkmark" size={18} color="#333" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>{service.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Disponibilidad horaria */}
      <Text style={styles.label}>10. Disponibilidad horaria *</Text>
      <View style={styles.row}>
        <View style={styles.halfInput}>
          <TouchableOpacity
            style={styles.picker}
            onPress={() => {
              const nuevaJornada =
                formData.scheduleDay === "diurna" ? "nocturna" : "diurna";
              updateField("scheduleDay", nuevaJornada);
            }}
          >
            <Text style={styles.pickerText}>
              {formData.scheduleDay
                ? jornadas.find((j) => j.id === formData.scheduleDay)?.label
                : "Seleccionar jornada"}
            </Text>
            <Ionicons name="chevron-down" size={15} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.halfInput}>
          <TouchableOpacity
            style={styles.picker}
            onPress={() => {
              // ejemplo simple de rango por jornada
              if (formData.scheduleDay === "diurna") {
                updateField("scheduleHours", "08:00 - 16:00");
              } else if (formData.scheduleDay === "nocturna") {
                updateField("scheduleHours", "20:00 - 04:00");
              } else {
                updateField("scheduleHours", "Definir rango");
              }
            }}
          >
            <Text style={styles.pickerText}>
              {formData.scheduleHours || "Rango en horas"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Experiencia con animales */}
      <Text style={styles.label}>
        11. Experiencia con animales (años, razas, situaciones especiales) *
      </Text>
      <TextInput
        style={styles.textArea}
        value={formData.animalExperience}
        onChangeText={(value) => updateField("animalExperience", value)}
        placeholder="Describe"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
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
    marginBottom: 12,
    fontWeight: "500",
  },
  uploadCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "dashed",
  },
  uploadIcon: {
    position: "relative",
    marginBottom: 12,
  },
  addIconOverlay: {
    position: "absolute",
    bottom: -5,
    right: -5,
  },
  uploadButtonText: {
    fontSize: 14,
    color: "#00D9C5",
    fontWeight: "600",
    marginBottom: 8,
  },
  uploadHint: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
  textArea: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    minHeight: 100,
  },
  checkboxGroup: {
    marginBottom: 20,
  },
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  halfInput: {
    flex: 1,
  },
  picker: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 14,
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
});
