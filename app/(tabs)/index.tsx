// import { Image } from "expo-image";
// import { Platform, StyleSheet } from "react-native";

// import { HelloWave } from "@/components/hello-wave";
// import ParallaxScrollView from "@/components/parallax-scroll-view";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { Link } from "expo-router";
// import { Redirect } from "expo-router";

// export default function HomeScreen() {
//   // return (
//   //   <ParallaxScrollView
//   //     headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//   //     headerImage={
//   //       <Image
//   //         source={require("@/assets/images/partial-react-logo.png")}
//   //         style={styles.reactLogo}
//   //       />
//   //     }
//   //   >
//   //     <ThemedView style={styles.titleContainer}>
//   //       <ThemedText type="title">Welcome!</ThemedText>
//   //       <HelloWave />
//   //     </ThemedView>
//   //     <ThemedView style={styles.stepContainer}>
//   //       <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//   //       <ThemedText>
//   //         Edit{" "}
//   //         <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
//   //         to see changes. Press{" "}
//   //         <ThemedText type="defaultSemiBold">
//   //           {Platform.select({
//   //             ios: "cmd + d",
//   //             android: "cmd + m",
//   //             web: "F12",
//   //           })}
//   //         </ThemedText>{" "}
//   //         to open developer tools.
//   //       </ThemedText>
//   //     </ThemedView>
//   //     <ThemedView style={styles.stepContainer}>
//   //       <Link href="/Login/login">
//   //         <Link.Trigger>
//   //           <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//   //         </Link.Trigger>
//   //         <Link.Preview />
//   //         <Link.Menu>
//   //           <Link.MenuAction
//   //             title="Action"
//   //             icon="cube"
//   //             onPress={() => alert("Action pressed")}
//   //           />
//   //           <Link.MenuAction
//   //             title="Share"
//   //             icon="square.and.arrow.up"
//   //             onPress={() => alert("Share pressed")}
//   //           />
//   //           <Link.Menu title="More" icon="ellipsis">
//   //             <Link.MenuAction
//   //               title="Delete"
//   //               icon="trash"
//   //               destructive
//   //               onPress={() => alert("Delete pressed")}
//   //             />
//   //           </Link.Menu>
//   //         </Link.Menu>
//   //       </Link>

//   //       <ThemedText>
//   //         {`Tap the Explore tab to learn more about what's included in this starter app.`}
//   //       </ThemedText>
//   //     </ThemedView>
//   //     <ThemedView style={styles.stepContainer}>
//   //       <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//   //       <ThemedText>
//   //         {`When you're ready, run `}
//   //         <ThemedText type="defaultSemiBold">
//   //           npm run reset-project
//   //         </ThemedText>{" "}
//   //         to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
//   //         directory. This will move the current{" "}
//   //         <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
//   //         <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//   //       </ThemedText>
//   //     </ThemedView>
//   //   </ParallaxScrollView>
//   // );
//   return <Redirect href="/login" />;
// }

// // const styles = StyleSheet.create({
// //   titleContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 8,
// //   },
// //   stepContainer: {
// //     gap: 8,
// //     marginBottom: 8,
// //   },
// //   reactLogo: {
// //     height: 178,
// //     width: 290,
// //     bottom: 0,
// //     left: 0,
// //     position: "absolute",
// //   },
// // });
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

// Definir interfaces TypeScript
interface Service {
  id: number;
  title: string;
  description: string;
}

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
}

