import AuthLayout from "@/components/AuthLayout";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RootState } from "@/Store/store";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import Logocard from "../../assets/Icons/png-card-principal/LogoCardInternoG.png";
import alojamientoMascotas from "../../assets/Icons/svg-servicios/Alojamiento.png";
import Banio from "../../assets/Icons/svg-servicios/Banio.png";
import Cuidado from "../../assets/Icons/svg-servicios/Cuidado.png";
import Guarderia from "../../assets/Icons/svg-servicios/Guarderia.png";
import Paseos from "../../assets/Icons/svg-servicios/Paseos.png";
import { fontFamily } from "../../Config/typography";
export default function HomeScreen() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  return (
    <AuthLayout contentStyle={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.hello} numberOfLines={2}>
              ¡Hola! {user?.nombre}
            </Text>
            <Text style={styles.welcome}>
              Bienvenido(a) a <Text style={styles.brand}>PuppyPó</Text>
            </Text>
          </View>
        </View>

        {/* TITLE */}
        <Text style={styles.question}>¿Qué deseas reservar hoy?</Text>

        {/* GRID DE SERVICIOS */}
        <View style={styles.gridContainer}>
          {/* Primera fila - 2 cards */}
          <View style={styles.row}>
            <ServiceCard
              title="Alojamiento de mascotas"
              image={alojamientoMascotas}
            />
            <ServiceCard title="Guardería de día" image={Guarderia} />
          </View>

          {/* Segunda fila - 3 cards */}
          <View style={styles.row}>
            <ServiceCard title="Cuidado en casa" image={Cuidado} small />
            <ServiceCard title="Paseos en el barrio" image={Paseos} small />
            <ServiceCard title="Baño a domicilio" image={Banio} small />
          </View>
        </View>

        {/* BANNER */}
        <TouchableOpacity style={styles.banner}>
          <View style={styles.bannerTextBox}>
            <View style={styles.logoContainer}>
              <Image
                source={Logocard}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.bannerTitle}>Conviértete en un cuidador</Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.7}
              onPress={() => router.push("/(Service)/Services")}
            >
              <Text style={styles.bannerButton}>¡Regístrate!</Text>
            </TouchableOpacity>
          </View>
          <Image
            // source={require("../../assets/Icons/cuidadores.png")}
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ScrollView>
    </AuthLayout>
  );
}

function ServiceCard({
  title,
  image,
  small = false,
}: {
  title: string;
  image: any;
  small?: boolean;
}) {
  return (
    <TouchableOpacity style={[styles.card, small && styles.cardSmall]}>
      <Image source={image} style={styles.cardImage} resizeMode="cover" />
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    backgroundColor: "#F7F7F7",
    flex: 1,
    padding: 25,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 5, // 🔥 Reducido de 10 a 5 (banner MUY cerca de tabs)
  },

  // HEADER
  headerContainer: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingTop: 40,
    paddingBottom: 28,
    paddingHorizontal: 20,
    marginHorizontal: -20, // 🔥 Márgen negativo para anular el padding del padre
    marginTop: -20, // 🔥 También arriba si es necesario
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 10,
  },
  header: {
    alignItems: "center",
  },
  hello: {
    fontSize: 22,
    color: "#000",
    marginBottom: 6,
    fontWeight: "700",
    fontFamily: fontFamily.medium,
    textAlign: "center",
    flexWrap: "wrap",
    maxWidth: "90%", // evita desbordes
  },
  welcome: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
    fontFamily: fontFamily.regular,
  },
  brand: {
    color: "#FF0000",
    fontWeight: "700",
  },

  // QUESTION
  question: {
    marginTop: 20,
    marginBottom: 60, // 🔥 Aumentado de 24 a 30 (MUCHO más espacio)
    textAlign: "center",
    fontSize: 17,
    fontWeight: "500",
    color: "#000000",
    fontFamily: fontFamily.regular,
  },

  // GRID
  gridContainer: {
    marginTop: 0,
    marginBottom: 55,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 25,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  cardSmall: {
    width: "31.5%",
    paddingVertical: 30,
    minHeight: 140,
  },

  cardImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 12.5,
    textAlign: "center",
    color: "#000",
    lineHeight: 16,
    fontFamily: fontFamily.bold,
    fontWeight: "600",
  },

  // BANNER
  banner: {
    marginTop: 0,
    marginHorizontal: 0,
    marginBottom: 0,
    backgroundColor: "#36EBD8",
    borderRadius: 18,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerTextBox: {
    flex: 1,
    maxWidth: "58%",
  },
  logoContainer: {
    marginBottom: 8,
    height: 31,
    width: 43,
  },
  logoImage: {
    width: 43,
    height: 31,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 10,
    fontFamily: fontFamily.medium,
    lineHeight: 18,
  },
  buttonContainer: {
    alignSelf: "flex-start",
  },
  bannerButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
    color: "#000000",
    fontWeight: "700",
    fontSize: 11,
    textAlign: "center",
  },
  bannerImage: {
    width: 110,
    height: 110,
  },
});
