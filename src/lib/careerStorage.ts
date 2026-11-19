import type { CareerResult, UserProfile } from "@/lib/careerEngine";

const PROFILE_KEY = "careerpath_profile";
const RESULT_KEY = "careerpath_result";

export interface SavedCareerReport { profile: UserProfile; result: CareerResult }

function isProfile(value: unknown): value is UserProfile {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  return typeof p.name === "string" && typeof p.age === "number" && typeof p.location === "string" &&
    typeof p.qualification === "string" && typeof p.stream === "string" && Array.isArray(p.interests) &&
    Array.isArray(p.strengths) && Array.isArray(p.weaknesses) && typeof p.careerGoal === "string" && typeof p.workStyle === "string";
}

function isResult(value: unknown): value is CareerResult {
  if (!value || typeof value !== "object") return false;
  const r = value as Record<string, unknown>;
  return Array.isArray(r.careers) && Array.isArray(r.roadmap) && Array.isArray(r.skillGaps) && Array.isArray(r.courses) && Array.isArray(r.tools) && Array.isArray(r.salaryGrowth);
}

export function saveCareerReport(profile: UserProfile, result: CareerResult): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  localStorage.setItem(RESULT_KEY, JSON.stringify(result));
}

export function loadCareerReport(): SavedCareerReport | null {
  const profileText = localStorage.getItem(PROFILE_KEY);
  const resultText = localStorage.getItem(RESULT_KEY);
  if (!profileText && !resultText) return null;
  try {
    const profile: unknown = profileText ? JSON.parse(profileText) : null;
    const result: unknown = resultText ? JSON.parse(resultText) : null;
    if (isProfile(profile) && isResult(result)) {
      const currentCourses = result.courses.filter(course =>
        typeof course.validityUntil === "string" && new Date(`${course.validityUntil}T23:59:59`) >= new Date(),
      );
      return { profile, result: { ...result, courses: currentCourses } };
    }
  } catch {
    // A malformed or older saved report should not prevent the app from opening.
  }
  deleteCareerReport();
  return null;
}

export function deleteCareerReport(): void {
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(RESULT_KEY);
}
