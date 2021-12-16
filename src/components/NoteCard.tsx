import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";

export type NoteCardProps = {
  data: any;
  index: number;
};
export const NoteCard: React.FC<NoteCardProps> = ({
  data,
  index,
}: NoteCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={{ uri: "https://picsum.photos/1200/800" }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
      >
        <Text style={styles.h1}>January 31, 2031</Text>
        <Text style={styles.h2}>Fort Worth, Texas</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    top: 0,
    left: 0,
    padding: 0,
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
    shadowOpacity: 0.65,
    backgroundColor: "#e4e5e4",
  },
  backgroundImage: {
    flex: 1,
    // width: "100%",
    // height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    borderRadius: 12,
    flexDirection: "column",
  },
  h1: {
    fontSize: 32,
    color: "#fffefe",
    textShadowColor: "#000000",
    backgroundColor: "#00000044",
    textShadowRadius: 4,
    padding: 6,
    marginTop: 12,
  },
  h2: {
    fontSize: 18,
    color: "#fffefe",
    // textShadowColor: "#333333",
    // textShadowRadius: 3,
    backgroundColor: "#00000044",
    marginTop: 6,
    padding: 6,
  },
});
