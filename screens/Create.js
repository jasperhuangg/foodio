import React from 'react';
import { StyleSheet, Text, SafeAreaView } from "react-native";

export default (props) => {
  return (<SafeAreaView style = {
    {
      flex: 1, justifyContent: 'center', alignItems: 'center'
    }
  }><Text>Create!</Text>
      </SafeAreaView>);
}