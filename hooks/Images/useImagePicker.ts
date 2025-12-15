import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

interface PickerResult {
  uri: string | null;
  base64: string | null;
}

export function useImagePicker() {
  const [image, setImage] = useState<PickerResult>({
    uri: null,
    base64: null,
  });

  const commonOptions = {
    allowsEditing: true,
    aspect: [1, 1] as [number, number],
    quality: 0.8,
    base64: true,
    selectionLimit: 1,
  };

  const openCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permisos requeridos",
          "La aplicación necesita acceso a la cámara."
        );
        return null;
      }

      const result = await ImagePicker.launchCameraAsync(commonOptions);

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const img = {
          uri: asset.uri ?? null,
          base64: asset.base64 ?? null,
        };

        setImage(img);
        return img;
      }

      return null;
    } catch (error) {
      console.error("Error al abrir cámara:", error);
      Alert.alert("Error", "No se pudo abrir la cámara");
      return null;
    }
  };

  const openGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permisos requeridos",
          "La aplicación necesita acceso a tu galería."
        );
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync(commonOptions);

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const img = {
          uri: asset.uri ?? null,
          base64: asset.base64 ?? null,
        };

        setImage(img);
        return img;
      }

      return null;
    } catch (error) {
      console.error("Error al abrir galería:", error);
      Alert.alert("Error", "No se pudo abrir la galería");
      return null;
    }
  };

  const clearImage = () => {
    setImage({ uri: null, base64: null });
  };

  return {
    image, // { uri, base64 }
    openCamera,
    openGallery,
    clearImage,
  };
}
