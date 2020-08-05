import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "./Profile";

const Stack = createStackNavigator();

export default function ProfileStack(props) {
  return (
    <Stack.Navigator lazy initialRouteName="Profile" screenOptions={{}}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}