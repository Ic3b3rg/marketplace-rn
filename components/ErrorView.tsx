import React, { ReactElement } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Body } from "./ui/Text";

const genericMessage =
  "Si è verificato un errore durante l’elaborazione della richiesta.\nAssicurati di essere connesso a Internet e riprova.";

type Props = {
  defaultMessage?: string;
  onRetry?: () => void;
};

function ErrorView({ onRetry, defaultMessage }: Props): ReactElement {
  return (
    <View>
      <Body>{defaultMessage || genericMessage}</Body>
      {onRetry ? (
        <Pressable style={styles.button} onPress={onRetry}>
          <Body>Riprova</Body>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  spaceHorizontal: {
    marginHorizontal: 16,
  },
  button: {
    alignSelf: "center",
    marginTop: 16,
  },
});

export default ErrorView;
