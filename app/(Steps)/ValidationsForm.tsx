import { RootState } from "@/Store/store";
import {
  setauthorization,
  setBackgroundCheck,
  setDocuments,
  setValidationsPercentage,
} from "@/Store/validationsSlice";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fontFamily } from "../../Config/typography";

interface ValidationsProps {
  onSave?: (data: ValidationsData) => void;
  onProgressChange?: (percentage: number) => void;
}

interface ValidationsData {
  backgroundCheckAccepted: boolean | null;
  documents: string[];
  authorization: boolean | null;
}

const ValidationsForm: React.FC<ValidationsProps> = ({
  onSave,
  onProgressChange,
}) => {
  const dispatch = useDispatch();
  const { backgroundCheckAccepted, documents, authorization } = useSelector(
    (state: RootState) => state.validations
  );

  const toggleBackgroundCheck = (value: boolean) => {
    dispatch(setBackgroundCheck(value));
  };

  const toggleauthorization = (value: string) => {
    dispatch(setauthorization(value));
  };

  // Función para seleccionar documentos
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        dispatch(setDocuments([...documents, file.name]));
        Alert.alert("Éxito", `Archivo "${file.name}" cargado correctamente`);
      }
    } catch (error) {
      console.error("Error al seleccionar documento:", error);
      Alert.alert("Error", "No se pudo cargar el archivo");
    }
  };

  const removeDocument = (index: number) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    dispatch(setDocuments(newDocuments));
  };

  // Cálculo del porcentaje - INICIA EN 0%
  useEffect(() => {
    let percentage = 0;

    // Solo cuenta como completado si aceptó el background check (true)
    if (backgroundCheckAccepted === true) {
      percentage += 50; // 50% por aceptar el background check
    }

    // Solo cuenta como completado si hay al menos 1 documento Y aceptó el background check
    if (documents.length > 0 && backgroundCheckAccepted === true) {
      percentage += 50; // 50% por subir documentos
    }

    if (onProgressChange) {
      onProgressChange(percentage);
    }
    dispatch(setValidationsPercentage(percentage));
  }, [backgroundCheckAccepted, documents, authorization, dispatch]);

  // Función para limpiar todos los documentos
  const clearAllDocuments = () => {
    if (documents.length > 0) {
      dispatch(setDocuments([]));
      Alert.alert(
        "Documentos eliminados",
        "Todos los documentos han sido removidos"
      );
    }
  };

  return (
    <View style={styles.formContainer}>
      {/* Pregunta de background check */}
      <Text style={styles.label}>
        12. ¿Aceptas la verificación de antecedentes (background check)? *
      </Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => toggleBackgroundCheck(true)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.radioCircle,
              backgroundCheckAccepted === true && styles.radioCircleSelected,
            ]}
          >
            {backgroundCheckAccepted === true && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Text style={styles.radioLabel}>Sí, autorizo el proceso</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => toggleBackgroundCheck(false)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.radioCircle,
              backgroundCheckAccepted === false && styles.radioCircleSelected,
            ]}
          >
            {backgroundCheckAccepted === false && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Text style={styles.radioLabel}>
            No (No podrás ser activado como sitter)
          </Text>
        </TouchableOpacity>
      </View>
      {backgroundCheckAccepted === false && (
        <View style={styles.warningBox}>
          <Ionicons name="warning" size={20} color="#FF3B30" />
          <Text style={styles.warningText}>
            Debes aceptar la verificación de antecedentes para continuar
          </Text>
        </View>
      )}

      <View>
        <Text style={styles.label}>
          13. ¿Estás legalmente autorizado para trabajar en Canadá? *
        </Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => toggleauthorization("citizen")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioCircle,
                authorization === "citizen" && styles.radioCircleSelected,
              ]}
            >
              {authorization === "citizen" && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Text style={styles.radioLabel}>Ciudadano canadiense</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => toggleauthorization("permanent")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioCircle,
                authorization === "permanent" && styles.radioCircleSelected,
              ]}
            >
              {authorization === "permanent" && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Text style={styles.radioLabel}>Residente permanente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => toggleauthorization("work_permit")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioCircle,
                authorization === "work_permit" && styles.radioCircleSelected,
              ]}
            >
              {authorization === "work_permit" && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Text style={styles.radioLabel}>
              Titular con permiso de trabajo valido
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => toggleauthorization("student")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioCircle,
                authorization === "student" && styles.radioCircleSelected,
              ]}
            >
              {authorization === "student" && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Text style={styles.radioLabel}>
              Estudiante autorizado para trabajar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => toggleauthorization("visitor")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioCircle,
                authorization === "visitor" && styles.radioCircleSelected,
              ]}
            >
              {authorization === "visitor" && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Text style={styles.radioLabel}>
              Otro/ visitante (no autorizado)
            </Text>
          </TouchableOpacity>
        </View>

        {authorization === "visitor" && (
          <View style={styles.warningBox}>
            <Ionicons name="warning" size={20} color="#FF3B30" />
            <Text style={styles.warningText}>
              No podrás ser activado como sitter sin autorización de trabajo
            </Text>
          </View>
        )}
      </View>
      <View>
        <Text style={styles.label}>
          14. ¿Tienes certificados relacionados con cuidado de mascotas o
          primeros auxilios? (Opcional)
        </Text>
        <View style={styles.uploadHeader}>
          <Text style={styles.uploadSectionTitle}>Agregar Documentos</Text>
          {documents.length > 0 && (
            <TouchableOpacity
              onPress={clearAllDocuments}
              style={styles.clearAllButton}
            >
              <Text style={styles.clearAllText}>Limpiar todo</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.addDocumentCard}
          onPress={pickDocument}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle" size={40} color="#00D9C5" />
          <Text style={styles.addDocumentText}>Agregar</Text>
          <Text style={styles.addDocumentText}>más archivos</Text>
        </TouchableOpacity>
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
    marginBottom: 16,
    fontWeight: "500",
    lineHeight: 20,
    fontFamily: fontFamily.medium,
  },
  radioGroup: {
    marginBottom: 24,
    gap: 12,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 4,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CCC",
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleSelected: {
    borderColor: "#F3F4F6",
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00D9C5",
  },
  radioLabel: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    lineHeight: 20,
    fontFamily: fontFamily.medium,
  },
  infoBox: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  infoTitle: {
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
    marginBottom: 8,
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },
  infoSubtext: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
    fontStyle: "italic",
    fontFamily: fontFamily.medium,
  },
  uploadHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  uploadSectionTitle: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    fontFamily: fontFamily.medium,
  },
  clearAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
  },
  clearAllText: {
    fontSize: 12,
    color: "white",
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },
  documentsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 10,
  },
  documentCard: {
    width: 100,
    height: 120,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  documentName: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 4,
    fontFamily: fontFamily.medium,
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  addDocumentCard: {
    width: 100,
    height: 120,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#00D9C5",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  addDocumentText: {
    fontSize: 12,
    color: "#00D9C5",
    fontWeight: "500",
    textAlign: "center",
    fontFamily: fontFamily.medium,
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFF3F3",
    borderRadius: 12,
    padding: 13,
    marginTop: -10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FFCCCB",
  },
  warningText: {
    fontSize: 12,
    color: "#FF3B30",
    flex: 1,
    lineHeight: 18,
    fontFamily: fontFamily.medium,
  },
  infoBoxSmall: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  infoTextSmall: {
    fontSize: 12,
    color: "#666",
    flex: 1,
    lineHeight: 18,
    fontFamily: fontFamily.medium,
  },
  successBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E8F9F7",
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#B8EDE7",
  },
  successText: {
    fontSize: 12,
    color: "#00A896",
    flex: 1,
    lineHeight: 18,
    fontFamily: fontFamily.medium,
  },
});
export default ValidationsForm;
