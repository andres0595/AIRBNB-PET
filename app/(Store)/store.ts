import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import validationsReducer from "./validationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    validations: validationsReducer,
  },
});

// tipos para usar en useDispatch y useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
