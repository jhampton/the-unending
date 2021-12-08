import { getAuth } from "@firebase/auth";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { IconButton } from "../components";
import Swiper from "@ilterugur/react-native-deck-swiper-renewed";
import { app } from "../firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const auth = getAuth(app);

const renderCard = (card: any, index: number) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {card} - {index}
      </Text>
    </View>
  );
};
const onSwiped = (type: any) => {
  console.log(`on swiped ${type}`);
};

const onSwipedAllCards = () => {
  console.log("Swiped all cards");
};

const swipeLeft = () => {
  console.log("left");
};

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
      <View style={styles.row}>
        <Swiper
          infinite={true}
          containerStyle={styles.container}
          cards={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderCard={renderCard}
          stackSize={5}
          stackSeparation={-25}
          animateOverlayLabelsOpacity
          animateCardOpacity
          onTapCard={() => alert("Tapped")}
          swipeBackCard={true}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Your UID is: {user?.uid} </Text>
      </View>
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
    backgroundColor: "#878787",
    position: "absolute",
    top: 30,
    height: "80%",
    width: "90%",
    left: "5%",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 14,
    shadowOpacity: 0.8,
  },
});
