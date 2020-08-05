import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { connect } from "react-redux";
import Recipe from "./Recipe";
import {
  setUserID,
  setViewingRecipe,
  setViewingRecipeStep,
} from "../../util/app-redux";
import * as firebase from "firebase";

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
    viewingRecipe: state.viewingRecipe,
    viewingRecipeStep: 1,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserID: (userID) => {
      dispatch(setUserID(userID));
    },
    setViewingRecipeStep: (stepNum) => {
      dispatch(setViewingRecipe(stepNum));
    },
  };
};

function RecipeVideos(props) {
  const [currentStep, setCurrentStep] = useState(props.viewingRecipeStep);

  useEffect(() => {
    // get the current recipe from firestore
    const ref = firebase
      .firestore()
      .collection("recipes")
      .doc(props.viewingRecipe);
    ref.get().then((document) => {
      const steps = document.data().steps;
    });

    return setViewingRecipeStep(currentStep);
  }, []);

  return (
    <SafeAreaView>
      <Text>Videos</Text>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeVideos);