const PetCareHomeScreen = () => {
  const [address, setAddress] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showStartModal, setShowStartModal] = useState<boolean>(false);
  const [showEndModal, setShowEndModal] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<number>(0);

  const services: Service[] = [
    {
      id: 1,
      title: "Hospedaje con amor",
      description:
        "Un cuidador vendrá a tu casa para atender a tu mascota en su entorno familiar.",
    },
    {
      id: 2,
      title: "Cuidador a domicilio",
      description:
        "Un cuidador vendrá a tu casa para atender a tu mascota en su entorno familiar.",
    },
    {
      id: 3,
      title: "Cuidador de día",
      description:
        "Deja a tu mascota con un cuidador durante el día mientras estás trabajando.",
    },
    {
      id: 4,
      title: "Paseadores",
      description:
        "Paseadores profesionales que sacarán a tu mascota en los horarios que necesites.",
    },
    {
      id: 5,
      title: "Hogar de día",
      description:
        "Lugares especializados donde tu mascota puede pasar el día socializando.",
    },
  ];

  const formatDate = (date: Date): string => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const DatePickerModal: React.FC<DatePickerModalProps> = ({
    visible,
    onClose,
    onSelect,
  }) => {
    const [day, setDay] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");

    const handleConfirm = () => {
      const selectedDate = new Date(
        parseInt(year) || tempDate.getFullYear(),
        parseInt(month) - 1 || tempDate.getMonth(),
        parseInt(day) || tempDate.getDate()
      );
      onSelect(selectedDate);
      onClose();
    };

    return (
      <Modal visible={visible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Seleccionar fecha</Text>

          <View style={styles.dateInputRow}>
            <View style={styles.dateInputContainer}>
              <Text style={styles.dateInputLabel}>Día</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="DD"
                keyboardType="numeric"
                value={day}
                onChangeText={setDay}
                maxLength={2}
              />
            </View>

            <View style={styles.dateInputContainer}>
              <Text style={styles.dateInputLabel}>Mes</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="MM"
                keyboardType="numeric"
                value={month}
                onChangeText={setMonth}
                maxLength={2}
              />
            </View>

            <View style={styles.dateInputContainer}>
              <Text style={styles.dateInputLabel}>Año</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="AAAA"
                keyboardType="numeric"
                value={year}
                onChangeText={setYear}
                maxLength={4}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
            <Text style={styles.modalButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header con imagen */}
        <View style={styles.header}>
          <View style={styles.headerPlaceholder}>
            <Text style={styles.headerPlaceholderText}>Imagen de mascotas</Text>
          </View>
          <View style={styles.overlay} />
          <Text style={styles.title}>
            ¡La tranquilidad de saber que tu mascota está en buenas manos!
          </Text>
        </View>

        {/* Sección de servicios con Tabs */}
        <View style={styles.servicesSection}>
          {/* Tabs de servicios */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsContainer}
            contentContainerStyle={styles.tabsContent}
          >
            {services.map((service, index) => (
              <TouchableOpacity
                key={service.id}
                style={[styles.tab, activeTab === index && styles.activeTab]}
                onPress={() => setActiveTab(index)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === index && styles.activeTabText,
                  ]}
                  numberOfLines={2}
                >
                  {service.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Contenido de la pestaña activa */}
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>{services[activeTab].title}</Text>
            <Text style={styles.tabDescription}>
              {services[activeTab].description}
            </Text>
          </View>

          <Text style={styles.description}>
            El servicio de hospedaje con amor va dirigido a tu perro y gato, por
            favor ingresa la información de los campos requeridos para que tu
            búsqueda sea exitosa.
          </Text>
        </View>

        {/* Formulario de búsqueda */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>
            Encuentra cuidado para tu mascota
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Dirección:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu dirección"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.dateContainer}>
            <View style={styles.dateInputContainer}>
              <Text style={styles.label}>Fecha Inicio:</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartModal(true)}
              >
                <Text style={styles.dateText}>{formatDate(startDate)}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateInputContainer}>
              <Text style={styles.label}>Fecha Fin:</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowEndModal(true)}
              >
                <Text style={styles.dateText}>{formatDate(endDate)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>
              Buscar {services[activeTab].title.toLowerCase()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modales para selección de fecha */}
        <DatePickerModal
          visible={showStartModal}
          onClose={() => setShowStartModal(false)}
          onSelect={(date: Date) => setStartDate(date)}
        />

        <DatePickerModal
          visible={showEndModal}
          onClose={() => setShowEndModal(false)}
          onSelect={(date: Date) => setEndDate(date)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Los estilos se mantienen igual que en la implementación anterior
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e1e1",
    position: "relative",
  },
  headerPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db",
  },
  headerPlaceholderText: {
    color: "white",
    fontSize: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    paddingHorizontal: 20,
    position: "absolute",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  servicesSection: {
    padding: 20,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2c3e50",
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tabsContent: {
    paddingBottom: 5,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#f1f2f6",
    minWidth: width * 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#3498db",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7f8c8d",
    textAlign: "center",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  tabContent: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  tabDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: "#7f8c8d",
    lineHeight: 20,
    marginTop: 10,
  },
  formContainer: {
    padding: 20,
    backgroundColor: "white",
    marginTop: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#34495e",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  dateInputContainer: {
    width: "48%",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  dateText: {
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  dateInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  dateInputLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: "#34495e",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PetCareHomeScreen;
