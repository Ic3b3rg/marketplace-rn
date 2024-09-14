import React, { FC } from "react";
import { StyleSheet } from "react-native";
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
  },
});

export default SafeArea;
