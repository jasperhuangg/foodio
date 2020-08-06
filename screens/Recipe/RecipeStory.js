import React from "react";
import { SafeAreaView, View, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default (props) => {
  console.log(props.steps[props.stepNum - 1].videoUrl);
  return (
    <SafeAreaView>
      <Video
        source={{ uri: props.steps[props.stepNum - 1].videoUrl }} // Can be a URL or a local file.
        volume={0.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{
          width: screen.width,
          height: screen.height,
          // zIndex: 0,
          // position: "absolute",
          // top: 30,
          // right: 0,
          // left: 0,
          // bottom: 0,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: window.width,
    height: window.height,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
