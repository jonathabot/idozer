import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "@use-expo/font";
import AppLoading from "expo-app-loading";

export default function App() {

  const customFonts = {
    light: require("./assets/fonts/Poppins-Light.ttf"),
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
  };
  let [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const theme = useMemo(() => ({
    background: {
      primary: "#EFFAFF",
      secondary: "#05B494",
      third: "#D8FFF8",
      white: "#fff",
      grey: "##EBEBEB",
      lightGrey: "rgba(216, 216, 216, 0.2)",
      orange: "#FFE190"

    },
    text: {
      dark: "#222222",
      light: "#96A5BA",
      green: "#05B494",
    },
  }), []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});4
