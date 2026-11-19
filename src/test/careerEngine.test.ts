import { describe, expect, it } from "vitest";
import { CAREER_CATALOG_TITLES, CAREER_EVIDENCE_COVERAGE, CAREER_INTERESTS, generateCareerResult, getCareerEvidence, type UserProfile } from "@/lib/careerEngine";
import { deleteCareerReport, loadCareerReport, saveCareerReport } from "@/lib/careerStorage";

const profile = (overrides: Partial<UserProfile> = {}): UserProfile => ({
  name: "Asha", age: 21, location: "Hyderabad", qualification: "Degree", stream: "CSE",
  interests: ["Technology"], strengths: ["Logical Thinking", "Problem Solving"], weaknesses: [],
  careerGoal: "Job", workStyle: "Hybrid", ...overrides,
});

describe("career recommendation engine", () => {
  it("returns stable results for the same profile", () => {
    const input = profile();
    expect(generateCareerResult(input)).toEqual(generateCareerResult(input));
  });

  it("includes at least one relevant career for every selectable interest", () => {
    for (const interest of CAREER_INTERESTS) {
      const result = generateCareerResult(profile({ interests: [interest] }));
      expect(result.careers.length, interest).toBeGreaterThan(0);
      expect(result.careers[0].reasons.some(reason => reason.includes(interest)), interest).toBe(true);
    }
  });

  it("assigns an explicit evidence status to every career in the catalog", () => {
    expect([...CAREER_EVIDENCE_COVERAGE].sort()).toEqual([...CAREER_CATALOG_TITLES].sort());
    const all = generateCareerResult(profile({ interests: [...CAREER_INTERESTS] }));
    expect(all.careers.every(career => career.evidence.length > 0 && ["direct", "adjacent", "unverified"].includes(career.evidence[0].status))).toBe(true);
  });

  it("records the adjacent evidence and review limits for the two formerly unmapped careers", () => {
    const consultant = getCareerEvidence("Management Consultant")[0];
    const analyst = getCareerEvidence("Financial Analyst")[0];
    expect(consultant.status).toBe("adjacent");
    expect(consultant.validity).toContain("Review date passed");
    expect(consultant.limitation).toContain("not registered in NQR");
    expect(analyst.status).toBe("adjacent");
    expect(analyst.validity).toContain("2026-11-30");
  });

  it("uses current replacements where found and labels expired catalog evidence", () => {
    const cloud = getCareerEvidence("Cloud Architect")[0];
    const analyst = getCareerEvidence("Business Analyst")[0];
    const motion = getCareerEvidence("Motion Graphics Designer")[0];
    const research = getCareerEvidence("Research Scientist")[0];
    expect(cloud.url).toContain("/15107");
    expect(cloud.validity).toContain("2028-05-08");
    expect(analyst.url).toContain("/14732");
    expect(analyst.validity).toContain("2028-10-07");
    expect(motion.validity).toContain("Expired 2026-10-31");
    expect(research.validity).toContain("Expired 2026-09-29");
  });

  it("shows only dated role-specific salary references and keeps forecasts unavailable", () => {
    const result = generateCareerResult(profile({ interests: [...CAREER_INTERESTS] }));
    expect(result.salaryGrowth).toEqual([]);
    expect(result.careers.some(career => career.salaryReference)).toBe(true);
    expect(result.careers.every(career => career.salaryReference
      ? career.salaryReference.sourceUrl.includes("glassdoor.co.in") && career.salaryReference.checkedDate === "2026-11-19" && career.salaryRange === career.salaryReference.basePayRange
      : career.salaryRange === "Not available")).toBe(true);
  });

  it("explains the recommendation using matched profile details", () => {
    const result = generateCareerResult(profile({ interests: ["Technology"], strengths: ["Logical Thinking"], careerGoal: "Higher Studies" }));
    const dataScientist = result.careers.find(career => career.title === "Data Scientist");
    expect(dataScientist?.reasons.join(" ")).toContain("Technology");
    expect(dataScientist?.reasons.join(" ")).toContain("logical thinking");
    expect(dataScientist?.reasons.join(" ")).toContain("higher studies");
    expect(dataScientist?.improvementTips.length).toBeGreaterThan(0);
  });

  it("builds skill gaps, learning suggestions, and timed actions from the top career", () => {
    const result = generateCareerResult(profile({ interests: ["Finance"] }));
    expect(result.skillGaps.length).toBeGreaterThan(0);
    expect(result.skillGaps[0].nextAction).toContain(result.skillGaps[0].skill.toLowerCase());
    expect(result.courses.every(course => course.targets.length > 0)).toBe(true);
    expect(result.courses.every(course => course.sourceUrl.startsWith("https://nqr.gov.in/") && course.validityUntil)).toBe(true);
    expect(result.roadmap.every(phase => phase.actions.length > 0)).toBe(true);
  });

  it("uses profile weaknesses and work style to affect scores and explanations", () => {
    const base = generateCareerResult(profile({ interests: ["Design"], strengths: ["Creativity"], weaknesses: [], workStyle: "Remote" }));
    const adjusted = generateCareerResult(profile({ interests: ["Design"], strengths: ["Creativity"], weaknesses: ["Public Speaking"], workStyle: "Office" }));
    const baseUx = base.careers.find(career => career.title === "UX/UI Designer")!;
    const adjustedUx = adjusted.careers.find(career => career.title === "UX/UI Designer")!;
    expect(adjustedUx.match).toBeLessThan(baseUx.match);
    expect(adjustedUx.improvementTips.join(" ")).toContain("public speaking");
    expect(baseUx.reasons.join(" ")).toContain("remote");
  });

  it("saves, restores, and deletes a report from local storage", () => {
    const input = profile();
    const result = generateCareerResult(input);
    saveCareerReport(input, result);
    expect(loadCareerReport()).toEqual({ profile: input, result });
    deleteCareerReport();
    expect(loadCareerReport()).toBeNull();
  });

  it("clears malformed saved data without crashing", () => {
    localStorage.setItem("careerpath_profile", "{");
    localStorage.setItem("careerpath_result", "broken");
    expect(loadCareerReport()).toBeNull();
    expect(localStorage.getItem("careerpath_profile")).toBeNull();
    expect(localStorage.getItem("careerpath_result")).toBeNull();
  });

  it("drops expired sourced courses when restoring a saved report", () => {
    const input = profile();
    const result = generateCareerResult(input);
    result.courses = [{ ...result.courses[0], validityUntil: "2000-01-01" }];
    saveCareerReport(input, result);
    expect(loadCareerReport()?.result.courses).toEqual([]);
  });
});
