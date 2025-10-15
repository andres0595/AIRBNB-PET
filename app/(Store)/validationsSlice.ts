import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ValidationsState {
  backgroundCheckAccepted: boolean | null;
  documents: string[];
  // Porcentajes individuales para cada formulario
  personalInfoPercentage: number;
  sitterProfilePercentage: number;
  validationsPercentage: number;
  legalConsentsPercentage: number;
  activationPercentage: number;
}

const initialState: ValidationsState = {
  backgroundCheckAccepted: null,
  documents: [],
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
    // Acciones para cada porcentaje individual
    setPersonalInfoPercentage: (state, action: PayloadAction<number>) => {
      state.personalInfoPercentage = action.payload;
    },
    setSitterProfilePercentage: (state, action: PayloadAction<number>) => {
      state.sitterProfilePercentage = action.payload;
    },
    setValidationsPercentage: (state, action: PayloadAction<number>) => {
      state.validationsPercentage = action.payload;
    },
    setLegalConsentsPercentage: (state, action: PayloadAction<number>) => {
      state.legalConsentsPercentage = action.payload;
    },
    setActivationPercentage: (state, action: PayloadAction<number>) => {
      state.activationPercentage = action.payload;
    },
    // Acción para resetear todo el estado si es necesario
    resetValidations: (state) => {
      state.backgroundCheckAccepted = null;
      state.documents = [];
      state.personalInfoPercentage = 0;
      state.sitterProfilePercentage = 0;
      state.validationsPercentage = 0;
      state.legalConsentsPercentage = 0;
      state.activationPercentage = 0;
    },
  },
});

export const {
  setBackgroundCheck,
  setDocuments,
  setPersonalInfoPercentage,
  setSitterProfilePercentage,
  setValidationsPercentage,
  setLegalConsentsPercentage,
  setActivationPercentage,
  resetValidations,
} = validationsSlice.actions;

export default validationsSlice.reducer;
