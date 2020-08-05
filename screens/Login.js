import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  DrawerLayoutAndroidComponent,
} from "react-native";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { setUserID } from "../util/app-redux";

const window = Dimensions.get("window");

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

function Login(props) {
  const [username, setUsername] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {}, []);

  function handleAuth() {
    setIsAuthenticating(true);
    props.setUserID(username);
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        props.navigation.replace("Main");
      })
      .catch(function (error) {
        alert(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => handleAuth()}>
          <Text style={styles.header}>Sign In</Text>
          <TextInput
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            placeholder="Username"
            onChangeText={(username) => setUsername(username)}
          />
          <TouchableOpacity
            style={[
              styles.button,
              isAuthenticating ? styles.disabledButton : {},
            ]}
            disabled={isAuthenticating}
            onPress={() => {
              if (!isAuthenticating) handleAuth();
            }}
          >
            {isAuthenticating ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <Text style={styles.buttonText}>SIGN IN</Text>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: window.width,
    height: window.height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: 0.7 * window.width,
    height: 0.7 * window.height,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  header: {
    fontWeight: "900",
    fontSize: 40,
    marginBottom: 40,
  },
  input: {
    fontSize: 16,
    padding: 7,
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "orange",
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 0.7 * window.width,
    borderRadius: 7,
  },
  disabledButton: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 3,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
