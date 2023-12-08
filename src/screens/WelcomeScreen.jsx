import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { BoldText, LightText, RegularText } from "../components/Text";

const WelcomeScreen = () => {
  return (
    <View style={styles.slide}>
      <LightText texto="idozer" size={32} />
      <Image source={require("../../assets/kit.png")} />
      <View style={styles.textDiv}>
        <BoldText texto="Teste idozer" size={40} color="#05B494" />
        <RegularText
          texto="Lorem ipsum dolor sit amet, askdjkk consectetur adipiscing elit. Lorem
        ipsum dolor sit amet, askdjkkaaa"
          size={13}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 125,
  },
  textDiv: {
    width: 288,
    height: 120,
    marginTop: 40,
  },
});

export default WelcomeScreen;
