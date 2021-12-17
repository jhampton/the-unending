import { useFonts, Arvo_400Regular } from "@expo-google-fonts/arvo";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import AppLoading from "expo-app-loading";
import React from "react";

import Routes from "./src/navigation/index";

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Arvo_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Routes />;
  }
}
