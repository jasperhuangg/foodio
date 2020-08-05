import React, { useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, Dimensions } from "react-native";
import * as firebase from "firebase";

import config from "../constants/config";

const window = Dimensions.get("window");

export default (props) => {
  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(config.firebaseConfig);
    // TODO: sign in the user (bypass login screen) if there is stuff in AsyncStorage

    // for now: just go straight to login page
    setTimeout(() => props.navigation.replace("Login"), 1500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>foodio</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "900",
    fontSize: 40,
  },
});
