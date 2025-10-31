import { StyleSheet } from "react-native";
import { generalStyles } from "../../GeneralStyles";

export const OnboardingStyles = StyleSheet.create({
  // Estilos específicos que NO están en generalStyles
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

  welcomeText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
    paddingHorizontal: 10,
  },

  continueButtonModal: {
    ...generalStyles.continueButton,
    // Si necesitas variaciones específicas
  },

  continueButtonTextModal: {
    ...generalStyles.continueButtonText,
    color: "#000", // Sobrescribir color específico
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
  },

  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
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

  // Header específico para onboarding
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

  infoText2: {
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
  },

  step1ContinueButton: {
    ...generalStyles.primaryButton,
    marginTop: 30,
    marginBottom: 20,
  },

  step1ContinueButtonText: {
    ...generalStyles.primaryButtonText,
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
    ...generalStyles.primaryButton,
    flex: 1,
  },

  continueButtonText: {
    ...generalStyles.primaryButtonText,
  },

  continueButton2: {
    ...generalStyles.secondaryButton,
    flex: 1,
  },

  continueButtonText2: {
    ...generalStyles.secondaryButtonText,
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

  iconContainer: {
    ...generalStyles.iconContainer,
    marginVertical: 30,
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

  // Estilos que utilizan los generales directamente
  container: generalStyles.container,
  modalOverlay: generalStyles.modalOverlay,
  modalContent: generalStyles.modalContent,
  closeButton: generalStyles.closeButton,
  modalTitle: generalStyles.modalTitle,
  infoText: generalStyles.infoText,
  infoTextCenter: generalStyles.infoTextCenter,
  label: generalStyles.label,
  input: generalStyles.input,
  row: generalStyles.row,
});
