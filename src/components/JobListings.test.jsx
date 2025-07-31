import { expect, it, describe, vi, beforeEach, afterEach } from "vitest";
import JobListings from "./JobListings";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import useFetch from "../Custom_Hooks/useFetch";
describe("JobListings", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
    vi.mock("../Custom_Hooks/useFetch");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders job listings when data is loaded", async () => {
    const mockJob = globalThis.fetch.mockResolvedValueOnce({
      json: async () => ({
        id: 1,
        title: "Senior React Developer",
        type: "Full-Time",
        description:
          "We are seeking a talented Front-End Developer to join our team in Boston, MA.",
        salary: "$70K - $80K",
      }),
    });
    useFetch.mockReturnValue({
      data: mockJob,
      loading: false,
      error: null,
    });
    render(<JobListings job={1} />);

    await waitFor(() => {
      expect(screen.getByText("Recent Jobs")).toBeInTheDocument();
      expect(screen.getByText(/Recent Jobs/i)).toBeInTheDocument();
      expect(
        screen.getByRole("heading", /Senior React Developer/i)
      ).toBeInTheDocument();
      expect(screen.getByRole("heading", /Full-Time/i)).toBeInTheDocument();
      expect(
        screen.getByRole(
          "heading",
          /We are seeking a talented Front-End Developer to join our team in Boston, MA./i
        )
      ).toBeInTheDocument();
      expect(screen.getByRole("heading", /$70K - $80K/i)).toBeInTheDocument();
    });
  });

  it("handles the case when there are no jobs", async () => {
    useFetch.mockReturnValue({ data: null, loading: false, error: null });

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
      expect(screen.queryByTestId("job-listing-1")).not.toBeInTheDocument();
      expect(screen.getByText("Recent Jobs")).toBeInTheDocument();
    });
  });
});
