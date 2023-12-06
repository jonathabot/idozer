import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThinText } from "../components/Text";

const WelcomeScreen = () => {
  return (
    <View style={styles.slide}>
      <Text>Idozer</Text>
      <Text>Teste idozer</Text>
      <ThinText texto="Teste" />
      <Text>
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
  // text: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  poppinsThin: {
    fontFamily: "Poppins-Thin",
    fontSize: 20,
  },
});

export default WelcomeScreen;
