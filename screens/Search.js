import React from "react";
import { StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";

const window = Dimensions.get("window");

export default (props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          width: window.width * 0.7,
          textAlign: "center",
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        Search for recipes posted globally by all users.
      </Text>
    </SafeAreaView>
  );
};
