import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import RecipeStep from "../../components/RecipeStep";

const window = Dimensions.get("window");

export default (props) => {
  const [loaded, setLoaded] = useState(false);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    // make call to firebase to get recipe info with recipeID
    const recipeID = "QlcDqAWMBh29rIupv1Tr";

    const ref = firebase.firestore().collection("recipes").doc(recipeID);
    ref.get().then((document) => {
      setRecipe(document.data());
      setLoaded(true);
    });
  }, []);
  if (loaded)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.containerPadding, { paddingTop: 20 }]}>
          <Text style={styles.header}>{recipe.name}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <MaterialIcons
              name="av-timer"
              size={20}
              color="black"
              style={{ marginRight: 5 }}
            />
            <Text style={{ fontWeight: "700" }}>{recipe.minutes} min</Text>
          </View>
          <Text style={[{ marginBottom: 20 }, styles.lineHeight]}>
            recipe description (from the post). bla bla bla, bla bla bla, bla
            bla bla,bla bla bla,bla bla bla,bla bla bla,bla bla bla,bla bla bla,
            bla bla bla,bla bla bla, bla bla bla,bla bla bla, bla bla bla, bla
            bla bla, bla bla bla, bla bla bla, bla bla bla, bla bla bla, bla bla
            bla, bla bla bla,bla bla bla,bla bla bla,bla bla bla,bla bla bla,bla
            bla bla, bla bla bla,bla bla bla, bla bla bla,bla bla bla, bla bla
            bla, bla bla bla, bla bla bla, bla bla bla, bla bla bla, bla bla
            bla, bla bla bla, bla bla bla,bla bla bla,bla bla bla,bla bla
            bla,bla bla bla,bla bla bla,
          </Text>
        </View>
        <View
          style={[
            {
              width: window.width,
              backgroundColor: "rgb(245, 245, 245)",
              paddingTop: 30,
              paddingBottom: 30,
            },
            styles.containerPadding,
          ]}
        >
          <Text style={[styles.subheader, { marginBottom: 10 }]}>
            Ingredients
          </Text>
          {recipe.ingredients.map((ingredient, index) => {
            return (
              <View
                style={[
                  styles.ingredient,
                  index === recipe.ingredients.length - 1
                    ? {
                        borderBottomWidth: 0,
                        borderBottomColor: "rgba(0, 0, 0, 0)",
                      }
                    : {},
                ]}
                key={ingredient}
              >
                <Text style={{ fontWeight: "600" }}>{ingredient}</Text>
              </View>
            );
          })}
        </View>
        <View>
          {recipe.steps.map((step, index) => {
            console.log(step);
            return (
              <RecipeStep
                step={step}
                key={index}
                styles={styles}
                stepNum={index + 1}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  else
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <ActivityIndicator size="small" color="grey" />
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  centeredContainer: {
    width: window.width,
    height: window.height - 140,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: window.width,
    backgroundColor: "white",
    minHeight: window.height,
    padding: 10,
  },

  header: {
    fontWeight: "700",
    fontSize: 27,
  },
  subheader: {
    fontWeight: "700",
    fontSize: 23,
  },
  containerPadding: {
    width: window.width,
    paddingLeft: 20,
    paddingRight: 20,
  },
  ingredient: {
    width: window.width - 20 - 20,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingTop: 12,
    paddingBottom: 12,
  },
  lineHeight: {
    lineHeight: 24,
  },
});
