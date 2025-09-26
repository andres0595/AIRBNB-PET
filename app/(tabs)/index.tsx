import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const PetCareHomeScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const router = useRouter();
  // Array con tus imágenes locales
  const bannerImages = [
    require("../../assets/images/Banner_1.png"), // Ajusta la ruta según tu estructura
    require("../../assets/images/Banner_2.png"), // Ajusta la ruta según tu estructura
  ];

  // Auto-scroll del carrusel cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % bannerImages.length;
      setCurrentImageIndex(nextIndex);

      // Scroll automático del ScrollView
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  // Manejar el scroll manual
  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / width);
    setCurrentImageIndex(index);
  };
  return (
    <AuthLayout contentStyle={homeStyles.container}>
      <View style={homeStyles.inner}>
        {/* Logo en la esquina superior */}
        <View style={homeStyles.logoContainer}>
          <Text style={homeStyles.logo}>PO</Text>
          <View style={homeStyles.pawIcon}>
            <Text style={homeStyles.pawText}>🐾</Text>
          </View>
        </View>

        {/* Contenedor principal con imagen y contenido */}
        <View style={homeStyles.mainContent}>
          {/* Imagen principal con carrusel */}
          <View style={homeStyles.imageContainer}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={homeStyles.carouselScrollView}
            >
              {bannerImages.map((image, index) => (
                <Image
                  key={index}
                  source={image}
                  style={homeStyles.petImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>

            {/* Indicadores de carrusel dinámicos */}
            <View style={homeStyles.carouselIndicators}>
              {bannerImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    homeStyles.indicator,
                    currentImageIndex === index && homeStyles.activeIndicator,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Contenido de texto */}
          <View style={homeStyles.textContent}>
            <Text style={homeStyles.mainTitle}>
              ¡La tranquilidad de saber que tu mascota está en buenas manos!
            </Text>

            <Text style={homeStyles.subtitle}>
              Encuentra cuidadores y alojamientos de confianza para tu compañero
            </Text>
          </View>

          {/* Botones de acción */}
          <View style={homeStyles.buttonsContainer}>
            <TouchableOpacity
              style={homeStyles.registerButton}
              onPress={() => router.push("/(Users)/Home_Register")}
            >
              <Text style={homeStyles.registerButtonText}>Regístrate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={homeStyles.loginButton}
              onPress={() => router.push("/login")}
            >
              <Text style={homeStyles.loginButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthLayout>
  );
};

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  inner: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00D4AA",
    marginRight: 5,
  },
  pawIcon: {
    backgroundColor: "#00D4AA",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  pawText: {
    color: "white",
    fontSize: 14,
  },
  mainContent: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: height * 0.55,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    marginBottom: 30,
  },
  carouselScrollView: {
    width: "100%",
    height: "100%",
  },
  petImage: {
    width: width,
    height: "100%",
  },
  carouselIndicators: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  activeIndicator: {
    backgroundColor: "white",
    width: 12,
  },
  textContent: {
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 15,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 22,
    marginTop: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    gap: 15,
    marginTop: 30,
  },
  registerButton: {
    flex: 1,
    backgroundColor: "#00D4AA",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  registerButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    flex: 1,
    backgroundColor: "#FF4444",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PetCareHomeScreen;
