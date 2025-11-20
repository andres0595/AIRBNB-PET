import {
  ProfileState,
  ServiceConfig,
  TimeSlotState,
} from "@/Models/Model-ServiceConfig/serviceConfig";

export const validateServiceSelection = (
  selectedServices: string[]
): string | null => {
  if (selectedServices.length === 0) {
    return "configservice.selectAtLeastOneService";
  }
  return null;
};

export const validateProfile = (profile: ProfileState): string | null => {
  if (!profile.petType) return "configservice.selectPetType";
  if (!profile.experienceLevel) return "configservice.selectExperienceLevel";
  if (!profile.hasAllergies) return "configservice.indicateAllergies";
  if (profile.hasAllergies === "Sí" && !profile.allergiesDetail) {
    return "configservice.specifyAllergies";
  }
  if (!profile.homeType) return "configservice.selectHomeType";
  if (!profile.hasOutdoorSpace) return "configservice.indicateOutdoorSpace";
  if (!profile.peopleAtHome) return "configservice.indicatePeopleAtHome";
  if (profile.peopleAtHome === "Con niños" && !profile.childrenAge) {
    return "configservice.specifyChildrenAge";
  }
  return null;
};

export const validateCalendarConfig = (
  selectedDates: Record<string, any>,
  serviceType: string,
  price: string,
  schedules: TimeSlotState["schedules"]
): string | null => {
  if (Object.keys(selectedDates).length === 0) {
    return "Selecciona al menos un día";
  }

  if (serviceType === "time-slot") {
    if (schedules.length === 0) {
      return "Agrega al menos una franja horaria";
    }
  } else {
    if (!price) {
      return "Ingresa un precio";
    }
  }

  return null;
};

export const validateFinish = (
  serviceConfigs: Record<string, ServiceConfig>
): string | null => {
  if (Object.keys(serviceConfigs).length === 0) {
    return "configservice.configureServiceBeforeContinue";
  }
  return null;
};
