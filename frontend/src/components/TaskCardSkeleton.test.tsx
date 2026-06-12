import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TaskCardSkeleton } from "./TaskCardSkeleton";

describe("TaskCardSkeleton", () => {
  it("renders as an aria-hidden loading placeholder", () => {
    render(<TaskCardSkeleton />);

    expect(screen.getByRole("article", { hidden: true })).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});