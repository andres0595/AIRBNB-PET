import AuthLayout from "@/components/AuthLayout";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomModal from "../(CustomModal)/CustomModal";

export default function PersonalInformation() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  const handleGoBack = () => {
    router.push("/(tabs)/perfil");
  };

  const handleSave = () => {
    console.log("Guardando información...");
    setShowEndModal(true);
    router.push("/(tabs)/perfil");
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
    }
  };
  // Solicitar permisos y abrir la cámara
  const openCamera = async () => {
    setShowPhotoModal(false); // Cerrar el modal primero

    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permisos requeridos",
          "Necesitamos acceso a tu cámara para tomar fotos."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error al abrir la cámara:", error);
      Alert.alert("Error", "No se pudo abrir la cámara");
    }
  };

  // Abrir galería de fotos
  const openGallery = async () => {
    setShowPhotoModal(false); // Cerrar el modal primero

    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permisos requeridos",
          "Necesitamos acceso a tu galería para seleccionar fotos."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error al abrir la galería:", error);
      Alert.alert("Error", "No se pudo abrir la galería");
    }
  };

  // Mostrar modal para seleccionar foto
  const handleSelectPhoto = () => {
    setShowPhotoModal(true);
  };

  return (
    <AuthLayout contentStyle={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.inner}>
          {/* Botón de regresar */}
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileContent}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{
                    uri: profileImage || "https://via.placeholder.com/70",
                  }}
                  style={styles.avatar}
                />
              </View>
              <Text style={styles.userName}>Maria Alejandra</Text>
            </View>
          </View>

          <Text style={styles.title}>Foto de perfil</Text>
          <Text style={styles.description}>
            Esta es la primera foto que verán los dueños de mascotas.
            Recomendamos usar una foto bien iluminada y nítida de su cara (sin
            gafas de sol).
          </Text>

          {/* Photo Upload Section */}
          <TouchableOpacity
            style={styles.photoUploadSection}
            onPress={handleSelectPhoto}
            activeOpacity={0.7}
          >
            <View style={styles.photoUploadButton}>
              <Ionicons name="camera-outline" size={40} color="#36EBD8" />
            </View>
            <View style={styles.photoUploadTextContainer}>
              <Text style={styles.photoUploadTitle}>Agregar foto</Text>
              <Text style={styles.photoUploadSubtitle}>
                Tamaño del archivo{"\n"}PNG, JPG
              </Text>
            </View>
          </TouchableOpacity>

          {/* Form Fields */}
          <Text style={styles.label}>Nombre completo legal *</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Maria Alejandra Lopez"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Fecha de nacimiento *</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[styles.dateText]}>{birthDate || "DD/MM/AAAA"}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={birthDate ? parseDate(birthDate) : new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
              maximumDate={new Date()} // No permitir fechas futuras
              minimumDate={new Date(1900, 0, 1)} // Fecha mínima razonable
            />
          )}
          {/* <TextInput
            style={styles.input}
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="12 / 12 / 1970"
            placeholderTextColor="#999"
          /> */}

          <Text style={styles.label}>Número de identidad</Text>
          <TextInput
            style={styles.input}
            value={idNumber}
            onChangeText={setIdNumber}
            placeholder=""
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Correo electrónico *</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder=""
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.sectionTitle}>Añadir dirección</Text>
          <Text style={styles.description}>
            Su dirección solo se muestra a su cliente cuando su mascota o ayuda
            está en casa.
          </Text>

          <Text style={styles.label}>Dirección actual *</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder=""
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Ciudad *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={city}
              onValueChange={(itemValue) => setCity(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar ciudad" value="" />
              <Picker.Item label="Bogotá" value="bogota" />
              <Picker.Item label="Medellín" value="medellin" />
              <Picker.Item label="Cali" value="cali" />
            </Picker>
          </View>

          <Text style={styles.label}>Provincia *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={province}
              onValueChange={(itemValue) => setProvince(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar provincia" value="" />
              <Picker.Item label="Cundinamarca" value="cundinamarca" />
              <Picker.Item label="Antioquia" value="antioquia" />
              <Picker.Item label="Valle del Cauca" value="valle" />
            </Picker>
          </View>

          <Text style={styles.label}>[postalCode] *</Text>
          <TextInput
            style={styles.input}
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder=""
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Tipo de vivienda *</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setPropertyType("casa")}
            >
              <View
                style={[
                  styles.radioCircle,
                  propertyType === "casa" && styles.radioCircleSelected,
                ]}
              />
              <Text style={styles.radioLabel}>Casa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setPropertyType("apartamento")}
            >
              <View
                style={[
                  styles.radioCircle,
                  propertyType === "apartamento" && styles.radioCircleSelected,
                ]}
              />
              <Text style={styles.radioLabel}>Apartamento *</Text>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal para seleccionar foto */}
      <CustomModal
        visible={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        title="Seleccionar foto"
        animationType="slide"
        primaryButton={{
          text: "Tomar foto",
          onPress: openCamera,
          style: { backgroundColor: "#36EBD8" },
          textStyle: { color: "#000" },
        }}
        secondaryButton={{
          text: "Elegir de galería",
          onPress: openGallery,
          style: { backgroundColor: "#F6C3CC" },
          textStyle: { color: "#000" },
        }}
      >
        <Text style={styles.modalDescription}>
          ¿Cómo deseas agregar tu foto de perfil?
        </Text>
      </CustomModal>

      {/* Modal para seleccionar foto */}
      <CustomModal
        visible={showEndModal}
        onClose={() => setShowEndModal(false)}
        title="¡Información personal guardada exitosamente!"
        primaryButton={{
          text: "Ok",
          onPress: () => setShowEndModal(false),
        }}
      ></CustomModal>
    </AuthLayout>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  inner: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: -40,
    left: 0,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileSection: {
    backgroundColor: "#FFF",
    paddingVertical: 20,
    marginBottom: 20,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E0E0E0",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "#666",
    marginBottom: 20,
    lineHeight: 18,
  },
  photoUploadSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  photoUploadButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E8F9F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  photoUploadTextContainer: {
    flex: 1,
  },
  photoUploadTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  photoUploadSubtitle: {
    fontSize: 12,
    color: "#999",
    lineHeight: 16,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    fontSize: 14,
    color: "#333",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F8F8F8",
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#F8F8F8",
    overflow: "hidden",
  },
  picker: {
    height: Platform.OS === "ios" ? 150 : 50,
    width: "100%",
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 30,
    gap: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  radioCircleSelected: {
    borderColor: "#36EBD8",
    backgroundColor: "#36EBD8",
  },
  radioLabel: {
    fontSize: 14,
    color: "#333",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  saveButton: {
    backgroundColor: "#36EBD8",
  },
  saveButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
  modalDescription: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
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
});
