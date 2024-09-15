import { forwardRef } from "react";
import {
  Pressable,
  View,
  Text,
  PressableProps,
  StyleSheet,
} from "react-native";

export default forwardRef(function LinkButton(
  props: PressableProps & { label?: string },
  ref: React.LegacyRef<View>,
) {
  return (
    <Pressable
      {...props}
      ref={ref}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      {props.label && <Text style={styles.buttonText}>{props.label}</Text>}
    </Pressable>
  );
});

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
    fontSize: 16,
    textAlign: "center",
  },
});
