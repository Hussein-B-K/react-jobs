import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";
import "@testing-library/jest-dom/vitest";
import JobsPage from "./JobsPage";
import useFetch from "../Custom_Hooks/useFetch";
import JobListing from "../components/JobListing";
import Spinner from "../components/Spinner";

vi.mock("../Custom_Hooks/useFetch", () => ({
  default: vi.fn(),
}));

vi.mock("../components/JobListing", () => ({
  default: vi.fn(({ job }) => (
    <div data-testid={`job-listing-${job.id}`}>
      <h3>{job.title}</h3>
      <p>{job.location}</p>
    </div>
  )),
}));

vi.mock("../components/Spinner", () => ({
  default: vi.fn(({ loading }) =>
    loading ? <div data-testid="spinner">Loading...</div> : null
  ),
}));

describe("JobsPage", () => {
  const mockJobs = [
    {
      id: "1",
      title: "Software Engineer",
      type: "Full-Time",
      description: "Develop amazing software.",
      salary: "$100K - 125K",
      location: "San Francisco, CA",
      company: { name: "Tech Solutions" },
    },
    {
      id: "2",
      title: "Frontend Developer",
      type: "Part-Time",
      description: "Build user interfaces.",
      salary: "$80K - 100K",
      location: "Remote",
      company: { name: "Web Innovators" },
    },
  ];

  const mockedUseFetch = useFetch as Mock;
  const mockedJobListing = vi.mocked(JobListing);
  const mockedSpinner = vi.mocked(Spinner);

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders Spinner while loading", () => {
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: true,
    });

    render(<JobsPage />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(mockedSpinner).toHaveBeenCalledWith({ loading: true }, {});
    expect(mockedJobListing).not.toHaveBeenCalled();

    expect(screen.getByRole("heading", { name: /Browse Jobs/i })).toBeInTheDocument();
  });

  it("renders job listings when data is loaded", async () => {
    mockedUseFetch.mockReturnValue({
      data: mockJobs,
      loading: false,
      error: null,
      
    });

    render(<JobsPage />);

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();

      expect(mockedJobListing).toHaveBeenCalledTimes(mockJobs.length);

      expect(mockedJobListing).toHaveBeenCalledWith({ job: mockJobs[0] }, {});
      expect(mockedJobListing).toHaveBeenCalledWith({ job: mockJobs[1] }, {});

      expect(screen.getByText(mockJobs[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockJobs[1].title)).toBeInTheDocument();

      expect(screen.getByRole("heading", { name: /Browse Jobs/i })).toBeInTheDocument();
    });
  });

  it("renders no job listings when data is empty", async () => {
    mockedUseFetch.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    render(<JobsPage />);

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
      expect(mockedJobListing).not.toHaveBeenCalled();
      expect(
        screen.queryByText(/Software Engineer/i)
      ).not.toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /Browse Jobs/i })).toBeInTheDocument();
    });
  });

  it("handles null data safely (no jobs, no crash)", async () => {
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<JobsPage />);

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
      expect(mockedJobListing).not.toHaveBeenCalled();
      expect(screen.getByRole("heading", { name: /Browse Jobs/i })).toBeInTheDocument();
    });
  });
});
