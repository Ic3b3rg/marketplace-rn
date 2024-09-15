import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import ProductList from "./ProductList";
import { useGetProductsQuery } from "@/api/products.api";

jest.mock("@/api/products.api", () => ({
  useGetProductsQuery: jest.fn(),
}));

describe("ProductList Component", () => {
  const mockProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    image: `https://via.placeholder.com/150?text=Product+${i + 1}`,
    title: `Product ${i + 1}`,
  }));

  const mockResponse = {
    data: {
      data: {
        values: mockProducts,
        pagination: {
          totalPages: 5,
          totalItems: 50,
        },
      },
    },
    isFetching: false,
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  };

  beforeEach(() => {
    (useGetProductsQuery as jest.Mock).mockReturnValue(mockResponse);
  });

  it("renders 10 products per page", async () => {
    render(<ProductList />);

    expect(screen.getByText("Elenco dei nostri prodotti")).toBeTruthy();

    await waitFor(() => {
      const productTitles = screen.getAllByText(/Product \d+/);
      expect(productTitles.length).toBe(10);
    });
  });

  it("displays the paginator with correct page data", async () => {
    render(<ProductList />);

    await waitFor(() => {
      const paginator = screen.getByText("1");
      expect(paginator).toBeTruthy();
    });
  });

  it("displays an error view if there is an error", () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      ...mockResponse,
      isError: true,
    });

    render(<ProductList />);

    expect(screen.getByText("Riprova")).toBeTruthy();
  });

  it("displays 'Nessun prodotto disponibile' if no products are returned", () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      ...mockResponse,
      data: {
        data: {
          values: [],
          pagination: { totalPages: 1, totalItems: 0 },
        },
      },
    });

    render(<ProductList />);

    expect(screen.getByText("Nessun prodotto disponibile")).toBeTruthy();
  });
});
