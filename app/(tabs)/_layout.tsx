import { HapticTab } from "@/components/haptic-tab";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../(Store)/store";
// Importa tu hook o contexto de autenticación

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Usar useSelector para obtener el estado de autenticación
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.token !== null && state.auth.user !== null
  );

  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
          height: 70,
          paddingBottom: 5,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      {/* Tab 1: Home o Hoy según autenticación */}
      <Tabs.Screen
        name="index"
        options={{
          title: isAuthenticated ? "Hoy" : "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused
                  ? isAuthenticated
                    ? "bookmark"
                    : "home"
                  : isAuthenticated
                  ? "bookmark-outline"
                  : "home-outline"
              }
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Tab 2: Reservas o Calendario según autenticación */}
      <Tabs.Screen
        name="reservas"
        options={{
          title: isAuthenticated ? "Calendario" : "Reservas",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Tab 3: Blog - siempre visible */}
      <Tabs.Screen
        name="blog"
        options={{
          title: "Blog",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Tab 4: Mensajes - siempre visible */}
      <Tabs.Screen
        name="mensajes"
        options={{
          title: "Mensajes",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Tab 5: Perfil - siempre visible */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Ocultar otros tabs */}

      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
