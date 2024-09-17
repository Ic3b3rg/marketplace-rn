import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Body } from "../ui/Text";

type Props = {
  currentPage: number;
  totalPage: number;
  onChange: (page: number) => void;
};

const Paginator = ({ currentPage, totalPage, onChange }: Props) => {
  return (
    <View style={styles.box}>
      <Navigation
        onPress={() => onChange(currentPage - 1)}
        accessibilityLabel="pagina precedente"
        disabled={currentPage === 1}
      >
        ⟨
      </Navigation>
      <Body style={styles.textActive}>{currentPage}</Body>
      <Navigation
        onPress={() => onChange(currentPage + 1)}
        accessibilityLabel="pagina successiva"
        disabled={currentPage === totalPage}
      >
        ⟩
      </Navigation>
    </View>
  );
};

type NavigationProps = {
  accessibilityLabel: string;
  onPress: () => void;
  disabled?: boolean;
};
const Navigation = ({
  accessibilityLabel,
  children,
  onPress,
  disabled = false,
}: React.PropsWithChildren<NavigationProps>) => (
  <Pressable
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
    style={styles.page}
    disabled={disabled}
  >
    <Body style={styles.textNavigator}>{children}</Body>
  </Pressable>
);

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    margin: 8,
    justifyContent: "space-between",
  },
  page: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 25,
    backgroundColor: "#9C73D1",
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  textNavigator: {
    fontSize: 20,
    color: "#fff",
  },
  textActive: {
    fontSize: 20,
  },
});

export default Paginator;
