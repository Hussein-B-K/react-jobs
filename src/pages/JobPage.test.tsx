import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";
import { toast } from "react-toastify";
import JobPage, { JobLoader } from "./JobPage";
import { supabase } from "../services/supabase-client";
import "@testing-library/jest-dom/vitest";

// ----- MOCKS -----
const mockUseParams = vi.fn();
const mockUseLoaderData = vi.fn();
const mockUseNavigate = vi.fn();
const mockWindowConfirm = vi.spyOn(window, "confirm");

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useParams: () => mockUseParams(),
    useLoaderData: () => mockUseLoaderData(),
    useNavigate: () => mockUseNavigate(),
  };
});

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

vi.mock("../services/supabase-client");

// ----- TEST DATA -----
const mockJob = {
  id: "1",
  type: "Full-Time",
  title: "Senior React Developer",
  description: "Develop and maintain React applications.",
  salary: "$125K - 150K",
  location: "New York, NY",
  company: {
    name: "Innovate Solutions",
    description: "A leading tech company specializing in web development.",
    contactEmail: "hr@innovatesolutions.com",
    contactPhone: "555-123-4567",
  },
};

// ----- JobPage Tests -----
describe("JobPage Component", () => {
  const mockDeleteJob = vi.fn();
  const navigateMock = vi.fn();

  beforeEach(() => {
    mockUseLoaderData.mockReturnValue(mockJob);
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseNavigate.mockReturnValue(navigateMock);
    mockWindowConfirm.mockReturnValue(true);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders job details correctly", () => {
    render(
      <BrowserRouter>
        <JobPage deleteJob={mockDeleteJob} />
      </BrowserRouter>
    );

    // Job info
    expect(screen.getByText(mockJob.type)).toBeInTheDocument();
    expect(screen.getByText(mockJob.title)).toBeInTheDocument();
    expect(screen.getByText(mockJob.location)).toBeInTheDocument();
    expect(screen.getByText(mockJob.description)).toBeInTheDocument();
    expect(screen.getByText(`${mockJob.salary} / Year`)).toBeInTheDocument();

    // Company info
    expect(screen.getByText(mockJob.company.name)).toBeInTheDocument();
    expect(screen.getByText(mockJob.company.description)).toBeInTheDocument();
    expect(screen.getByText(mockJob.company.contactEmail)).toBeInTheDocument();
    expect(screen.getByText(mockJob.company.contactPhone)).toBeInTheDocument();

    // Links & buttons
    expect(screen.getByRole("link", { name: /Back to Job Listings/i })).toHaveAttribute(
      "href",
      "/jobs"
    );
    expect(screen.getByRole("link", { name: /Edit Job/i })).toHaveAttribute(
      "href",
      `/edit-job/${mockJob.id}`
    );
    expect(screen.getByRole("button", { name: /Delete Job/i })).toBeInTheDocument();
  });

  it("calls deleteJob, shows toast, and navigates on delete confirmation", async () => {
    render(
      <BrowserRouter>
        <JobPage deleteJob={mockDeleteJob} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Delete Job/i }));

    await waitFor(() => {
      expect(mockWindowConfirm).toHaveBeenCalledTimes(1);
      expect(mockDeleteJob).toHaveBeenCalledWith(mockJob.id);
      expect(toast.success).toHaveBeenCalledWith("Job deleted successfully");
      expect(navigateMock).toHaveBeenCalledWith("/jobs");
    });
  });

  it("does not delete job if confirmation is cancelled", async () => {
    mockWindowConfirm.mockReturnValue(false);

    render(
      <BrowserRouter>
        <JobPage deleteJob={mockDeleteJob} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Delete Job/i }));

    await waitFor(() => {
      expect(mockWindowConfirm).toHaveBeenCalledTimes(1);
      expect(mockDeleteJob).not.toHaveBeenCalled();
      expect(toast.success).not.toHaveBeenCalled();
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });
});

// ----- JobLoader Tests -----
describe("JobLoader function", () => {
  const selectMock = vi.fn();
  const eqMock = vi.fn();
  const singleMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (supabase.from as Mock).mockReturnValue({
      select: selectMock.mockReturnThis(),
      eq: eqMock.mockReturnThis(),
      single: singleMock,
    });
  });

  it("returns job data when fetched successfully", async () => {
    singleMock.mockResolvedValue({ data: mockJob, error: null });

    const result = await JobLoader({ params: { id: mockJob.id } });
    expect(result).toEqual(mockJob);

    expect(supabase.from).toHaveBeenCalledWith("jobs");
    expect(selectMock).toHaveBeenCalled();
    expect(eqMock).toHaveBeenCalledWith("id", mockJob.id);
    expect(singleMock).toHaveBeenCalled();
  });

  it("returns null if job ID is missing", async () => {
    const result = await JobLoader({ params: {} });
    expect(result).toBeNull();
  });

  it("returns null and logs error on fetch failure", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    singleMock.mockResolvedValue({ data: null, error: { message: "DB Error" } });

    const result = await JobLoader({ params: { id: "1" } });

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith("Supabase fetch error:", { message: "DB Error" });

    consoleSpy.mockRestore();
  });
});
