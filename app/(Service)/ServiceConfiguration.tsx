import AuthLayout from "@/components/AuthLayout";
import { RootState } from "@/Store/store";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
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
import { useSelector } from "react-redux";
import alojamientoMascotas from "../../assets/Icons/svg-servicios/Alojamiento.png";
import Banio from "../../assets/Icons/svg-servicios/Banio.png";
import Cuidado from "../../assets/Icons/svg-servicios/Cuidado.png";
import Guarderia from "../../assets/Icons/svg-servicios/Guarderia.png";
import Paseos from "../../assets/Icons/svg-servicios/Paseos.png";
import puppyPink from "../../assets/images/PuppyPink.png";
import { fontFamily } from "../../Config/typography";
const services = [
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

const timeSlots = ["Mañana", "Tarde", "Noche"];

export default function ServiceConfigScreen() {
  const handleGoBack = () => {
    clearAllStates();
    router.push("/(tabs)/perfil");
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<Record<string, any>>({});
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [showDeliveryPicker, setShowDeliveryPicker] = useState(false);
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [dayPrices, setDayPrices] = useState<Record<string, any>>({});
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState<typeof services>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartDate, setDragStartDate] = useState<string | null>(null);

  // Para servicios de franjas horarias (Paseo y Baño)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [serviceDuration, setServiceDuration] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [basePrice, setBasePrice] = useState("");

  // Lista de franjas horarias guardadas
  const [timeSlotSchedules, setTimeSlotSchedules] = useState<
    Array<{
      timeSlot: string;
      duration: string;
      startTime: string;
      endTime: string;
      price: string;
    }>
  >([]);

  // Estados para el paso 2
  const [petType, setPetType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [hasAllergies, setHasAllergies] = useState("");
  const [allergiesDetail, setAllergiesDetail] = useState("");
  const [homeType, setHomeType] = useState("");
  const [hasOutdoorSpace, setHasOutdoorSpace] = useState("");
  const [peopleAtHome, setPeopleAtHome] = useState("");
  const [childrenAge, setChildrenAge] = useState("");
  const [serviceConfigs, setServiceConfigs] = useState<Record<string, any>>({});

  // Estados para selección de rango
  const [selectionMode, setSelectionMode] = useState<"exact" | "range">(
    "exact"
  );
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);
  const selectedServicesFromRedux = useSelector(
    (state: RootState) => state.services.selectedServices
  );
  const today = dayjs().format("YYYY-MM-DD");
  const clearAllStates = () => {
    // Paso 1
    setCurrentStep(0);
    setSelectedService(null);
    setSelectedDates({});
    setPrice("");
    setDeliveryTime(new Date());
    setPickupTime(new Date());
    setShowDeliveryPicker(false);
    setShowPickupPicker(false);
    setDayPrices({});
    setShowConfigModal(false);
    setSelectedServices([]);
    setIsDragging(false);
    setDragStartDate(null);

    // Servicios de franjas horarias
    setSelectedTimeSlot("");
    setServiceDuration("");
    setStartTime(new Date());
    setEndTime(new Date());
    setShowStartTimePicker(false);
    setShowEndTimePicker(false);
    setBasePrice("");
    setTimeSlotSchedules([]);

    // Paso 2
    setPetType("");
    setExperienceLevel("");
    setCertifications([]);
    setHasAllergies("");
    setAllergiesDetail("");
    setHomeType("");
    setHasOutdoorSpace("");
    setPeopleAtHome("");
    setChildrenAge("");
    setServiceConfigs({});

    // Selección de rango
    setSelectionMode("exact");
    setRangeStart(null);
    setRangeEnd(null);
  };
  useEffect(() => {
    // 🔹 Precargar servicios desde Redux al estado local
    // const arrayServiceReduxComplete = services.filter((s) =>
    //   selectedServicesFromRedux.includes(s.id)
    // );

    //  setSelectedServices(arrayServiceReduxComplete);
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

  const getCurrentServiceType = () => {
    if (!selectedService) return "accommodation";
    const service = services.find((s) => s.id === selectedService);
    return service?.type || "accommodation";
  };

  const handleSaveCalendarConfig = () => {
    const dates = Object.keys(selectedDates);
    if (!dates.length) {
      alert("Selecciona al menos un día");
      return;
    }

    if (!selectedService) return;

    const serviceType = getCurrentServiceType();

    if (serviceType === "time-slot") {
      if (timeSlotSchedules.length === 0) {
        alert("Agrega al menos una franja horaria");
        return;
      }

      setServiceConfigs((prev) => ({
        ...prev,
        [selectedService]: {
          dates,
          type: "time-slot",
          schedules: timeSlotSchedules,
        },
      }));
    } else {
      if (!price) {
        alert("Ingresa un precio");
        return;
      }

      setServiceConfigs((prev) => ({
        ...prev,
        [selectedService]: {
          dates,
          price,
          deliveryTime: formatTime(deliveryTime),
          pickupTime: formatTime(pickupTime),
          type: "accommodation",
        },
      }));
    }

    alert(`Configuración de ${selectedService} guardada 🎉`);

    // Limpiar estado
    setSelectedService(null);
    setSelectedDates({});
    setPrice("");
    setDeliveryTime(new Date());
    setPickupTime(new Date());
    setShowConfigModal(false);
    setTimeSlotSchedules([]);
    setRangeStart(null);
    setRangeEnd(null);
  };

  const toggleDateSelection = (date: string) => {
    setSelectedDates((prev) => {
      const newDates = { ...prev };
      if (newDates[date]) {
        delete newDates[date];
      } else {
        newDates[date] = {
          selected: true,
          selectedColor: "#36ebd8",
          textColor: "white",
        };
      }
      return newDates;
    });
  };

  const handleRangeDatePress = (dateString: string) => {
    if (!rangeStart) {
      // Primera fecha seleccionada
      setRangeStart(dateString);
      setRangeEnd(null);
      setSelectedDates({
        [dateString]: {
          selected: true,
          selectedColor: "#36ebd8",
          textColor: "white",
        },
      });
    } else if (!rangeEnd) {
      // Segunda fecha seleccionada - crear rango
      const start = dayjs(rangeStart);
      const end = dayjs(dateString);

      if (end.isBefore(start)) {
        // Si la segunda fecha es antes, intercambiar
        setRangeStart(dateString);
        setRangeEnd(rangeStart);
      } else {
        setRangeEnd(dateString);
      }

      // Seleccionar todas las fechas en el rango
      const newDates: Record<string, any> = {};
      let current = start.isBefore(end) ? start : end;
      const endDate = start.isBefore(end) ? end : start;

      while (current.isBefore(endDate) || current.isSame(endDate, "day")) {
        newDates[current.format("YYYY-MM-DD")] = {
          selected: true,
          selectedColor: "#36ebd8",
          textColor: "white",
        };
        current = current.add(1, "day");
      }

      setSelectedDates(newDates);
    } else {
      // Ya hay un rango, reiniciar
      setRangeStart(dateString);
      setRangeEnd(null);
      setSelectedDates({
        [dateString]: {
          selected: true,
          selectedColor: "#36ebd8",
          textColor: "white",
        },
      });
    }
  };

  const handleDayPress = (date: string, isDisabled: boolean) => {
    if (isDisabled) return;

    if (selectionMode === "range") {
      handleRangeDatePress(date);
    } else {
      toggleDateSelection(date);
    }

    setIsDragging(true);
    setDragStartDate(date);
  };

  const handleDayMove = (date: string, isDisabled: boolean) => {
    if (!isDragging || isDisabled || selectionMode === "range") return;

    setSelectedDates((prev) => {
      const newDates = { ...prev };
      if (!newDates[date]) {
        newDates[date] = {
          selected: true,
          selectedColor: "#36ebd8",
          textColor: "white",
        };
      }
      return newDates;
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragStartDate(null);
  };

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((s) => s !== serviceId);
      } else {
        return [...prev, serviceId];
      }
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

  const handleAddTimeSlot = () => {
    if (!selectedTimeSlot) {
      alert("Selecciona una franja horaria");
      return;
    }

    if (!basePrice) {
      alert("Ingresa el precio base");
      return;
    }

    const newSchedule = {
      timeSlot: selectedTimeSlot,
      duration: serviceDuration,
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
      price: basePrice,
    };

    setTimeSlotSchedules([...timeSlotSchedules, newSchedule]);

    setSelectedTimeSlot("");
    setServiceDuration("");
    setBasePrice("");
    setStartTime(new Date());
    setEndTime(new Date());
  };

  const handleRemoveTimeSlot = (index: number) => {
    setTimeSlotSchedules(timeSlotSchedules.filter((_, i) => i !== index));
  };

  const handleNextFromSelection = () => {
    if (selectedServices.length === 0) {
      alert("Selecciona al menos un servicio");
      return;
    }
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (Object.keys(serviceConfigs).length === 0) {
        alert("Configura al menos un servicio antes de continuar");
        return;
      }
      setCurrentStep(2);
    }
  };

  const handleFinish = () => {
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

          {/* Indicador de progreso */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text
                style={[
                  styles.progressStep,
                  currentStep === 0 && styles.progressStepActive,
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
                Calendario y tarifas
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
            <Text style={styles.progressText}>{currentStep + 1} de 3</Text>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${((currentStep + 1) / 3) * 100}%` },
                ]}
              />
            </View>
          </View>

          {/* PASO 0: Selección de servicios */}
          {currentStep === 0 && (
            <View style={styles.stepContent}>
              <Text style={styles.stepSubtitle}>
                Selecciona los servicios que deseas ofrecer en PuppyPo
              </Text>

              <View style={styles.servicesGrid}>
                {services.map((service) => (
                  <TouchableOpacity
                    key={service.id}
                    style={[
                      styles.serviceCard,
                      selectedServices.includes(service.id) &&
                        styles.serviceCardSelected,
                    ]}
                    onPress={() => toggleServiceSelection(service.id)}
                  >
                    <View style={styles.serviceImageContainer}>
                      <View style={styles.serviceImagePlaceholder}>
                        <Image
                          source={service.icon}
                          style={{ width: 60, height: 60 }}
                          resizeMode="contain"
                        />
                      </View>
                      {selectedServices.includes(service.id) && (
                        <View style={styles.selectedBadge}>
                          <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#00BFA6"
                          />
                        </View>
                      )}
                    </View>
                    <View style={styles.serviceInfo}>
                      <Text style={styles.serviceName}>{service.name}</Text>
                      {service.subtitle ? (
                        <Text style={styles.serviceSubtitle}>
                          {service.subtitle}
                        </Text>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextFromSelection}
              >
                <Text style={styles.nextButtonText}>Siguiente</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* PASO 1: Calendario y tarifas */}
          {currentStep === 1 && (
            <View style={styles.stepContent}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabScrollContainer}
              >
                {selectedServices.map((srv) => (
                  <TouchableOpacity
                    key={srv}
                    style={[
                      styles.tab,
                      selectedService === srv && styles.tabActive,
                      serviceConfigs[srv] && styles.tabConfigured,
                    ]}
                    onPress={() => setSelectedService(srv)}
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
                        size={14}
                        color="white"
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {selectedService ? (
                <View style={styles.calendarContainer}>
                  <Text style={styles.calendarTitle}>{selectedService}</Text>

                  {/* Botones de modo de selección */}
                  <View style={styles.selectionModeContainer}>
                    <TouchableOpacity
                      style={[
                        styles.selectionModeButton,
                        selectionMode === "exact" &&
                          styles.selectionModeButtonActive,
                      ]}
                      onPress={() => {
                        setSelectionMode("exact");
                        setRangeStart(null);
                        setRangeEnd(null);
                        setSelectedDates({});
                      }}
                    >
                      <Text
                        style={[
                          styles.selectionModeText,
                          selectionMode === "exact" &&
                            styles.selectionModeTextActive,
                        ]}
                      >
                        Fechas exactas
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.selectionModeButton,
                        selectionMode === "range" &&
                          styles.selectionModeButtonActive,
                      ]}
                      onPress={() => {
                        setSelectionMode("range");
                        setSelectedDates({});
                        setRangeStart(null);
                        setRangeEnd(null);
                      }}
                    >
                      <Text
                        style={[
                          styles.selectionModeText,
                          selectionMode === "range" &&
                            styles.selectionModeTextActive,
                        ]}
                      >
                        Rango de fechas
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.calendarSubtitle}>
                    {selectionMode === "range"
                      ? "Selecciona fecha de inicio y fin del rango"
                      : "Selecciona las fechas disponibles (puedes arrastrar para seleccionar varios días)"}
                  </Text>

                  <Calendar
                    onDayPress={(day) =>
                      handleDayPress(day.dateString, day.dateString < today)
                    }
                    markedDates={{ ...dayPrices, ...selectedDates }}
                    markingType={"custom"}
                    minDate={today}
                    disableAllTouchEventsForDisabledDays={true}
                    theme={{
                      textDayFontSize: 16,
                      todayTextColor: "#36ebd8",
                      arrowColor: "#36ebd8",
                      monthTextColor: "#111827",
                      textMonthFontSize: 18,
                      textMonthFontWeight: "600",
                    }}
                    style={styles.calendar}
                    dayComponent={({ date, state }) => {
                      const price =
                        dayPrices[date?.dateString ?? ""]?.price || "";
                      const isSelected =
                        !!selectedDates[date?.dateString ?? ""];
                      const isDisabled = state === "disabled";

                      return (
                        <TouchableOpacity
                          disabled={isDisabled}
                          onPressIn={() =>
                            handleDayPress(date?.dateString ?? "", isDisabled)
                          }
                          onPressOut={handleDragEnd}
                          onLongPress={() =>
                            handleDayPress(date?.dateString ?? "", isDisabled)
                          }
                          delayLongPress={100}
                          style={[
                            styles.dayContainer,
                            isSelected && styles.dayContainerSelected,
                            isDisabled && styles.dayContainerDisabled,
                          ]}
                        >
                          <Text
                            style={[
                              styles.dayText,
                              isSelected && styles.dayTextSelected,
                              isDisabled && styles.dayTextDisabled,
                            ]}
                          >
                            {date?.day ?? ""}
                          </Text>
                          <Text
                            style={[
                              styles.priceText,
                              isSelected && styles.priceTextSelected,
                            ]}
                          >
                            {price}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />

                  {/* Información del rango seleccionado */}
                  {/* {rangeStart && rangeEnd && (
                    <View style={styles.rangeInfoContainer}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="#36ebd8"
                      />
                      <Text style={styles.rangeInfoText}>
                        {dayjs(rangeStart).format("DD MMM")} -{" "}
                        {dayjs(rangeEnd).format("DD MMM YYYY")} (
                        {dayjs(rangeEnd).diff(dayjs(rangeStart), "day")} dias)
                      </Text>
                    </View>
                  )} */}

                  {Object.keys(selectedDates).length > 0 && (
                    <TouchableOpacity
                      style={styles.configureButton}
                      onPress={() => {
                        setPrice("");
                        setDeliveryTime(new Date());
                        setPickupTime(new Date());
                        setTimeSlotSchedules([]);
                        setShowConfigModal(true);
                      }}
                    >
                      <Ionicons
                        name="settings-outline"
                        size={20}
                        color="white"
                      />
                      <Text style={styles.configureButtonText}>
                        Configurar ({Object.keys(selectedDates).length} días)
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <View style={styles.placeholderContainer}>
                  <Ionicons
                    name="calendar-outline"
                    size={130}
                    color="#D1D5DB"
                  />
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
              )}

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
              <View style={styles.profileBannerContainer}>
                <View style={styles.profileBanner}>
                  <Text style={styles.profileBannerText}>
                    Queremos conocer tus habilidades y experiencia como cuidador
                    para construir un perfil que refleje tu verdadero potencial.
                  </Text>
                </View>
                <Image
                  source={puppyPink}
                  style={styles.profileBannerIcon}
                  resizeMode="contain"
                />
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

              <Text style={styles.label}>
                ¿Tienes alergias a algún tipo de mascota?
              </Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setHasAllergies("Sí")}
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

      {/* Modal de configuración */}
      <Modal
        visible={showConfigModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowConfigModal(false)}
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
                <Text style={styles.modalTitle}>
                  Configuración de {selectedService}
                </Text>
                <Text style={styles.modalSubtitleText}>
                  {Object.keys(selectedDates).length} día(s) seleccionado(s)
                </Text>
              </View>

              {getCurrentServiceType() === "time-slot" ? (
                <View style={styles.formContainer}>
                  <Text style={styles.infoText}>
                    Por favor defina la franja horaria:
                  </Text>

                  <View style={styles.radioGroupCentered}>
                    {timeSlots.map((slot) => (
                      <TouchableOpacity
                        key={slot}
                        style={styles.radioOptionCentered}
                        onPress={() => setSelectedTimeSlot(slot)}
                      >
                        <View
                          style={[
                            styles.radioCircle,
                            selectedTimeSlot === slot &&
                              styles.radioCircleSelected,
                          ]}
                        >
                          {selectedTimeSlot === slot && (
                            <View style={styles.radioDot} />
                          )}
                        </View>
                        <Text style={styles.radioLabel}>{slot}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.timeRowCentered}>
                    <View style={styles.timeInputGroup}>
                      <Text style={styles.timeLabel}>Hora inicio:</Text>
                      <TouchableOpacity
                        style={styles.timePickerButtonLarge}
                        onPress={() => setShowStartTimePicker(true)}
                      >
                        <Text style={styles.timePickerTextLarge}>
                          {formatTime(startTime).split(" ")[0]}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.timeInputGroup}>
                      <Text style={styles.timeLabel}>Hora Fin:</Text>
                      <TouchableOpacity
                        style={styles.timePickerButtonLarge}
                        onPress={() => setShowEndTimePicker(true)}
                      >
                        <Text style={styles.timePickerTextLarge}>
                          {formatTime(endTime).split(" ")[0]}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {showStartTimePicker && (
                    <DateTimePicker
                      value={startTime}
                      mode="time"
                      themeVariant="light"
                      is24Hour={false}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, selectedDate) => {
                        setShowStartTimePicker(Platform.OS === "ios");
                        if (selectedDate) {
                          setStartTime(selectedDate);
                        }
                      }}
                    />
                  )}

                  {showEndTimePicker && (
                    <DateTimePicker
                      value={endTime}
                      mode="time"
                      is24Hour={false}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, selectedDate) => {
                        setShowEndTimePicker(Platform.OS === "ios");
                        if (selectedDate) {
                          setEndTime(selectedDate);
                        }
                      }}
                    />
                  )}

                  <View style={styles.priceSection}>
                    <View style={styles.priceTitleRow}>
                      <Text style={styles.priceTitle}>
                        Precio base en Dólares
                      </Text>
                      <Ionicons
                        name="information-circle-outline"
                        size={20}
                        color="#EF4444"
                      />
                    </View>
                    <View style={styles.priceDisplayContainer}>
                      <TextInput
                        style={styles.priceDisplayInput}
                        keyboardType="numeric"
                        value={basePrice}
                        onChangeText={setBasePrice}
                        placeholder="40"
                        placeholderTextColor="#D1D5DB"
                      />
                      <Text style={styles.priceCurrencyLarge}>$</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.addTimeSlotButton}
                    onPress={handleAddTimeSlot}
                  >
                    <Text style={styles.addTimeSlotButtonText}>
                      Guardar franja
                    </Text>
                  </TouchableOpacity>

                  {timeSlotSchedules.length > 0 && (
                    <View style={styles.savedSchedulesContainer}>
                      <View style={styles.savedSchedulesHeader}>
                        <Text style={styles.savedSchedulesDate}>
                          {rangeStart && rangeEnd
                            ? `${dayjs(rangeStart).format("DD MMM")} a ${dayjs(
                                rangeEnd
                              ).format("DD MMM")}`
                            : "Fechas seleccionadas"}
                        </Text>
                        <Text style={styles.savedSchedulesDays}>
                          {Object.keys(selectedDates).length} día(s)
                          disponible(s)
                        </Text>
                      </View>

                      <View style={styles.scheduleTable}>
                        <View style={styles.scheduleTableHeader}>
                          <Text style={styles.tableHeaderText}>Horario</Text>
                          <Text style={styles.tableHeaderText}>Tarifa</Text>
                          <Text style={styles.tableHeaderText}>Eliminar</Text>
                        </View>

                        {timeSlotSchedules.map((schedule, index) => (
                          <View key={index} style={styles.scheduleTableRow}>
                            <Text style={styles.scheduleTimeText}>
                              {schedule.startTime} - {schedule.endTime}
                            </Text>
                            <Text style={styles.schedulePriceText}>
                              {schedule.price} $
                            </Text>
                            <TouchableOpacity
                              onPress={() => handleRemoveTimeSlot(index)}
                              style={styles.deleteIconButton}
                            >
                              <Ionicons
                                name="close"
                                size={20}
                                color="#EF4444"
                              />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveCalendarConfig}
                  >
                    <Text style={styles.saveButtonText}>Guardar cambios</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.formContainer}>
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
                    <Ionicons name="time-outline" size={20} color="#36ebd8" />
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
                    <Ionicons name="time-outline" size={20} color="#36ebd8" />
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
                    <Text style={styles.saveButtonText}>Guardar cambios</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setShowConfigModal(false);
                  setPrice("");
                  setTimeSlotSchedules([]);
                }}
              >
                <Text style={styles.closeButtonText}>Cancelar</Text>
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
    fontFamily: fontFamily.bold,
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
    fontSize: 9,
    color: "#9CA3AF",
    flex: 1,
    textAlign: "center",
    fontFamily: fontFamily.medium,
  },
  progressStepActive: {
    color: "#4B5563",
    fontWeight: "600",
  },
  progressText: {
    fontSize: 10,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: fontFamily.medium,
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
  stepSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
    fontFamily: fontFamily.bold,
  },
  servicesGrid: {
    gap: 16,
    marginBottom: 24,
  },
  serviceCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceCardSelected: {
    borderColor: "#00BFA6",
    backgroundColor: "#ECFDF5",
  },
  serviceImageContainer: {
    position: "relative",
    marginRight: 12,
  },
  serviceImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "white",
    borderRadius: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
    fontFamily: fontFamily.medium,
  },
  serviceSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    fontFamily: fontFamily.medium,
  },
  tabScrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
    fontSize: 11,
    fontFamily: fontFamily.medium,
  },
  tabTextActive: {
    color: "white",
    fontFamily: fontFamily.medium,
  },
  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  calendarTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
    fontFamily: fontFamily.bold,
  },
  selectionModeContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    marginTop: 12,
  },
  selectionModeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    alignItems: "center",
    backgroundColor: "white",
  },
  selectionModeButtonActive: {
    backgroundColor: "#36ebd8",
    borderColor: "#36ebd8",
  },
  selectionModeText: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "600",
    fontFamily: fontFamily.medium,
  },
  selectionModeTextActive: {
    color: "white",
    fontFamily: fontFamily.bold,
  },
  calendarSubtitle: {
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 16,
    fontFamily: fontFamily.medium,
  },
  calendar: {
    borderRadius: 8,
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
    fontFamily: fontFamily.medium,
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
    fontFamily: fontFamily.medium,
  },
  rangeInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F9F6",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: "#36ebd8",
  },
  rangeInfoText: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "600",
    fontFamily: fontFamily.semiBold,
    flex: 1,
  },
  nextButton: {
    backgroundColor: "#00BFA6",
    paddingVertical: 14,
    borderRadius: 20,
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
    fontFamily: fontFamily.medium,
  },
  configureButton: {
    backgroundColor: "#36ebd8",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#36ebd8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  configureButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
  profileBannerContainer: {
    position: "relative",
    marginBottom: 24,
    width: "100%",
  },
  profileBanner: {
    backgroundColor: "#f6c3cc",
    padding: 16,
    paddingRight: 50, // Espacio para que el texto no se superponga con el ícono
    borderRadius: 20,
    width: "100%",
  },
  profileBannerText: {
    fontSize: 13,
    color: "#4B1F3D",
    lineHeight: 18,
    fontFamily: fontFamily.medium,
  },
  profileBannerIcon: {
    position: "absolute",
    top: 40,
    right: 8,
    width: 70,
    height: 70,
    opacity: 0.6, // Para darle ese efecto translúcido como en la imagen
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
    fontFamily: fontFamily.bold,
  },
  label: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },
  radioGroup: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
    flexWrap: "wrap",
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
    borderColor: "#36ebd8",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#36ebd8",
  },
  radioLabel: {
    fontSize: 14,
    color: "#4B5563",
    fontFamily: fontFamily.medium,
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
    backgroundColor: "#36ebd8",
    borderColor: "#36ebd8",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#4B5563",
    flex: 1,
    fontFamily: fontFamily.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F9FAFB",
    fontSize: 15,
    fontFamily: fontFamily.medium,
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
  formContainer: {
    marginTop: 8,
    paddingBottom: 8,
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
    fontFamily: fontFamily.medium,
  },
  saveButton: {
    backgroundColor: "#36ebd8",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#36ebd8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    width: 50,
    height: 50,
    margin: 2,
  },
  dayContainerSelected: {
    backgroundColor: "#36ebd8",
  },
  dayContainerDisabled: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    fontFamily: fontFamily.medium,
  },
  dayTextSelected: {
    color: "white",
    fontFamily: fontFamily.medium,
  },
  dayTextDisabled: {
    color: "#9CA3AF",
    fontFamily: fontFamily.medium,
  },
  priceText: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 2,
    fontFamily: fontFamily.medium,
  },
  priceTextSelected: {
    color: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: fontFamily.bold,
  },
  modalSubtitleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
    fontFamily: fontFamily.medium,
  },
  closeButton: {
    marginTop: 16,
    alignSelf: "center",
    paddingVertical: 12,
  },
  closeButtonText: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: fontFamily.medium,
  },
  infoText: {
    fontSize: 13,
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },
  radioGroupCentered: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginBottom: 24,
  },
  radioOptionCentered: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeRowCentered: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
    marginBottom: 24,
  },
  timeInputGroup: {
    flex: 1,
    alignItems: "center",
  },
  timeLabel: {
    fontSize: 13,
    color: "#1A1A1A",
    marginBottom: 8,
    fontFamily: fontFamily.medium,
    fontWeight: "500",
  },
  timePickerButtonLarge: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
  },
  timePickerTextLarge: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: fontFamily.medium,
  },
  priceSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  priceTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  priceTitle: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },
  priceDisplayContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  priceDisplayInput: {
    fontSize: 48,
    fontWeight: "300",
    color: "#D1D5DB",
    textAlign: "right",
    minWidth: 100,
  },
  priceCurrencyLarge: {
    fontSize: 48,
    fontWeight: "300",
    color: "#D1D5DB",
    fontFamily: fontFamily.medium,
  },
  addTimeSlotButton: {
    backgroundColor: "#36ebd8",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 24,
  },
  addTimeSlotButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
    fontFamily: fontFamily.medium,
  },
  savedSchedulesContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  savedSchedulesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  savedSchedulesDate: {
    fontSize: 13,
    color: "#1A1A1A",
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },
  savedSchedulesDays: {
    fontSize: 13,
    color: "#6B7280",
    fontFamily: fontFamily.medium,
  },
  scheduleTable: {
    gap: 8,
  },
  scheduleTableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
    fontFamily: fontFamily.medium,
  },
  scheduleTableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  scheduleTimeText: {
    flex: 1,
    fontSize: 13,
    color: "#1A1A1A",
    textAlign: "center",
    fontFamily: fontFamily.medium,
  },
  schedulePriceText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
    fontFamily: fontFamily.medium,
  },
  deleteIconButton: {
    flex: 1,
    alignItems: "center",
  },
});