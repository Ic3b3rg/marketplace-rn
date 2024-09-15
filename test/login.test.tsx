import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { useLoginMutation } from "@/api/auth.api";
import { useSession } from "@/context/auth";
import { useRouter, useLocalSearchParams } from "expo-router";
import Login from "../app/(main)/login";

// Mock delle API e delle funzioni di contesto
jest.mock("@/api/auth.api", () => ({
  useLoginMutation: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(), // Aggiungi questo mock
}));

jest.mock("@/context/auth", () => ({
  useSession: jest.fn(),
}));

describe("Login Component", () => {
  const mockLogin = jest.fn();
  const mockSignIn = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Mock delle funzioni
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      { isError: false },
    ]);
    (useSession as jest.Mock).mockReturnValue({ signIn: mockSignIn });
    (useRouter as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    (useLocalSearchParams as jest.Mock).mockReturnValue({ idProduct: "1" }); // Aggiungi il mock con un valore simulato
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form correctly", () => {
    render(<Login />);

    // Verifica che gli input email e password siano presenti
    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByText("Login")).toBeTruthy();
  });

  it("displays validation errors when fields are empty", async () => {
    const user = userEvent.setup();
    render(<Login />);
    fireEvent.changeText(screen.getByPlaceholderText("Email"), "");
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "");
    await user.press(screen.getByText("Login"));

    expect(screen.getByText("Email is required")).toBeTruthy();
    expect(screen.getByText("Password is required")).toBeTruthy();
  });

  it("validates email format correctly", async () => {
    render(<Login />);

    fireEvent.changeText(screen.getByPlaceholderText("Email"), "invalid-email");
    fireEvent.changeText(
      screen.getByPlaceholderText("Password"),
      "Password1234!",
    );
    fireEvent.press(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeTruthy();
    });
  });

  it("calls login API and navigates on successful login", async () => {
    mockLogin.mockResolvedValue({ data: { token: "fake-token" } });
    mockSignIn.mockResolvedValue({});

    render(<Login />);

    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "test@recrowd.it",
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Password"),
      "Password1234!",
    );
    fireEvent.press(screen.getByText("Login"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@recrowd.it",
        password: "Password1234!",
      });
      expect(mockSignIn).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: "/product/[idProduct]",
        params: { idProduct: "1" }, // Ora viene simulato un idProduct
      });
    });
  });
});
