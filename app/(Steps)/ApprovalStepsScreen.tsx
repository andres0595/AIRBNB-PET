import AuthLayout from "@/components/AuthLayout";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../(Store)/store";
import { ActivationForm } from "./ActivationForm";
import { LegalConsentsForm } from "./LegalConsentsForm";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { SitterProfileForm } from "./SitterProfileForm";
import { ValidationsForm } from "./ValidationsForm";

const ApprovalStepsScreen = () => {
  // Obtener los porcentajes directamente de Redux
  const {
    personalInfoPercentage,
    sitterProfilePercentage,
    validationsPercentage,
    legalConsentsPercentage,
    activationPercentage,
  } = useSelector((state: RootState) => state.validations);

  const documents = [
    "Criminal record check / police check / triton documentos que puedes usar.",
    "Identificación gubernamental aceptable",
    "Licencia de conducir",
    "Licencia de conducir extranjera",
    "Pasaporte",
    "Tarjeta de estatus indio",
    "Tarjeta de ciudadanía",
    "Tarjeta de residente permanente",
    "Licencia de armas de fuego",
    "Tarjeta de identidad de estudiante de una institución extranjera",
    "Junta de Mayoría de Edad/Licores",
    "Instituto Nacional Canadiense para Ciegos",
    "Tarjeta de identificación",
    "Tarjeta de identificación militar",
    "Identificación secundaria",
    "Certificado de nacimiento",
    "Aviso de evaluación",
    "Factura telefónica",
    "Factura de electricidad",
    "Factura de cable",
    "Alquiler",
    "Tarjeta de membresía del gimnasio",
    "Tarjeta de la biblioteca",
    "Tarjeta de empleado",
  ];

  const allCompleted =
    personalInfoPercentage === 100 &&
    sitterProfilePercentage === 100 &&
    validationsPercentage === 100 &&
    legalConsentsPercentage === 100 &&
    activationPercentage === 100;

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  // Estados para los porcentajes de cada formulario
  const [formProgress, setFormProgress] = useState({
    personalInfo: 0,
    sitterProfile: 0,
    validations: 0,
    legalConsents: 0,
    activation: 0,
  });

  // Estados para los formularios
  const [testimonials, setTestimonials] = useState([
    { name: "", phone: "", relation: "", email: "" },
    { name: "", phone: "", relation: "", email: "" },
  ]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finalizar proceso
      console.log("Proceso completado");
      // router.push("/(Users)/Dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handlerData = () => {
    setModalVisible(true);
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const toggleAccordion = (id: string) => {
    setExpandedAccordion(expandedAccordion === id ? null : id);
  };

  // Funciones para actualizar el progreso de cada formulario
  const updatePersonalInfoProgress = (percentage: number) => {
    setFormProgress((prev) => ({ ...prev, personalInfo: percentage }));
  };

  const updateSitterProfileProgress = (percentage: number) => {
    setFormProgress((prev) => ({ ...prev, sitterProfile: percentage }));
  };

  const updateValidationsProgress = (percentage: number) => {
    setFormProgress((prev) => ({ ...prev, validations: percentage }));
  };

  const updateLegalConsentsProgress = (percentage: number) => {
    setFormProgress((prev) => ({ ...prev, legalConsents: percentage }));
  };

  const updateActivationProgress = (percentage: number) => {
    setFormProgress((prev) => ({ ...prev, activation: percentage }));
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        {[1, 2, 3, 4].map((step) => (
          <View
            key={step}
            style={[
              styles.progressBar,
              step <= currentStep && styles.progressBarActive,
            ]}
          />
        ))}
      </View>
    );
  };

  const renderStep1 = () => (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Información del servicio</Text>

      <Text style={styles.infoText}>
        Evalua tu experiencia y habilidades si eres nuevo, empieza cobrando poco
        para ganar confianza y reseñas, si tienes años de experiencia
        certificaciones o referencias comprobadas puedes cobrar un poco más.
      </Text>

      <View style={styles.containerText}>
        <Text style={styles.infoText}>
          <Text style={styles.bullet}>● </Text>
          Adapta el precio al tipo de servicio rango de paseo 30 minutos (walk
          15-25 $)
        </Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.infoText}>
          <Text style={styles.bullet}>● </Text>
          Hospedaje depende de días festivos y verano, si ofreces servicios
          extra como entrenamiento básico administración de medicamentos cuidado
          de animales con condiciones especiales (súmale un plus al precio 45-75
          $)
        </Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.infoText}>
          <Text style={styles.bullet}>● </Text>
          Day care ideal para dueños que trabajan en el día y sus mascotas
          necesitan compañía en la casa del cuidador (32-75 $)
        </Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.infoText}>
          <Text style={styles.bullet}>● </Text>
          Baño a domicilio puedes llamar a sitios donde se brindan estos
          servicios y agregar un plus por el domicilio, esto dependerá de ti.
        </Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.infoText}>
          <Text style={styles.bullet}>● </Text>
          Sitter en la casa del dueño podrás ganar dinero mientras cuidas una
          mascota en la casa del mismo (35-90 $)
        </Text>
      </View>

      {/* Botón solo para Step 1 */}
      <TouchableOpacity
        style={styles.step1ContinueButton}
        onPress={handleNext}
        activeOpacity={0.8}
      >
        <Text style={styles.step1ContinueButtonText}>
          Continuar con los pasos
        </Text>
        <Ionicons name="arrow-forward" size={20} color="#FFF" />
      </TouchableOpacity>
    </ScrollView>
  );

  const renderStep2 = () => (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Generar confianza</Text>
      <Text style={styles.stepSubtitle}>(Perfil)</Text>

      <View style={styles.accordionContainer}>
        <AccordionItem
          id="personal-info"
          title="Información personal"
          percentage={`${personalInfoPercentage}%`}
          isExpanded={expandedAccordion === "personal-info"}
          onToggle={() => toggleAccordion("personal-info")}
        >
          <PersonalInfoForm />
        </AccordionItem>

        <AccordionItem
          id="sitter-profile"
          title="Perfil como Sitter"
          percentage={`${sitterProfilePercentage}%`}
          isExpanded={expandedAccordion === "sitter-profile"}
          onToggle={() => toggleAccordion("sitter-profile")}
        >
          <SitterProfileForm />
        </AccordionItem>

        <AccordionItem
          id="validations"
          title="Validaciones"
          percentage={`${validationsPercentage}%`}
          isExpanded={expandedAccordion === "validations"}
          onToggle={() => toggleAccordion("validations")}
        >
          <ValidationsForm />
        </AccordionItem>

        <AccordionItem
          id="legal-consents"
          title="Consentimientos legales"
          percentage={`${legalConsentsPercentage}%`}
          isExpanded={expandedAccordion === "legal-consents"}
          onToggle={() => toggleAccordion("legal-consents")}
        >
          <LegalConsentsForm />
        </AccordionItem>

        <AccordionItem
          id="activation"
          title="Activación"
          percentage={`${activationPercentage}%`}
          isExpanded={expandedAccordion === "activation"}
          onToggle={() => toggleAccordion("activation")}
        >
          <ActivationForm onProgressChange={updateActivationProgress} />
        </AccordionItem>
      </View>
    </ScrollView>
  );

  const renderStep3 = () => (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Solicitar testimonios</Text>

      <Text style={styles.infoText}>
        Tu reputación habla por ti. Necesitamos 2 testimonios de personas que
        confirmen tu buen desempeño.
      </Text>

      {/* Testimonio 1 */}
      <View style={styles.testimonialCard}>
        <Text style={styles.testimonialNumber}>1. Testimonio</Text>

        <Text style={styles.label}>Nombre de la persona *</Text>
        <TextInput
          style={styles.input}
          value={testimonials[0].name}
          onChangeText={(value) => updateTestimonial(0, "name", value)}
          placeholder="Ingrese el nombre"
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Celular *</Text>
            <TextInput
              style={styles.input}
              value={testimonials[0].phone}
              onChangeText={(value) => updateTestimonial(0, "phone", value)}
              placeholder="Teléfono"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.halfInput}>
            <Text style={styles.label}>Relación *</Text>
            <TextInput
              style={styles.input}
              value={testimonials[0].relation}
              onChangeText={(value) => updateTestimonial(0, "relation", value)}
              placeholder="Relación"
            />
          </View>
        </View>

        <Text style={styles.label}>Correo electrónico *</Text>
        <TextInput
          style={styles.input}
          value={testimonials[0].email}
          onChangeText={(value) => updateTestimonial(0, "email", value)}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
        />
      </View>

      {/* Testimonio 2 */}
      <View style={styles.testimonialCard}>
        <Text style={styles.testimonialNumber}>2. Testimonio</Text>

        <Text style={styles.label}>Nombre de la persona *</Text>
        <TextInput
          style={styles.input}
          value={testimonials[1].name}
          onChangeText={(value) => updateTestimonial(1, "name", value)}
          placeholder="Ingrese el nombre"
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Celular *</Text>
            <TextInput
              style={styles.input}
              value={testimonials[1].phone}
              onChangeText={(value) => updateTestimonial(1, "phone", value)}
              placeholder="Teléfono"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.halfInput}>
            <Text style={styles.label}>Relación *</Text>
            <TextInput
              style={styles.input}
              value={testimonials[1].relation}
              onChangeText={(value) => updateTestimonial(1, "relation", value)}
              placeholder="Relación"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderStep4 = () => (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Cuestionario de seguridad</Text>

      <Text style={styles.infoText}>
        Para formar parte de nuestra comunidad de trabajo en PuppyPo.,
        necesitamos confirmar tu información a través de un Background Check
        (verificación de antecedentes).
      </Text>

      <Text style={styles.infoText}>
        Este proceso nos ayuda a garantizar un espacio confiable y seguro para
        todos. Al continuar, serás redirigido al formulario oficial donde podrás
        realizar tu verificación.
      </Text>

      <Text style={styles.infoText}>
        Ten en cuenta que este trámite tiene un costo que deberás asumir
        directamente con la entidad que lo gestiona.
      </Text>

      <Text style={styles.infoText}>
        ¡Gracias por tu comprensión y por dar este paso para unirte a nosotros!
      </Text>

      <TouchableOpacity style={styles.linkButton} onPress={handlerData}>
        <Text style={styles.linkText}>
          ¿Qué documentos puedes utilizar para el background check?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backgroundCheckButton}>
        <Text style={styles.backgroundCheckButtonText}>Background Check</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Botón cerrar en la esquina */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>

            {/* Ícono de alerta */}
            <View style={styles.iconContainer}>
              <View style={styles.alertIcon}>
                <Text style={styles.alertIconText}>!</Text>
              </View>
            </View>

            {/* Título centrado */}
            <Text style={styles.modalTitle}>
              ¿Qué documentos puedes utilizar para el background check?
            </Text>

            {/* Lista scrolleable */}
            <ScrollView
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {documents.map((doc, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.bulletContainer}>
                    <View style={styles.bullet2} />
                  </View>
                  <Text style={styles.listText}>{doc}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <AuthLayout contentStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pasos para aprobación</Text>
        {renderProgressBar()}
        <Text style={styles.stepCounter}>
          {currentStep} de {totalSteps}
        </Text>
      </View>

      {renderCurrentStep()}

      {/* Botones solo visibles desde el Step 2 */}
      {currentStep > 1 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>Atrás</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!allCompleted}
            style={[
              styles.continueButton2,
              !allCompleted && styles.disabledButton,
            ]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.continueButtonText2,
                !allCompleted && styles.disabledButtonText,
              ]}
            >
              {currentStep === totalSteps ? "Entregar" : "Continuar"}
            </Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color={allCompleted ? "#000" : "#B0BEC5"}
            />
          </TouchableOpacity>
        </View>
      )}
    </AuthLayout>
  );
};

