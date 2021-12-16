import { getAuth } from "@firebase/auth";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";

import { IconButton } from "../components";
import Swiper from "@ilterugur/react-native-deck-swiper-renewed";
import { app } from "../firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { NoteCard } from "../components/NoteCard";

const auth = getAuth(app);

const renderCard = (card: any, index: number) => {
  return <NoteCard data={card} index={index} />;
  // return (
  //   <View style={styles.card}>
  //     <Text style={styles.text}>
  //       {card} - {index}
  //     </Text>
  //   </View>
  // );
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
    <View style={styles.outerContainer}>
      <StatusBar style="light" />
      <View style={styles.row}>
        <Text style={styles.title}>3 new notes</Text>
        <IconButton
          name="logout"
          size={17}
          color="#fff"
          onPress={handleSignOut}
        />
      </View>
      <Swiper
        infinite={true}
        containerStyle={styles.cardContainer}
        cards={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderCard={renderCard}
        stackSize={8}
        stackSeparation={-23}
        animateCardOpacity
        secondCardZoom={0.3}
        onTapCard={() => alert("Tapped")}
        swipeBackCard={true}
      />
      <View style={styles.row}>
        <Text style={styles.text}>Your UID is: {user?.uid} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#332929",
    paddingHorizontal: 12,
    borderRadius: 1,
    borderColor: "#ff0000",
    paddingTop: 46,
  },
  container: {
    flex: 1,
    backgroundColor: "#332929",
    paddingHorizontal: 12,
    borderRadius: 1,
    borderColor: "#ff0000",
    paddingTop: 0,
  },
  cardContainer: {
    flex: 1,
    top: 42,
    backgroundColor: "#332929",
    borderRadius: 1,
    borderColor: "#ff0000",
    paddingTop: 0,
    zIndex: -1,
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
    color: "#020302",
  },
  // card: {
  //   backgroundColor: "#e4e5e4",
  //   position: "absolute",
  //   top: 30,
  //   height: "80%",
  //   width: "96%",
  //   left: 0,
  //   padding: 12,
  //   borderRadius: 12,
  //   shadowColor: "#000000",
  //   shadowOffset: { width: 0, height: 10 },
  //   shadowRadius: 24,
  //   shadowOpacity: 0.65,
  // },
  image: {
    flex: 1,
    justifyContent: "center",
    padding: 12,
  },
});
