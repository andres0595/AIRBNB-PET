import { StyleSheet, Text, View } from "react-native";

export default function BlogScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Blog Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
