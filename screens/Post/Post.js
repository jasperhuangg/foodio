import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <Image
          source={{
            uri:
              "http://www.bpimaging.com/assets/uploads/2016/12/toronto-food-pita.jpg",
          }}
        />
        <Text>Lasagne</Text>
        <Text>{this.props.recipeID}</Text>

        {/* <Button
                onPress={() => {
                  this.props.setViewingRecipe(post.recipeID);
                  this.props.setViewingRecipeStep(1);
                  this.props.navigation.navigate("Recipe");
                  this.props.setTabsShowing(false);
                }}
                key={post.recipeID}
                title={"View Recipe " + post.recipeID}
                color="#841584"
              ></Button> */}
      </SafeAreaView>
    );
  }
}

const styles = {
  postContainerStyle: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "center",
  },
};
