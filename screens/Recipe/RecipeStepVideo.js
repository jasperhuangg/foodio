import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "static",
          zIndex: 5,
          position: "fixed",
          borderColor: "orange",
          // backgroundColor: "rgba(255, 255, 255, 0.4)",

          width: window.width,
          height: 70,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
        }}
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <View
          style={{
            borderRadius: 7,
            padding: 10,
            backgroundColor: "rgba(255, 255, 255, 0.4)",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "black",
              fontWeight: "700",
              letterSpacing: 2,
              textShadowColor: "lightgrey",
              textShadowOffset: { width: -2, height: 2 },
              textShadowRadius: 0,
            }}
          >
            BACK TO RECIPE
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: screen.height * 0.3,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: screen.height * 0.7,
          marginBottom: 10,
          zIndex: 5,
          backgroundColor: "rgba(255, 255, 255, 0.4)",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 50,
            marginLeft: 25,
            color: "black",
            textShadowColor: "lightgrey",
            textShadowOffset: { width: -2, height: 2 },
            textShadowRadius: 0,
            width: 50,
          }}
        >
          {props.stepNum}
        </Text>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 30,
            marginLeft: 25,
            marginTop: 10,
            color: "black",
            textShadowColor: "lightgrey",
            textShadowOffset: { width: -2, height: 2 },
            textShadowRadius: 0,
            width: window.width - 70,
          }}
        >
          {props.step.title}
        </Text>
      </View>

      <Video
        source={{ uri: props.step.videoUrl }} // Can be a URL or a local file.
        volume={1}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{
          width: window.width,
          height: screen.height - 30,
          zIndex: 0,
          position: "absolute",
          // top: 30,
          // right: 0,
          // left: 0,
          // bottom: 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: window.width,
    height: screen.height,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
