import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import Profile from "./Profile";
import Recipe from "../Recipe/Recipe";

const Stack = createStackNavigator();

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

function ProfileStack(props) {
  return (
    <Stack.Navigator lazy initialRouteName="Profile" screenOptions={{}}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: props.userID,
        }}
      />
      <Stack.Screen
        name="Recipe"
        component={Recipe}
        options={{
          title: "",
        }}
      />
    </Stack.Navigator>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStack);
