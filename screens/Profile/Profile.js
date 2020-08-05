import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

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
      posts: [],
      username: props.userID,
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('users').doc('admin').get();

    ref.then((document) => {
      this.setState({
        followers: document.get('followers'),
        following: document.get('following'),
        posts: document.get('posts'),
      });
    });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1, justifyContent: 'center', alignItems: 'center',
        }}
      >
        <Text>{this.state.username}</Text>

        <React.Fragment><ul>{this.state.posts.map(
          listitem =>
            (
              <Button
                onPress={() => { console.log(listitem); }}
                title="View Recipe"
                color="#841584">
              </Button>
            ))}
        </ul>
        </React.Fragment>

      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
