import React from 'react';
import { StyleSheet, Text, View } from "react-native";

export default (props) => {
  return (<View style = {
    {
      flex: 1, justifyContent: 'center', alignItems: 'center'
    }
  }><Text>Profile!</Text>
      </View>);
}