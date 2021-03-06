import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import Recipe from "./Recipe";
import {
  setUserID,
  setViewingRecipe,
  setViewingRecipeStep,
} from "../../util/app-redux";
// import ScrollViewOffset from "react-native-scrollview-offset";
import * as firebase from "firebase";

import RecipeStepVideo from "./RecipeStepVideo";

const window = Dimensions.get("window");

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
  const [recipe, setRecipe] = useState({});
  const [loaded, setLoaded] = useState(false);
  // const [offset, setOffset] = useState(0);

  var offset = 0;

  useEffect(() => {
    // get the current recipe from firestore
    const ref = firebase
      .firestore()
      .collection("recipes")
      .doc(props.viewingRecipe);
    ref
      .get()
      .then((document) => {
        setRecipe(document.data());
        setLoaded(true);
      })
      .catch((err) => alert(err));

    return () => {
      setViewingRecipeStep(currentStep);
    };
  }, []);

  if (loaded)
    return (
      <SafeAreaView>
        <ScrollView
          // onScroll={function (event) {
          //   var currentOffset = event.nativeEvent.contentOffset.x;

          //   var direction = currentOffset > offset ? "right" : "left";
          //   offset = currentOffset;
          //   if (direction === "right") {
          //     props.setViewingRecipeStep(props.viewingRecipeStep - 1);
          //   } else {
          //     props.setViewingRecipeStep(props.viewingRecipeStep + 1);
          //   }
          // }}
          contentOffset={{
            x: (props.viewingRecipeStep - 1) * window.width,
            y: 0,
          }}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          decelerationRate="fast"
          contentContainerStyle={{
            width: `${100 * recipe.steps.length}%`,
          }}
        >
          {recipe.steps.map((step, index) => {
            return (
              <RecipeStepVideo
                navigation={props.navigation}
                key={index}
                step={step}
                stepNum={index + 1}
                viewingRecipeStep={props.viewingRecipeStep}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  else
    return (
      <SafeAreaView
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: window.height - 120,
        }}
      >
        <ActivityIndicator size="small" color="grey" />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  carousel: {
    width: window.width,
    // height: window.height,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeVideos);
