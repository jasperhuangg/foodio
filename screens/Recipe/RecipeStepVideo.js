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

export default (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 10,
          zIndex: 5,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 35,
            color: "white",
            textShadowColor: "orange",
            textShadowOffset: { width: -2, height: 2 },
            textShadowRadius: 0,
          }}
        >
          {"Step " + props.stepNum}
        </Text>
      </View>
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
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "700",
            letterSpacing: 2,
            textShadowColor: "orange",
            textShadowOffset: { width: -2, height: 2 },
            textShadowRadius: 0,
          }}
        >
          BACK
        </Text>
      </TouchableOpacity>
      <Video
        source={{ uri: props.step.videoUrl }} // Can be a URL or a local file.
        volume={0.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{
          width: window.width,
          height: window.height - 30,
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
