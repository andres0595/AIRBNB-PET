import AuthLayout from "@/components/AuthLayout";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

const services = ["Alojamiento", "Guardería", "Cuidado", "Paseos", "Baño"];

export default function ServiceConfigScreen() {
  const handleGoBack = () => {
    router.push("/(tabs)/perfil");
  };

  // Estado del paso principal (1: Calendario y tarifas, 2: Conocer tu perfil)
  const [currentStep, setCurrentStep] = useState(1);

  // Estados del calendario
  const [selectedService, setSelectedService] = useState("Alojamiento");
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Record<string, any>>({});
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [showDeliveryPicker, setShowDeliveryPicker] = useState(false);
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [dayPrices, setDayPrices] = useState<Record<string, any>>({});

  // Estados para el paso 2 - Perfil del cuidador
  const [petType, setPetType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [hasAllergies, setHasAllergies] = useState("");
  const [allergiesDetail, setAllergiesDetail] = useState("");
  const [homeType, setHomeType] = useState("");
  const [hasOutdoorSpace, setHasOutdoorSpace] = useState("");
  const [peopleAtHome, setPeopleAtHome] = useState("");
  const [childrenAge, setChildrenAge] = useState("");

  // Configuraciones guardadas por servicio
  const [serviceConfigs, setServiceConfigs] = useState<Record<string, any>>({});

  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    const today = dayjs();
    const prices: Record<string, { price: string }> = {};
    const monthsToGenerate = 6;

    for (let m = 0; m < monthsToGenerate; m++) {
      const date = today.add(m, "month");
      const daysInMonth = date.daysInMonth();

      for (let d = 1; d <= daysInMonth; d++) {
        const currentDate = date.date(d);
        if (currentDate.isAfter(today.subtract(1, "day"))) {
          prices[currentDate.format("YYYY-MM-DD")] = { price: "$40" };
        }
      }
    }

    setDayPrices(prices);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSaveCalendarConfig = () => {
    const dates = Object.keys(selectedDates);
    if (!dates.length) {
      alert("Selecciona al menos un día");
      return;
    }

    if (!price) {
      alert("Ingresa un precio");
      return;
    }

    // Guardar configuración del servicio
    setServiceConfigs((prev) => ({
      ...prev,
      [selectedService]: {
        dates,
        price,
        deliveryTime: formatTime(deliveryTime),
        pickupTime: formatTime(pickupTime),
      },
    }));

    alert(`Configuración de ${selectedService} guardada 🎉`);
    setCalendarVisible(false);
    setSelectedDates({});
    setPrice("");
    setDeliveryTime(new Date());
    setPickupTime(new Date());
  };

  const CloseCalendar = () => {
    setCalendarVisible(false);
    setSelectedDates({});
    setPrice("");
    setDeliveryTime(new Date());
    setPickupTime(new Date());
  };

  const toggleDateSelection = (date: string) => {
    setSelectedDates((prev) => {
      const newDates = { ...prev };
      if (newDates[date]) delete newDates[date];
      else
        newDates[date] = {
          selected: true,
          selectedColor: "#00BFA6",
          textColor: "white",
        };
      return newDates;
    });
  };

  const toggleCertification = (cert: string) => {
    setCertifications((prev) => {
      if (prev.includes(cert)) {
        return prev.filter((c) => c !== cert);
      } else {
        return [...prev, cert];
      }
    });
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validar que al menos un servicio esté configurado
      if (Object.keys(serviceConfigs).length === 0) {
        alert("Configura al menos un servicio antes de continuar");
        return;
      }
      setCurrentStep(2);
    }
  };

  const handleFinish = () => {
    // Validar paso 2
    if (!petType) {
      alert("Selecciona el tipo de mascotas que hospedas");
      return;
    }
    if (!experienceLevel) {
      alert("Selecciona tu nivel de experiencia");
      return;
    }
    if (!hasAllergies) {
      alert("Indica si tienes alergias a algún tipo de mascota");
      return;
    }
    if (hasAllergies === "Sí" && !allergiesDetail) {
      alert("Especifica tus alergias");
      return;
    }
    if (!homeType) {
      alert("Selecciona el tipo de vivienda");
      return;
    }
    if (!hasOutdoorSpace) {
      alert("Indica si tienes yarda o espacio exterior");
      return;
    }
    if (!peopleAtHome) {
      alert("Indica las personas en casa");
      return;
    }
    if (peopleAtHome === "Con niños" && !childrenAge) {
      alert("Especifica la edad de los niños");
      return;
    }

    // Guardar toda la configuración
    console.log({
      services: serviceConfigs,
      profile: {
        petType,
        experienceLevel,
        certifications,
        hasAllergies,
        allergiesDetail,
        homeType,
        hasOutdoorSpace,
        peopleAtHome,
        childrenAge,
      },
    });

    alert("¡Configuración completa guardada! 🎉");
    router.push("/(tabs)/perfil");
  };

  const getStepTitle = () => {
    if (currentStep === 1) return "Calendario y tarifas";
    if (currentStep === 2) return "Conocer tu perfil";
    return "";
  };

  return (
    <AuthLayout contentStyle={styles.container}>
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
            <Text style={styles.title}>Configuración del servicio</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Indicador de progreso principal */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text
                style={[
                  styles.progressStep,
                  currentStep === 1 && styles.progressStepActive,
                ]}
              >
                Seleccionar servicios
              </Text>
              <Text
                style={[
                  styles.progressStep,
                  currentStep === 1 && styles.progressStepActive,
                ]}
              >
                {getStepTitle()}
              </Text>
              <Text
                style={[
                  styles.progressStep,
                  currentStep === 2 && styles.progressStepActive,
                ]}
              >
                Conocer tu perfil
              </Text>
            </View>
            <Text style={styles.progressText}>{currentStep} de 2</Text>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${(currentStep / 2) * 100}%` },
                ]}
              />
            </View>
          </View>

          {/* PASO 1: Calendario y tarifas por servicios */}
          {currentStep === 1 && (
            <View style={styles.stepContent}>
              {/* Tabs de servicios */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabScrollContainer}
              >
                {services.map((srv) => (
                  <TouchableOpacity
                    key={srv}
                    style={[
                      styles.tab,
                      selectedService === srv && styles.tabActive,
                      serviceConfigs[srv] && styles.tabConfigured,
                    ]}
                    onPress={() => {
                      setSelectedService(srv);
                      setCalendarVisible(true);
                    }}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        selectedService === srv && styles.tabTextActive,
                      ]}
                    >
                      {srv}
                    </Text>
                    {serviceConfigs[srv] && (
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="white"
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Fondo decorativo */}
              <View style={styles.placeholderContainer}>
                <Ionicons name="calendar-outline" size={130} color="#D1D5DB" />
                <Text style={styles.placeholderText}>
                  Selecciona un servicio para configurar
                </Text>

                {Object.keys(serviceConfigs).length > 0 && (
                  <View style={styles.configuredServicesInfo}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#00BFA6"
                    />
                    <Text style={styles.configuredServicesText}>
                      {Object.keys(serviceConfigs).length} servicio(s)
                      configurado(s)
                    </Text>
                  </View>
                )}
              </View>

              {/* Botón Siguiente */}
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextStep}
              >
                <Text style={styles.nextButtonText}>Siguiente</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* PASO 2: Conocer tu perfil */}
          {currentStep === 2 && (
            <View style={styles.stepContent}>
              <View style={styles.profileBanner}>
                <Text style={styles.profileBannerText}>
                  Queremos conocer tus habilidades y experiencia como cuidador
                  para construir un perfil que refleje tu verdadero potencial.
                </Text>
                <Text style={styles.profileBannerIcon}>🐾</Text>
              </View>

              <Text style={styles.sectionTitle}>
                Información general del cuidador
              </Text>

              <Text style={styles.label}>¿Tipo de mascotas que hospedas?</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setPetType("Perros")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      petType === "Perros" && styles.radioCircleSelected,
                    ]}
                  >
                    {petType === "Perros" && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>Perros</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setPetType("Gatos")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      petType === "Gatos" && styles.radioCircleSelected,
                    ]}
                  >
                    {petType === "Gatos" && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>Gatos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setPetType("Ambos")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      petType === "Ambos" && styles.radioCircleSelected,
                    ]}
                  >
                    {petType === "Ambos" && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>Ambos</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Nivel de experiencia:</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setExperienceLevel("Aprendiz")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      experienceLevel === "Aprendiz" &&
                        styles.radioCircleSelected,
                    ]}
                  >
                    {experienceLevel === "Aprendiz" && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>Aprendiz</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setExperienceLevel("Intermedio")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      experienceLevel === "Intermedio" &&
                        styles.radioCircleSelected,
                    ]}
                  >
                    {experienceLevel === "Intermedio" && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>Intermedio</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setExperienceLevel("Senior")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      experienceLevel === "Senior" &&
                        styles.radioCircleSelected,
                    ]}
                  >
                    {experienceLevel === "Senior" && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>Senior</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>
                Certificaciones o cursos (opcional):
              </Text>
              <View style={styles.checkboxGroup}>
                <TouchableOpacity
                  style={styles.checkboxOption}
                  onPress={() =>
                    toggleCertification("Estudiante de veterinaria")
                  }
                >
                  <View
                    style={[
                      styles.checkbox,
                      certifications.includes("Estudiante de veterinaria") &&
                        styles.checkboxSelected,
                    ]}
                  >
                    {certifications.includes("Estudiante de veterinaria") && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    Estudiante de veterinaria
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkboxOption}
                  onPress={() =>
                    toggleCertification("Curso en grooming o primeros auxilios")
                  }
                >
                  <View
                    style={[
                      styles.checkbox,
                      certifications.includes(
                        "Curso en grooming o primeros auxilios"
                      ) && styles.checkboxSelected,
                    ]}
                  >
                    {certifications.includes(
                      "Curso en grooming o primeros auxilios"
                    ) && <Ionicons name="checkmark" size={16} color="white" />}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    Curso en grooming o primeros auxilios
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkboxOption}
                  onPress={() => toggleCertification("No tengo")}
                >
                  <View
                    style={[
                      styles.checkbox,
                      certifications.includes("No tengo") &&
                        styles.checkboxSelected,
                    ]}
                  >
                    {certifications.includes("No tengo") && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>No tengo</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.label}>Eres fumador</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => {
                    setHasAllergies("Sí");
                  }}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      hasAllergies === "Sí" && styles.radioCircleSelected,
                    ]}
                  >
                    {hasAllergies === "Sí" && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>Sí</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => {
                    setHasAllergies("No");
                    setAllergiesDetail("");
                  }}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      hasAllergies === "No" && styles.radioCircleSelected,
                    ]}
                  >
                    {hasAllergies === "No" && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>No</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.label}>
                ¿Tienes alergias a algún tipo de mascota?
              </Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => {
                    setHasAllergies("Sí");
                  }}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      hasAllergies === "Sí" && styles.radioCircleSelected,
                    ]}
                  >
                    {hasAllergies === "Sí" && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>Sí</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => {
                    setHasAllergies("No");
                    setAllergiesDetail("");
                  }}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      hasAllergies === "No" && styles.radioCircleSelected,
                    ]}
                  >
                    {hasAllergies === "No" && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>No</Text>
                </TouchableOpacity>
              </View>

              {hasAllergies === "Sí" && (
                <>
                  <Text style={styles.label}>Especificar:</Text>
                  <TextInput
                    style={styles.input}
                    value={allergiesDetail}
                    onChangeText={setAllergiesDetail}
                    placeholder="Ej: Pelo de gato, perros grandes..."
                    placeholderTextColor="#9CA3AF"
                  />
                </>
              )}

              <Text style={styles.sectionTitle}>Información del hogar</Text>

              <Text style={styles.label}>
                Selecciona el tipo de vivienda donde hospedas:
              </Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setHomeType("Casa")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      homeType === "Casa" && styles.radioCircleSelected,
                    ]}
                  >
                    {homeType === "Casa" && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>Casa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setHomeType("Apartamento")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      homeType === "Apartamento" && styles.radioCircleSelected,
                    ]}
                  >
                    {homeType === "Apartamento" && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>Apartamento</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setHomeType("Finca")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      homeType === "Finca" && styles.radioCircleSelected,
                    ]}
                  >
                    {homeType === "Finca" && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>Finca</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>
                ¿Tienes yarda o espacio exterior?
              </Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setHasOutdoorSpace("No")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      hasOutdoorSpace === "No" && styles.radioCircleSelected,
                    ]}
                  >
                    {hasOutdoorSpace === "No" && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setHasOutdoorSpace("Sí, abierto")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      hasOutdoorSpace === "Sí, abierto" &&
                        styles.radioCircleSelected,
                    ]}
                  >
                    {hasOutdoorSpace === "Sí, abierto" && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>Sí, abierto</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setHasOutdoorSpace("Sí, cerrado")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      hasOutdoorSpace === "Sí, cerrado" &&
                        styles.radioCircleSelected,
                    ]}
                  >
                    {hasOutdoorSpace === "Sí, cerrado" && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>Sí, cerrado</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Personas en casa:</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => {
                    setPeopleAtHome("Vivo solo(a)");
                    setChildrenAge("");
                  }}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      peopleAtHome === "Vivo solo(a)" &&
                        styles.radioCircleSelected,
                    ]}
                  >
                    {peopleAtHome === "Vivo solo(a)" && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>Vivo solo(a)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => {
                    setPeopleAtHome("Con familia");
                    setChildrenAge("");
                  }}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      peopleAtHome === "Con familia" &&
                        styles.radioCircleSelected,
                    ]}
                  >
                    {peopleAtHome === "Con familia" && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>Con familia</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setPeopleAtHome("Con niños")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      peopleAtHome === "Con niños" &&
                        styles.radioCircleSelected,
                    ]}
                  >
                    {peopleAtHome === "Con niños" && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>Con niños</Text>
                </TouchableOpacity>
              </View>

              {peopleAtHome === "Con niños" && (
                <>
                  <Text style={styles.label}>Edad de los niños:</Text>
                  <TextInput
                    style={styles.input}
                    value={childrenAge}
                    onChangeText={setChildrenAge}
                    placeholder="Ej: 5 y 8 años"
                    placeholderTextColor="#9CA3AF"
                  />
                </>
              )}

              {/* Botones de navegación paso 2 */}
              <View style={styles.navigationButtons}>
                <TouchableOpacity
                  style={styles.backStepButton}
                  onPress={() => setCurrentStep(1)}
                >
                  <Text style={styles.backStepButtonText}>Atrás</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.finishButton}
                  onPress={handleFinish}
                >
                  <Text style={styles.finishButtonText}>Finalizar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal del calendario (solo para configurar servicios) */}
      <Modal
        visible={calendarVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCalendarVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedService}</Text>
                <Text style={styles.modalSubtitle}>
                  Selecciona las fechas disponibles
                </Text>
              </View>

              <Calendar
                onDayPress={(day) => toggleDateSelection(day.dateString)}
                markedDates={{ ...dayPrices, ...selectedDates }}
                markingType={"custom"}
                minDate={today}
                disableAllTouchEventsForDisabledDays={true}
                theme={{
                  textDayFontSize: 14,
                  todayTextColor: "#00BFA6",
                  arrowColor: "#00BFA6",
                }}
                dayComponent={({ date, state }) => {
                  const price = dayPrices[date?.dateString ?? ""]?.price || "";
                  const isSelected = !!selectedDates[date?.dateString ?? ""];
                  const isDisabled = state === "disabled";
                  return (
                    <TouchableOpacity
                      disabled={isDisabled}
                      onPress={() =>
                        toggleDateSelection(date?.dateString ?? "")
                      }
                      style={[
                        styles.dayContainer,
                        isSelected && { backgroundColor: "#00BFA6" },
                        isDisabled && { opacity: 0.3 },
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isSelected && { color: "white" },
                        ]}
                      >
                        {date?.day ?? ""}
                      </Text>
                      <Text
                        style={[
                          styles.priceText,
                          isSelected && { color: "white" },
                        ]}
                      >
                        {price}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />

              {Object.keys(selectedDates).length > 0 && (
                <View style={styles.formContainer}>
                  <View style={styles.selectedDatesInfo}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#00BFA6"
                    />
                    <Text style={styles.selectedDatesText}>
                      {Object.keys(selectedDates).length} día(s) seleccionado(s)
                    </Text>
                  </View>

                  <Text style={styles.sectionTitle}>Configuración</Text>

                  <Text style={styles.label}>Precio (CAD)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                    placeholder="40"
                    placeholderTextColor="#9CA3AF"
                  />

                  <Text style={styles.label}>Hora de entrega</Text>
                  <TouchableOpacity
                    style={styles.timePickerButton}
                    onPress={() => setShowDeliveryPicker(true)}
                  >
                    <Ionicons name="time-outline" size={20} color="#00BFA6" />
                    <Text style={styles.timePickerText}>
                      {formatTime(deliveryTime)}
                    </Text>
                  </TouchableOpacity>

                  {showDeliveryPicker && (
                    <DateTimePicker
                      value={deliveryTime}
                      mode="time"
                      is24Hour={false}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, selectedDate) => {
                        setShowDeliveryPicker(Platform.OS === "ios");
                        if (selectedDate) {
                          setDeliveryTime(selectedDate);
                        }
                      }}
                    />
                  )}

                  <Text style={styles.label}>Hora de recogida</Text>
                  <TouchableOpacity
                    style={styles.timePickerButton}
                    onPress={() => setShowPickupPicker(true)}
                  >
                    <Ionicons name="time-outline" size={20} color="#00BFA6" />
                    <Text style={styles.timePickerText}>
                      {formatTime(pickupTime)}
                    </Text>
                  </TouchableOpacity>

                  {showPickupPicker && (
                    <DateTimePicker
                      value={pickupTime}
                      mode="time"
                      is24Hour={false}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, selectedDate) => {
                        setShowPickupPicker(Platform.OS === "ios");
                        if (selectedDate) {
                          setPickupTime(selectedDate);
                        }
                      }}
                    />
                  )}

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveCalendarConfig}
                  >
                    <Ionicons name="save-outline" size={20} color="white" />
                    <Text style={styles.saveButtonText}>Guardar cambios</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => CloseCalendar()}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  },
  headerSpacer: {
    width: 40,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressStep: {
    fontSize: 11,
    color: "#9CA3AF",
    flex: 1,
    textAlign: "center",
  },
  progressStepActive: {
    color: "#4B5563",
    fontWeight: "600",
  },
  progressText: {
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFB6C1",
    borderRadius: 2,
  },
  stepContent: {
    flex: 1,
  },
  tabScrollContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tabActive: {
    backgroundColor: "#00BFA6",
  },
  tabConfigured: {
    backgroundColor: "#00BFA6",
  },
  tabText: {
    color: "#4B5563",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "white",
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    marginBottom: 40,
  },
  placeholderText: {
    color: "#9CA3AF",
    marginTop: 12,
    fontSize: 15,
  },
  configuredServicesInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
    gap: 8,
  },
  configuredServicesText: {
    fontSize: 14,
    color: "#065F46",
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: "#00BFA6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#00BFA6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  profileBanner: {
    backgroundColor: "#FFB6C1",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileBannerText: {
    flex: 1,
    fontSize: 13,
    color: "#4B1F3D",
    lineHeight: 18,
  },
  profileBannerIcon: {
    fontSize: 32,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },
  label: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  radioGroup: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
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
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    borderColor: "#00BFA6",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00BFA6",
  },
  radioLabel: {
    fontSize: 14,
    color: "#4B5563",
  },
  checkboxGroup: {
    gap: 12,
  },
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#00BFA6",
    borderColor: "#00BFA6",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#4B5563",
    flex: 1,
  },
  navigationButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
  },
  backStepButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  backStepButtonText: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 16,
  },
  finishButton: {
    flex: 1,
    backgroundColor: "#00BFA6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#00BFA6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  finishButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    width: "90%",
    maxHeight: "90%",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    marginBottom: 16,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  modalSubtitle: {
    textAlign: "center",
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  formContainer: {
    marginTop: 16,
    paddingBottom: 8,
  },
  selectedDatesInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  selectedDatesText: {
    fontSize: 14,
    color: "#065F46",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F9FAFB",
    fontSize: 15,
  },
  timePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F9FAFB",
    gap: 10,
  },
  timePickerText: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: "#00BFA6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#00BFA6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
    alignSelf: "center",
    paddingVertical: 8,
  },
  closeButtonText: {
    color: "#6B7280",
    fontSize: 15,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 6,
    width: 44,
    height: 44,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "600",
  },
  priceText: {
    fontSize: 10,
    color: "#6B7280",
  },
});
