import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
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
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection("users").doc("admin").get();

    ref.then((document) => {
      console.log(document);

      this.setState({
        followers: document.get("followers"),
        following: document.get("following"),
      });
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{this.state.username}</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
