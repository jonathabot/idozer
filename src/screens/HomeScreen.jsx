import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
} from "../components/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const statusIcons = [
  { nome: "done", icon: require("../../assets/done.png") },
  { nome: "relogio", icon: require("../../assets/relogio.png") },
];

const icons = [
  { nome: "Comprimido", icon: require("../../assets/comprimido.png") },
  { nome: "Cápsula", icon: require("../../assets/capsulas.png") },
];

const HomeScreen = () => {
  const daysOfWeek = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
  const dataDeHoje = new Date();
  const diaDeHoje = daysOfWeek[dataDeHoje.getDay()];
  const [lembretes, setLembretes] = useState([]);

  const [selectedItem, setSelectItem] = useState(diaDeHoje);

  const navigation = useNavigation();

  const navigateToNewReminder = () => {
    navigation.navigate("NewReminder");
  };

  const navigateToEditReminder = () => {
    navigation.navigate("EditReminder");
  };

  const getIconByName = (nome) => {
    const foundIcon = icons.find((item) => item.nome === nome);
    return foundIcon ? foundIcon.icon : null;
  };

  const getStatusIconByName = (nome) => {
    const foundIcon = statusIcons.find((item) => item.nome === nome);
    return foundIcon ? foundIcon.icon : null;
  };

  async function getLembretes() {
    try {
      const data = await AsyncStorage.getItem("lembretes");
      if (data !== null) {
        // We have data!!
        console.log(data);
        setLembretes(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  }

  useEffect(() => {
    console.log("carregando...");
    getLembretes();
    console.log("carregou...");
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <LightText texto="idozer" size={32} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 35,
          }}
        >
          {daysOfWeek.map((item, index) => (
            <View
              style={{
                width: 42,
                marginRight: 5,
                padding: 5,
                backgroundColor: selectedItem == item ? "#05B494" : "white",
                borderRadius: 5,
                alignItems: "center",
              }}
              key={index}
            >
              <TouchableOpacity onPress={() => setSelectItem(item)}>
                <MediumText
                  texto={item}
                  size={12}
                  color={selectedItem == item ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View
          style={{
            backgroundColor: "#EBEBEB",
            height: "100%",
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              marginTop: 30,
              marginLeft: 20,
              width: "90%",
              height: "100%",
            }}
          >
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <RegularText texto="Lembretes de Hoje" size={20} />
            </View>
            {lembretes ? (
              <View>
                {lembretes.map((item) => (
                  <TouchableOpacity
                    onPress={navigateToEditReminder}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      marginBottom: 20,
                      justifyContent: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderRadius: 5,
                    }}
                    key={item.id}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 50,
                      }}
                    >
                      <Image source={getStatusIconByName(item.iconStatus)} />
                    </View>

                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                        width: 230,
                      }}
                    >
                      <BoldText texto={item.titulo} size={16} />
                      <RegularText texto={item.dosagem} />
                    </View>

                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 50,
                      }}
                    >
                      <Image source={getIconByName(item.iconAction)} />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.divButton}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={navigateToNewReminder}
          style={styles.floatingButtonStyle}
        >
          <BoldText texto="+" color="white" size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    fontFamily: "light",
  },
  divButton: {
    alignItems: "flex-end",
    bottom: 45,
    right: 20,
  },
  floatingButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    backgroundColor: "#05B494",
    width: 75,
    height: 75,
    borderRadius: 100,
  },
});

export default HomeScreen;
