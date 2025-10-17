import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconoBanner from "../../assets/Icons/IconoBanner.svg";
// Importa tus iconos SVG
import AlojamientoIcon from "../../assets/Icons/svg-banner/SubBanner1.svg";
import GuarderiaIcon from "../../assets/Icons/svg-banner/SubBanner2.svg";
import CuidadoIcon from "../../assets/Icons/svg-banner/SubBanner3.svg";
import PaseosIcon from "../../assets/Icons/svg-banner/SubBanner4.svg";
import BañoIcon from "../../assets/Icons/svg-banner/SubBanner5.svg";

const { width, height } = Dimensions.get("window");

const PetCareHomeScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Array con tus slides (imagen, texto e icono)
  const slides = [
    {
      image: require("../../assets/images/Banner_1.png"),
      title: "Alojamiento de\nmascotas",
      icon: AlojamientoIcon,
    },
    {
      image: require("../../assets/images/Banner_2.png"),
      title: "Guardería de día",
      icon: GuarderiaIcon,
    },
    {
      image: require("../../assets/images/Banner_3.png"),
      title: "Cuidado en casa",
      icon: CuidadoIcon,
    },
    {
      image: require("../../assets/images/Banner_4.png"),
      title: "Paseos en el barrio",
      icon: PaseosIcon,
    },
    {
      image: require("../../assets/images/Banner_5.png"),
      title: "Baño a domicilio",
      icon: BañoIcon,
    },
  ];

  // Animación del icono con scale + fade - MUY RÁPIDA Y FLUIDA
  useEffect(() => {
    // Animación paralela de fade out y scale down
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animación paralela de fade in y scale up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [currentImageIndex]);

  // Auto-scroll del carrusel cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % slides.length;
      setCurrentImageIndex(nextIndex);

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
  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / width);
    setCurrentImageIndex(index);
  };

  return (
    <AuthLayout contentStyle={homeStyles.container}>
      <View style={homeStyles.inner}>
        {/* Logo en la esquina superior */}
        <View style={homeStyles.logoContainer}>
          <IconoBanner width={90} height={80} />
        </View>

        {/* Contenedor principal con imagen y contenido */}
        <View style={homeStyles.mainContent}>
          {/* Carrusel de imágenes con texto e icono */}
          <View style={homeStyles.carouselContainer}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={homeStyles.carouselScrollView}
            >
              {slides.map((slide, index) => (
                <View key={index} style={homeStyles.slideContainer}>
                  {/* Imagen de fondo */}
                  <Image
                    source={slide.image}
                    style={homeStyles.petImage}
                    resizeMode="cover"
                  />

                  {/* Overlay oscuro para mejor legibilidad del texto */}
                  <View style={homeStyles.overlay} />

                  {/* Texto superpuesto en la imagen */}
                  <View style={homeStyles.textOverlay}>
                    <Text style={homeStyles.slideTitle}>{slide.title}</Text>
                  </View>

                  {/* Indicadores de carrusel */}
                  <View style={homeStyles.carouselIndicators}>
                    {slides.map((_, idx) => (
                      <View
                        key={idx}
                        style={[
                          homeStyles.indicator,
                          currentImageIndex === idx &&
                            homeStyles.activeIndicator,
                        ]}
                      />
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Icono debajo de la imagen con animación mejorada */}
            <Animated.View
              style={[
                homeStyles.iconContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              {(() => {
                const CurrentIcon = slides[currentImageIndex].icon;
                return <CurrentIcon width={60} height={60} />;
              })()}
            </Animated.View>
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
              onPress={() => router.push("/(tabs)/perfil")}
            >
              <Text style={homeStyles.loginButtonText}>Reservar</Text>
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
  mainContent: {
    flex: 1,
  },
  carouselContainer: {
    width: "100%",
    marginBottom: 20,
  },
  carouselScrollView: {
    width: "100%",
    height: height * 0.55,
  },
  slideContainer: {
    width: width,
    height: height * 0.55,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    position: "relative",
  },
  petImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  textOverlay: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 36,
  },
  carouselIndicators: {
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
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
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    marginTop: -40,
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
