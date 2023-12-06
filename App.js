import { useFonts } from "@use-expo/font";
import AppLoading from "expo-app-loading";
import Navigation from "./src/navigation";

export default function App() {
  const customFonts = {
    light: require("./assets/fonts/Poppins-Light.ttf"),
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    thin: require("./assets/fonts/Poppins-Thin.ttf"),
  };

  let [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Navigation />;
}
