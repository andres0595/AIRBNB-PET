import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./(Store)/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    setTimeout(hideSplash, 2000);
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
                drawerLabel: "Inicio",
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="home-outline" size={size} color={color} />
                ),
              }}
            />

            {/* NUEVO: Agregar las tabs al drawer */}
            <Drawer.Screen
              name="(tabs)"
              options={{
                drawerLabel: "Explorar (con Tabs)",
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="grid-outline" size={size} color={color} />
                ),
              }}
            />

            <Drawer.Screen
              name="services"
              options={{
                drawerLabel: "Nuestros Servicios",
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="paw-outline" size={size} color={color} />
                ),
              }}
            />

            <Drawer.Screen
              name="blog"
              options={{
                drawerLabel: "Blog",
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="book-outline" size={size} color={color} />
                ),
              }}
            />

            <Drawer.Screen
              name="support"
              options={{
                drawerLabel: "Soporte",
                drawerIcon: ({ color, size }) => (
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
                drawerIcon: ({ color, size }) => (
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
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="log-in-outline" size={size} color={color} />
                ),
              }}
            />

            {/* Pantallas ocultas del drawer */}
            <Drawer.Screen
              name="(Login)/ChangePassword"
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="(Store)/authSlice"
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="(Users)/Users"
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="(Login)/ValidateOtp"
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="(Users)/Home_Register"
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="(Service)/Services"
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="(Steps)/ApprovalStepsScreen"
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="(Login)/ConfirmChange"
              options={{ drawerItemStyle: { display: "none" } }}
            />
          </Drawer>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
