import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PhoneAuth from "../screens/PhoneAuth";
import PhoneAuthVerify from "../screens/PhoneAuthVerify";
// import SignupScreen from "../screens/SignupScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PhoneAuth" component={PhoneAuth} />
      <Stack.Screen name="PhoneAuthVerify" component={PhoneAuthVerify} />
    </Stack.Navigator>
  );
}
