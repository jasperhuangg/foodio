import * as firebase from "firebase";
import React, { Component } from "react";
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
} from "../../util/app-redux";
import Post from "../Post/Post";

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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
      following: [],
      posts: [],
      username: props.userID,
      loaded: false,
    };
  }

  async componentDidMount() {
    const firestore = firebase.firestore();
    const userDocument = await firestore.collection("users").doc("admin").get();

    const posts = firestore.collection("posts");
    var userPosts = [];
    // Horribly inefficient, but did not find a method that returns multiple
    // docs at once

    for (const postId of userDocument.get("posts")) {
      const post = await posts.doc(postId).get();

      userPosts.push({
        postID: postId,
        comments: post.get("comments"),
        likes: post.get("likes"),
        recipeID: post.get("recipeID"),
        recipeName: post.get("recipeName"),
        imageUrl: post.get("imageUrl"),
      });
    }

    this.setState({
      followers: userDocument.get("followers"),
      following: userDocument.get("following"),
      posts: userPosts,
      loaded: true,
    });
  }

  render() {
    if (this.state.loaded)
      return (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScrollView>
            {this.state.posts.map((post) => (
              <Post
                postID={post.postID}
                key={post.recipeID}
                navigation={this.props.navigation}
                recipeID={post.recipeID}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
