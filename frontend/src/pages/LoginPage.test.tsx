import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom",
  );
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("../services/auth", () => ({
  loginUser: vi.fn(),
}));

vi.mock("../analytics/ga4", () => ({
  trackEvent: vi.fn(),
}));

import { LoginPage } from "./LoginPage";
import { loginUser } from "../services/auth";

const loginUserMock = vi.mocked(loginUser);

beforeEach(() => {
  navigateMock.mockReset();
  loginUserMock.mockRejectedValue(new Error("Invalid credentials"));
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderLoginPage(route = "/login") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("LoginPage", () => {
  it("shows an error message when login fails", async () => {
    const user = userEvent.setup();
    renderLoginPage();

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Password"), "Password123!");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(
      await screen.findByText("Login failed. Verify credentials and try again."),
    ).toBeInTheDocument();
    expect(loginUserMock).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "Password123!",
    });
  });
});