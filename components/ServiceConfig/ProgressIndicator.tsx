import { fontFamily } from "@/Config/typography";
import { i18n } from "@/i18n/translations";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps = 3,
}) => {
  const steps = [
    i18n.t("configservice.selectServices"),
    i18n.t("configservice.knowYourProfile"),
    i18n.t("configservice.calendarAndRates"),
  ];

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        {steps.map((step, index) => (
          <Text
            key={index}
            style={[
              styles.progressStep,
              currentStep === index && styles.progressStepActive,
            ]}
          >
            {step}
          </Text>
        ))}
      </View>
      <Text style={styles.progressText}>
        {currentStep + 1} de {totalSteps}
      </Text>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${((currentStep + 1) / totalSteps) * 100}%` },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressStep: {
    fontSize: 9,
    color: "#9CA3AF",
    flex: 1,
    textAlign: "center",
    fontFamily: fontFamily.medium,
  },
  progressStepActive: {
    color: "#4B5563",
    fontWeight: "600",
  },
  progressText: {
    fontSize: 10,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: fontFamily.medium,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFB6C1",
    borderRadius: 2,
  },
});
