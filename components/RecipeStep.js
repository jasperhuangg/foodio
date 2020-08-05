import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  setUserID,
  setViewingRecipe,
  setViewingRecipeStep,
} from "../util/app-redux";

const window = Dimensions.get("window");

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
    viewingRecipe: state.viewingRecipe,
    viewingRecipeStep: state.viewingRecipeStep,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserID: (userID) => {
      dispatch(setUserID(userID));
    },
    setViewingRecipe: (recipeID) => {
      dispatch(setViewingRecipe(recipeID));
    },
    setViewingRecipeStep: (stepNum) => {
      dispatch(setViewingRecipeStep(stepNum));
    },
  };
};

function RecipeStep(props) {
  return (
    <View style={[props.styles.containerPadding, styles.container]}>
      <TouchableOpacity
        style={[styles.headerContainer, { paddingBottom: 20 }]}
        onPress={() => {
          props.setViewingRecipeStep(props.stepNum);
          props.navigation.navigate("RecipeVideos");
        }}
      >
        <View style={styles.image}>
          <Text>Image</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.stepNumText}>{"Step " + props.stepNum}</Text>
          <Text style={styles.stepTitleText}>{props.step.title}</Text>
        </View>
        <Ionicons name="ios-arrow-forward" size={20} color="black" />
      </TouchableOpacity>
      <Text style={props.styles.lineHeight}>{props.step.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: window.width,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingTop: 30,
    paddingBottom: 30,
  },
  image: {
    width: 56,
    height: 64,
    borderWidth: 1,
    borderRadius: 7,
    marginRight: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  stepNumText: {
    color: "grey",
    fontWeight: "700",
    marginBottom: 5,
  },
  stepTitleText: {
    fontWeight: "700",
    fontSize: 16,
  },
  stepHeaderButton: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeStep);
