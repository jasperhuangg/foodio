import * as firebase from "firebase";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { FlatList, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

import {
  setTabsShowing,
  setUserID,
  setViewingRecipe,
  setViewingRecipeStep,
} from "../util/app-redux";
import Post from "./Post/Post";

const window = Dimensions.get("window");

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
    viewingRecipe: state.viewingRecipe,
    viewingRecipeStep: state.viewingRecipeStep,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserID: (userID) => {
      dispatch(setUserID(userID));
    },
    setViewingRecipe: (recipeID) => {
      dispatch(setViewingRecipe(recipeID));
    },
    setViewingRecipeStep: (stepNum) => {
      dispatch(setViewingRecipeStep(stepNum));
    },
    setTabsShowing: (showing) => {
      dispatch(setTabsShowing(showing));
    },
  };
};

function Home(props) {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // get all posts from firestore by timestamp
    firebase
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
        setLoaded(true);
      });
  }, []);

  if (loaded)
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScrollView>
          {posts.map((post) => (
            <Post
              key={post.recipeID}
              navigation={props.navigation}
              post={post}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  else
    return (
      <SafeAreaView
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: window.width,
          height: window.height - 120,
        }}
      >
        <ActivityIndicator size="small" color="grey" />
      </SafeAreaView>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
