import { expect, test } from "@playwright/test";

test("career report saves, restores, prints complete sourced content, edits, and deletes", async ({ page }) => {
  await page.addInitScript(() => {
    (window as Window & { printCalls?: number }).printCalls = 0;
    window.print = () => { (window as Window & { printCalls?: number }).printCalls! += 1; };
  });
  await page.goto("/");

  await page.getByPlaceholder("Enter your name").fill("Asha");
  await page.getByPlaceholder("e.g. Hyderabad").fill("Hyderabad");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Degree" }).click();
  await page.getByRole("button", { name: "CSE" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Technology" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Adaptability" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Job" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Hybrid" }).click();
  await page.getByRole("button", { name: /Generate My Career Path/ }).click();
  await expect(page.getByRole("heading", { name: /Your Career Roadmap, Asha/ })).toBeVisible({ timeout: 5000 });

  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem("careerpath_profile"))).toContain("Asha");
  await page.getByRole("button", { name: "Print / PDF" }).click();
  expect(await page.evaluate(() => (window as Window & { printCalls?: number }).printCalls)).toBe(1);

  await page.emulateMedia({ media: "print" });
  await expect(page.locator("#career-report")).toContainText("Asha");
  await expect(page.locator("#career-report")).toContainText("Sources and data notes");
  await expect(page.locator("#career-report")).toContainText("DevOps Engineer certificate");
  await expect(page.locator("#career-report")).toContainText("valid through 2027-03-15");
  await expect(page.locator("#career-report")).toContainText("5–10 Year Roadmap");
  await expect(page.locator("#career-report")).toContainText("Suggested Courses");
  await expect(page.locator("#career-report")).toContainText("Salary References (not forecasts)");
  await expect(page.locator("#career-report")).toContainText("Glassdoor India base-pay estimate");
  await expect(page.locator("#career-report")).toContainText("No salary growth forecast is provided");
  await expect(page.locator("#career-report .print\\:hidden").first()).toBeHidden();
  await expect(page.getByText("DevOps Engineer certificate", { exact: false }).last()).toBeVisible();
  const pdf = await page.pdf();
  expect(pdf.subarray(0, 4).toString()).toBe("%PDF");

  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await page.emulateMedia({ media: "screen" });
  await expect(page.getByText("DevOps Engineer certificate", { exact: false }).last()).toBeHidden();
  await page.reload();
  await expect(page.getByRole("heading", { name: /Your Career Roadmap, Asha/ })).toBeVisible();
  await page.getByRole("button", { name: "Edit" }).click();
  await expect(page.getByPlaceholder("Enter your name")).toHaveValue("Asha");

  for (let step = 0; step < 6; step += 1) await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: /Generate My Career Path/ }).click();
  await expect(page.getByRole("heading", { name: /Your Career Roadmap, Asha/ })).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Delete Saved Report" }).click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem("careerpath_profile"))).toBeNull();
  await expect(page.getByRole("heading", { name: "CareerPath AI" })).toBeVisible();
});
