import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivationData } from "../Models/Models-Tabs/ActivationData";
import { LegalConsentsData } from "../Models/Models-Tabs/LegalConsentsData";
import { PersonalInfoData } from "../Models/Models-Tabs/PersonalInfoData";
import { SitterProfileData } from "../Models/Models-Tabs/SitterProfileData";

interface ValidationsState {
  backgroundCheckAccepted: boolean | null;
  documents: string[];
  personalInfoData: PersonalInfoData;
  sitterProfileData: SitterProfileData;
  legalConsentData: LegalConsentsData;
  activationData: ActivationData;
  personalInfoPercentage: number;
  sitterProfilePercentage: number;
  validationsPercentage: number;
  legalConsentsPercentage: number;
  activationPercentage: number;
}

const initialSitterProfileData: SitterProfileData = {
  profilePhoto: "",
  description: "",
  services: [],
  scheduleDay: "",
  scheduleHours: "",
  animalExperience: "",
  percentage: 0,
};

const initialPersonalInfoData: PersonalInfoData = {
  fullName: "",
  birthDate: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  province: "",
  postCode: "",
  housingType: "",
  idDocument: "",
  uploadedFiles: [],
  percentage: 0,
};

const initialLegalConsentData: LegalConsentsData = {
  termsAndConditions: false,
  privacyPolicy: false,
  independentContractor: false,
  animalSafetyPolicy: false,
};

const initialActivationData: ActivationData = {
  finalConfirmation: false,
};

const initialState: ValidationsState = {
  backgroundCheckAccepted: null,
  documents: [],
  personalInfoData: initialPersonalInfoData,
  sitterProfileData: initialSitterProfileData,
  legalConsentData: initialLegalConsentData,
  activationData: initialActivationData,
  personalInfoPercentage: 0,
  sitterProfilePercentage: 0,
  validationsPercentage: 0,
  legalConsentsPercentage: 0,
  activationPercentage: 0,
};

export const validationsSlice = createSlice({
  name: "validations",
  initialState,
  reducers: {
    setBackgroundCheck: (state, action: PayloadAction<boolean | null>) => {
      state.backgroundCheckAccepted = action.payload;
    },
    setDocuments: (state, action: PayloadAction<string[]>) => {
      state.documents = action.payload;
    },
    setPersonalInfoData: (
      state,
      action: PayloadAction<Partial<PersonalInfoData>>
    ) => {
      state.personalInfoData = {
        ...state.personalInfoData,
        ...action.payload,
      };
    },
    setPersonalInfoFiles: (state, action: PayloadAction<string[]>) => {
      state.personalInfoData.uploadedFiles = action.payload;
    },
    setPersonalInfoPercentage: (state, action: PayloadAction<number>) => {
      state.personalInfoPercentage = action.payload;
    },

    setSitterProfileData: (
      state,
      action: PayloadAction<Partial<SitterProfileData>>
    ) => {
      state.sitterProfileData = {
        ...state.sitterProfileData,
        ...action.payload,
      };
    },
    setSitterProfilePercentage: (state, action: PayloadAction<number>) => {
      state.sitterProfilePercentage = action.payload;
    },
    setValidationsPercentage: (state, action: PayloadAction<number>) => {
      state.validationsPercentage = action.payload;
    },

    setLegalConsentsData: (
      state,
      action: PayloadAction<Partial<LegalConsentsData>>
    ) => {
      state.legalConsentData = {
        ...state.legalConsentData,
        ...action.payload,
      };
    },

    setLegalConsentsPercentage: (state, action: PayloadAction<number>) => {
      state.legalConsentsPercentage = action.payload;
    },

    setActivationData: (
      state,
      action: PayloadAction<Partial<ActivationData>>
    ) => {
      state.activationData = {
        ...state.activationData,
        ...action.payload,
      };
    },

    setActivationPercentage: (state, action: PayloadAction<number>) => {
      state.activationPercentage = action.payload;
    },
    resetValidations: () => {
      return initialState;
    },
  },
});

export const {
  setBackgroundCheck,
  setDocuments,
  setPersonalInfoData,
  setSitterProfileData,
  setLegalConsentsData,
  setActivationData,
  setPersonalInfoFiles,
  setPersonalInfoPercentage,
  setSitterProfilePercentage,
  setValidationsPercentage,
  setLegalConsentsPercentage,
  setActivationPercentage,
  resetValidations,
} = validationsSlice.actions;

export default validationsSlice.reducer;
