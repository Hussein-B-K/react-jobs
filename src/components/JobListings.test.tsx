import { describe, it, expect, beforeEach, afterEach, vi, type Mock } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import JobListings from "./JobListings";
import useFetch from "../Custom_Hooks/useFetch";

vi.mock("./Spinner", () => ({
  default: ({ loading }: { loading: boolean }) =>
    loading ? <div data-testid="spinner">Loading...</div> : null,
}));

vi.mock("./JobListing", () => ({
  default: ({ job }: any) => (
    <div data-testid={`job-listing-${job.id}`}>
      <h3>{job.title}</h3>
      <p>{job.type}</p>
      <p>{job.description}</p>
      <p>{job.salary}</p>
    </div>
  ),
}));

vi.mock("../Custom_Hooks/useFetch");

describe("JobListings Component", () => {
  const mockUseFetch = useFetch as Mock;

  const mockJobsArray = [
    {
      id: "1",
      title: "Senior React Developer",
      type: "Full-Time",
      description:
        "We are seeking a talented Front-End Developer to join our team in Boston, MA.",
      location: "Portland, OR",
      salary: "$70K - $80K",
      company: {
        name: "Port Solutions INC",
        description: "Port Solutions is...",
        contactEmail: "contact@ipsumlorem.com",
        contactPhone: "555-555-5555",
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders Spinner while loading", () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <JobListings />
      </MemoryRouter>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.getByText(/Recent Jobs/i)).toBeInTheDocument();
  });

  it("renders job listings when data is loaded", async () => {
    mockUseFetch.mockReturnValue({
      data: mockJobsArray,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <JobListings />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Recent Jobs/i })).toBeInTheDocument();

      // verify job details are rendered
      expect(screen.getByText(/Senior React Developer/i)).toBeInTheDocument();
      expect(screen.getByText(/Full-Time/i)).toBeInTheDocument();
      expect(
        screen.getByText(/We are seeking a talented Front-End Developer/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/\$70K - \$80K/)).toBeInTheDocument();

      expect(screen.getByTestId("job-listing-1")).toBeInTheDocument();
    });
  });

  it("handles the case when there are no jobs", async () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <JobListings />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Recent Jobs")).toBeInTheDocument();
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
      expect(screen.queryByTestId("job-listing-1")).not.toBeInTheDocument();
    });
  });
});
