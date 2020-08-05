import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

import Home from './Home';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
      <Tab.Navigator>
          <Tab.Screen name = 'Home' component ={
    Home} />
        <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
    );
}