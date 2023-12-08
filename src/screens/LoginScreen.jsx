import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import {
  BoldText,
  BoldTextLink,
  LightText,
  MediumText,
  RegularText,
} from "../components/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const navigation = useNavigation();

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  async function loginUser() {
    console.log(username);
    console.log(email);
    console.log(password);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <LightText texto="idozer" size={32} />

        <View style={styles.form}>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <BoldText texto="Sign in" color="#05B494" size={20} />
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
              flexDirection: "row",
              alignItems: "center",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
              marginLeft: -10,
            }}
          >
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
              <LightText texto="Remember me     " />
            </View>
            <TouchableOpacity onPress={() => console.log("hi")}>
              <BoldText texto="Forgot Password?" color="#05B494" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.buttonRegister} onPress={loginUser}>
            <RegularText texto="Sign In" color="#FFFFFF" size={16} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            <LightText texto="Don't have an account? " />
            <TouchableOpacity onPress={navigateToRegister}>
              <BoldTextLink texto="Register now" color="#05B494" />
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

export default LoginScreen;
