import AuthLayout from "@/components/AuthLayout";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../(CustomModal)/CustomModal";
import { RootState } from "../(Store)/store";
import { resetValidations } from "../(Store)/validationsSlice";
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
  const [modalFinalVisible, setModalFinalVisible] = useState(false);
  const [welcomeModalVisible, setWelcomeModalVisible] = useState(false);
  const [showFirstContent, setShowFirstContent] = useState(true);
  const [modalComprobanteVisible, setModalComprobante] = useState(false);
  const dispatch = useDispatch();
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
      setShowFirstContent(false);
      setModalFinalVisible(true);
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

  const handlerData = (paso: number) => () => {
    if (paso == 1) {
      setModalVisible(true);
    } else {
      setModalComprobante(true);
    }
    // Usa 'paso' aquí si lo necesitas
    console.log("Paso:", paso);
  };

  const handlerProfile = () => {
    setModalFinalVisible(false);
    setWelcomeModalVisible(true);
    dispatch(resetValidations());
    //router.push("/(Users)/Home_Register");
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

      {showFirstContent ? (
        // Primer contenido
        <View>
          <Text style={styles.infoText}>
            Para formar parte de nuestra comunidad de trabajo en PuppyPo.,
            necesitamos confirmar tu información a través de un Background Check
            (verificación de antecedentes).
          </Text>

          <Text style={styles.infoText}>
            Este proceso nos ayuda a garantizar un espacio confiable y seguro
            para todos. Al continuar, serás redirigido al formulario oficial
            donde podrás realizar tu verificación.
          </Text>

          <Text style={styles.infoText}>
            Ten en cuenta que este trámite tiene un costo que deberás asumir
            directamente con la entidad que lo gestiona.
          </Text>

          <Text style={styles.infoText}>
            ¡Gracias por tu comprensión y por dar este paso para unirte a
            nosotros!
          </Text>

          <TouchableOpacity style={styles.linkButton} onPress={handlerData(1)}>
            <Text style={styles.linkText}>
              ¿Qué documentos puedes utilizar para el background check?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backgroundCheckButton}
            onPress={() => setShowFirstContent(false)}
          >
            <Text style={styles.backgroundCheckButtonText}>
              Background Check
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={handlerData(2)}>
            <Text style={styles.linkText2}>
              ¿Ya cuentas con un comprobante background Check?
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Segundo contenido
        <View style={styles.successContainer}>
          <Text style={styles.infoTextCenter}>
            Background Check (verificación de antecedentes).
          </Text>

          {/* Imagen o ícono de los documentos */}
          <View style={styles.documentsImageContainer}>
            <Ionicons
              name="document-text-outline"
              size={100}
              color="#999"
              style={styles.docIcon1}
            />
            <Ionicons
              name="document-text-outline"
              size={100}
              color="#ccc"
              style={styles.docIcon2}
            />
          </View>

          {/* Ícono de check y texto */}
          <View style={styles.successCheckContainer}>
            <Ionicons
              name="checkmark-circle-outline"
              size={64}
              color="#00D9C5"
            />
            <Text style={styles.successText}>
              ¡Documentos cargados con éxito!
            </Text>
          </View>

          {/* Botón para volver */}
          <TouchableOpacity
            style={styles.backgroundCheckButton}
            onPress={() => setShowFirstContent(true)}
          >
            <Text style={styles.backgroundCheckButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      )}

      <CustomModal
        visible={modalFinalVisible}
        onClose={() => setModalFinalVisible(false)}
        title="   ¡Formulario enviado con éxito!"
        primaryButton={{
          text: "¡Entendido!",
          onPress: () => handlerProfile(),
        }}
      >
        <Ionicons
          name="checkmark-circle-outline"
          size={85}
          style={styles.containerIcon}
        />
        <View style={styles.questionBlock}>
          <Text style={styles.questionAnswer2}>
            Tu solicitud de aprobación ha sido enviada correctamente.
          </Text>
          <Text style={styles.questionAnswer}>
            Recibirás una respuesta en un plazo de 24 a 48 horas a través de tu
            correo electrónico registrado.
          </Text>
        </View>
      </CustomModal>

      <CustomModal
        visible={welcomeModalVisible}
        onClose={() => setWelcomeModalVisible(false)}
        showCloseButton={false} // Sin botón X
        primaryButton={{
          text: "Iniciar",
          onPress: () => {
            setWelcomeModalVisible(false);
            router.push("/(tabs)/perfil");
          },
          style: { backgroundColor: "#FF0000" }, // Botón rojo
        }}
      >
        <View style={styles.welcomeContent}>
          {/* Título */}
          <Text style={styles.welcomeTitle}>¡Bienvenido a PuppyPo!</Text>

          {/* Subtítulo */}
          <Text style={styles.welcomeSubtitle}>
            ¡Tu verificación fue aprobada con éxito!
          </Text>

          {/* Icono de celebración */}
          <View style={styles.iconContainer}>
            <Ionicons name="megaphone" size={80} color="#00D9C5" />
          </View>

          {/* Texto informativo */}
          <Text style={styles.welcomeText}>
            Ahora formas parte de nuestra comunidad de cuidadores de confianza.
          </Text>

          <Text style={styles.welcomeText}>
            Completa tu perfil para que las familias puedan conocerte mejor y
            empieces a ofrecer tus servicios.
          </Text>
        </View>
      </CustomModal>
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
            // disabled={!allCompleted}
            style={[
              styles.continueButton2,
              // !allCompleted && styles.disabledButton,
            ]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.continueButtonText2, //,
                // !allCompleted && styles.disabledButtonText,
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
    <View style={styles.accordionContainer}>
      <View style={styles.accordionWrapper}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={onToggle}
          activeOpacity={0.8}
        >
          <Text style={styles.accordionTitle}>{title}</Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#333"
          />
        </TouchableOpacity>

        {isExpanded && <View style={styles.accordionContent}>{children}</View>}
      </View>

      {/* Círculo de porcentaje posicionado absolutamente */}
      <View style={styles.percentageCircle}>
        <Text style={styles.percentageText}>{percentage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
    lineHeight: 20,
  },
  welcomeContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  iconContainer: {
    marginVertical: 30,
  },
  welcomeText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  continueButtonModal: {
    backgroundColor: "#00D9C5",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: "100%",
    alignItems: "center",
  },
  continueButtonTextModal: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  questionBlock: {
    width: "100%",
    marginBottom: 25,
  },
  questionAnswer: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 20,
  },

  containerIcon: {
    color: "#36EBD8",
    textAlign: "center",
    marginBottom: 10,
  },

  questionAnswer2: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  infoTextCenter: {
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
    marginBottom: 25,
    textAlign: "center",
  },
  documentsImageContainer: {
    position: "relative",
    width: 140,
    height: 120,
    marginBottom: 40,
    alignItems: "center",
  },
  docIcon1: {
    position: "absolute",
    top: 0,
    left: 10,
    transform: [{ rotate: "-10deg" }],
  },
  docIcon2: {
    position: "absolute",
    top: 10,
    right: 10,
    transform: [{ rotate: "5deg" }],
  },
  successCheckContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  successText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
    textAlign: "center",
  },
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
    position: "relative",
    marginBottom: 35,
    paddingRight: 20,
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
  accordionTitle: {
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "500",
    flex: 1,
    paddingRight: 12,
  },
  percentageCircle: {
    position: "absolute",
    right: -35, // Fuera de la card
    top: 0, // Fijo desde arriba
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#FFE5E5",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
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

  linkText2: {
    fontSize: 16,
    color: "#333",
    textDecorationLine: "underline",
    textAlign: "center",
    fontWeight: 700,
  },
  backgroundCheckButton: {
    backgroundColor: "#f6c3cc",
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
  },
  backgroundCheckButtonText: {
    color: "#000",
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
    color: "#000",
  },

  // iconContainer: {
  //   alignItems: "center",
  //   marginBottom: 16,
  // },
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
