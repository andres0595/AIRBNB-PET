import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "./(Store)/store";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Drawer
            screenOptions={{
              headerStyle: { backgroundColor: "#fff" },
              headerTitle: () => (
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  PuppyPo 🐶
                </Text>
              ),
              drawerActiveTintColor: "#16c3b0",
              drawerLabelStyle: { fontSize: 16 },
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
          </Drawer>

          <StatusBar style="auto" />
        </ThemeProvider>
        <Toast />
      </GestureHandlerRootView>
    </Provider>
  );
}
