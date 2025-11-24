import { fontFamily } from "@/Config/typography";
import { i18n } from "@/i18n/translations";
import { ProfileState } from "@/types/serviceConfig.types";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckboxButton } from "../ServiceConfig/CheckboxButton";
import { RadioButton } from "../ServiceConfig/RadioButton";

interface ProfileFormStepProps {
  profile: ProfileState;
  onUpdateProfile: (updates: Partial<ProfileState>) => void;
  onToggleCertification: (cert: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ProfileFormStep: React.FC<ProfileFormStepProps> = ({
  profile,
  onUpdateProfile,
  onToggleCertification,
  onNext,
  onBack,
}) => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Banner de bienvenida */}
      <View style={styles.profileBannerContainer}>
        <View style={styles.profileBanner}>
          <Text style={styles.profileBannerText}>
            {i18n.t("configservice.caregiverSkillsTitle")}
            {"\n"}
            {i18n.t("configservice.caregiverSkillsDescription")}
          </Text>
        </View>
        <View style={styles.profileBannerIcon}>
          <Text style={styles.iconEmoji}>🐾</Text>
        </View>
      </View>

      {/* Sección: Información General */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {i18n.t("configservice.caregiverGeneralInfo")}
        </Text>

        {/* Tipo de mascotas */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            {i18n.t("configservice.petTypesYouHost")} *
          </Text>
          <View style={styles.radioGroup}>
            <RadioButton
              label={i18n.t("configservice.dogs")}
              selected={profile.petType === "Perros"}
              onSelect={() => onUpdateProfile({ petType: "Perros" })}
            />
            <RadioButton
              label={i18n.t("configservice.cats")}
              selected={profile.petType === "Gatos"}
              onSelect={() => onUpdateProfile({ petType: "Gatos" })}
            />
            <RadioButton
              label={i18n.t("configservice.both")}
              selected={profile.petType === "Ambos"}
              onSelect={() => onUpdateProfile({ petType: "Ambos" })}
            />
          </View>
        </View>

        {/* Nivel de experiencia */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            {i18n.t("configservice.experienceLevel")} *
          </Text>
          <View style={styles.radioGroup}>
            <RadioButton
              label={i18n.t("configservice.experienceBeginner")}
              selected={profile.experienceLevel === "Aprendiz"}
              onSelect={() => onUpdateProfile({ experienceLevel: "Aprendiz" })}
            />
            <RadioButton
              label={i18n.t("configservice.experienceIntermediate")}
              selected={profile.experienceLevel === "Intermedio"}
              onSelect={() =>
                onUpdateProfile({ experienceLevel: "Intermedio" })
              }
            />
            <RadioButton
              label={i18n.t("configservice.experienceSenior")}
              selected={profile.experienceLevel === "Senior"}
              onSelect={() => onUpdateProfile({ experienceLevel: "Senior" })}
            />
          </View>
        </View>

        {/* Certificaciones */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            {i18n.t("configservice.certificationsOptional")}
          </Text>
          <View style={styles.checkboxGroup}>
            <CheckboxButton
              label={i18n.t("configservice.certificationVetStudent")}
              checked={profile.certifications.includes(
                "Estudiante de veterinaria"
              )}
              onToggle={() =>
                onToggleCertification("Estudiante de veterinaria")
              }
            />
            <CheckboxButton
              label={i18n.t("configservice.certificationGroomingFirstAid")}
              checked={profile.certifications.includes(
                "Curso en grooming o primeros auxilios"
              )}
              onToggle={() =>
                onToggleCertification("Curso en grooming o primeros auxilios")
              }
            />
            <CheckboxButton
              label={i18n.t("configservice.certificationNone")}
              checked={profile.certifications.includes("No tengo")}
              onToggle={() => onToggleCertification("No tengo")}
            />
          </View>
        </View>

        {/* Alergias */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            {i18n.t("configservice.allergiesQuestion")} *
          </Text>
          <View style={styles.radioGroup}>
            <RadioButton
              label={i18n.t("configservice.yes")}
              selected={profile.hasAllergies === "Sí"}
              onSelect={() => onUpdateProfile({ hasAllergies: "Sí" })}
            />
            <RadioButton
              label={i18n.t("configservice.no")}
              selected={profile.hasAllergies === "No"}
              onSelect={() =>
                onUpdateProfile({ hasAllergies: "No", allergiesDetail: "" })
              }
            />
          </View>

          {profile.hasAllergies === "Sí" && (
            <View style={styles.conditionalField}>
              <Text style={styles.label}>
                {i18n.t("configservice.specifyAllergiesLabel")} *
              </Text>
              <TextInput
                style={styles.input}
                value={profile.allergiesDetail}
                onChangeText={(text) =>
                  onUpdateProfile({ allergiesDetail: text })
                }
                placeholder={i18n.t("configservice.allergiesPlaceholder")}
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          )}
        </View>
      </View>

      {/* Sección: Información del Hogar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {i18n.t("configservice.homeInfoTitle")}
        </Text>

        {/* Tipo de hogar */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            {i18n.t("configservice.selectHomeTypeLabel")} *
          </Text>
          <View style={styles.radioGroup}>
            <RadioButton
              label={i18n.t("user.house")}
              selected={profile.homeType === "Casa"}
              onSelect={() => onUpdateProfile({ homeType: "Casa" })}
            />
            <RadioButton
              label={i18n.t("user.apartment")}
              selected={profile.homeType === "Apartamento"}
              onSelect={() => onUpdateProfile({ homeType: "Apartamento" })}
            />
            <RadioButton
              label={i18n.t("configservice.homeTypeFarm")}
              selected={profile.homeType === "Finca"}
              onSelect={() => onUpdateProfile({ homeType: "Finca" })}
            />
          </View>
        </View>

        {/* Espacio exterior */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            {i18n.t("configservice.hasOutdoorSpace")} *
          </Text>
          <View style={styles.radioGroup}>
            <RadioButton
              label={i18n.t("configservice.no")}
              selected={profile.hasOutdoorSpace === "No"}
              onSelect={() => onUpdateProfile({ hasOutdoorSpace: "No" })}
            />
            <RadioButton
              label={`${i18n.t("configservice.yes")}, ${i18n.t(
                "configservice.open"
              )}`}
              selected={profile.hasOutdoorSpace === "Sí, abierto"}
              onSelect={() =>
                onUpdateProfile({ hasOutdoorSpace: "Sí, abierto" })
              }
            />
            <RadioButton
              label={`${i18n.t("configservice.yes")}, ${i18n.t(
                "configservice.closed"
              )}`}
              selected={profile.hasOutdoorSpace === "Sí, cerrado"}
              onSelect={() =>
                onUpdateProfile({ hasOutdoorSpace: "Sí, cerrado" })
              }
            />
          </View>
        </View>

        {/* Personas en el hogar */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            {i18n.t("configservice.peopleAtHome")} *
          </Text>
          <View style={styles.radioGroup}>
            <RadioButton
              label={i18n.t("configservice.liveAlone")}
              selected={profile.peopleAtHome === "Vivo solo(a)"}
              onSelect={() =>
                onUpdateProfile({
                  peopleAtHome: "Vivo solo(a)",
                  childrenAge: "",
                })
              }
            />
            <RadioButton
              label={i18n.t("configservice.liveWithFamily")}
              selected={profile.peopleAtHome === "Con familia"}
              onSelect={() =>
                onUpdateProfile({
                  peopleAtHome: "Con familia",
                  childrenAge: "",
                })
              }
            />
            <RadioButton
              label={i18n.t("configservice.liveWithChildren")}
              selected={profile.peopleAtHome === "Con niños"}
              onSelect={() => onUpdateProfile({ peopleAtHome: "Con niños" })}
            />
          </View>

          {profile.peopleAtHome === "Con niños" && (
            <View style={styles.conditionalField}>
              <Text style={styles.label}>
                {i18n.t("configservice.childrenAge")} *
              </Text>
              <TextInput
                style={styles.input}
                value={profile.childrenAge}
                onChangeText={(text) => onUpdateProfile({ childrenAge: text })}
                placeholder="Ej: 5 y 8 años"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          )}
        </View>
      </View>

      {/* Botones de navegación */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>
            {i18n.t("configservice.back")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={onNext}
          activeOpacity={0.7}
        >
          <Text style={styles.nextButtonText}>
            {i18n.t("configservice.next")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },

  // Banner
  profileBannerContainer: {
    position: "relative",
    marginBottom: 24,
    width: "100%",
  },
  profileBanner: {
    backgroundColor: "#f6c3cc",
    padding: 20,
    paddingRight: 70,
    borderRadius: 20,
    width: "100%",
  },
  profileBannerText: {
    fontSize: 13,
    color: "#4B1F3D",
    lineHeight: 20,
    fontFamily: fontFamily.medium,
  },
  profileBannerIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconEmoji: {
    fontSize: 30,
  },

  // Secciones
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
    fontFamily: fontFamily.bold,
  },

  // Campos
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 12,
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },
  radioGroup: {
    gap: 12,
  },
  checkboxGroup: {
    gap: 12,
  },
  conditionalField: {
    marginTop: 16,
    paddingLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#F9FAFB",
    fontSize: 15,
    fontFamily: fontFamily.medium,
    color: "#111827",
  },

  // Navegación
  navigationButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
  },
  backButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  backButtonText: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#00BFA6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#00BFA6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
});
