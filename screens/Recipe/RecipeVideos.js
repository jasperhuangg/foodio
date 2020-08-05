import React, { useEffect, useState } from "react";
import {} from "react-native";
import Recipe from "./Recipe";
import { setUserID, setViewingRecipe } from "../../util/app-redux";

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
    viewingRecipe: "",
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
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeVideos);
