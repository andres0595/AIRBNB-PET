import { ProfileState } from "@/Models/Model-ServiceConfig/serviceConfig";
import { useState } from "react";
const initialProfileState: ProfileState = {
  petType: "",
  experienceLevel: "",
  certifications: [],
  hasAllergies: "",
  allergiesDetail: "",
  homeType: "",
  hasOutdoorSpace: "",
  peopleAtHome: "",
  childrenAge: "",
};

export const useProfileState = () => {
  const [state, setState] = useState<ProfileState>(initialProfileState);

  const updateState = (updates: Partial<ProfileState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const toggleCertification = (cert: string) => {
    setState((prev) => {
      const certifications = prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert];
      return { ...prev, certifications };
    });
  };

  const resetProfile = () => {
    setState(initialProfileState);
  };

  return { state, updateState, toggleCertification, resetProfile };
};
