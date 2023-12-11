import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { BoldText, LightText, RegularText } from "../components/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { Icon } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tiposMedicamentos = ["Comprimido", "Cápsula"];
const diasDaSemana = [
  {
    id: 1,
    dia: "Domingo",
    short: "dom",
  },
  {
    id: 2,
    dia: "Segunda-feira",
    short: "seg",
  },
  {
    id: 3,
    dia: "Terça-feira",
    short: "ter",
  },
  {
    id: 4,
    dia: "Quarta-feira",
    short: "qua",
  },
  {
    id: 5,
    dia: "Quinta-feira",
    short: "qui",
  },
  {
    id: 6,
    dia: "Sexta-feira",
    short: "sex",
  },
  {
    id: 7,
    dia: "Sábado",
    short: "sab",
  },
];

const EditReminder = ({ route }) => {
  const { item, reminders } = route.params;

  const [id, setId] = useState(item.id);
  const [nomeRemedio, setNomeRemedio] = useState(item.titulo);
  const [tipoRemedio, setTipoRemedio] = useState(item.iconAction);
  const [dosagem, setDosagem] = useState(item.dosagem);
  const [horario, setHorario] = useState(item.horario);
  const [dia, setDia] = useState(item.dia);

  const findDia = diasDaSemana.find((each) => each.short === dia);
  const diaName = findDia.dia;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(item.horario);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();

  async function editReminder() {
    const newReminder = {
      id: id,
      iconStatus: "relogio",
      titulo: nomeRemedio,
      dosagem: dosagem,
      horario: horario,
      dia: dia,
      iconAction: tipoRemedio,
    };

    const getReminder = await AsyncStorage.getItem("lembretes");

    if (getReminder != null) {
      const lembretesJson = JSON.parse(getReminder);
      const idToRemove = id;
      const novosLembretes = lembretesJson.filter(
        (item) => item.id !== idToRemove
      );
      novosLembretes.push(newReminder);
      console.log(novosLembretes);
      await AsyncStorage.removeItem("lembretes");
      await AsyncStorage.setItem("lembretes", JSON.stringify(novosLembretes));
    }
    console.log("Novo lembrete editado!");
    // resetPage();
    navigation.navigate("Home");
  }

  async function removeReminder() {
    const getReminder = await AsyncStorage.getItem("lembretes");

    if (getReminder != null) {
      const lembretesJson = JSON.parse(getReminder);
      const idToRemove = id;
      const novosLembretes = lembretesJson.filter(
        (item) => item.id !== idToRemove
      );
      await AsyncStorage.removeItem("lembretes");
      await AsyncStorage.setItem("lembretes", JSON.stringify(novosLembretes));
    }
    console.log("Novo lembrete apagado!");
    navigation.navigate("Home");
  }

  function resetPage() {
    setNomeRemedio("");
    setTipoRemedio(null);
    setDosagem("");
    setHorario("");
    setDia("");

    setSelectedTime("");
  }

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (time) => {
    const hours = String(time.getHours());
    const minutes = String(time.getMinutes());

    const horas = hours.length < 2 ? `0${hours}` : hours;
    const minutos = minutes.length < 2 ? `0${minutes}` : minutes;
    setSelectedTime(`${horas}:${minutos}`);
    setHorario(`${horas}:${minutos}`);
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          <BoldText texto="Adicionar um novo lembrete" size={16} />
          <TouchableOpacity onPress={removeReminder}>
            <Icon name="trash-outline" type="ionicon" color="red" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <BoldText texto="Novo lembrete" size={16} />
          <RegularText texto="Cadastre um novo medicamento:" size={16} />
        </View>

        <View style={styles.form}>
          <View style={styles.formElement}>
            <RegularText texto="Nome (ex: Sertralina)*" size={14} />
            <TextInput
              style={styles.input}
              value={nomeRemedio}
              placeholder="Ibuprofeno"
              onChangeText={(text) => setNomeRemedio(text)}
              autoCapitalize={"none"}
            />
          </View>

          <View style={styles.formElement}>
            <RegularText texto="Tipo de Medicamento*" size={14} />
            <SelectDropdown
              data={tiposMedicamentos}
              onSelect={(selectedItem) => {
                setTipoRemedio(selectedItem);
              }}
              defaultButtonText={
                <LightText
                  texto={tipoRemedio ? tipoRemedio : "Selecione o tipo"}
                  size={13}
                />
              }
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.btnTextStyle}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return <LightText texto={selectedItem} />;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return <LightText texto={item} />;
              }}
              renderDropdownIcon={(isOpened) => {
                return (
                  <LightText
                    texto={
                      isOpened ? (
                        <Icon name="chevron-up-outline" type="ionicon" />
                      ) : (
                        <Icon name="chevron-down-outline" type="ionicon" />
                      )
                    }
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdownStyle}
            />
          </View>

          <View style={styles.formElement}>
            <RegularText texto="Dosagem (ex: 100mg)*" size={14} />
            <TextInput
              style={styles.input}
              value={dosagem}
              placeholder="200mg"
              onChangeText={(text) => setDosagem(text)}
              autoCapitalize={"none"}
            />
          </View>

          <View style={styles.formElement}>
            <RegularText texto="Horário do lembrete*" size={14} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={showDatePicker}
                style={styles.floatingButtonStyle}
              >
                <BoldText
                  texto={
                    selectedTime ? (
                      <BoldText texto={selectedTime} color="white" />
                    ) : (
                      <BoldText texto="+" color="white" size={40} />
                    )
                  }
                />
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              date={selectedDate}
              isVisible={datePickerVisible}
              mode={"time"}
              is24Hour={true}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>

          <View style={styles.formElement}>
            <RegularText texto="Dia do lembrete*" size={14} />
            <SelectDropdown
              data={diasDaSemana}
              onSelect={(selectedItem, index) => {
                setDia(selectedItem.short);
              }}
              defaultButtonText={
                <LightText
                  texto={diaName ? diaName : "Selecione o dia"}
                  size={13}
                />
              }
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.btnTextStyle}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return <LightText texto={selectedItem.dia} />;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return <LightText texto={item.dia} />;
              }}
              renderDropdownIcon={(isOpened) => {
                return (
                  <LightText
                    texto={
                      isOpened ? (
                        <Icon name="chevron-up-outline" type="ionicon" />
                      ) : (
                        <Icon name="chevron-down-outline" type="ionicon" />
                      )
                    }
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdownStyle}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={editReminder}
          >
            <BoldText texto="EDITAR LEMBRETE" color="#FFFFFF" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    alignItems: "center",
    fontFamily: "light",
    marginLeft: 30,
    width: "85%",
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    fontFamily: "light",
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    width: "100",
    height: 40,
    borderRadius: 4,
    backgroundColor: "white",
  },
  buttonRegister: {
    marginTop: 10,
    width: "100",
    height: 40,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#05B494",
    marginBottom: 20,
  },
  dropdown1BtnStyle: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 15,
    width: "100",
    height: 40,
    borderRadius: 4,
    backgroundColor: "white",
  },
  btnTextStyle: {
    fontFamily: "light",
    fontSize: 14,
    color: "black",
    textAlign: "left",
    marginLeft: 2,
  },
  dropdownStyle: {
    borderRadius: 15,
  },
  floatingButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    backgroundColor: "#05B494",
    width: 60,
    height: 60,
    marginTop: 5,
    borderRadius: 100,
    marginBottom: 15,
  },
});

export default EditReminder;
