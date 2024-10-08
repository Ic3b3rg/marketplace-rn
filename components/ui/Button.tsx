import React from "react";
import { Pressable, Text, StyleSheet, PressableProps } from "react-native";

export default function Button(props: PressableProps & { label?: string }) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      {props.label && <Text style={styles.buttonText}>{props.label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#9C73D1",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonPressed: {
    backgroundColor: "#5C3683",
  },
  buttonText: {
    fontWeight: "500",
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
});
