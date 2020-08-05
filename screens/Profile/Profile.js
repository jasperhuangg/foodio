import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { setViewingRecipe, setUserID } from '../../util/app-redux'

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
    viewingRecipe: state.viewingRecipe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserID: (userID) => {
      dispatch(setUserID(userID));
    },
    setViewingRecipe: (recipeID) => {
      dispatch(setViewingRecipe(recipeID));
    }
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
    };
  }

  async componentDidMount() {
    const firestore = firebase.firestore();
    const userDocument = await firestore.collection("users").doc("admin").get();

    const posts = firestore.collection("posts");
    var userPosts = [];
    // Horribly inefficient, but did not find a method that returns multiple docs at once
    for (const postId of userDocument.get("posts")) {
      const post = await posts.doc(postId).get();
      userPosts.push({
        comments: post.get("comments"),
        likes: post.get("likes"),
        recipeID: post.get("recipeID"),
      });
    }

    this.setState({
      followers: userDocument.get("followers"),
      following: userDocument.get("following"),
      posts: userPosts,
    });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{this.state.username}</Text>

        <React.Fragment>{this.state.posts.map(
          post =>
            (
              <Button
                onPress={() => {
                  setViewingRecipe(post.recipeID);
                  props.navigation.replace("Recipe")
                }}
                title={"View Recipe " + post.recipeID}
                color="#841584">
              </Button>
            ))}
        </React.Fragment>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
