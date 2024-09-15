import React from "react";
import { render } from "@testing-library/react-native";
import CardProduct from "./CardProduct";

jest.mock("expo-router", () => ({
  Link: jest.fn(({ children, ...rest }) => <>{children}</>),
}));

describe("CardProduct Component", () => {
  const product = {
    id: "1",
    image: "https://via.placeholder.com/150",
    title: "Test Product",
  };

  it("renders the product title and button", () => {
    const { getByText, getByRole } = render(<CardProduct product={product} />);

    expect(getByText("Test Product")).toBeTruthy();

    expect(getByRole("button")).toBeTruthy();
  });
});
