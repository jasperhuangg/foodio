import * as firebase from "firebase";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import {
  setTabsShowing,
  setUserID,
  setViewingRecipe,
  setViewingRecipeStep,
} from "../../util/app-redux";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

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

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { likes: props.post.likes };
  }

  async likePost() {
    const firestore = firebase.firestore();
    const postID = this.props.post.postID;
    const userID = this.props.userID;
    const postLikesID = `${postID}:${userID}`;
    const post = firestore.collection("posts").doc(postID);
    const postLikes = firestore.collection("posts-likes").doc(postLikesID);

    // TODO: Update post-likes collection
    await postLikes.set({
      liked: true
    });

    post.update({
      likes: firebase.firestore.FieldValue.arrayUnion(userID),
    });

    var newLikes = this.state.likes;
    newLikes.push(userID);

    this.setState({
      ...this.state,
      likes: newLikes,
    });
  }

  async unlikePost() {
    const firestore = firebase.firestore();
    const postID = this.props.post.postID;
    const userID = this.props.userID;
    const postLikesID = `${postID}:${userID}`;
    const post = firestore.collection("posts").doc(postID);
    const postLikes = firestore.collection("posts-likes").doc(postLikesID);

    // TODO: Update post-likes collection
    post.update({
      likes: firebase.firestore.FieldValue.arrayRemove(userID),
    });

    await postLikes.delete();

    var newLikes = this.state.likes;
    removeItemOnce(newLikes, userID);

    this.setState({
      ...this.state,
      likes: newLikes,
    });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          padding: 10,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.header}>{this.props.post.recipeName}</Text>
        <Button
          onPress={() => {
            this.props.setViewingRecipe(this.props.post.recipeID);
            this.props.setViewingRecipeStep(1);
            this.props.navigation.navigate("Recipe");
            this.props.setTabsShowing(false);
          }}
          key={this.props.post.recipeID}
          title={"View Recipe"}
          color="#841584"
        ></Button>
        {this.state.likes.includes(this.props.userID) ? (
          <TouchableOpacity onPress={() => this.unlikePost()}>
            <AntDesign name="heart" size={24} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.likePost()}>
            <AntDesign name="hearto" size={24} color="red" />
          </TouchableOpacity>
        )}
        {!this.state.imageLoaded ? <LoadingView /> : <View></View>}
        <Image
          source={{
            uri: this.props.post.imageUrl,
          }}
          style={{
            height: this.state.imageLoaded ? 400 : 0,
            width: this.state.imageLoaded ? 400 : 0,
            resizeMode: "cover",
          }}
          onLoad={(e) => {
            alert("loaded");
            this.setState({ imageLoaded: true });
          }}
        />
      </SafeAreaView>
    );
  }
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function LoadingView(props) {
  return (
    <View
      style={{
        width: 400,
        height: 400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="small" color="grey" />
    </View>
  );
}

const styles = {
  postContainerStyle: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "center",
  },
  header: {
    fontWeight: "700",
    fontSize: 27,
  },
  subheader: {
    fontWeight: "700",
    fontSize: 23,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
