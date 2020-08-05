import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import Home from "./Home";
import Create from "./Create";
import ProfileStack from "./Profile/ProfileStack";

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

const Tab = createBottomTabNavigator();

function Main(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Create" component={Create} />
    </Tab.Navigator>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
