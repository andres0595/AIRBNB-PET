// ============================================
// 📁 components/ServiceConfig/Steps/CalendarConfigStep.tsx
// ============================================
import { fontFamily } from "@/Config/typography";
import { i18n } from "@/i18n/translations";
import {
  Service,
  ServiceConfig,
} from "@/Models/Model-ServiceConfig/serviceConfig";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
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

const TIME_SLOTS = ["Mañana", "Tarde", "Noche"];

interface CalendarConfigStepProps {
  selectedServices: string[];
  services: Service[];
  serviceConfigs: Record<string, ServiceConfig>;
  dayPrices: Record<string, any>;
  onSaveConfig: (serviceId: string, config: ServiceConfig) => void;
  onBack: () => void;
  onFinish: () => void;
}

export const CalendarConfigStep: React.FC<CalendarConfigStepProps> = ({
  selectedServices,
  services,
  serviceConfigs,
  dayPrices,
  onSaveConfig,
  onBack,
  onFinish,
}) => {
  const today = dayjs().format("YYYY-MM-DD");

  // Estados del calendario
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<Record<string, any>>({});
  const [selectionMode, setSelectionMode] = useState<"exact" | "range">(
    "exact"
  );
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Estados del modal - Alojamiento
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [showDeliveryPicker, setShowDeliveryPicker] = useState(false);
  const [showPickupPicker, setShowPickupPicker] = useState(false);

  // Estados del modal - Franjas horarias
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [basePrice, setBasePrice] = useState("");
  const [timeSlotSchedules, setTimeSlotSchedules] = useState<
    Array<{
      timeSlot: string;
      duration: string;
      startTime: string;
      endTime: string;
      price: string;
    }>
  >([]);

  // Helpers
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

  const getServiceName = (serviceId: string) => {
    return services.find((s) => s.id === serviceId)?.name || serviceId;
  };

  // Manejo de selección de fechas
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
      const start = dayjs(rangeStart);
      const end = dayjs(dateString);

      if (end.isBefore(start)) {
        setRangeStart(dateString);
        setRangeEnd(rangeStart);
      } else {
        setRangeEnd(dateString);
      }

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
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Manejo de franjas horarias
  const handleAddTimeSlot = () => {
    if (!selectedTimeSlot) {
      alert(i18n.t("configservice.selectTimeRange"));
      return;
    }

    if (!basePrice) {
      alert(i18n.t("configservice.enterBasePrice"));
      return;
    }

    const newSchedule = {
      timeSlot: selectedTimeSlot,
      duration: "",
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
      price: basePrice,
    };

    setTimeSlotSchedules([...timeSlotSchedules, newSchedule]);
    setSelectedTimeSlot("");
    setBasePrice("");
    setStartTime(new Date());
    setEndTime(new Date());
  };

  const handleRemoveTimeSlot = (index: number) => {
    setTimeSlotSchedules(timeSlotSchedules.filter((_, i) => i !== index));
  };

  // Guardar configuración
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

      onSaveConfig(selectedService, {
        dates,
        type: "time-slot",
        schedules: timeSlotSchedules,
      });
    } else {
      if (!price) {
        alert("Ingresa un precio");
        return;
      }

      onSaveConfig(selectedService, {
        dates,
        price,
        deliveryTime: formatTime(deliveryTime),
        pickupTime: formatTime(pickupTime),
        type: "accommodation",
      });
    }

    alert(
      i18n.t("configservice.configSavedFor", {
        selectedService: getServiceName(selectedService),
      })
    );

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

  const handleOpenConfigModal = () => {
    setPrice("");
    setDeliveryTime(new Date());
    setPickupTime(new Date());
    setTimeSlotSchedules([]);
    setShowConfigModal(true);
  };

  return (
    <View style={styles.container}>
      {/* Tabs de servicios */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabScrollContainer}
      >
        {selectedServices.map((serviceId) => (
          <TouchableOpacity
            key={serviceId}
            style={[
              styles.tab,
              selectedService === serviceId && styles.tabActive,
              serviceConfigs[serviceId] && styles.tabConfigured,
            ]}
            onPress={() => setSelectedService(serviceId)}
          >
            <Text
              style={[
                styles.tabText,
                selectedService === serviceId && styles.tabTextActive,
              ]}
            >
              {getServiceName(serviceId)}
            </Text>
            {serviceConfigs[serviceId] && (
              <Ionicons name="checkmark-circle" size={14} color="white" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedService ? (
        <View style={styles.calendarContainer}>
          <Text style={styles.calendarTitle}>
            {getServiceName(selectedService)}
          </Text>

          {/* Botones de modo de selección */}
          <View style={styles.selectionModeContainer}>
            <TouchableOpacity
              style={[
                styles.selectionModeButton,
                selectionMode === "exact" && styles.selectionModeButtonActive,
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
                  selectionMode === "exact" && styles.selectionModeTextActive,
                ]}
              >
                {i18n.t("configservice.exactDates")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.selectionModeButton,
                selectionMode === "range" && styles.selectionModeButtonActive,
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
                  selectionMode === "range" && styles.selectionModeTextActive,
                ]}
              >
                {i18n.t("configservice.dateRange")}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.calendarSubtitle}>
            {selectionMode === "range"
              ? "Selecciona fecha de inicio y fin del rango"
              : "Selecciona las fechas disponibles (puedes arrastrar para seleccionar varios días)"}
          </Text>

          {/* Calendario */}
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
              const price = dayPrices[date?.dateString ?? ""]?.price || "";
              const isSelected = !!selectedDates[date?.dateString ?? ""];
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

          {Object.keys(selectedDates).length > 0 && (
            <TouchableOpacity
              style={styles.configureButton}
              onPress={handleOpenConfigModal}
            >
              <Ionicons name="settings-outline" size={20} color="white" />
              <Text style={styles.configureButtonText}>
                {i18n.t("configservice.configureDays", {
                  days: Object.keys(selectedDates).length,
                })}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Ionicons name="calendar-outline" size={130} color="#D1D5DB" />
          <Text style={styles.placeholderText}>
            {i18n.t("configservice.selectServiceToConfigure")}
          </Text>

          {Object.keys(serviceConfigs).length > 0 && (
            <View style={styles.configuredServicesInfo}>
              <Ionicons name="checkmark-circle" size={20} color="#00BFA6" />
              <Text style={styles.configuredServicesText}>
                {i18n.t("configservice.servicesConfigured", {
                  count: Object.keys(serviceConfigs).length,
                })}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Botones de navegación */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>
            {i18n.t("configservice.back")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.finishButton} onPress={onFinish}>
          <Text style={styles.finishButtonText}>
            {i18n.t("configservice.finish")}
          </Text>
        </TouchableOpacity>
      </View>

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
                  Configuración de {getServiceName(selectedService || "")}
                </Text>
                <Text style={styles.modalSubtitleText}>
                  {i18n.t("configservice.daysSelected", {
                    count: Object.keys(selectedDates).length,
                  })}
                </Text>
              </View>

              {getCurrentServiceType() === "time-slot" ? (
                // Modal para servicios de franjas horarias
                <View style={styles.formContainer}>
                  <Text style={styles.infoText}>
                    {i18n.t("configservice.defineTimeRange")}
                  </Text>

                  <View style={styles.radioGroupCentered}>
                    {TIME_SLOTS.map((slot) => (
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
                      <Text style={styles.timeLabel}>
                        {i18n.t("configservice.startTime")}
                      </Text>
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
                      <Text style={styles.timeLabel}>
                        {i18n.t("configservice.endTime")}
                      </Text>
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
                        {i18n.t("configservice.priceCAD")}
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
                      {i18n.t("configservice.addTimeSlotButtonText")}
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
                          <Text style={styles.tableHeaderText}>
                            {i18n.t("configservice.schedule")}
                          </Text>
                          <Text style={styles.tableHeaderText}>
                            {i18n.t("configservice.rate")}
                          </Text>
                          <Text style={styles.tableHeaderText}>
                            {i18n.t("configservice.delete")}
                          </Text>
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
                    <Text style={styles.saveButtonText}>
                      {i18n.t("configservice.saveChanges")}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                // Modal para servicios de alojamiento
                <View style={styles.formContainer}>
                  <Text style={styles.label}>
                    {i18n.t("configservice.priceCAD")}
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                    placeholder="40"
                    placeholderTextColor="#9CA3AF"
                  />

                  <Text style={styles.label}>
                    {i18n.t("configservice.dropOffTime")}
                  </Text>
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

                  <Text style={styles.label}>
                    {i18n.t("configservice.pickUpTime")}
                  </Text>
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
                    <Text style={styles.saveButtonText}>
                      {i18n.t("configservice.saveChanges")}
                    </Text>
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
                <Text style={styles.closeButtonText}>
                  {i18n.t("configservice.cancel")}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Tabs
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

  // Calendario
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

  // Placeholder
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

  // Navegación
  navigationButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
  },
  backButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
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

  // Modal
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
  formContainer: {
    marginTop: 8,
    paddingBottom: 8,
  },
  label: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "500",
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

  // Time Slot específico
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
