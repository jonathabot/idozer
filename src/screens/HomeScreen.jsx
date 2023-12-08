import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
} from "../components/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FAB } from "react-native-elements";

const JSON = [
  {
    id: 1,
    iconStatus: "relogio",
    titulo: "Amoxicilina 250mg",
    descricao: "Tomar 2 vezes ao dia",
    iconAction: "legal123",
  },
  {
    id: 2,
    iconStatus: "done",
    titulo: "Amoxicilina 250mg",
    descricao: "Tomar 2 vezes ao dia não se esquecer OKOKOKOKOKOKOKOK",
    iconAction: "pilula",
  },
];

const HomeScreen = () => {
  const daysOfWeek = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
  const dataDeHoje = new Date();
  const diaDeHoje = daysOfWeek[dataDeHoje.getDay()];

  const [selectedItem, setSelectItem] = useState(diaDeHoje);

  const navigation = useNavigation();

  const navigateToNewReminder = () => {
    navigation.navigate("NewReminder");
  };

  const navigateToEditReminder = () => {
    navigation.navigate("EditReminder");
  };

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
            {JSON.map((item) => (
              <View
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
                  <Text> Hi</Text>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: 230,
                  }}
                >
                  <BoldText texto={item.titulo} size={16} />
                  <RegularText texto={item.descricao} />
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                  }}
                >
                  <Text>Hi</Text>
                </View>
              </View>
            ))}
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

// import { addDays, format } from "date-fns";
// import React, { useEffect, useState } from "react";
// import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import { Agenda } from "react-native-calendars";

// const HomeScreen = () => {
//   const [items, setItems] = useState({});

//   useEffect(() => {
//     // run once

//     const getData = async () => {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts"
//       );
//       const data = await response.json();

//       // console.log(data);

//       const mappedData = data.map((post, index) => {
//         const date = addDays(new Date(), index);

//         return {
//           ...post,
//           date: format(date, "yyyy-MM-dd"),
//         };
//       });

//       const reduced = mappedData.reduce((acc, currentItem) => {
//         const { date, ...coolItem } = currentItem;

//         acc[date] = [coolItem];

//         return acc;
//       }, {});

//       setItems(reduced);
//     };

//     getData();
//   }, []);

//   const renderItem = (item) => {
//     return (
//       <View style={styles.itemContainer}>
//         <Text>{item.name}</Text>
//         <Text>{item.cookies ? `🍪` : `😋`}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Agenda items={items} renderItem={renderItem} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//   },
//   itemContainer: {
//     backgroundColor: "white",
//     margin: 5,
//     borderRadius: 15,
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//   },
// });

// export default HomeScreen;
