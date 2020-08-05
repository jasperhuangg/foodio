import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";

import config from "./constants/config";

export default function App() {
  useEffect(() => {
    testFirebase();
  }, []);

  function testFirebase() {
    firebase.initializeApp(config.firebaseConfig);
    const ref = firebase.firestore().collection("users");
    ref.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
      });
    });
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
