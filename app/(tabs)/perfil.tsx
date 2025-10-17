import AuthLayout from "@/components/AuthLayout";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      title: "Información personal",
      route: "/(profile)/personal-info",
    },
    {
      id: 2,
      title: "Configuración de servicios",
      route: "/(profile)/services-config",
    },
    {
      id: 3,
      title: "Billetera",
      route: "/(profile)/wallet",
    },
    {
      id: 4,
      title: "Tus mascotas",
      route: "/(profile)/pets",
    },
    {
      id: 5,
      title: "Fotos",
      route: "/(profile)/photos",
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleMenuPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <AuthLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: "https://via.placeholder.com/70",
                }}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.userName}>Maria Alejandra</Text>
          </View>
        </View>

        {/* Configuration Section */}
        <View style={styles.configSection}>
          <Text style={styles.sectionTitle}>Configuración</Text>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem,
              ]}
              onPress={() => handleMenuPress(item.route)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Complete Profile Button */}
        <TouchableOpacity style={styles.completeButton} activeOpacity={0.8}>
          <Text style={styles.completeButtonText}>Perfil completado</Text>
        </TouchableOpacity>
      </ScrollView>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#FFF",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  placeholder: {
    width: 40,
  },
  profileSection: {
    backgroundColor: "#FFF",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E0E0E0",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  configSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  lastMenuItem: {
    marginBottom: 0,
  },
  menuItemText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
  },
  completeButton: {
    backgroundColor: "#E8E8E8",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 40,
    alignItems: "center",
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
});

export default ProfileScreen;
