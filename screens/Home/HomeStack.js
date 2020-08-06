import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import Home from "./Home";
import Recipe from "../Recipe/Recipe";
import RecipeVideos from "../Recipe/RecipeVideos";

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
    <Stack.Navigator initialRouteName="Home" screenOptions={{}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "foodio",
          headerTitleStyle: {
            fontWeight: "900",
            fontSize: 20,
          },
          headerTintColor: "orange",
        }}
      />
      <Stack.Screen
        name="Recipe"
        component={Recipe}
        options={{
          title: "",
          headerTintColor: "orange",
        }}
      />
      <Stack.Screen
        name="RecipeVideos"
        component={RecipeVideos}
        options={{
          title: "",
          headerTintColor: "orange",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStack);
