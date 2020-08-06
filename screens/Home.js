import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import * as firebase from "firebase";

export default (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // get all posts from firestore by timestamp
    const ref = firebase
      .firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .limitToLast(20)
      .onSnapshot((snapshot) => {
        let postArr = [];
        snapshot.forEach((document) => {
          console.log(document.data());
          postArr.push(document.data());
        });
        this.setPosts(postArr);
      });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home!</Text>
    </SafeAreaView>
  );
};
