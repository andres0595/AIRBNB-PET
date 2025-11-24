import AuthLayout from "@/components/AuthLayout";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import alojamientoMascotas from "../../assets/Icons/svg-servicios/Alojamiento.png";
import Banio from "../../assets/Icons/svg-servicios/Banio.png";
import Cuidado from "../../assets/Icons/svg-servicios/Cuidado.png";
import Guarderia from "../../assets/Icons/svg-servicios/Guarderia.png";
import Paseos from "../../assets/Icons/svg-servicios/Paseos.png";

export default function HomeScreen() {
  return (
    <AuthLayout contentStyle={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.hello}>¡Hola! Maria</Text>
        <Text style={styles.welcome}>
          Bienvenida a <Text style={styles.brand}>PuppyPó</Text>
        </Text>
      </View>

      {/* TITLE */}
      <Text style={styles.question}>¿Qué deseas reservar hoy?</Text>

      {/* GRID DE SERVICIOS */}
      <View style={styles.grid}>
        <ServiceCard
          title="Alojamiento de mascotas"
          image={alojamientoMascotas}
        />
        <ServiceCard title="Guardería de día" image={Guarderia} />
        <ServiceCard title="Cuidado en casa" image={Cuidado} />
        <ServiceCard title="Paseos en el barrio" image={Paseos} />
        <ServiceCard title="Baño a domicilio" image={Banio} />
      </View>

      {/* BANNER */}
      <TouchableOpacity style={styles.banner}>
        <View style={styles.bannerTextBox}>
          <Text style={styles.bannerTitle}>Conviértete en un cuidador</Text>
          <Text style={styles.bannerButton}>¡Empezar!</Text>
        </View>
        <Image
          // source={require("../../assets/Icons/cuidadores.png")}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </AuthLayout>
  );
}

function ServiceCard({ title, image }: { title: string; image: any }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={image} style={styles.cardImage} resizeMode="cover" />
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  header: {
    alignItems: "center",
    marginTop: 10,
  },
  hello: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  welcome: {
    fontSize: 20,
    color: "#333",
  },
  brand: {
    color: "#E63946",
    fontWeight: "700",
  },

  question: {
    marginTop: 25,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#222",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },

  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  cardTitle: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },

  banner: {
    marginTop: 15,
    backgroundColor: "#C2FAF0",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerTextBox: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0A4A42",
    marginBottom: 6,
  },
  bannerButton: {
    backgroundColor: "#00C8A0",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    color: "#fff",
    fontWeight: "600",
    width: 100,
    textAlign: "center",
  },
  bannerImage: {
    width: 110,
    height: 110,
    marginLeft: 10,
  },
});
