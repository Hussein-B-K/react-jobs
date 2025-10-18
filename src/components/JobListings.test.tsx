import { expect, it, describe, vi, beforeEach, afterEach, type Mock } from "vitest";
import { MemoryRouter } from 'react-router-dom';
import JobListings from "./JobListings";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import useFetch from "../Custom_Hooks/useFetch";

interface Job {
  id: string | number,
  title: string,
  type: string,
  location: string,
  description: string,
  salary: string,
  comapny: Company,
}

interface Company {
  name: string,
  description: string,
  contactEmail: string,
  contactPhone: string,
}

describe("JobListings", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
    vi.mock("../Custom_Hooks/useFetch");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  const mockJobsArray: Job[] = [
    {
        id: "1",
        title: "Senior React Developer",
        type: "Full-Time",
        description:
          "We are seeking a talented Front-End Developer to join our team in Boston, MA.",
        location: "Portland, OR",
        salary: "$70K - $80K",
        comapny: { // Check the spelling of 'comapny' below!
            name: "Port Solutions INC",
            description: "Port Solutions is...",
            contactEmail: "contact@ipsumlorem.com",
            contactPhone: "555-555-5555"
        }
    }
];

  it("renders job listings when data is loaded", async () => {

    (useFetch as Mock).mockReturnValue({
      data:mockJobsArray ,
      loading: false,
      error: null,
    });
    render(
      <MemoryRouter>
        <JobListings/>
      </MemoryRouter>
  );

    await waitFor(() => {
      expect(screen.getByRole("heading",{name:/Recent Jobs/i})).toBeInTheDocument();
      expect(screen.getByRole("heading", {name: /Recent Jobs/i})).toBeInTheDocument();
      expect(screen.getByText(/Full-Time/i)).toBeInTheDocument();
    expect(
        screen.getByText(
            /We are seeking a talented Front-End Developer to join our team in Boston, MA./i
        )
    ).toBeInTheDocument();
     expect(screen.getByRole("heading", {name: /\$70K - \$80K/i})).toBeInTheDocument();
    });
  });

  it("handles the case when there are no jobs", async () => {
    (useFetch as Mock).mockReturnValue({ data: null, loading: false, error: null });

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
      expect(screen.queryByTestId("job-listing-1")).not.toBeInTheDocument();
      expect(screen.getByText("Recent Jobs")).toBeInTheDocument();
    });
  });
});
