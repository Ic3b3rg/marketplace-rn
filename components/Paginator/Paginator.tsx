import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  colorBackground,
  colorOnSecondary,
  colorSecondary,
  colorSurface,
} from '../../styles/variables/colors';
import { spaceM, spaceS } from '../../styles/variables/spacing';
import { range } from '../../shared-logic/utils/array';
import { Body } from '../ui/Text';

type Props = {
  currentPage: number;
  itemsCountPerPage: number;
  totalItemsCount: number;
  onChange: (page: number) => void;
  pageRangeDisplayed?: number;
};

const Paginator = ({
  currentPage,
  itemsCountPerPage,
  totalItemsCount,
  onChange,
  pageRangeDisplayed = 4,
}: Props) => {
  if (
    !totalItemsCount ||
    itemsCountPerPage === 0 ||
    totalItemsCount <= itemsCountPerPage
  ) {
    return <></>;
  }

  const pagesCount = Math.ceil(totalItemsCount / itemsCountPerPage);
  const indexes = displayedIndexesRange(
    currentPage,
    pagesCount,
    pageRangeDisplayed,
  );
  return (
    <View style={styles.box}>
      {pagesCount > pageRangeDisplayed ? (
        <>
          <Navigation
            onPress={() => onChange(0)}
            accessibilityLabel="pagina iniziale"
          >
            «
          </Navigation>
          <Separator />
        </>
      ) : null}
      <Navigation
        onPress={() => onChange(Math.max(currentPage - 1, 0))}
        accessibilityLabel="pagina precedente"
      >
        ⟨
      </Navigation>
      <Separator />
      {indexes.map((index) => (
        <Page
          key={index}
          number={index + 1}
          active={currentPage === index}
          onPress={() => onChange(index)}
        />
      ))}
      <Separator />
      <Navigation
        onPress={() => onChange(Math.min(currentPage + 1, pagesCount - 1))}
        accessibilityLabel="pagina successiva"
      >
        ⟩
      </Navigation>
      {pagesCount > pageRangeDisplayed ? (
        <>
          <Separator />
          <Navigation
            onPress={() => onChange(pagesCount - 1)}
            accessibilityLabel="pagina finale"
          >
            »
          </Navigation>
        </>
      ) : null}
    </View>
  );
};

type PageProps = {
  number: number;
  active: boolean;
  onPress: () => void;
};
const Page = ({ number, active, onPress }: PageProps) => (
  <TouchableOpacity
    onPress={onPress}
    accessibilityLabel={`pagina ${number}`}
    style={[styles.page, active && styles.pageActive]}
  >
    <Body style={active && styles.textActive}>{number}</Body>
  </TouchableOpacity>
);

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
    <Emphasis>{children}</Emphasis>
  </TouchableOpacity>
);

const Separator = () => <View style={styles.separator} />;

function displayedIndexesRange(
  currentPage: number,
  pagesCount: number,
  pageRangeDisplayed: number,
): number[] {
  const middleIndex = Math.floor(pageRangeDisplayed / 2);
  const maxStartIndex = pagesCount - pageRangeDisplayed;
  const rangeStartIndex = Math.max(
    Math.min(maxStartIndex, currentPage - middleIndex),
    0,
  );
  const rangeSize = Math.min(pageRangeDisplayed, pagesCount);
  return range(rangeSize, rangeStartIndex);
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    backgroundColor: colorSurface,
    elevation: 5,
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    borderRadius: spaceS,
    margin: spaceM,
  },
  page: {
    paddingVertical: spaceS,
    paddingHorizontal: spaceM,
  },
  pageActive: {
    backgroundColor: colorSecondary,
  },
  textActive: {
    color: colorOnSecondary,
  },
  separator: {
    width: 2,
    backgroundColor: colorBackground,
  },
});

export default Paginator;
