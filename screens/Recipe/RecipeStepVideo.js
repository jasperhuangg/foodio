import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Video } from "react-native-video";

const window = Dimensions.get("window");

export default (props) => {
  console.log("here");
  return (
    <View style={styles.container}>
      <Text>video</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: window.width,
    height: "100%",
    borderWidth: 1,
  },
});
