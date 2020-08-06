import * as firebase from "firebase";
import React, { Component, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  SafeAreaView,
  View,
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
} from "../../util/app-redux";
import Post from "../Post/Post";
import { TabView, SceneMap } from "react-native-tab-view";

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

function Profile(props) {
  // class Profile extends Component {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Your Posts" },
    { key: "second", title: "Bookmarks" },
  ]);

  const renderScene = SceneMap({
    first: renderProfile,
    second: renderSaved,
  });

  const initialLayout = { width: Dimensions.get("window").width };

  useEffect(async () => {
    const firestore = firebase.firestore();
    const userDocument = await firestore
      .collection("users")
      .doc(props.userID)
      .get();
    setTabsShowing(true);
    const posts = firestore.collection("posts");

    var userPosts = [];
    // Horribly inefficient, but did not find a method that returns multiple
    // docs at once
    for (const postId of userDocument.get("posts")) {
      const post = await posts.doc(postId).get();

      const postObj = post.data();
      postObj.postID = postId;

      userPosts.push({
        postID: postId,
        comments: post.get("comments"),
        likes: post.get("likes"),
        recipeID: post.get("recipeID"),
        recipeName: post.get("recipeName"),
        imageUrl: post.get("imageUrl"),
        postedBy: post.get("postedBy"),
        timestamp: post.get("timestamp"),
      });
    }

    setPosts(userPosts);
    setLoaded(true);

    var userLikedPosts = [];
    for (const postId of userDocument.get("likes")) {
      const post = await posts.doc(postId).get();

      const postObj = post.data();
      postObj.postID = postId;

      userLikedPosts.push({
        postID: postId,
        comments: post.get("comments"),
        likes: post.get("likes"),
        recipeID: post.get("recipeID"),
        recipeName: post.get("recipeName"),
        imageUrl: post.get("imageUrl"),
        postedBy: post.get("postedBy"),
        timestamp: post.get("timestamp"),
      });
    }

    setLikedPosts(userLikedPosts);
  }, []);

  function renderProfile() {
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

  function renderSaved() {
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
            {likedPosts.map((post) => (
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

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
