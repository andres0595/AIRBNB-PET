import AuthLayout from "@/components/AuthLayout";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgProps } from "react-native-svg";
import alojamientoMascotas from "../../assets/Icons/svg-servicios/alojamientoMascotas.svg";
import baño from "../../assets/Icons/svg-servicios/baño.svg";
import cuidadoCasa from "../../assets/Icons/svg-servicios/cuidadoCasa.svg";
import guarderiaDia from "../../assets/Icons/svg-servicios/guarderiaDia.svg";
import paseo from "../../assets/Icons/svg-servicios/paseo.svg";
import { ServicesStyles } from "../Styles/components/Services/ServiceStyles";

interface Service {
  id: string;
  icon: React.FC<SvgProps>;
  title: string;
  description: string;
  price: string;
}

const services: Service[] = [
  {
    id: "1",
    icon: alojamientoMascotas,
    title: "Alojamiento de mascotas",
    description: "en casa del cuidador",
    price: "Promedio $3000 / noche",
  },
  {
    id: "2",
    icon: guarderiaDia,
    title: "Guardería de día",
    description: "en casa del cuidador",
    price: "Promedio $3000 / noche",
  },
  {
    id: "3",
    icon: cuidadoCasa,
    title: "Cuidado en casa",
    description: "Atiende a la mascota en la comodidad de su hogar",
    price: "Promedio $3000 / noche",
  },
  {
    id: "4",
    icon: paseo,
    title: "Paseos en el barrio",
    description: "Paseos seguros y divertidos",
    price: "Promedio $3000 / noche",
  },
  {
    id: "5",
    icon: baño,
    title: "Baño a domicilio",
    description: "Servicio de baño",
    price: "Promedio $3000 / noche",
  },
];

