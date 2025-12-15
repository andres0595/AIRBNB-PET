import AuthLayout from "@/components/AuthLayout";
import { useImagePicker } from "@/hooks/Images/useImagePicker";
import { i18n } from "@/i18n/translations";
import { RegisterData } from "@/Models/Model-Users/RegisterData";
import { RootState } from "@/Store/store";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CustomModal from "../(CustomModal)/CustomModal";
import { fontFamily } from "../../Config/typography";

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
  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(
    null
  );
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const { image, openCamera, openGallery } = useImagePicker();
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    iconName: null as keyof typeof Ionicons.glyphMap | null,
    iconColor: "#00D9C5",
    onPress: undefined as (() => void) | undefined,
  });
  const handleGoBack = () => {
    router.push("/(tabs)/perfil");
  };

  useEffect(() => {
    if (user?.nombre) {
      setFullName(user.nombre);
      setIdNumber(user.numeroDocumento);
    }
  }, [user]);

  useEffect(() => {
    if (image) {
      setProfileImage(image.uri);
      setProfileImageBase64(image.base64 || null);
    }
  }, [image]);

  const handleCloseModal = () => {
    setShowPhotoModal(false); // Cerrar el modal
  };

  // Utiliza el hook para abrir la cámara o la galería
  const handleCameraSelect = async () => {
    const selectedImage = await openCamera();
    if (selectedImage) {
      setShowPhotoModal(false); // Cerrar el modal después de seleccionar la imagen
    }
  };

  const handleGallerySelect = async () => {
    const selectedImage = await openGallery();
    if (selectedImage) {
      setShowPhotoModal(false); // Cerrar el modal después de seleccionar la imagen
    }
  };

  const handleGoSuccess = () => {
    router.push("/(tabs)/perfil");
  };

  const handleSave = async () => {
    const IdUser = user?.id;
    try {
      const registerPayload: RegisterData = {
        id: Number(IdUser) || 0,
        documentNumber: idNumber,
        FullName: fullName,
        zipCode: postalCode,
        Email: email,
        address: address,
        city: +city,
        province: +province,
        postalCode: postalCode,
        propertyType: +propertyType,
        profileImage: profileImageBase64 ?? "",
      };

      console.log("Enviando datos al backend...", registerPayload);

      //await CreateOrUpdateUsers(registerPayload);

      showInfoModal(
        "¡Información personal guardada exitosamente!",
        "checkmark-circle",
        "Registro exitoso",
        true
      );

      // Navegar
      //router.push("/(tabs)/perfil");
    } catch (error) {
      console.error("Error guardando la información", error);
      alert("Hubo un error guardando la información");
    }
  };

  const showInfoModal = (
    message: string,
    icon: any,
    titulo: string,
    shouldCall: boolean = false
  ) => {
    setModalConfig({
      title: titulo,
      message: message,
      iconName: icon,
      iconColor: "#00D9C5",
      onPress: () => {
        setShowEndModal(false);
        if (shouldCall) handleGoSuccess();
      },
    });
    setShowEndModal(true);
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
      setBirthDate(formattedDate);
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
              <Text style={styles.userName} numberOfLines={2}>
                {user?.nombre}
              </Text>
            </View>
          </View>

          <Text style={styles.title}> {i18n.t("user.titleprofilephoto")}</Text>
          <Text style={styles.description}>
            {" "}
            {i18n.t("user.subtitlephoto")}
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
              <Text style={styles.photoUploadTitle}>
                {" "}
                {i18n.t("user.addPhoto")}
              </Text>
              <Text style={styles.photoUploadSubtitle}>
                {i18n.t("user.fileSize")}
                {"\n"}
                {i18n.t("user.fileTypes")}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Form Fields */}
          <Text style={styles.label}>{i18n.t("user.legalFullName")} *</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Maria Alejandra Lopez"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>{i18n.t("user.birthDate")} *</Text>
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

          <Text style={styles.label}>{i18n.t("user.identityNumber")} *</Text>
          <TextInput
            style={styles.input}
            value={idNumber}
            onChangeText={setIdNumber}
            placeholder=""
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>{i18n.t("login.email")} *</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder=""
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.sectionTitle}>{i18n.t("user.addAddress")}</Text>
          <Text style={styles.description}>{i18n.t("user.addressInfo")}</Text>

          <Text style={styles.label}>{i18n.t("user.currentAddress")} *</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder=""
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>{i18n.t("user.city")} *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={city}
              onValueChange={(itemValue) => setCity(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar ciudad" value="" />
              <Picker.Item label="Bogotá" value="1" />
              <Picker.Item label="Medellín" value="2" />
              <Picker.Item label="Cali" value="3" />
            </Picker>
          </View>

          <Text style={styles.label}>{i18n.t("user.province")} *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={province}
              onValueChange={(itemValue) => setProvince(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar provincia" value="" />
              <Picker.Item label="Cundinamarca" value="1" />
              <Picker.Item label="Antioquia" value="2" />
              <Picker.Item label="Valle del Cauca" value="3" />
            </Picker>
          </View>

          <Text style={styles.label}>{i18n.t("user.zipCode")} *</Text>
          <TextInput
            style={styles.input}
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder=""
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <Text style={styles.label}>{i18n.t("user.housingType")} *</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setPropertyType("1")}
            >
              <View
                style={[
                  styles.radioCircle,
                  propertyType === "1" && styles.radioCircleSelected,
                ]}
              />
              <Text style={styles.radioLabel}>{i18n.t("user.house")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setPropertyType("2")}
            >
              <View
                style={[
                  styles.radioCircle,
                  propertyType === "2" && styles.radioCircleSelected,
                ]}
              />
              <Text style={styles.radioLabel}>
                {i18n.t("user.apartment")} *
              </Text>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>
              {" "}
              {i18n.t("general.save")}{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal para seleccionar foto */}
      <CustomModal
        visible={showPhotoModal}
        onClose={handleCloseModal}
        title="Seleccionar foto"
        animationType="slide"
        primaryButton={{
          text: "Tomar foto",
          onPress: handleCameraSelect,
          style: { backgroundColor: "#36EBD8" },
          textStyle: { color: "#000" },
        }}
        secondaryButton={{
          text: "Elegir de galería",
          onPress: handleGallerySelect,
          style: { backgroundColor: "#F6C3CC" },
          textStyle: { color: "#000" },
        }}
      >
        <Text style={styles.modalDescription}>
          ¿Cómo deseas agregar tu foto de perfil?
        </Text>
      </CustomModal>

      {/* Modal final proceso */}

      <CustomModal
        visible={showEndModal}
        onClose={() => setShowEndModal(false)}
        title={modalConfig.title}
        iconName={
          modalConfig.iconName as keyof typeof Ionicons.glyphMap | undefined
        }
        iconColor={modalConfig.iconColor}
        primaryButton={{
          text: i18n.t("general.understood"),
          onPress: modalConfig.onPress || (() => setShowEndModal(false)),
        }}
      >
        <Text style={styles.subtitle}>{modalConfig.message}</Text>
      </CustomModal>
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
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    maxWidth: "90%",
    fontFamily: fontFamily.medium,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    fontFamily: fontFamily.bold,
  },
  description: {
    fontSize: 13,
    color: "#666",
    marginBottom: 20,
    lineHeight: 18,
    fontFamily: fontFamily.medium,
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
    fontFamily: fontFamily.medium,
  },
  photoUploadTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    fontFamily: fontFamily.bold,
  },
  photoUploadSubtitle: {
    fontSize: 12,
    color: "#999",
    lineHeight: 16,
    fontFamily: fontFamily.medium,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    marginBottom: 8,
    fontFamily: fontFamily.bold,
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
    fontFamily: fontFamily.medium,
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
    color: "#0000",
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
    fontFamily: fontFamily.medium,
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
    fontFamily: fontFamily.medium,
  },
  modalDescription: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    fontFamily: fontFamily.medium,
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
    fontFamily: fontFamily.medium,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: fontFamily.medium,
  },
});