// Componente auxiliar para acordeones del paso 2
interface AccordionItemProps {
  id: string;
  title: string;
  percentage: string;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  percentage,
  isExpanded,
  onToggle,
  children,
}) => {
  return (
    <View style={styles.accordionWrapper}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <View style={styles.accordionLeft}>
          <Text style={styles.accordionTitle}>{title}</Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#333"
          />
        </View>
        <View style={styles.percentageCircle}>
          <Text style={styles.percentageText}>{percentage}</Text>
        </View>
      </TouchableOpacity>

      {isExpanded && <View style={styles.accordionContent}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  containerText: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  bullet: {
    color: "#00D9C5",
  },
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 24,
    marginTop: 10,
  },
  headerText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: "#f6c3cc",
  },
  stepCounter: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  stepContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 10,
    textAlign: "center",
  },
  stepSubtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
    marginBottom: 25,
  },
  infoText2: {
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
  },
  step1ContinueButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 28,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 30,
    marginBottom: 20,
  },
  step1ContinueButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  accordionContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  accordionWrapper: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  accordionHeader: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accordionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  accordionTitle: {
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "500",
    flex: 1,
  },
  percentageCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FF3B30",
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  placeholderText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingVertical: 20,
    fontStyle: "italic",
  },
  testimonialCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  testimonialNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: "#333",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  linkButton: {
    marginVertical: 20,
  },
  linkText: {
    fontSize: 13,
    color: "#333",
    textDecorationLine: "underline",
  },
  backgroundCheckButton: {
    backgroundColor: "#FFE5E5",
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
  },
  backgroundCheckButtonText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    backgroundColor: "#FAFAFA",
  },
  backButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  continueButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    borderRadius: 28,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
  },
  disabledButtonText: {
    color: "#888",
  },

  continueButton2: {
    flex: 1,
    backgroundColor: "#00D9C5",
    borderRadius: 28,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  continueButtonText2: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },

  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    paddingTop: 50, // Espacio extra arriba para el botón X
    width: "85%",
    maxWidth: 400,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
    padding: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 25,
  },

  scrollContainer: {
    paddingHorizontal: 24,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bulletContainer: {
    paddingTop: 6,
    paddingRight: 12,
  },
  bullet2: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00D9C5",
  },
  listText: {
    flex: 1,
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  alertIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E0F7F5",
    borderWidth: 3,
    borderColor: "#00D9C5",
    justifyContent: "center",
    alignItems: "center",
  },
  alertIconText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#00D9C5",
  },
});

export default ApprovalStepsScreen;
