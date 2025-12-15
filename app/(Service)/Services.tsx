import AuthLayout from "@/components/AuthLayout";
import { i18n } from "@/i18n/translations";
import { ServicesStyles } from "@/Styles/components/Services/ServiceStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import alojamientoMascotas from "../../assets/Icons/svg-servicios/Alojamiento.png";
import Banio from "../../assets/Icons/svg-servicios/Banio.png";
import Cuidado from "../../assets/Icons/svg-servicios/Cuidado.png";
import Guarderia from "../../assets/Icons/svg-servicios/Guarderia.png";
import Paseos from "../../assets/Icons/svg-servicios/Paseos.png";

interface Service {
  id: string;
  icon: any;
  title: string;
  description: string;
  price: string;
  isPng: boolean;
}

const services: Service[] = [
  {
    id: "1",
    icon: alojamientoMascotas,
    title: i18n.t("servicios.alojamiento.titulo"),
    description: i18n.t("servicios.alojamiento.descripcion"),
    price: i18n.t("servicios.alojamiento.precio"),
    isPng: true,
  },
  {
    id: "2",
    icon: Guarderia,
    title: i18n.t("servicios.guarderia.titulo"),
    description: i18n.t("servicios.guarderia.descripcion"),
    price: i18n.t("servicios.guarderia.precio"),
    isPng: true,
  },
  {
    id: "3",
    icon: Cuidado,
    title: i18n.t("servicios.cuidado.titulo"),
    description: i18n.t("servicios.cuidado.descripcion"),
    price: i18n.t("servicios.cuidado.precio"),
    isPng: true,
  },
  {
    id: "4",
    icon: Paseos,
    title: i18n.t("servicios.paseos.titulo"),
    description: i18n.t("servicios.paseos.descripcion"),
    price: i18n.t("servicios.paseos.precio"),
    isPng: true,
  },
  {
    id: "5",
    icon: Banio,
    title: i18n.t("servicios.banio.titulo"),
    description: i18n.t("servicios.banio.descripcion"),
    price: i18n.t("servicios.banio.precio"),
    isPng: true,
  },
];

