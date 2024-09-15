import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { Body } from "./ui/Text";
import Button from "./ui/Button";

const genericMessage =
  "Si è verificato un errore durante l’elaborazione della richiesta.\nAssicurati di essere connesso a Internet e riprova.";

type Props = {
  defaultMessage?: string;
  onRetry?: () => void;
};

function ErrorView({ onRetry, defaultMessage }: Props): ReactElement {
  return (
    <View style={styles.container}>
      <Body>{defaultMessage || genericMessage}</Body>
      {onRetry ? <Button onPress={onRetry} label={"Riprova"} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
});

export default ErrorView;
