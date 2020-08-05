import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as firebase from "firebase";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
      following: [],
      username: null,
    }
  }

  componentDidMount() {
    const ref = firebase.firestore().collection("users").doc("admin").get();

    ref.then((document) => {
      console.log(document);

      this.state.followers = document.get("followers");
      this.state.following = document.get("following");
      this.state.username = document.get("username");

    });
  }

  render() {
    return (<View style = {
      {
        flex: 1, justifyContent: 'center', alignItems: 'center'
      }
    }><Text>{this.state.username}</Text>
      </View>);
  }
}