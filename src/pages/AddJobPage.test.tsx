import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, afterEach, beforeAll, vi } from "vitest";
import { toast } from "react-toastify";
import AddJobPage from "./AddJobPage";
import "@testing-library/jest-dom/vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("AddJobPage", () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the add job form with all fields", () => {
    render(
      <BrowserRouter>
        <AddJobPage addJobSubmit={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Job Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Listing Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Job Description")).toBeInTheDocument();
    expect(screen.getByLabelText(/Salary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Company Description")).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Phone/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Job/i })
    ).toBeInTheDocument();
  });

  it("allows entering values into the form fields", () => {
    render(
      <BrowserRouter>
        <AddJobPage addJobSubmit={() => {}} />
      </BrowserRouter>
    );

    const titleInput = screen.getByLabelText(/Job Listing Name/i);
    fireEvent.change(titleInput, { target: { value: "Frontend Developer" } });
    expect(titleInput).toHaveValue("Frontend Developer");

    const jobDescriptionTextarea = screen.getByLabelText("Job Description");
    fireEvent.change(jobDescriptionTextarea, {
      target: { value: "Develop and maintain web applications." },
    });
    expect(jobDescriptionTextarea).toHaveValue(
      "Develop and maintain web applications."
    );

    const locationInput = screen.getByLabelText(/Location/i);
    fireEvent.change(locationInput, { target: { value: "New York, NY" } });
    expect(locationInput).toHaveValue("New York, NY");

    const companyNameInput = screen.getByLabelText(/Company Name/i);
    fireEvent.change(companyNameInput, { target: { value: "Acme Corp" } });
    expect(companyNameInput).toHaveValue("Acme Corp");

    const companyDescriptionTextarea = screen.getByLabelText(
      "Company Description"
    );
    fireEvent.change(companyDescriptionTextarea, {
      target: { value: "A leading software company." },
    });
    expect(companyDescriptionTextarea).toHaveValue(
      "A leading software company."
    );

    const contactEmailInput = screen.getByLabelText(/Contact Email/i);
    fireEvent.change(contactEmailInput, {
      target: { value: "hr@acmecorp.com" },
    });
    expect(contactEmailInput).toHaveValue("hr@acmecorp.com");

    const contactPhoneInput = screen.getByLabelText(/Contact Phone/i);
    fireEvent.change(contactPhoneInput, { target: { value: "555-555-5555" } });
    expect(contactPhoneInput).toHaveValue("555-555-5555");
  });

  it("defaults for job type and salary are correctly set", () => {
    render(
      <BrowserRouter>
        <AddJobPage addJobSubmit={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Job Type/i)).toHaveValue("Full-Time");
    expect(screen.getByLabelText(/Salary/i)).toHaveValue("Under $50K");
  });

  it("selects different job type and salary options", () => {
    render(
      <BrowserRouter>
        <AddJobPage addJobSubmit={() => {}} />
      </BrowserRouter>
    );

    const jobTypeSelect = screen.getByLabelText(/Job Type/i);
    fireEvent.change(jobTypeSelect, { target: { value: "Remote" } });
    expect(jobTypeSelect).toHaveValue("Remote");

    const salarySelect = screen.getByLabelText(/Salary/i);
    fireEvent.change(salarySelect, { target: { value: "$100K - 125K" } });
    expect(salarySelect).toHaveValue("$100K - 125K");
  });

  it("calls addJobSubmit with correct data on form submission and navigates", async () => {
    const addJobSubmitMock = vi.fn();
    render(
      <BrowserRouter>
        <AddJobPage addJobSubmit={addJobSubmitMock} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Job Type/i), {
      target: { value: "Part-Time" },
    });
    fireEvent.change(screen.getByLabelText(/Job Listing Name/i), {
      target: { value: "Part-Time Designer" },
    });
    fireEvent.change(screen.getByLabelText("Job Description"), {
      target: { value: "Create awesome designs." },
    });
    fireEvent.change(screen.getByLabelText(/Salary/i), {
      target: { value: "$60K - 70K" },
    });
    fireEvent.change(screen.getByLabelText(/Location/i), {
      target: { value: "Remote" },
    });
    fireEvent.change(screen.getByLabelText(/Company Name/i), {
      target: { value: "Design Studio" },
    });
    fireEvent.change(screen.getByLabelText("Company Description"), {
      target: { value: "We specialize in modern design." },
    });
    fireEvent.change(screen.getByLabelText(/Contact Email/i), {
      target: { value: "info@designstudio.com" },
    });
    fireEvent.change(screen.getByLabelText(/Contact Phone/i), {
      target: { value: "111-222-3333" },
    });

    const submitButton = screen.getByRole("button", { name: /Add Job/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(addJobSubmitMock).toHaveBeenCalledTimes(1);
      expect(addJobSubmitMock).toHaveBeenCalledWith({
        type: "Part-Time",
        title: "Part-Time Designer",
        description: "Create awesome designs.",
        salary: "$60K - 70K",
        location: "Remote",
        company: {
          name: "Design Studio",
          description: "We specialize in modern design.",
          contactEmail: "info@designstudio.com",
          contactPhone: "111-222-3333",
        },
      });
    });

    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith("Job Added successfully");

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/jobs");
  });
});
