import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../analytics/ga4", () => ({
  trackEvent: vi.fn(),
}));

vi.mock("../services/tasks", () => ({
  createTask: vi.fn(),
  deleteTask: vi.fn(),
  listTasks: vi.fn(),
  updateTask: vi.fn(),
}));

import { TasksPage } from "./TasksPage";
import { createTask, listTasks } from "../services/tasks";

const listTasksMock = vi.mocked(listTasks);
const createTaskMock = vi.mocked(createTask);

const sampleTask = {
  id: 1,
  user_id: 7,
  title: "Write tests",
  description: "Create task coverage",
  status: "todo" as const,
  priority: "medium" as const,
  created_at: "2026-06-12T00:00:00.000Z",
  updated_at: "2026-06-12T00:00:00.000Z",
};

beforeEach(() => {
  listTasksMock.mockResolvedValue({
    items: [sampleTask],
    total: 1,
    page: 1,
    pages: 1,
  });
  createTaskMock.mockResolvedValue(sampleTask);
  window.confirm = vi.fn(() => true);
});

afterEach(() => {
  vi.clearAllMocks();
});

function renderPage() {
  return render(
    <MemoryRouter>
      <TasksPage />
    </MemoryRouter>,
  );
}

describe("TasksPage", () => {
  it("renders the current task list", async () => {
    renderPage();

    expect(await screen.findByRole("heading", { name: "Write tests" })).toBeInTheDocument();
    expect(screen.getByText("Create task coverage")).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of 1 \(1 total\)/)).toBeInTheDocument();
  });

  it("shows validation when submitting an empty new task form", async () => {
    const user = userEvent.setup();
    renderPage();

    await screen.findByRole("heading", { name: "Write tests" });
    await user.click(screen.getAllByRole("button", { name: /new task/i })[0]);
    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(await screen.findByText("Title is required.")).toBeInTheDocument();
  });
});