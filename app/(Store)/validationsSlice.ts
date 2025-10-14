import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ValidationsState {
  percentage: number;
  backgroundCheckAccepted: boolean | null;
  documents: string[];
}

const initialState: ValidationsState = {
  percentage: 0,
  backgroundCheckAccepted: null,
  documents: [],
};

const validationsSlice = createSlice({
  name: "validations",
  initialState,
  reducers: {
    setBackgroundCheck: (state, action: PayloadAction<boolean | null>) => {
      state.backgroundCheckAccepted = action.payload;
    },
    setDocuments: (state, action: PayloadAction<string[]>) => {
      state.documents = action.payload;
    },
    setPercentage: (state, action: PayloadAction<number>) => {
      state.percentage = action.payload;
    },
    resetValidations: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setBackgroundCheck,
  setDocuments,
  setPercentage,
  resetValidations,
} = validationsSlice.actions;

export default validationsSlice.reducer;
