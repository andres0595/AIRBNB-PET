import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./(Store)/store";
// Prevenir que se oculte automáticamente
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  useEffect(() => {
    // Ocultar splash screen después de que la app esté lista
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    // Puedes agregar aquí la lógica de carga de tu ap
    setTimeout(hideSplash, 2000); // 2 segundos de ejemplo
  }, []);
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Drawer
            screenOptions={{
              headerShown: false,
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: "Inicio (Login)",
                drawerIcon: ({
                  color,
                  size,
                }: {
                  color: string;
                  size: number;
                }) => (
                  <Ionicons name="home-outline" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="services"
              options={{
                drawerLabel: "Nuestros Servicios",
                drawerIcon: ({
                  color,
                  size,
                }: {
                  color: string;
                  size: number;
                }) => <Ionicons name="paw-outline" size={size} color={color} />,
              }}
            />
            <Drawer.Screen
              name="blog"
              options={{
                drawerLabel: "Blog",
                drawerIcon: ({
                  color,
                  size,
                }: {
                  color: string;
                  size: number;
                }) => (
                  <Ionicons name="book-outline" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="support"
              options={{
                drawerLabel: "Soporte",
                drawerIcon: ({
                  color,
                  size,
                }: {
                  color: string;
                  size: number;
                }) => (
                  <Ionicons
                    name="help-circle-outline"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="register"
              options={{
                drawerLabel: "Registrarse",
                drawerIcon: ({
                  color,
                  size,
                }: {
                  color: string;
                  size: number;
                }) => (
                  <Ionicons
                    name="person-add-outline"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="login"
              options={{
                drawerLabel: "Iniciar Sesión",
                drawerIcon: ({
                  color,
                  size,
                }: {
                  color: string;
                  size: number;
                }) => (
                  <Ionicons name="log-in-outline" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="(Login)/ChangePassword"
              options={{
                drawerItemStyle: { display: "none" }, // lo oculta del Drawer
              }}
            />
            <Drawer.Screen
              name="(Store)/authSlice"
              options={{
                drawerItemStyle: { display: "none" }, // lo oculta del Drawer
              }}
            />
            <Drawer.Screen
              name="(Users)/Users"
              options={{
                drawerItemStyle: { display: "none" }, // lo oculta del Drawer
              }}
            />

            <Drawer.Screen
              name="(Login)/ValidateOtp"
              options={{
                drawerItemStyle: { display: "none" }, // lo oculta del Drawer
              }}
            />

            <Drawer.Screen
              name="(Users)/Home_Register"
              options={{
                drawerItemStyle: { display: "none" }, // lo oculta del Drawer
              }}
            />
            <Drawer.Screen
              name="(Service)/Services"
              options={{
                drawerItemStyle: { display: "none" }, // lo oculta del Drawer
              }}
            />

            <Drawer.Screen
              name="(Steps)/ApprovalStepsScreen"
              options={{
                drawerItemStyle: { display: "none" }, // lo oculta del Drawer
              }}
            />
            <Drawer.Screen
              name="(Login)/ConfirmChange"
              options={{
                drawerItemStyle: { display: "none" }, // lo oculta del Drawer
              }}
            />
          </Drawer>

          <StatusBar style="auto" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
