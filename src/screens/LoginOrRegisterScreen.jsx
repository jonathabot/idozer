import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BoldText, LightText, RegularText } from "../components/Text";
import { Image } from "react-native";

const LoginOrRegisterScreen = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.slide}>
      <LightText texto="idozer" size={32} />
      <Image
        style={styles.image}
        source={require("../../assets/medicos.png")}
        resizeMode="contain"
      />
      <View style={styles.textDiv}>
        <BoldText texto="Entre ou Cadastre-se" size={40} color="#05B494" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonSignUp} onPress={navigateToLogin}>
          <BoldText texto="SIGN IN" color="#05B494" size={16} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={navigateToRegister}
        >
          <BoldText texto="REGISTER" color="#FFFFFF" size={16} />
        </TouchableOpacity>
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
    width: 300,
    height: "auto",
  },
  buttonContainer: {
    alignItems: "center",
    width: 237,
    height: 83,
    marginTop: 20,
  },
  buttonSignUp: {
    marginTop: 20,
    width: 237,
    height: 36,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D8FFF8",
  },
  buttonRegister: {
    marginTop: 10,
    width: 237,
    height: 36,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#05B494",
  },
  image: {
    flex: 1,
  },
});

export default LoginOrRegisterScreen;
