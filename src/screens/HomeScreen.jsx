import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
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
import { useIsFocused } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";

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
  const menu = [
    { nome: "Resetar", function: "resetReminders" },
    { nome: "Sair", function: "deslogarUser" },
  ];
  const dataDeHoje = new Date();
  const diaDeHoje = daysOfWeek[dataDeHoje.getDay()];
  const [lembretes, setLembretes] = useState([]);
  const [lembretesFiltrados, setLembretesFiltrados] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setLembretes(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function filtrarLembretes(filtro) {
    const resultadoFiltrado = lembretes.filter(
      (objeto) => objeto.dia === filtro
    );
    if (resultadoFiltrado.length > 0) {
      setLembretesFiltrados(resultadoFiltrado);
    } else {
      setLembretesFiltrados([]);
    }
  }

  async function resetReminders() {
    await AsyncStorage.removeItem("lembretes");
  }

  async function deslogarUser() {
    navigation.navigate("Start");
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getLembretes();
    }
  }, [isFocused]);

  useEffect(() => {
    console.log(selectedItem);
    filtrarLembretes(selectedItem);
    setLoading(false);
  }, [lembretes]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.headerDiv}>
          <View style={styles.personButton}>
            <TouchableOpacity>
              {/* <Image
                source={require("../../assets/personIcon.png")}
                style={styles.personIcon}
              /> */}
              <SelectDropdown
                data={menu}
                onSelect={(selectedItem) => {
                  if (selectedItem.function == "resetReminders") {
                    resetReminders();
                    setLembretes([]);
                    setLembretesFiltrados([]);
                  }
                  if (selectedItem.function == "deslogarUser") {
                    resetReminders();
                    setLembretes([]);
                    setLembretesFiltrados([]);
                    deslogarUser();
                  }
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return <LightText texto={selectedItem.nome} />;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return <LightText texto={item.nome} />;
                }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Image
                      source={require("../../assets/personIcon.png")}
                      style={styles.personIcon}
                    />
                  );
                }}
                dropdownStyle={styles.dropdownStyle}
              />
            </TouchableOpacity>
          </View>
          <LightText texto="idozer" size={32} />
        </View>
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
              <TouchableOpacity
                onPress={() => {
                  setSelectItem(item), filtrarLembretes(item);
                }}
              >
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
            {loading ? (
              <ActivityIndicator size="large" color="#05B494" />
            ) : (
              <View>
                {lembretesFiltrados ? (
                  <View>
                    {lembretesFiltrados.map((item) => (
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
                          <Image
                            source={getStatusIconByName(item.iconStatus)}
                          />
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
                ) : (
                  <BoldText texto="Algo deu errado..." />
                )}
              </View>
            )}
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
  headerDiv: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
  },
  personButton: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "42.5%",
  },
  personIcon: { width: 50, height: 50, borderRadius: 100, left: "15%" },
  dropdown1BtnStyle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownStyle: {
    borderRadius: 15,
    width: 100,
  },
});

export default HomeScreen;
