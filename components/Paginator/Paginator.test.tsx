import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Paginator from "./Paginator";

describe("Paginator Component", () => {
  const onChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <Paginator currentPage={1} totalPage={5} onChange={onChangeMock} />,
    );

    expect(getByText("1")).toBeTruthy();
  });

  it("calls onChange with correct value when 'previous' is pressed", () => {
    const { getByLabelText } = render(
      <Paginator currentPage={3} totalPage={5} onChange={onChangeMock} />,
    );

    const previousButton = getByLabelText("pagina precedente");
    fireEvent.press(previousButton);

    expect(onChangeMock).toHaveBeenCalledWith(2);
  });

  it("calls onChange with correct value when 'next' is pressed", () => {
    const { getByLabelText } = render(
      <Paginator currentPage={3} totalPage={5} onChange={onChangeMock} />,
    );

    const nextButton = getByLabelText("pagina successiva");
    fireEvent.press(nextButton);

    expect(onChangeMock).toHaveBeenCalledWith(4);
  });

  it("does not call onChange when 'previous' is disabled", () => {
    const { getByLabelText } = render(
      <Paginator currentPage={1} totalPage={5} onChange={onChangeMock} />,
    );

    const previousButton = getByLabelText("pagina precedente");
    fireEvent.press(previousButton);

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it("does not call onChange when 'next' is disabled", () => {
    const { getByLabelText } = render(
      <Paginator currentPage={5} totalPage={5} onChange={onChangeMock} />,
    );

    const nextButton = getByLabelText("pagina successiva");
    fireEvent.press(nextButton);

    expect(onChangeMock).not.toHaveBeenCalled();
  });
});
