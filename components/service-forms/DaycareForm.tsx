import { fontFamily } from "@/Config/typography";
import { DaycareFormData } from "@/Models/Model-ServiceForm/serviceForm";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface DaycareFormProps {
  onSubmit: (data: DaycareFormData) => void;
  initialData?: Partial<DaycareFormData>;
}

export default function DaycareForm({
  onSubmit,
  initialData,
}: DaycareFormProps) {
  const [duration, setDuracion] = useState(initialData?.duration || "");
  const [maximumCapacity, setCapacidadMaxima] = useState(
    initialData?.maximumCapacity || 0
  );
  const [acceptsAggressiveAnimals, setAceptaAnimalesAgresivos] = useState(
    initialData?.acceptsAggressiveAnimals || false
  );
  const [requiresVaccination, setRequiereVacunacion] = useState(
    initialData?.requiresVaccination || false
  );
  const [animalCertifications, setCertificacionesAnimal] = useState<string[]>(
    initialData?.animalCertifications || []
  );
  const [restArea, setZonaDescanso] = useState<string[]>(
    initialData?.restArea || []
  );
  const [communication, setComunicacion] = useState<string[]>(
    initialData?.communication || []
  );
  const [servicesIncluded, setServiciosIncluidos] = useState<string[]>(
    initialData?.servicesIncluded || []
  );

  const toggleCheckbox = (
    value: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleSubmit = () => {
    const formData: DaycareFormData = {
      duration,
      maximumCapacity,
      acceptsAggressiveAnimals,
      requiresVaccination,
      animalCertifications,
      restArea,
      communication,
      servicesIncluded,
    };

    // Validaciones
    if (!duration) {
      alert("Selecciona la duración del servicio");
      return;
    }
    if (!maximumCapacity) {
      alert("Ingresa la capacidad máxima");
      return;
    }
    if (!acceptsAggressiveAnimals) {
      alert("Indica si aceptas animales con temperamento agresivo");
      return;
    }
    if (!requiresVaccination) {
      alert("Indica si exiges cartilla de vacunación");
      return;
    }

    onSubmit(formData);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Alojamiento y guardería</Text>
      <Text style={styles.subtitle}>Duración del servicio que ofreces</Text>

      {/* Duración */}
      <View style={styles.radioGroup}>
        {[
          "1 día (24 horas)",
          "Varios días",
          "Crezco descuento por reservas largas",
        ].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioOption}
            onPress={() => setDuracion(option)}
          >
            <View
              style={[
                styles.radioCircle,
                duration === option && styles.radioCircleSelected,
              ]}
            >
              {duration === option && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.radioLabel}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Capacidad máxima */}
      <Text style={styles.label}>Capacidad máxima</Text>
      <Text style={styles.subtitle}>Número de mascotas al mismo tiempo</Text>
      <TextInput
        style={styles.input}
        value={maximumCapacity.toString()} // Convert number to string
        onChangeText={(text) => setCapacidadMaxima(Number(text) || 0)} // Convert string to number
        placeholder="Ej: 3"
        keyboardType="numeric"
        placeholderTextColor="#9CA3AF"
      />

      {/* Animales agresivos */}
      <Text style={styles.label}>
        ¿Aceptas animales con temperamento agresivo?
      </Text>
      <View style={styles.radioGroup}>
        {["Sí", "No"].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioOption}
            onPress={() => setAceptaAnimalesAgresivos(true)}
          >
            <View
              style={[
                styles.radioCircle,
                acceptsAggressiveAnimals === true && styles.radioCircleSelected,
              ]}
            >
              {acceptsAggressiveAnimals === true && (
                <View style={styles.radioDot} />
              )}
            </View>
            <Text style={styles.radioLabel}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Vacunación */}
      <Text style={styles.label}>¿Exiges cartilla de vacunación?</Text>
      <View style={styles.radioGroup}>
        {["Sí", "No"].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioOption}
            onPress={() => setRequiereVacunacion(true)}
          >
            <View
              style={[
                styles.radioCircle,
                requiresVaccination === true && styles.radioCircleSelected,
              ]}
            >
              {requiresVaccination === true && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.radioLabel}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Certificaciones */}
      <Text style={styles.label}>Certificaciones del animal</Text>
      <View style={styles.checkboxGroup}>
        {["Acepto perros castrados", "Acepto perros sin castrar", "Ambos"].map(
          (cert) => (
            <TouchableOpacity
              key={cert}
              style={styles.checkboxOption}
              onPress={() =>
                toggleCheckbox(
                  cert,
                  animalCertifications,
                  setCertificacionesAnimal
                )
              }
            >
              <View
                style={[
                  styles.checkbox,
                  animalCertifications.includes(cert) &&
                    styles.checkboxSelected,
                ]}
              >
                {animalCertifications.includes(cert) && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>{cert}</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Zona de descanso */}
      <Text style={styles.label}>Zona de descanso</Text>
      <View style={styles.checkboxGroup}>
        {["Ofrezco cachamas", "Pueden subir a los muebles"].map((zona) => (
          <TouchableOpacity
            key={zona}
            style={styles.checkboxOption}
            onPress={() => toggleCheckbox(zona, restArea, setZonaDescanso)}
          >
            <View
              style={[
                styles.checkbox,
                restArea.includes(zona) && styles.checkboxSelected,
              ]}
            >
              {restArea.includes(zona) && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>{zona}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tamaño y peso */}
      <Text style={styles.label}>Tamaño o peso de las perros que aceptas</Text>
      <View style={styles.radioGroup}>
        {["0-10 Lb", "16-40 Lb", "40-100 Lb", "Más 100 Lb"].map((size) => (
          <TouchableOpacity
            key={size}
            style={styles.radioOption}
            onPress={() => {
              // Este podría ser otro estado si lo necesitas
            }}
          >
            <View style={[styles.radioCircle]}>
              <View style={styles.radioDot} />
            </View>
            <Text style={styles.radioLabel}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Comunicación */}
      <Text style={styles.label}>Comunicación con el dueño</Text>
      <View style={styles.checkboxGroup}>
        {["Chat disponible 24/7", "Envío fotos o videos"].map((com) => (
          <TouchableOpacity
            key={com}
            style={styles.checkboxOption}
            onPress={() => toggleCheckbox(com, communication, setComunicacion)}
          >
            <View
              style={[
                styles.checkbox,
                communication.includes(com) && styles.checkboxSelected,
              ]}
            >
              {communication.includes(com) && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>{com}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Servicios incluidos */}
      <Text style={styles.label}>Servicios incluidos</Text>
      <View style={styles.checkboxGroup}>
        {[
          "Alimentación incluida",
          "El dueño provee comida",
          "1 paseo (30-30 min)",
          "2 paseos (mañana y tarde)",
          "3 horas de juego personalizado",
          "Zona de juegos disponible",
        ].map((servicio) => (
          <TouchableOpacity
            key={servicio}
            style={styles.checkboxOption}
            onPress={() =>
              toggleCheckbox(servicio, servicesIncluded, setServiciosIncluidos)
            }
          >
            <View
              style={[
                styles.checkbox,
                servicesIncluded.includes(servicio) && styles.checkboxSelected,
              ]}
            >
              {servicesIncluded.includes(servicio) && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>{servicio}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
    fontFamily: fontFamily.bold,
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 16,
    fontFamily: fontFamily.medium,
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
  submitButton: {
    backgroundColor: "#00BFA6",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
});
