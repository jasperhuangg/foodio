import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import * as firebase from "firebase";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserID: (userID) => {
      dispatch(setUserID(userID));
    },
  };
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
      following: [],
      username: props.userID,
      posts: [],
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection("users").doc("admin").get();

    ref.then((document) => {
      this.setState({
        followers: document.get("followers"),
        following: document.get("following"),
        posts: document.get("posts"),
      });
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

        <React.Fragment>
          {this.state.posts.map((listitem) => (
            <Button title={"Elem"} />
          ))}

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Recipe")}
          >
            <Text>View Recipe</Text>
          </TouchableOpacity>
        </React.Fragment>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
