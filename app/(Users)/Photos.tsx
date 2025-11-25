// PhotoUploadForm.js
import { i18n } from "@/i18n/translations";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fontFamily } from "../../Config/typography";

export default function PhotoUploadForm() {
  const [showUploadView, setShowUploadView] = useState(false);
  const [selectedImages, setSelectedImages] = useState<
    { id: string; uri: string }[]
  >([]);

  const router = useRouter();

  const pickImage = async () => {
    // Solicitar permisos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Necesitamos acceso a tu galería");
      return;
    }

    // Abrir galería
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImage = {
        id: Date.now().toString() + Math.random(),
        uri: result.assets[0].uri,
      };
      setSelectedImages([...selectedImages, newImage]);
    }
  };

  const removeImage = (id: string) => {
    setSelectedImages(selectedImages.filter((img) => img.id !== id));
  };

  const handleSave = () => {
    if (selectedImages.length < 3) {
      Alert.alert("Atención", "Debes subir al menos 3 fotos");
      return;
    }
    if (selectedImages.length > 10) {
      Alert.alert("Atención", "Puedes subir máximo 10 fotos");
      return;
    }
    Alert.alert("Éxito", "Fotos guardadas correctamente");
    // Aquí puedes enviar las fotos a tu API
    console.log("Fotos a guardar:", selectedImages);
    setShowUploadView(false);
  };

  const handleBack = () => {
    router.back();
  };

  if (!showUploadView) {
    // Vista inicial con información
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{i18n.t("photoUpload.headerTitle")}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.mainTitle}>
              {i18n.t("photoUpload.introTitle")} 
            </Text>

            <Text style={styles.subtitle}>
             {i18n.t("photoUpload.introSubtitle")} 
            </Text>

            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>
                 {i18n.t("photoUpload.bullet1")} 
                </Text>
              </View>

              <View style={styles.bulletItem}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>
                   {i18n.t("photoUpload.bullet2")} 
                </Text>
              </View>

              <View style={styles.bulletItem}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>
                {i18n.t("photoUpload.bullet3")} 
                </Text>
              </View>
            </View>

            <Text style={styles.helpText}>
               {i18n.t("photoUpload.helpText")} 
            </Text>

            <View style={styles.warningBox}>
              <Ionicons name="megaphone-outline" size={40} color="#00D4D4" />
              <Text style={styles.warningText}>
                {i18n.t("photoUpload.warning")} 
              </Text>
            </View>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => setShowUploadView(true)}
            >
              <Text style={styles.uploadButtonText}>  {i18n.t("photoUpload.uploadButton")} </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Vista de carga de fotos
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowUploadView(false)}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{i18n.t("photoUpload.headerTitle")} </Text>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.uploadTitle}>{i18n.t("photoUpload.uploadViewTitle")}</Text>

          <TouchableOpacity style={styles.imagePickerBox} onPress={pickImage}>
            <View style={styles.imagePickerContent}>
              <View style={styles.imageIconContainer}>
                <Ionicons name="images-outline" size={50} color="#000" />
              </View>
              <Text style={styles.imagePickerText}>
                {i18n.t("photoUpload.chooseFromGallery")}
              </Text>
            </View>
          </TouchableOpacity>

          {selectedImages.length > 0 && (
            <View style={styles.selectedImagesContainer}>
              <Text style={styles.selectedImagesTitle}>
                    {i18n.t("photoUpload.selectedPhotos", {
                                    count: Object.keys(selectedImages).length,
                                  })}
              </Text>
              <View style={styles.imageGrid}>
                {selectedImages.map((image) => (
                  <View key={image.id} style={styles.imageWrapper}>
                    <Image
                      source={{ uri: image.uri }}
                      style={styles.selectedImage}
                    />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeImage(image.id)}
                    >
                      <Ionicons name="close-circle" size={24} color="#FF4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
                {i18n.t("general.save")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 5,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
    fontFamily: fontFamily.bold,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 40,
    color: "#000",
    fontFamily: fontFamily.semiBold,
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 40,
    lineHeight: 20,
    fontFamily: fontFamily.medium,
  },
  bulletList: {
    marginBottom: 16,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00D4D4",
    marginTop: 6,
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    fontFamily: fontFamily.regular,
  },
  helpText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 24,
    lineHeight: 18,
    fontFamily: fontFamily.medium,
  },
  warningBox: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },
  warningText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
    fontFamily: fontFamily.medium,
  },
  uploadButton: {
    backgroundColor: "#F6C3CC",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    fontFamily: fontFamily.bold,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
    color: "#000",
    fontFamily: fontFamily.bold,
  },
  imagePickerBox: {
    borderWidth: 2,
    borderColor: "#00D9C5",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 40,
    paddingVertical: 200, // ← Agregar esto para más altura
    alignItems: "center",
    backgroundColor: "#F8FEFF",
    minHeight: 400, // ← O agregar esto para altura mínima
  },
  imagePickerContent: {
    alignItems: "center",
  },
  imageIconContainer: {
    marginBottom: 16,
  },
  imagePickerText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    lineHeight: 22,
    fontFamily: fontFamily.medium,
  },
  selectedImagesContainer: {
    marginTop: 24,
  },
  selectedImagesTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  imageWrapper: {
    width: "31%",
    aspectRatio: 1,
    margin: 4,
    position: "relative",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FFF",
    borderRadius: 12,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#0000",
  },
  saveButton: {
    backgroundColor: "#00D9C5",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    fontFamily: fontFamily.bold,
  },
});
