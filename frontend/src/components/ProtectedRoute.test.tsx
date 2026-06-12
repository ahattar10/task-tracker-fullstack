import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("../services/http", () => ({
  getAccessToken: vi.fn(),
}));

import { ProtectedRoute } from "./ProtectedRoute";
import { getAccessToken } from "../services/http";

const getAccessTokenMock = vi.mocked(getAccessToken);

beforeEach(() => {
  getAccessTokenMock.mockReset();
});

describe("ProtectedRoute", () => {
  it("redirects to login when no token is available", () => {
    getAccessTokenMock.mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={["/tasks"]}>
        <Routes>
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <div>Protected content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Login page")).toBeInTheDocument();
  });

  it("renders children when a token exists", () => {
    getAccessTokenMock.mockReturnValue("token-123");

    render(
      <MemoryRouter initialEntries={["/tasks"]}>
        <Routes>
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <div>Protected content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });
});