import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServicesState {
  selectedServices: string[];
}

const initialState: ServicesState = {
  selectedServices: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    toggleServiceRedux(state, action: PayloadAction<string>) {
      const ids = action.payload.split(",").map((x) => x.trim());
      ids.forEach((id) => {
        if (state.selectedServices.includes(id)) {
          state.selectedServices = state.selectedServices.filter(
            (s) => s !== id
          );
        } else {
          state.selectedServices.push(id);
        }
      });
    },
    setSelectedServices(state, action: PayloadAction<string[]>) {
      state.selectedServices = action.payload;
    },
    clearServices(state) {
      state.selectedServices = [];
    },
  },
});

export const { toggleServiceRedux, setSelectedServices, clearServices } =
  servicesSlice.actions;
export default servicesSlice.reducer;
