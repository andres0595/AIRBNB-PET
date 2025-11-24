import AuthLayout from "@/components/AuthLayout";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import IconoBanner from "../../assets/Icons/IconoBanner.png";
// Importa tus iconos SVG
import { i18n } from "@/i18n/translations";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { fontFamily } from "../../Config/typography";
const AlojamientoIcon = require("../../assets/Icons/svg-banner/SubBanner1.png");
const GuarderiaIcon = require("../../assets/Icons/svg-banner/SubBanner2.png");
const CuidadoIcon = require("../../assets/Icons/svg-banner/SubBanner3.png");
const PaseosIcon = require("../../assets/Icons/svg-banner/SubBanner4.png");
const BañoIcon = require("../../assets/Icons/svg-banner/SubBanner5.png");

const { width, height } = Dimensions.get("window");

const PetCareHomeScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  // Array con tus slides (imagen, texto e icono)
  const slides = [
    {
      image: require("../../assets/images/Banner_1.png"),
      title: i18n.t("slides.petLodging"),
      icon: AlojamientoIcon,
    },
    {
      image: require("../../assets/images/Banner_2.png"),
      title: i18n.t("slides.daycare"),
      icon: GuarderiaIcon,
    },
    {
      image: require("../../assets/images/Banner_3.png"),
      title: i18n.t("slides.homeCare"),
      icon: CuidadoIcon,
    },
    {
      image: require("../../assets/images/Banner_4.png"),
      title: i18n.t("slides.neighborhoodWalks"),
      icon: PaseosIcon,
    },
    {
      image: require("../../assets/images/Banner_5.png"),
      title: i18n.t("slides.homeBath"),
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

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" }, // Oculta el tab bar
    });

    return () => {
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
          height: 70,
          paddingBottom: 5,
          paddingTop: 8,
        }, // Restaura el estilo al salir
      });
    };
  }, [navigation]);

  return (
    <AuthLayout contentStyle={homeStyles.container}>
      <View style={homeStyles.inner}>
        {/* Logo en la esquina superior */}
        <View style={homeStyles.logoContainer}>
          <Image
            source={IconoBanner}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
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
              <Image
                source={slides[currentImageIndex].icon}
                style={{ width: 110, height: 80 }}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          {/* Contenido de texto */}
          <View style={homeStyles.textContent}>
            <Text style={homeStyles.mainTitle}>{i18n.t("home.welcome")}</Text>

            <Text style={homeStyles.subtitle}>{i18n.t("home.subtitle")}</Text>
          </View>

          {/* Botones de acción */}
          <View style={homeStyles.buttonsContainer}>
            <TouchableOpacity
              style={homeStyles.registerButton}
              onPress={() => router.push("/(Users)/Users")}
            >
              <Text style={homeStyles.registerButtonText}>
                {i18n.t("general.register")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={homeStyles.loginButton}
              onPress={() => router.push("/(tabs)/perfil")}
            >
              <Text style={homeStyles.loginButtonText}>
                {" "}
                {i18n.t("general.reservation")}
              </Text>
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
    top: 45,
    right: 35,
    zIndex: 10,
  },
  mainContent: {
    flex: 1,
  },
  carouselContainer: {
    width: "100%",
  },
  carouselScrollView: {
    width: "100%",
    height: height * 0.55,
  },
  slideContainer: {
    width: width,
    height: height * 0.5,
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
    fontFamily: fontFamily.medium,
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
    height: 60,
    marginBottom: 20,
    marginTop: -15,
  },
  textContent: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 30,
    fontFamily: fontFamily.medium,
  },
  mainTitle: {
    //fontSize: 17,
    fontSize: moderateScale(17), // Escala automáticamente

    // fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: verticalScale(15),
    lineHeight: moderateScale(28),
    //marginBottom: 15,
    //lineHeight: 28,
    fontFamily: fontFamily.bold,
    flexShrink: 1, // ← ¡Importante para textos largos!
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    lineHeight: 22,
    marginTop: 15,
    fontFamily: fontFamily.medium,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    gap: 15,
    marginTop: 10,
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
    fontWeight: 700,
    fontFamily: fontFamily.medium,
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
    fontFamily: fontFamily.medium,
  },
});

export default PetCareHomeScreen;
