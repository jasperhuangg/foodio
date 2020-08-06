import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
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
        setPosts(postArr);
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
      {posts.map((post) => {
        return (
          <View>
            <Text>{post.recipeID}</Text>
          </View>
        );
      })}
    </SafeAreaView>
  );
};
