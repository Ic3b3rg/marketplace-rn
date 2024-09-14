import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Body } from "../ui/Text";

type Props = {
  currentPage: number;
  itemsCountPerPage: number;
  totalItemsCount: number;
  onChange: (page: number) => void;
};

const Paginator = ({
  currentPage,
  itemsCountPerPage,
  totalItemsCount,
  onChange,
}: Props) => {
  const pagesCount = Math.ceil(totalItemsCount / itemsCountPerPage);
  return (
    <View style={styles.box}>
      <Navigation
        onPress={() => onChange(currentPage - 1)}
        accessibilityLabel="pagina precedente"
      >
        ⟨
      </Navigation>
      <Body style={styles.textActive}>{currentPage}</Body>
      <Navigation
        onPress={() => onChange(Math.min(currentPage + 1, pagesCount - 1))}
        accessibilityLabel="pagina successiva"
      >
        ⟩
      </Navigation>
    </View>
  );
};

type NavigationProps = {
  accessibilityLabel: string;
  onPress: () => void;
};
const Navigation = ({
  accessibilityLabel,
  children,
  onPress,
}: React.PropsWithChildren<NavigationProps>) => (
  <TouchableOpacity
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
    style={styles.page}
  >
    <Body style={styles.textNavigator}>{children}</Body>
  </TouchableOpacity>
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
  },
  textActive: {
    fontSize: 20,
  },
});

export default Paginator;
