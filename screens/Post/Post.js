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
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import {
  setTabsShowing,
  setUserID,
  setViewingRecipe,
  setViewingRecipeStep,
} from "../../util/app-redux";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

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

const window = Dimensions.get("window");

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      commentsDisplaying: false,
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
    const userCollection = firestore.collection("users").doc(userID);

    userCollection.update({
      likes: firebase.firestore.FieldValue.arrayUnion(postID),
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
    const userCollection = firestore.collection("users").doc(userID);

    post.update({
      likes: firebase.firestore.FieldValue.arrayRemove(userID),
    });

    userCollection.update({
      likes: firebase.firestore.FieldValue.arrayRemove(postID),
    });

    var newLikes = this.state.likes;
    removeItemOnce(newLikes, userID);

    this.setState({
      ...this.state,
      likes: newLikes,
    });
  }

  render() {
    return (
      <View
        style={{
          padding: 10,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
        }}
      >
        <Text style={styles.header}>{this.props.post.recipeName}</Text>
        <Text style={styles.subheader}>{this.props.post.postedBy}</Text>
        <Text style={styles.subheader}>
          {getFormattedDate(this.props.post.timestamp)}
        </Text>

        {!this.state.imageLoaded ? <LoadingView /> : <View></View>}
        <Image
          source={{
            uri: this.props.post.imageUrl,
          }}
          style={{
            height: 400,
            width: window.width - 20,
            resizeMode: "cover",
            borderRadius: 10,
          }}
          onLoad={(e) => {
            this.setState({ imageLoaded: true });
          }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "orange", padding: 7, borderRadius: 5 },
            ]}
            onPress={() => {
              this.props.setViewingRecipe(this.props.post.recipeID);
              this.props.setViewingRecipeStep(1);
              this.props.navigation.navigate("Recipe");
              this.props.setTabsShowing(false);
            }}
          >
            <Text style={{}}>Cook</Text>
          </TouchableOpacity>
          {this.state.likes.includes(this.props.userID) ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.unlikePost()}
            >
              <FontAwesome name="bookmark" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.likePost()}
            >
              <FontAwesome name="bookmark-o" size={24} color="black" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                commentsDisplaying: !this.state.commentsDisplaying,
              });
            }}
          >
            <FontAwesome5 name="comment" size={24} color="grey" />
          </TouchableOpacity>
        </View>

        <SafeAreaView
          style={{
            padding: 20,
            width: window.width - 20,
            display: this.state.commentsDisplaying ? "flex" : "none",
          }}
        >
          {this.props.post.comments.map((comment, index) => (
            <View key={index} style={{ paddingTop: 7, paddingBottom: 7 }}>
              <Text style={{ fontSize: 18, marginLeft: 20 }}>
                {comment.content}
              </Text>
              <Text style={{ fontSize: 14, color: "grey", marginLeft: 20 }}>
                {comment.postedBy} · {getFormattedDate(comment.timestamp)}
              </Text>
            </View>
          ))}
        </SafeAreaView>
      </View>
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
        width: window.width - 20,
        height: 400 + 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 100,
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
    fontWeight: "900",
    fontSize: 27,
    width: window.width - 20,
    marginBottom: 10,
  },
  subheader: {
    fontWeight: "500",
    fontSize: 16,
    color: "grey",
    width: window.width - 20,
    marginBottom: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    width: window.width - 20,
    height: 50,
    paddingLeft: 10,
  },
  button: {
    marginRight: 20,
  },
};

function getFormattedDate(timestamp) {
  console.log(timestamp);
  var date = new Date(timestamp.seconds * 1000);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
