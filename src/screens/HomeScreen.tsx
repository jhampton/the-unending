import { getAuth } from "@firebase/auth";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { IconButton } from "../components";
import { app } from "../firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const auth = getAuth(app);

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      console.log("handleSignOut:press");
      await auth.signOut();
      // @ts-ignore TODO: Figure out how to type a NULL setState
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.row}>
        <Text style={styles.title}>3 new notes</Text>
        <IconButton
          name="logout"
          size={24}
          color="#fff"
          onPress={handleSignOut}
        />
      </View>
      <View
        style={{ position: "relative", top: 10, width: "100%", height: "80%" }}
      >
        <View
          style={[
            styles.card,
            {
              top: "-10%",
              zIndex: 1,
              opacity: 0.6,
              transform: [{ scale: 0.8 }],
            },
          ]}
        >
          <Text>Card 3</Text>
        </View>
        <View
          style={[
            styles.card,
            {
              top: "-3%",
              zIndex: 2,
              opacity: 0.8,
              transform: [{ scale: 0.9 }],
            },
          ]}
        >
          <Text>Card 2</Text>
        </View>
        <View
          style={[
            styles.card,
            {
              top: "5%",
              zIndex: 3,
              opacity: 1.0,
              transform: [{ scale: 1.0 }],
            },
          ]}
        >
          <Text>Card 1</Text>
        </View>
      </View>
      <Text style={styles.text}>Your UID is: {user?.uid} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030203",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#fff",
  },
  card: {
    position: "absolute",
    top: 30,
    height: "90%",
    width: "90%",
    backgroundColor: "#f4f4f4",
    left: "5%",
    padding: 12,
    borderRadius: 12,
  },
});
