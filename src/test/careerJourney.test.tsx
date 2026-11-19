import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Index from "@/pages/Index";

describe("career report journey", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("completes the questionnaire, saves/restores, prints, edits, and deletes a report", async () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => undefined);
    const view = render(<Index />);

    fireEvent.change(screen.getByPlaceholderText("Enter your name"), { target: { value: "Asha" } });
    fireEvent.change(screen.getByPlaceholderText("e.g. Hyderabad"), { target: { value: "Hyderabad" } });
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    fireEvent.click(screen.getByRole("button", { name: "Degree" }));
    fireEvent.click(screen.getByRole("button", { name: "CSE" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    fireEvent.click(screen.getByRole("button", { name: "Technology" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    fireEvent.click(screen.getByRole("button", { name: "Adaptability" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    fireEvent.click(screen.getByRole("button", { name: "Job" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    fireEvent.click(screen.getByRole("button", { name: "Hybrid" }));
    fireEvent.click(screen.getByRole("button", { name: /Generate My Career Path/ }));

    expect(await screen.findByRole("heading", { name: /Your Career Roadmap, Asha/ }, { timeout: 4000 })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(localStorage.getItem("careerpath_profile")).toContain("Asha");
    fireEvent.click(screen.getByRole("button", { name: "Print / PDF" }));
    expect(print).toHaveBeenCalledOnce();
    const printableReport = document.getElementById("career-report")?.textContent || "";
    expect(printableReport).toContain("Asha");
    expect(printableReport).toContain("Sources and data notes");
    expect(printableReport).toContain("DevOps Engineer certificate");
    expect(printableReport).toContain("5–10 Year Roadmap");
    expect(printableReport).toContain("Suggested Courses");
    expect(printableReport).toContain("DevOps programming certificate");
    expect(printableReport).toContain("valid through 2027-03-15");

    view.unmount();
    render(<Index />);
    expect(await screen.findByRole("heading", { name: /Your Career Roadmap, Asha/ }, { timeout: 4000 })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    expect(screen.getByPlaceholderText("Enter your name")).toHaveValue("Asha");
    expect(screen.getByPlaceholderText("e.g. Hyderabad")).toHaveValue("Hyderabad");

    for (let step = 0; step < 6; step += 1) fireEvent.click(screen.getByRole("button", { name: "Next" }));
    fireEvent.click(screen.getByRole("button", { name: /Generate My Career Path/ }));
    expect(await screen.findByRole("heading", { name: /Your Career Roadmap, Asha/ }, { timeout: 4000 })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Delete Saved Report" }));
    await waitFor(() => expect(localStorage.getItem("careerpath_profile")).toBeNull());
    expect(screen.getByRole("heading", { name: "CareerPath AI" })).toBeInTheDocument();
  }, 15000);
});
