import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { toast } from "react-toastify";
import EditJobPage from "./EditJobPage";
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

describe("EditJobPage", () => {
  const mockJob = {
    id: "1",
    type: "Full-Time",
    title: "Software Engineer",
    description: "Develop amazing software.",
    salary: "$100K - 125K",
    location: "San Francisco, CA",
    company: {
      name: "Tech Solutions",
      description: "A leading tech company.",
      contactEmail: "contact@techsolutions.com",
      contactPhone: "111-222-3333",
    },
  };

  const mockUpdateJobSubmit = vi.fn();

  beforeEach(() => {
    mockUseLoaderData.mockReturnValue(mockJob);
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseNavigate.mockReturnValue(vi.fn());
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the form with initial job data", () => {
    render(
      <BrowserRouter>
        <EditJobPage updateJobSubmit={mockUpdateJobSubmit} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Job Type/i)).toHaveValue(mockJob.type);
    expect(screen.getByLabelText(/Job Listing Name/i)).toHaveValue(
      mockJob.title
    );

    expect(screen.getByTestId("job-description-textarea")).toHaveValue(
      mockJob.description
    );

    expect(screen.getByLabelText("Salary")).toHaveValue(mockJob.salary);
    expect(screen.getByLabelText(/Location/i)).toHaveValue(mockJob.location);

    expect(screen.getByLabelText(/Company Name/i)).toHaveValue(
      mockJob.company.name
    );

    expect(screen.getByTestId("company-description-textarea")).toHaveValue(
      mockJob.company.description
    );

    expect(screen.getByLabelText(/Contact Email/i)).toHaveValue(
      mockJob.company.contactEmail
    );

    expect(screen.getByLabelText(/Contact Phone/i)).toHaveValue(
      mockJob.company.contactPhone
    );

    expect(
      screen.getByRole("button", { name: /Update Job/i })
    ).toBeInTheDocument();
  });

  it("updates state when form fields are changed", () => {
    render(
      <BrowserRouter>
        <EditJobPage updateJobSubmit={mockUpdateJobSubmit} />
      </BrowserRouter>
    );

    const titleInput = screen.getByLabelText(/Job Listing Name/i);
    fireEvent.change(titleInput, { target: { value: "New Job Title" } });
    expect(titleInput).toHaveValue("New Job Title");

    const descriptionInput = screen.getByTestId("job-description-textarea");
    fireEvent.change(descriptionInput, {
      target: { value: "New job description." },
    });

    expect(descriptionInput).toHaveValue("New job description.");

    const typeSelect = screen.getByLabelText(/Job Type/i);
    fireEvent.change(typeSelect, { target: { value: "Part-Time" } });
    expect(typeSelect).toHaveValue("Part-Time");
  });

  it("calls updateJobSubmit with the correct data on form submission", async () => {
    render(
      <BrowserRouter>
        <EditJobPage updateJobSubmit={mockUpdateJobSubmit} />
      </BrowserRouter>
    );

    const titleInput = screen.getByLabelText(/Job Listing Name/i);
    fireEvent.change(titleInput, { target: { value: "Updated Job Title" } });

    const submitButton = screen.getByRole("button", { name: /Update Job/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateJobSubmit).toHaveBeenCalledTimes(1);

      expect(mockUpdateJobSubmit).toHaveBeenCalledWith({
        ...mockJob,
        title: "Updated Job Title",
      });
    });
  });

  it("displays a success toast and navigates to job details on successful submission", async () => {
    const navigateMock = vi.fn();
    mockUseNavigate.mockReturnValue(navigateMock);

    render(
      <BrowserRouter>
        <EditJobPage updateJobSubmit={mockUpdateJobSubmit} />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole("button", { name: /Update Job/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledTimes(1);

      expect(toast.success).toHaveBeenCalledWith("Job Updated successfully");
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledTimes(1);

      expect(navigateMock).toHaveBeenCalledWith(`/job/${mockJob.id}`);
    });
  });
});
