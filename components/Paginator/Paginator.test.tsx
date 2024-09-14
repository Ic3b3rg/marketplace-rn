import React from 'react';
import Paginator from './Paginator';
import { render, fireEvent, screen } from '@testing-library/react-native';

test('Nasconde il paginatore se il numero di pagine è inferiore a 2', () => {
  render(
    <Paginator
      currentPage={0}
      itemsCountPerPage={5}
      totalItemsCount={4}
      onChange={jest.fn()}
    />,
  );
  expect(screen.queryByLabelText(/pagina/i)).not.toBeTruthy();
});

test('Il valore `pageRangeDisplayed` rappresenta il numero massimo di pagine visualizzabili', () => {
  render(
    <Paginator
      currentPage={0}
      itemsCountPerPage={5}
      totalItemsCount={100}
      onChange={jest.fn()}
      pageRangeDisplayed={5}
    />,
  );
  expect(screen.getAllByLabelText(/pagina \d+/i)).toHaveLength(5);
});

test('Se il numero di pagine è inferiore `pageRangeDisplayed` mostra il corretto numero di pagine', () => {
  render(
    <Paginator
      currentPage={0}
      itemsCountPerPage={5}
      totalItemsCount={6}
      onChange={jest.fn()}
      pageRangeDisplayed={5}
    />,
  );
  expect(screen.getAllByLabelText(/pagina \d+/i)).toHaveLength(2);
});

test('Mostra i valori di pagina in base alla pagina corrente', () => {
  const currentPage = 4;
  render(
    <Paginator
      currentPage={currentPage}
      itemsCountPerPage={5}
      totalItemsCount={200}
      onChange={jest.fn()}
      pageRangeDisplayed={5}
    />,
  );
  const pages = screen.getAllByLabelText(/pagina \d+/i);
  const startPage = currentPage - 1;
  pages.forEach((page, index) => {
    expect(screen.getByText(`${startPage + index}`)).toBeTruthy();
  });
});

test('Consente di cambiare pagina', () => {
  const currentPage = 4;
  const handleChange = jest.fn();
  const { getByText } = render(
    <Paginator
      currentPage={currentPage}
      itemsCountPerPage={5}
      totalItemsCount={200}
      onChange={handleChange}
      pageRangeDisplayed={5}
    />,
  );
  // L'handler è richiamato con l'indice effettivo dell'array 0-based
  const page3 = getByText('3');
  fireEvent.press(page3);
  expect(handleChange).toHaveBeenCalledWith(2);
  const page7 = getByText('7');
  fireEvent.press(page7);
  expect(handleChange).toHaveBeenCalledWith(6);
});

test('Consente di tornare alla pagina precedente/successiva', () => {
  const currentPage = 4;
  const handleChange = jest.fn();
  render(
    <Paginator
      currentPage={currentPage}
      itemsCountPerPage={5}
      totalItemsCount={200}
      onChange={handleChange}
      pageRangeDisplayed={5}
    />,
  );
  fireEvent.press(screen.getByLabelText(/pagina precedente/i));
  expect(handleChange).toHaveBeenCalledWith(currentPage - 1);
  fireEvent.press(screen.getByLabelText(/pagina successiva/i));
  expect(handleChange).toHaveBeenCalledWith(currentPage + 1);
});

test('Consente di tornare alla pagina iniziale/finale', () => {
  const currentPage = 4;
  const handleChange = jest.fn();
  render(
    <Paginator
      currentPage={currentPage}
      itemsCountPerPage={5}
      totalItemsCount={200}
      onChange={handleChange}
      pageRangeDisplayed={5}
    />,
  );
  fireEvent.press(screen.getByLabelText(/pagina iniziale/i));
  expect(handleChange).toHaveBeenCalledWith(0);
  fireEvent.press(screen.getByLabelText(/pagina finale/i));
  expect(handleChange).toHaveBeenCalledWith(39);
});

test('Impedisce gli overflow negativi', () => {
  const handleChange = jest.fn();
  render(
    <Paginator
      currentPage={0}
      itemsCountPerPage={5}
      totalItemsCount={200}
      onChange={handleChange}
      pageRangeDisplayed={5}
    />,
  );
  fireEvent.press(screen.getByLabelText(/pagina precedente/i));
  expect(handleChange).toHaveBeenCalledWith(0);
});

test('Impedisce gli overflow positivi', () => {
  const handleChange = jest.fn();
  render(
    <Paginator
      currentPage={39}
      itemsCountPerPage={5}
      totalItemsCount={200}
      onChange={handleChange}
      pageRangeDisplayed={5}
    />,
  );
  fireEvent.press(screen.getByLabelText(/pagina successiva/i));
  expect(handleChange).toHaveBeenCalledWith(39);
});
