import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../(Store)/store";
import {
  setBackgroundCheck,
  setDocuments,
  setPercentage,
} from "../(Store)/validationsSlice";

export const ValidationsForm = () => {
  const dispatch = useDispatch();
  const { backgroundCheckAccepted, documents } = useSelector(
    (state: RootState) => state.validations
  );

  const toggleBackgroundCheck = (value: boolean) => {
    dispatch(setBackgroundCheck(value));
  };

  const handleAddDocument = () => {
    dispatch(setDocuments([...documents, `doc_${documents.length + 1}`]));
  };

  useEffect(() => {
    const totalFields = 2;
    let filled = 0;

    if (backgroundCheckAccepted === true) filled++;
    if (documents.length >= 2) filled++;

    const percentage = Math.round((filled / totalFields) * 100);
    dispatch(setPercentage(percentage));
  }, [backgroundCheckAccepted, documents]);

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>
        12. ¿Aceptas la verificación de antecedentes?
      </Text>

      <View style={styles.radioGroup}>
        <TouchableOpacity
          onPress={() => toggleBackgroundCheck(true)}
          style={styles.radioOption}
        >
          <View style={styles.radioCircle}>
            {backgroundCheckAccepted === true && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Text>Sí, autorizo el proceso</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleBackgroundCheck(false)}
          style={styles.radioOption}
        >
          <View style={styles.radioCircle}>
            {backgroundCheckAccepted === false && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Text>No, no autorizo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleAddDocument}
        style={styles.addDocumentCard}
      >
        <Ionicons name="add-circle" size={40} color="#00D9C5" />
        <Text>Agregar Documento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: { paddingTop: 16 },
  label: { fontSize: 13, marginBottom: 16 },
  radioGroup: { marginBottom: 20 },
  radioOption: { flexDirection: "row", alignItems: "center", gap: 12 },
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
  addDocumentCard: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#00D9C5",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
});
