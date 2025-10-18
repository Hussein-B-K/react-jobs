import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect,type Mock, afterEach, beforeEach, vi } from "vitest";
import { toast } from "react-toastify";
import JobPage, { JobLoader } from "./JobPage";
import "@testing-library/jest-dom/vitest";

const mockUseParams = vi.fn();
const mockUseLoaderData = vi.fn();
const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal() as object;
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

const mockWindowConfirm = vi.spyOn(window, "confirm");

describe("JobPage", () => {
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

  const mockDeleteJob = vi.fn();

  beforeEach(() => {
    mockUseLoaderData.mockReturnValue(mockJob);

    mockUseParams.mockReturnValue({ id: "1" });

    mockUseNavigate.mockReturnValue(vi.fn());

    mockWindowConfirm.mockReturnValue(true);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders the job details correctly", () => {
    render(
      <BrowserRouter>
        <JobPage deleteJob={mockDeleteJob} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockJob.type)).toBeInTheDocument();
    expect(screen.getByText(mockJob.title)).toBeInTheDocument();
    expect(screen.getByText(mockJob.location)).toBeInTheDocument();
    expect(screen.getByText(mockJob.description)).toBeInTheDocument();
    expect(screen.getByText(`${mockJob.salary} / Year`)).toBeInTheDocument();

    expect(screen.getByText(mockJob.company.name)).toBeInTheDocument();
    expect(screen.getByText(mockJob.company.description)).toBeInTheDocument();
    expect(screen.getByText(mockJob.company.contactEmail)).toBeInTheDocument();
    expect(screen.getByText(mockJob.company.contactPhone)).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Back to Job Listings/i })
    ).toHaveAttribute("href", "/jobs");
    expect(screen.getByRole("link", { name: /Edit Job/i })).toHaveAttribute(
      "href",
      `/edit-job/${mockJob.id}`
    );
    expect(
      screen.getByRole("button", { name: /Delete Job/i })
    ).toBeInTheDocument();
  });

  it("calls deleteJob, shows toast, and navigates on delete confirmation", async () => {
    const navigateMock = vi.fn();
    mockUseNavigate.mockReturnValue(navigateMock);

    mockWindowConfirm.mockReturnValue(true);

    render(
      <BrowserRouter>
        <JobPage deleteJob={mockDeleteJob} />
      </BrowserRouter>
    );

    const deleteButton = screen.getByRole("button", { name: /Delete Job/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockWindowConfirm).toHaveBeenCalledTimes(1);

      expect(mockDeleteJob).toHaveBeenCalledTimes(1);

      expect(mockDeleteJob).toHaveBeenCalledWith(mockJob.id);

      expect(toast.success).toHaveBeenCalledTimes(1);

      expect(toast.success).toHaveBeenCalledWith("Job deleted successfully");
      expect(navigateMock).toHaveBeenCalledTimes(1);

      expect(navigateMock).toHaveBeenCalledWith("/jobs");
    });
  });

  it("does not delete job if confirmation is cancelled", async () => {
    const navigateMock = vi.fn();
    mockUseNavigate.mockReturnValue(navigateMock);

    mockWindowConfirm.mockReturnValue(false);

    render(
      <BrowserRouter>
        <JobPage deleteJob={mockDeleteJob} />
      </BrowserRouter>
    );

    const deleteButton = screen.getByRole("button", { name: /Delete Job/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockWindowConfirm).toHaveBeenCalledTimes(1);

      expect(mockDeleteJob).not.toHaveBeenCalled();

      expect(toast.success).not.toHaveBeenCalled();

      expect(navigateMock).not.toHaveBeenCalled();
    });
  });
});

describe("JobLoader", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches job data successfully", async () => {
    const mockResponseData = {
      id: "1",
      title: "Test Job",
      description: "Test Description",
    };

    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponseData),
    });

    const params = { id: "1" };
    const data = await JobLoader({ params });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(`/api/jobs/${params.id}`);

    expect(data).toEqual(mockResponseData);
  });

  it("returns null if fetch fails", async () => {
    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,

      json: () => Promise.resolve({ message: "Job not found" }),
    });

    const params = { id: "2" };
    const data = await JobLoader({ params });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(`/api/jobs/${params.id}`);

    expect(data).toBeNull();
  });
});
