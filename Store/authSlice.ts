import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  email: string;
  nombre: string;
  numeroDocumento: string;
  rolId: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  emailForOtp: string;
}

const initialState: AuthState = {
  token: null,
  user: null,
  emailForOtp: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmailForOtp: (state, action: PayloadAction<string>) => {
      state.emailForOtp = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    clearEmailForOtp: (state) => {
      state.emailForOtp = "";
    },
  },
});

export const { setCredentials, logout, setEmailForOtp } = authSlice.actions;
export default authSlice.reducer;
