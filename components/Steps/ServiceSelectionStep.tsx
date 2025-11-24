import { fontFamily } from "@/Config/typography";
import { i18n } from "@/i18n/translations";
import { Service } from "@/Models/Model-ServiceConfig/serviceConfig";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ServiceSelectionStepProps {
  services: Service[];
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
  onNext: () => void;
}

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  services,
  selectedServices,
  onToggleService,
  onNext,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        {i18n.t("configservice.selectServicesOffer")}
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
            onPress={() => onToggleService(service.id)}
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
                  <Ionicons name="checkmark-circle" size={24} color="#00BFA6" />
                </View>
              )}
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              {service.subtitle ? (
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonText}>
          {i18n.t("configservice.next")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
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
});
