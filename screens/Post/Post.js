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
  Platform,
} from "react-native";
import { connect } from "react-redux";
import {
  setTabsShowing,
  setUserID,
  setViewingRecipe,
  setViewingRecipeStep,
} from "../../util/app-redux";

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

  likePost() {
    const firestore = firebase.firestore();
    const postID = this.props.postID;
    const userID = this.props.userID;
    const post = firestore.collection("posts").doc(postID);

    post.update({
      likes: firebase.firestore.FieldValue.arrayUnion(userID),
    });
  }

  unlikePost() {
    const firestore = firebase.firestore();
    const postID = this.props.postID;
    const userID = this.props.userID;
    const post = firestore.collection("posts").doc(postID);

    post.update({
      likes: firebase.firestore.FieldValue.arrayRemove(userID),
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
            this.props.setViewingRecipe(this.props.recipeID);
            this.props.setViewingRecipeStep(1);
            this.props.navigation.navigate("Recipe");
            this.props.setTabsShowing(false);
          }}
          key={this.props.recipeID}
          title={"View Recipe"}
          color="#841584"
        ></Button>
        <Button
          onPress={() => {
            this.likePost();
          }}
          title={"Like Post"}
        ></Button>
        <Button
          onPress={() => {
            this.unlikePost();
          }}
          title={"Unlike Post"}
        ></Button>
        {!this.state.imageLoaded ? <LoadingView /> : <View></View>}
        <Image
          source={{
            uri: this.props.post.imageUrl,
          }}
          style={{
            height: 400,
            width: 400,
            resizeMode: "cover",
          }}
          onLoad={(e) => {
            this.setState({ imageLoaded: true });
          }}
        />
      </SafeAreaView>
    );
  }
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
        position: "absolute",
        backgroundColor: "#f0f0f0",
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
