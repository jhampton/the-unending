import React from "react";
import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  useWindowDimensions,
} from "react-native";

export default (): JSX.Element => {
  const pan = useRef(new Animated.ValueXY()).current;
  const window = useWindowDimensions();
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
          // x: pan.x._value,
          // y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x, // x,y are Animated.Value
            dy: pan.y,
          },
        ],
        { useNativeDriver: true }
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
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
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [
            { scale: 1.0 },
            { translateX: pan.x },
            { translateY: pan.y },
          ],
        }}
      >
        <View
          style={[
            styles.card,
            {
              top: "5%",
              zIndex: 3,
              opacity: 1.0,
            },
          ]}
        >
          <Text>Card 1</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    top: 10,
    width: "100%",
    height: "80%",
  },
  // row: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: 24,
  // },
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
    height: "80%",
    width: "90%",
    backgroundColor: "#f4f4f4",
    left: "5%",
    padding: 12,
    borderRadius: 12,
  },
});
