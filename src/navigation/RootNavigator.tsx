import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

import { app } from "../firebase";
import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import { getAuth } from "@firebase/auth";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button } from "../components";
const Tab = createBottomTabNavigator();

const auth = getAuth(app);
// const auth = Auth

export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (authenticatedUser) => {
        try {
          if (authenticatedUser) {
            await setUser(authenticatedUser);
          }
          // await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Tab Navigator
  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          tabBar={(props) => {
            // console.log(props);
            return (
              <View style={styles.tabBar}>
                {/* <Button
                  backgroundColor="#ff0000"
                  onPress={() => alert("hi")}
                  containerStyle={{ borderRadius: 15 }}
                  title={"⏺"}
                  width="20%"
                />
                <Text style={{ color: "#ff0000" }}>Test</Text> */}
              </View>
            );
          }}
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            // tabBarStyle: {
            //   position: "absolute",
            //   backgroundColor: "transparent",
            //   borderWidth: 0,
            // },
          }}
        >
          <Tab.Screen name="Main" component={HomeStack} />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "transparent",
    height: "15%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1,
    flex: 1,
    alignItems: "center",
  },
});
