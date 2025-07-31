/* eslint-disable no-unused-vars */
import { expect, it, describe } from "vitest";
import JobListing from "./JobListing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter as Router } from "react-router-dom";

const mockJob = {
  id: "1",
  type: "Full-time",
  title: "Software Engineer",
  description:
    "We are seeking a talented Front-End Developer to join our team in Boston, MA. The ideal candidate will have strong skills in HTML, CSS, and JavaScript, with experience working with modern JavaScript frameworks such as React or Angular.",
  salary: "$100,000",
  location: "New York, NY",
};

describe("JobListing", () => {
  it("renders a card with job details", () => {
    render(
      <Router>
        <JobListing job={mockJob} />
      </Router>
    );
    expect(screen.getByText(mockJob.type)).toBeInTheDocument();
    expect(screen.getByText(mockJob.title)).toBeInTheDocument();
    expect(screen.getByText(`${mockJob.salary} / Year`)).toBeInTheDocument();
    expect(screen.getByText(mockJob.location)).toBeInTheDocument();
  });

  it("slices the description and shows 'show more' button if description is long", () => {
    expect(screen.queryByText(mockJob.description)).not.toBeInTheDocument();

    expect(screen.getByText("...show more")).toBeInTheDocument();
  });

  it('shows full description and "show less" button after clicking "show more"', async () => {
    const showMoreButton = screen.getByRole("button", {
      name: /...show more/i,
    });
    await userEvent.click(showMoreButton);

    const showLessButton = screen.getByRole("button", {
      name: /...show less/i,
    });
    expect(showLessButton).toBeInTheDocument();
    expect(screen.getByText(mockJob.description)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /...show more/i })
    ).not.toBeInTheDocument();
  });

  it("shows truncated description and 'show more' button when 'show less' is clicked", async () => {
    const showLessButton = screen.getByRole("button", {
      name: /...show less/i,
    });
    expect(showLessButton).toBeInTheDocument();
    expect(screen.getByText(mockJob.description)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /...show more/i })
    ).not.toBeInTheDocument();
    await userEvent.click(showLessButton);
    const showMoreButton = screen.getByRole("button", {
      name: /...show more/i,
    });
    expect(showMoreButton).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /...show less/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(mockJob.description.slice(0, 90))
    ).toBeInTheDocument();
  });

  it("renders 'Read More' link and points to the correct URL", () => {
    const readMoreLink = screen.getByRole("link", { name: /Read More/i });
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink).toHaveAttribute("href", `/job/${mockJob.id}`);
  });
});
