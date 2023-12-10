import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import {
  BoldText,
  BoldTextLink,
  LightText,
  RegularText,
} from "../components/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../services/firebase';

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const sucessRegister = useState(false);

  async function registerUser() {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      navigation.navigate('Login');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    }

  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <LightText texto="idozer" size={32} />

        <View style={styles.form}>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <BoldText texto="Create Account" color="#05B494" size={20} />
          </View>

          <View style={styles.formElement}>
            <LightText texto="Username" size={13} />
            <TextInput
              style={styles.input}
              value={username}
              placeholder="Your user"
              onChangeText={(text) => setUsername(text)}
              autoCapitalize={"none"}
            />
          </View>

          <View style={styles.formElement}>
            <LightText texto="Email" size={13} />
            <TextInput
              style={styles.input}
              value={email}
              placeholder={"Your email"}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize={"none"}
            />
          </View>

          <View style={styles.formElement}>
            <LightText texto="Password" size={13} />
            <TextInput
              style={styles.input}
              value={password}
              placeholder={"************"}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              marginBottom: 10,
              marginLeft: -10,
            }}
          >
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton
                  value="Apple"
                  status={terms ? "checked" : "unchecked"} //if the value of checked is Apple, then select this button
                  onPress={() => setTerms(terms ? false : true)} //when pressed, set the value of the checked Hook to 'Apple'
                  color="#05B494"
                />
                <LightText texto="I accept the terms" />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={registerUser}
          >
            <RegularText texto="Sign Up" color="#FFFFFF" size={16} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            <LightText texto="Already have an account?" />
            <TouchableOpacity onPress={navigateToLogin}>
              <BoldTextLink texto=" Log in" color="#05B494" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "light",
  },
  form: {
    width: 285,
  },
  input: {
    fontFamily: "light",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    width: 285,
    height: 35,
    borderRadius: 4,
  },
  buttonRegister: {
    marginTop: 10,
    width: 285,
    height: 36,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#05B494",
  },
});

export default RegisterScreen;
