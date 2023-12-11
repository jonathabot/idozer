import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { BoldText, LightText, RegularText } from "../components/Text";

const WelcomeScreen = () => {
  return (
    <View style={styles.slide}>
      <LightText texto="idozer" size={32} />
      <Image source={require("../../assets/kit.png")} style={styles.image} resizeMode="contain"/>
      <View style={styles.textDiv}>
        <BoldText texto="Bem vindo!" size={40} color="#05B494" />
        <RegularText
          texto="Seja muito bem-vindo ao nosso aplicativo! Estamos aqui para ajudá-lo a manter-se organizado e garantir que você tome seus medicamentos corretamente. "
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
    height: "auto",
  },
  image: {
    flex: 1
  }
});

export default WelcomeScreen;
