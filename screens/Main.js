import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import Home from "./Home";
import Create from "./Create";
import ProfileStack from "./Profile/ProfileStack";
import { setTabsShowing, setUserID } from "../util/app-redux";

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
    tabsShowing: state.tabsShowing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserID: (userID) => {
      dispatch(setUserID(userID));
    },
    setTabsShowing: (showing) => {
      dispatch(setTabsShowing(showing));
    },
  };
};

const Tab = createBottomTabNavigator();

function Main(props) {
  useEffect(() => {
    return () => {
      props.setTabsShowing(false);
    };
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ tabBarVisible: props.tabsShowing }}
      />
    </Tab.Navigator>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
