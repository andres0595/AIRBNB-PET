import { useColorScheme } from "@/hooks/use-color-scheme";
import { i18n } from "@/i18n/translations";
import { persistor, store } from "@/Store/store";
import { Ionicons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Localization from "expo-localization";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AppState } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Cargar fuentes
  const [fontsLoaded, fontError] = useFonts({
    "Comfortaa-Regular": require("../assets/fonts/Comfortaa-Regular.ttf"),
    "Comfortaa-Bold": require("../assets/fonts/Comfortaa-Bold.ttf"),
    "Comfortaa-Light": require("../assets/fonts/Comfortaa-Light.ttf"),
    "Comfortaa-Medium": require("../assets/fonts/Comfortaa-Medium.ttf"),
    "Comfortaa-SemiBold": require("../assets/fonts/Comfortaa-SemiBold.ttf"),
  });

  useEffect(() => {
    const hideSplash = async () => {
      // Esperar a que las fuentes carguen antes de ocultar el splash
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    };
    setTimeout(hideSplash, 2000);
  }, [fontsLoaded, fontError]);

  // 🌐 Detectar cambio de idioma al regresar al foreground
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        const locale = Localization.getLocales()[0].languageCode;
        const language = locale?.startsWith("es") ? "es" : "en";
        i18n.locale = language;
      }
    });

    return () => sub.remove();
  }, []);

  const colorScheme = useColorScheme();

  // No renderizar hasta que las fuentes estén listas
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
                name="(tabs)"
                options={{
                  drawerLabel: "Explorar (con Tabs)",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="grid-outline" size={size} color={color} />
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
                name="(Users)/Users"
                options={{ drawerItemStyle: { display: "none" } }}
              />
              <Drawer.Screen
                name="(Login)/ValidateOtp"
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
              <Drawer.Screen
                name="(Screen)/HomeScreen"
                options={{ drawerItemStyle: { display: "none" } }}
              />
            </Drawer>
          </ThemeProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
