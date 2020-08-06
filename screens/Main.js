import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import Home from "./Home/Home";
import Create from "./Create";
import { setTabsShowing, setUserID } from "../util/app-redux";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import ProfileStack from "./Profile/ProfileStack";
import HomeStack from "./Home/HomeStack";

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

  const renderHomeIcon = (focused, color, size) => {
    if (focused)
      return <MaterialCommunityIcons name="home" size={24} color={color} />;
    return (
      <MaterialCommunityIcons name="home-outline" size={24} color={color} />
    );
  };

  function renderCreateIcon(focused, color, size) {
    return <AntDesign name="plussquareo" size={size} color={color} />;
  }

  function renderProfileIcon(focused, color, size) {
    if (focused) return <MaterialIcons name="person" size={24} color={color} />;
    else return <MaterialIcons name="person-outline" size={24} color={color} />;
  }

  function renderSearchIcon(focused, color, size) {
    return <FontAwesome name="search" size={24} color={color} />;
  }

  function renderChallengeIcon(focused, color, size) {
    if (focused)
      return (
        <MaterialCommunityIcons name="trophy-variant" size={24} color={color} />
      );
    else
      return (
        <MaterialCommunityIcons
          name="trophy-variant-outline"
          size={24}
          color={color}
        />
      );
  }

  return (
    <Tab.Navigator
      tabBarOptions={{ activeTintColor: "orange", allowFontScaling: true }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home")
            return renderHomeIcon(focused, color, size);
          if (route.name === "Create")
            return renderCreateIcon(focused, color, size);
          if (route.name === "Profile")
            return renderProfileIcon(focused, color, size);
          if (route.name === "Search")
            return renderSearchIcon(focused, color, size);
          if (route.name === "Challenge")
            return renderChallengeIcon(focused, color, size);
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: "Feed" }}
        options={{ tabBarVisible: props.tabsShowing }}
      />
      <Tab.Screen
        name="Search"
        component={Create}
        options={{ tabBarVisible: props.tabsShowing }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{ title: "Add Post" }}
      />
      <Tab.Screen
        name="Challenge"
        component={Create}
        options={{ tabBarVisible: props.tabsShowing }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ tabBarVisible: props.tabsShowing }}
      />
    </Tab.Navigator>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
