import { Dimensions, StyleSheet } from "react-native";
import { fontFamily } from "../../../Config/typography";
const { width, height } = Dimensions.get("window");

export const ServicesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 100,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
    padding: 4,
  },
  header: {
    marginBottom: 24,
    marginTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "#1A1A1A",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: fontFamily.bold,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    maxWidth: "90%",
    fontFamily: fontFamily.medium,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
    fontFamily: fontFamily.medium,
  },
  infoButton: {
    padding: 2,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  serviceCard: {
    width: "47%",
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    padding: 16,
    paddingTop: 20,
    alignItems: "center",
    position: "relative",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.05,
    // shadowRadius: 8,
    //elevation: 2,
  },
  serviceCardSelected: {
    backgroundColor: "#F0FFFE",
    borderColor: "#00D9C5",
    shadowColor: "#00D9C5",
    shadowOpacity: 0.15,
    elevation: 4,
  },
  checkbox: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#D0D0D0",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    borderColor: "#00D9C5",
    backgroundColor: "#FFFFFF",
  },
  iconContainer: {
    width: 80,
    height: 60,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    //borderWidth: 2.5,
    // borderColor: "#00D9C5",
  },
  serviceTitle: {
    fontSize: 14,
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 6,
    lineHeight: 18,
    fontFamily: fontFamily.bold,
    fontWeight: "700",
  },
  serviceDescription: {
    fontSize: 11,
    color: "#777",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 15,
    fontFamily: fontFamily.medium,
  },
  servicePrice: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
    fontFamily: fontFamily.medium,
  },
  linkButton: {
    alignSelf: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  linkText: {
    fontSize: 13,
    color: "#666",
    textDecorationLine: "underline",
    fontFamily: fontFamily.medium,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  continueButton: {
    backgroundColor: "#00D9C5",
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#00D9C5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  continueButtonDisabled: {
    backgroundColor: "#D0D0D0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 2,
  },

  continueButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: fontFamily.medium,
  },
  continueButtonTextDisabled: {
    color: "#888888",
    fontFamily: fontFamily.medium,
  },

  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: "90%",
    maxHeight: "80%",
    padding: 24,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 4,
  },
  modalIconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: fontFamily.bold,
  },
  modalScroll: {
    maxHeight: 400,
  },
  questionBlock: {
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
    lineHeight: 20,
    fontFamily: fontFamily.bold,
  },
  questionAnswer: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    fontFamily: fontFamily.medium,
  },

  tooltipWrapper: {
    position: "relative",
  },

  tooltipOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  tooltipContainer: {
    position: "absolute",
    top: 30,
    right: -10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    width: 260,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  tooltipArrow: {
    position: "absolute",
    top: -8,
    right: 15,
    width: 16,
    height: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#E8E8E8",
    transform: [{ rotate: "45deg" }],
  },
  tooltipText: {
    fontSize: 12,
    color: "#333",
    lineHeight: 18,
    fontFamily: fontFamily.medium,
  },

  // Estilos del Modal de Perfil
  profileModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: "90%",
    maxHeight: "85%",
    padding: 28,
    paddingTop: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  profileModalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: fontFamily.bold,
  },
  profileModalDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    textAlign: "left",
    marginBottom: 20,
    fontFamily: fontFamily.medium,
  },
  profileModalSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: fontFamily.medium,
  },
  requirementsList: {
    marginBottom: 24,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B30",
    marginTop: 6,
    marginRight: 12,
    flexShrink: 0,
  },
  requirementText: {
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
    flex: 1,
  },
  profileModalButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#FF3B30",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  profileModalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: fontFamily.bold,
  },

  // Estilos del Modal de Aprobación
  approvalModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: "90%",
    maxHeight: "85%",
    padding: 24,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  approvalModalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 12,
  },
  approvalModalSubtitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 18,
    fontFamily: fontFamily.medium,
  },
  approvalScroll: {
    maxHeight: 320,
    marginBottom: 20,
  },
  approvalText: {
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
    marginBottom: 16,
    textAlign: "left",
    fontFamily: fontFamily.medium,
  },
  approvalButtonsContainer: {
    gap: 12,
  },
  approvalContinueButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 28,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF3B30",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  approvalContinueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: fontFamily.bold,
  },
  arrowIcon: {
    marginLeft: 8,
  },
  approvalCancelButton: {
    backgroundColor: "#E8E8E8",
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
  },
  approvalCancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fontFamily.bold,
  },
  // serviceCardFull: {
  //   width: "100%", // Mantiene el mismo ancho que las demás
  //   marginRight: "auto", // Alinea a la izquierda
  //   alignItems: "flex-start",
  // },

  serviceCardFull: {
    width: "100%",
    flexDirection: "row", // Layout horizontal
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },

  serviceCardFullIcon: {
    marginBottom: 0, // Quita el margen inferior
    marginRight: 16, // Espacio entre imagen y textos
  },

  serviceCardFullContent: {
    flex: 1,
    alignItems: "flex-start", // Textos alineados a la izquierda
  },

  serviceCardFullTitle: {
    textAlign: "left",
    marginBottom: 4,
    fontFamily: fontFamily.bold,
  },

  serviceCardFullDescription: {
    textAlign: "left",
    fontFamily: fontFamily.medium,
  },
});
