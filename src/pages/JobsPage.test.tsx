import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { describe, it, expect,type Mock, beforeEach, afterEach, vi } from "vitest";
import JobsPage from "./JobsPage";
import Spinner from "../components/Spinner";
import JobListing from "../components/JobListing";
import useFetch from "../Custom_Hooks/useFetch";
import "@testing-library/jest-dom/vitest";

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

  const mockedUseFetch = vi.mocked(useFetch);
  const mockedJobListing = vi.mocked(JobListing);
  const mockedSpinner = vi.mocked(Spinner);

  beforeEach(() => {
    mockedUseFetch.mockClear();
    mockedJobListing.mockClear();
    mockedSpinner.mockClear();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders Spinner while loading", () => {
    (mockedUseFetch as Mock).mockReturnValue({ data: null, loading: true });

    render(<JobsPage />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    expect(mockedJobListing).not.toHaveBeenCalled();
  });

  it("renders job listings when data is loaded", async () => {
    (mockedUseFetch as Mock).mockReturnValue({ data: mockJobs, loading: false });

    render(<JobsPage />);

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();

      expect(mockedJobListing).toHaveBeenCalledTimes(mockJobs.length);

      expect(mockedJobListing).toHaveBeenCalledWith({ job: mockJobs[0] }, {});

      expect(mockedJobListing).toHaveBeenCalledWith({ job: mockJobs[1] }, {});

      expect(screen.getByText(mockJobs[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockJobs[1].title)).toBeInTheDocument();
    });
  });

  it("renders no job listings when data is empty", async () => {
    (mockedUseFetch as Mock).mockReturnValue({ data: [], loading: false });

    render(<JobsPage />);

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();

      expect(mockedJobListing).not.toHaveBeenCalled();

      expect(screen.queryByText(mockJobs[0].title)).not.toBeInTheDocument();
    });
  });
});
