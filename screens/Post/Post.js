import * as firebase from "firebase";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
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
    this.state = {};
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
        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1596181367808-c7c64b779b46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          }}
          style={{ height: 400, width: 400, resizeMode: "cover" }}
        />
        <Text style={styles.header}>recipe name</Text>
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
      </SafeAreaView>
    );
  }
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
