import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import Home from "./Home";
import Create from "./Create";
import ProfileStack from "./Profile/ProfileStack";
import { setTabsShowing, setUserID } from "../util/app-redux";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
    return <Entypo name="home" size={size} color={color} />;
  };

  function renderCreateIcon(focused, color, size) {
    return <AntDesign name="plussquareo" size={size} color={color} />;
  }

  function renderProfileIcon(focused, color, size) {
    return <MaterialCommunityIcons name="chef-hat" size={size} color={color} />;
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
        },
      })}
    >
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