const ServiceSelectionScreen = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [modalVisiblePerfil, setModalVisiblePerfil] = useState(false);
  const [approvalModalVisible, setApprovalModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinue = () => {
    console.log("Servicios seleccionados:", selectedServices);
    setModalVisiblePerfil(true);
  };

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const handleInfoPress = () => {
    setModalVisible(true);
  };

  const handleGoBack = () => {
    router.push("/(tabs)/HomeScreen");
  };

  const handleProfileContinue = () => {
    setModalVisiblePerfil(false);
    setApprovalModalVisible(true);
    console.log("Servicios seleccionados:", selectedServices);
  };

  const handleApprovalContinue = () => {
    setApprovalModalVisible(false);
    router.push("/(Steps)/ApprovalStepsScreen");
  };

  return (
    <AuthLayout contentStyle={ServicesStyles.container}>
      <ScrollView
        style={ServicesStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ServicesStyles.scrollContent}
      >
        <TouchableOpacity
          style={ServicesStyles.backButton}
          onPress={handleGoBack}
        >
          <Ionicons name="chevron-back" size={28} color="#666" />
        </TouchableOpacity>

        <View style={ServicesStyles.header}>
          <Text style={ServicesStyles.title}>
            {i18n.t("servicios.header.titulo")}
          </Text>

          <View style={ServicesStyles.subtitleContainer}>
            <Text style={ServicesStyles.subtitle}>
              {i18n.t("servicios.header.subtitulo")}
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
                      {i18n.t("servicios.tooltip.texto")}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={ServicesStyles.servicesGrid}>
          {services.map((service, index) => {
            const isLastAndOdd =
              index === services.length - 1 && services.length % 2 !== 0;

            return (
              <TouchableOpacity
                key={service.id}
                style={[
                  ServicesStyles.serviceCard,
                  isLastAndOdd && ServicesStyles.serviceCardFull,
                ]}
                onPress={() => toggleService(service.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    ServicesStyles.iconContainer,
                    isLastAndOdd && ServicesStyles.serviceCardFullIcon,
                  ]}
                >
                  {service.isPng ? (
                    <Image
                      source={service.icon}
                      style={{ width: 80, height: 80 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <service.icon width={60} height={60} />
                  )}
                </View>

                <View
                  style={isLastAndOdd && ServicesStyles.serviceCardFullContent}
                >
                  <Text
                    style={[
                      ServicesStyles.serviceTitle,
                      isLastAndOdd && ServicesStyles.serviceCardFullTitle,
                    ]}
                  >
                    {service.title}
                  </Text>

                  <Text
                    style={[
                      ServicesStyles.serviceDescription,
                      isLastAndOdd && ServicesStyles.serviceCardFullDescription,
                    ]}
                  >
                    {service.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={ServicesStyles.linkButton}
          onPress={handleInfoPress}
        >
          <Text style={ServicesStyles.linkText}>
            {i18n.t("servicios.link.que_servicio")}
          </Text>
        </TouchableOpacity>

        <View style={ServicesStyles.buttonContainer}>
          <TouchableOpacity
            style={[ServicesStyles.continueButton]}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={[ServicesStyles.continueButtonText]}>
              {i18n.t("servicios.botones.guardar_continuar")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ---------------- MODAL 1 ---------------- */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={ServicesStyles.modalOverlay}>
          <View style={ServicesStyles.modalContent}>
            <TouchableOpacity
              style={ServicesStyles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            <View style={ServicesStyles.modalIconContainer}>
              <Ionicons
                name="information-circle-outline"
                size={50}
                color="#00D9C5"
              />
            </View>

            <Text style={ServicesStyles.modalTitle}>
              {i18n.t("servicios.modal1.titulo")}
            </Text>

            <ScrollView
              style={ServicesStyles.modalScroll}
              showsVerticalScrollIndicator={false}
            >
              <View style={ServicesStyles.questionBlock}>
                <Text style={ServicesStyles.questionTitle}>
                  {i18n.t("servicios.modal1.p1.titulo")}
                </Text>
                <Text style={ServicesStyles.questionAnswer}>
                  {i18n.t("servicios.modal1.p1.descripcion")}
                </Text>
              </View>

              <View style={ServicesStyles.questionBlock}>
                <Text style={ServicesStyles.questionTitle}>
                  {i18n.t("servicios.modal1.p2.titulo")}
                </Text>
                <Text style={ServicesStyles.questionAnswer}>
                  {i18n.t("servicios.modal1.p2.descripcion")}
                </Text>
              </View>

              <View style={ServicesStyles.questionBlock}>
                <Text style={ServicesStyles.questionTitle}>
                  {i18n.t("servicios.modal1.p3.titulo")}
                </Text>
                <Text style={ServicesStyles.questionAnswer}>
                  {i18n.t("servicios.modal1.p3.descripcion")}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ---------------- MODAL 2 ---------------- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisiblePerfil}
      >
        <View style={ServicesStyles.modalOverlay}>
          <View style={ServicesStyles.profileModalContent}>
            <TouchableOpacity
              style={ServicesStyles.closeButton}
              onPress={() => setModalVisiblePerfil(false)}
            >
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>

            <Text style={ServicesStyles.profileModalTitle}>
              {i18n.t("servicios.modal2.titulo")}
            </Text>

            <Text style={ServicesStyles.profileModalDescription}>
              {i18n.t("servicios.modal2.descripcion")}
            </Text>

            <Text style={ServicesStyles.profileModalSubtitle}>
              {i18n.t("servicios.modal2.subtitulo")}
            </Text>

            <View style={ServicesStyles.requirementsList}>
              <View style={ServicesStyles.requirementItem}>
                <View style={ServicesStyles.bulletPoint} />
                <Text style={ServicesStyles.requirementText}>
                  {i18n.t("servicios.modal2.req1")}
                </Text>
              </View>

              <View style={ServicesStyles.requirementItem}>
                <View style={ServicesStyles.bulletPoint} />
                <Text style={ServicesStyles.requirementText}>
                  {i18n.t("servicios.modal2.req2")}
                </Text>
              </View>

              <View style={ServicesStyles.requirementItem}>
                <View style={ServicesStyles.bulletPoint} />
                <Text style={ServicesStyles.requirementText}>
                  {i18n.t("servicios.modal2.req3")}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={ServicesStyles.profileModalButton}
              onPress={handleProfileContinue}
              activeOpacity={0.8}
            >
              <Text style={ServicesStyles.profileModalButtonText}>
                {i18n.t("servicios.botones.guardar_continuar")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ---------------- MODAL 3 ---------------- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={approvalModalVisible}
      >
        <View style={ServicesStyles.modalOverlay}>
          <View style={ServicesStyles.approvalModalContent}>
            <Text style={ServicesStyles.approvalModalTitle}>
              {i18n.t("servicios.modal3.titulo")}
            </Text>

            <Text style={ServicesStyles.approvalModalSubtitle}>
              {i18n.t("servicios.modal3.subtitulo")}
            </Text>

            <ScrollView
              style={ServicesStyles.approvalScroll}
              showsVerticalScrollIndicator={false}
            >
              <Text style={ServicesStyles.approvalText}>
                {i18n.t("servicios.modal3.texto1")}
              </Text>

              <Text style={ServicesStyles.approvalText}>
                {i18n.t("servicios.modal3.texto2")}
              </Text>

              <Text style={ServicesStyles.approvalText}>
                {i18n.t("servicios.modal3.texto3")}
              </Text>
            </ScrollView>

            <View style={ServicesStyles.approvalButtonsContainer}>
              <TouchableOpacity
                style={ServicesStyles.approvalContinueButton}
                onPress={handleApprovalContinue}
                activeOpacity={0.8}
              >
                <Text style={ServicesStyles.approvalContinueButtonText}>
                  {i18n.t("servicios.modal3.boton_continuar")}
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
                onPress={() => setApprovalModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={ServicesStyles.approvalCancelButtonText}>
                  {i18n.t("servicios.modal3.boton_cancelar")}
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