const ServiceSelectionScreen = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [modalVisiblePerfil, setModalVisiblePerfil] = useState(false);
  const [approvalModalVisible, setApprovalModalVisible] = useState(false);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinue = () => {
    if (selectedServices.length === 0) {
      Alert.alert(
        "Atención",
        "Por favor selecciona al menos un servicio para continuar"
      );
      return;
    }

    console.log("Servicios seleccionados:", selectedServices);
    setModalVisiblePerfil(true);
    // router.push("/(Users)/NextScreen");
  };

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const handleInfoPress = () => {
    setModalVisible(true);
  };

  const handleGoBack = () => {
    router.push("/(Users)/Home_Register");
  };

  const handleProfileContinue = () => {
    setModalVisiblePerfil(false);
    setApprovalModalVisible(true);
    console.log("Servicios seleccionados:", selectedServices);
    // router.push("/(Users)/NextScreen");
  };

  const handleApprovalContinue = () => {
    setApprovalModalVisible(false);
    console.log("Servicios seleccionados:", selectedServices);
    // Aquí rediriges a la siguiente pantalla del registro
    router.push("/(Steps)/ApprovalStepsScreen");
  };

  const handleApprovalCancel = () => {
    setApprovalModalVisible(false);
    // Opcionalmente puedes regresar o cerrar todo
  };

  return (
    <AuthLayout contentStyle={ServicesStyles.container}>
      <ScrollView
        style={ServicesStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ServicesStyles.scrollContent}
      >
        {/* Botón de regresar */}
        <TouchableOpacity
          style={ServicesStyles.backButton}
          onPress={handleGoBack}
        >
          <Ionicons name="chevron-back" size={28} color="#666" />
        </TouchableOpacity>

        {/* Header */}
        <View style={ServicesStyles.header}>
          <Text style={ServicesStyles.title}>Selección de servicios</Text>
          <View style={ServicesStyles.subtitleContainer}>
            <Text style={ServicesStyles.subtitle}>
              Seleccione alguno de los servicio que le interese
            </Text>
            <View style={ServicesStyles.tooltipWrapper}>
              <TouchableOpacity
                style={ServicesStyles.infoButton}
                onPress={toggleTooltip}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color="#FF6B6B"
                />
              </TouchableOpacity>

              {/* Tooltip */}
              {tooltipVisible && (
                <>
                  <TouchableOpacity
                    style={ServicesStyles.tooltipOverlay}
                    activeOpacity={1}
                    onPress={() => setTooltipVisible(false)}
                  />
                  <View style={ServicesStyles.tooltipContainer}>
                    <View style={ServicesStyles.tooltipArrow} />
                    <Text style={ServicesStyles.tooltipText}>
                      Siempre puede agregar más en otra ocasión. Para empezar a
                      usar este servicio, solo verá uno de ellos durante el
                      auto-registro. Después de enviar su perfil para revisión,
                      puede editar los demás con los que quiera trabajar más.
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Grid de servicios */}
        <View style={ServicesStyles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                ServicesStyles.serviceCard,
                selectedServices.includes(service.id) &&
                  ServicesStyles.serviceCardSelected,
              ]}
              onPress={() => toggleService(service.id)}
              activeOpacity={0.7}
            >
              {/* Checkbox */}
              <View
                style={[
                  ServicesStyles.checkbox,
                  selectedServices.includes(service.id) &&
                    ServicesStyles.checkboxSelected,
                ]}
              >
                {selectedServices.includes(service.id) && (
                  <Ionicons name="checkmark" size={14} color="#00D9C5" />
                )}
              </View>

              {/* Icono */}
              <View style={ServicesStyles.iconContainer}>
                <service.icon width={34} height={34} />
              </View>

              {/* Textos */}
              <Text style={ServicesStyles.serviceTitle}>{service.title}</Text>
              <Text style={ServicesStyles.serviceDescription}>
                {service.description}
              </Text>
              <Text style={ServicesStyles.servicePrice}>{service.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Link de ayuda */}
        <TouchableOpacity
          style={ServicesStyles.linkButton}
          onPress={handleInfoPress}
        >
          <Text style={ServicesStyles.linkText}>
            ¿Qué servicio debo elegir?
          </Text>
        </TouchableOpacity>
        {/* Botón fijo inferior */}
        <View style={ServicesStyles.buttonContainer}>
          <TouchableOpacity
            style={[
              ServicesStyles.continueButton,
              selectedServices.length === 0 &&
                ServicesStyles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            activeOpacity={selectedServices.length === 0 ? 1 : 0.8}
            disabled={selectedServices.length === 0}
          >
            <Text
              style={[
                ServicesStyles.continueButtonText,
                selectedServices.length === 0 &&
                  ServicesStyles.continueButtonTextDisabled,
              ]}
            >
              Guardar y continuar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Modal de información */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={ServicesStyles.modalOverlay}>
          <View style={ServicesStyles.modalContent}>
            {/* Botón cerrar */}
            <TouchableOpacity
              style={ServicesStyles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            {/* Icono de información */}
            <View style={ServicesStyles.modalIconContainer}>
              <Ionicons
                name="information-circle-outline"
                size={50}
                color="#00D9C5"
              />
            </View>

            {/* Título */}
            <Text style={ServicesStyles.modalTitle}>
              ¿Qué servicios debo elegir?
            </Text>

            {/* Contenido scrollable */}
            <ScrollView
              style={ServicesStyles.modalScroll}
              showsVerticalScrollIndicator={false}
            >
              {/* Pregunta 1 */}
              <View style={ServicesStyles.questionBlock}>
                <Text style={ServicesStyles.questionTitle}>
                  ¿Puedes alojar mascotas en tu casa?
                </Text>
                <Text style={ServicesStyles.questionAnswer}>
                  Recomendamos elegir hospedaje y guardería canina para tener tu
                  mejor oportunidad de obtener las mejores ganancias.
                </Text>
              </View>

              {/* Pregunta 2 */}
              <View style={ServicesStyles.questionBlock}>
                <Text style={ServicesStyles.questionTitle}>
                  ¿No puedes recibir mascotas en tu casa?
                </Text>
                <Text style={ServicesStyles.questionAnswer}>
                  Le sugerimos ofrecer una combinación de cuidados de casa,
                  visitas a domicilio y paseo de perros. Los clientes buscan
                  personas que puedan ayudarles a cuidar su querida mascota.
                </Text>
              </View>

              {/* Pregunta 3 */}
              <View style={ServicesStyles.questionBlock}>
                <Text style={ServicesStyles.questionTitle}>
                  ¿Sueles tener ocasionalmente días libres?
                </Text>
                <Text style={ServicesStyles.questionAnswer}>
                  Sería ideal para pasear perros y hacer visitas a domicilio.
                  Los dueños de mascotas suelen necesitar ayuda temporal para
                  sus fieles amigos. Trabaja tanto o tan poco como quieras.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal de creación de perfil */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisiblePerfil}
        onRequestClose={() => setModalVisiblePerfil(false)}
      >
        <View style={ServicesStyles.modalOverlay}>
          <View style={ServicesStyles.profileModalContent}>
            {/* Botón cerrar */}
            <TouchableOpacity
              style={ServicesStyles.closeButton}
              onPress={() => setModalVisiblePerfil(false)}
            >
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>

            {/* Título */}
            <Text style={ServicesStyles.profileModalTitle}>
              ¡Vamos a crear tu perfil!
            </Text>

            {/* Descripción principal */}
            <Text style={ServicesStyles.profileModalDescription}>
              Ten en cuenta que al crear tu perfil vamos a requerir cierta
              información que nos ayudará a evaluar tu identidad para que
              nuestro sistema sea seguro y efectivo.
            </Text>

            {/* Subtítulo */}
            <Text style={ServicesStyles.profileModalSubtitle}>
              Tenga a mano la siguiente información para crear un excelente
              perfil
            </Text>

            {/* Lista de requisitos */}
            <View style={ServicesStyles.requirementsList}>
              <View style={ServicesStyles.requirementItem}>
                <View style={ServicesStyles.bulletPoint} />
                <Text style={ServicesStyles.requirementText}>
                  Fotos para tu perfil con mascotas, áreas circundantes y tu
                  hogar.
                </Text>
              </View>

              <View style={ServicesStyles.requirementItem}>
                <View style={ServicesStyles.bulletPoint} />
                <Text style={ServicesStyles.requirementText}>
                  Su pasaporte o identificación con fotografía emitida por el
                  gobierno para verificar su identidad.
                </Text>
              </View>

              <View style={ServicesStyles.requirementItem}>
                <View style={ServicesStyles.bulletPoint} />
                <Text style={ServicesStyles.requirementText}>
                  Datos de la cuenta bancaria que se pagarán automáticamente
                  después de cada servicio
                </Text>
              </View>
            </View>

            {/* Botón de continuar */}
            <TouchableOpacity
              style={ServicesStyles.profileModalButton}
              onPress={handleProfileContinue}
              activeOpacity={0.8}
            >
              <Text style={ServicesStyles.profileModalButtonText}>
                Guardar y continuar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de aprobación */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={approvalModalVisible}
        onRequestClose={() => setApprovalModalVisible(false)}
      >
        <View style={ServicesStyles.modalOverlay}>
          <View style={ServicesStyles.approvalModalContent}>
            {/* Título */}
            <Text style={ServicesStyles.approvalModalTitle}>
              ¿Cómo funciona la aprobación?
            </Text>

            {/* Subtítulo */}
            <Text style={ServicesStyles.approvalModalSubtitle}>
              Pasos para obtener la aprobación y ser parte de nuestro equipo
              PuppyPo
            </Text>

            {/* Contenido scrollable */}
            <ScrollView
              style={ServicesStyles.approvalScroll}
              showsVerticalScrollIndicator={false}
            >
              <Text style={ServicesStyles.approvalText}>
                PuppyPo selecciona un solo servicio para que lo completes
                durante el registro. Una vez aprobado, puedes desactivar
                cualquier servicio que ya no quieras ofrecer o añadir servicios
                nuevos en cualquier momento.
              </Text>

              <Text style={ServicesStyles.approvalText}>
                Una vez que haya completado los pasos de registro necesarios, su
                perfil se enviará automáticamente y se revisará para garantizar
                su precisión y calidad. Recibirá un correo electrónico nuestro
                en un plazo de 24 a 48 horas informándole de su aprobación o de
                que debe completar pasos adicionales y volver a enviarlo para
                obtenerla.
              </Text>

              <Text style={ServicesStyles.approvalText}>
                Para una aprobación más rápida, asegúrese de cargar fotos de
                alta calidad, escribir una descripción descriptiva de usted y
                sus servicios, ¡y asegúrese de revisar todo!
              </Text>
            </ScrollView>

            {/* Botones */}
            <View style={ServicesStyles.approvalButtonsContainer}>
              <TouchableOpacity
                style={ServicesStyles.approvalContinueButton}
                onPress={handleApprovalContinue}
                activeOpacity={0.8}
              >
                <Text style={ServicesStyles.approvalContinueButtonText}>
                  Continuar con los pasos
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color="#FFF"
                  style={ServicesStyles.arrowIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={ServicesStyles.approvalCancelButton}
                onPress={handleApprovalCancel}
                activeOpacity={0.8}
              >
                <Text style={ServicesStyles.approvalCancelButtonText}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </AuthLayout>
  );
};

export default ServiceSelectionScreen;
