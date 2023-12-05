import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WelcomeScreen = () => {
  return (
    <View style={styles.slide}>
      <Text style={styles.text}>Idozer</Text>
      <Text style={styles.text}>Teste idozer</Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, askdjkk consectetur adipiscing elit. Lorem
        ipsum dolor sit amet, askdjkk
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WelcomeScreen;
