import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./Home";


function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
  
  

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
      <NavigationContainer><Tab.Navigator>
      <Tab.Screen name = 'Home' component =
       {
         HomeScreen
       } />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>);
}