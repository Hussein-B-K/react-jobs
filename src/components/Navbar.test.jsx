import { expect, it, describe, afterEach } from "vitest";
import Navbar from "./Navbar";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
describe("Navbar", () => {
  afterEach(() => {
    cleanup();
  });

  const renderNavbar = (initialRoute = "/") => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Navbar />
      </MemoryRouter>
    );
  };
  it("renders the logo and title", () => {
    renderNavbar();

    expect(screen.getByAltText("React Jobs")).toBeInTheDocument();
    expect(screen.getByText("React Jobs")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Jobs" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Add Job" })).toBeInTheDocument();
  });

  it("applies active class to Home link when on home page", () => {
    renderNavbar();

    const homeLink = screen.getByRole("link", { name: "Home" });
    const jobsLink = screen.getByRole("link", { name: "Jobs" });

    expect(homeLink).toHaveClass("bg-black");
    expect(jobsLink).not.toHaveClass("bg-black");
  });

  it("applies active class to Jobs link when on jobs page", () => {
    renderNavbar("/jobs");

    const homeLink = screen.getByRole("link", { name: "Home" });
    const jobsLink = screen.getByRole("link", { name: "Jobs" });

    expect(jobsLink).toHaveClass("bg-black");
    expect(homeLink).not.toHaveClass("bg-black");
  });
});
