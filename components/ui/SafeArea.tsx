import React, { FC } from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import {
  SafeAreaView,
  NativeSafeAreaViewProps,
} from "react-native-safe-area-context";

const SafeArea: FC<NativeSafeAreaViewProps> = ({ style, ...props }) => (
  <SafeAreaView
    style={[styles.safeArea, style]}
    edges={["left", "right"]}
    {...props}
  />
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default SafeArea;
