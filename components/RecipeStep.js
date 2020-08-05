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

const window = Dimensions.get("window");

export default (props) => {
  return (
    <View style={[props.styles.containerPadding, styles.container]}>
      <TouchableOpacity
        style={[styles.headerContainer, { paddingBottom: 20 }]}
        onPress={() => alert("pressed")}
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
};

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
