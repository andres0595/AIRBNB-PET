import { fontFamily } from "@/Config/typography";
import AuthLayout from "@/components/AuthLayout";
import { i18n } from "@/i18n/translations";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Assets
import {
  Service,
  ServiceConfig,
} from "@/Models/Model-ServiceConfig/serviceConfig";
import { CalendarConfigStep } from "@/components/Steps/CalendarConfigStep";
import { useCalendarState } from "@/hooks/useCalendarState";
import { useProfileState } from "@/hooks/useProfileState";
import { useTimeSlotState } from "@/hooks/useTimeSlotState";
import {
  validateFinish,
  validateProfile,
  validateServiceSelection,
} from "../../Util/serviceConfig.validations";
import alojamientoMascotas from "../../assets/Icons/svg-servicios/Alojamiento.png";
import Banio from "../../assets/Icons/svg-servicios/Banio.png";
import Cuidado from "../../assets/Icons/svg-servicios/Cuidado.png";
import Guarderia from "../../assets/Icons/svg-servicios/Guarderia.png";
import Paseos from "../../assets/Icons/svg-servicios/Paseos.png";
import { ProgressIndicator } from "../../components/ServiceConfig/ProgressIndicator";
import { ProfileFormStep } from "../../components/Steps/ProfileFormStep";
import { ServiceSelectionStep } from "../../components/Steps/ServiceSelectionStep";

const SERVICES: Service[] = [
  {
    id: "Alojamiento",
    name: "Alojamiento de mascotas",
    subtitle: "en casa del cuidador",
    type: "accommodation",
    icon: alojamientoMascotas,
  },
  {
    id: "2",
    name: "Guardería de día",
    subtitle: "en casa del cuidador",
    type: "accommodation",
    icon: Guarderia,
  },
  {
    id: "3",
    name: "Cuidado en casa",
    subtitle: "Atiende a la mascota en la comodidad de su hogar",
    type: "accommodation",
    icon: Cuidado,
  },
  {
    id: "4",
    name: "Paseos en el barrio",
    subtitle: "Paseos seguros y divertidos",
    type: "time-slot",
    icon: Paseos,
  },
  {
    id: "5",
    name: "Baño a domicilio",
    subtitle: "",
    type: "time-slot",
    icon: Banio,
  },
];

export default function ServiceConfigScreen() {
  // Estados principales
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceConfigs, setServiceConfigs] = useState<
    Record<string, ServiceConfig>
  >({});

  // Toast
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error" | "info",
  });

  // Custom hooks
  const calendarState = useCalendarState();
  const timeSlotState = useTimeSlotState();
  const profileState = useProfileState();

  // Toast helper
  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setToast({ visible: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, visible: false });
  };

  // Handlers
  const handleGoBack = () => {
    resetAllStates();
    router.push("/(tabs)/perfil");
  };

  const resetAllStates = () => {
    setCurrentStep(0);
    setSelectedServices([]);
    setServiceConfigs({});
    calendarState.resetCalendar();
    timeSlotState.resetTimeSlot();
    profileState.resetProfile();
  };

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((s) => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Step 0: Service Selection
  const handleNextFromSelection = () => {
    const error = validateServiceSelection(selectedServices);
    if (error) {
      showToast(i18n.t(error), "error");
      return;
    }
    setCurrentStep(1);
  };

  // Step 1: Profile Form
  const handleNextFromProfile = () => {
    const error = validateProfile(profileState.state);
    if (error) {
      showToast(i18n.t(error), "error");
      return;
    }
    setCurrentStep(2);
  };

  // Step 2: Calendar & Finish
  const handleFinish = () => {
    const error = validateFinish(serviceConfigs);
    if (error) {
      showToast(i18n.t(error), "error");
      return;
    }

    // Aquí puedes enviar los datos al backend
    const finalData = {
      services: serviceConfigs,
      profile: profileState.state,
    };

    console.log("Datos finales:", finalData);
    showToast(i18n.t("configservice.fullConfigSaved"), "success");

    setTimeout(() => {
      router.push("/(tabs)/perfil");
    }, 1500);
  };

  return (
    <AuthLayout contentStyle={styles.container}>
      {/* <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      /> */}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.inner}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>
              {i18n.t("configservice.serviceConfiguration")}
            </Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} />

          {/* Steps */}
          {currentStep === 0 && (
            <ServiceSelectionStep
              services={SERVICES}
              selectedServices={selectedServices}
              onToggleService={toggleServiceSelection}
              onNext={handleNextFromSelection}
            />
          )}

          {currentStep === 1 && (
            <ProfileFormStep
              profile={profileState.state}
              onUpdateProfile={profileState.updateState}
              onToggleCertification={profileState.toggleCertification}
              onNext={handleNextFromProfile}
              onBack={() => setCurrentStep(0)}
            />
          )}

          {currentStep === 2 && (
            <CalendarConfigStep
              selectedServices={selectedServices}
              services={SERVICES}
              serviceConfigs={serviceConfigs}
              dayPrices={calendarState.state.dayPrices}
              onSaveConfig={(serviceId, config) => {
                setServiceConfigs((prev) => ({ ...prev, [serviceId]: config }));
              }}
              onBack={() => setCurrentStep(1)}
              onFinish={handleFinish}
            />
          )}
        </View>
      </ScrollView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 40,
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    fontFamily: fontFamily.bold,
  },
  headerSpacer: {
    width: 40,
  },
  stepContent: {
    flex: 1,
    padding: 20,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: fontFamily.bold,
  },
  infoText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 40,
    fontFamily: fontFamily.medium,
  },
  navigationButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
  },
  backButtonText: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
  finishButton: {
    flex: 1,
    backgroundColor: "#36ebd8",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#36ebd8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  finishButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
});
