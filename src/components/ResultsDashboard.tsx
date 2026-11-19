import { CareerResult, UserProfile } from "@/lib/careerEngine";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Star, TrendingUp, BookOpen, Wrench, DollarSign, Target, Printer, Trash2 } from "lucide-react";

interface Props {
  result: CareerResult;
  profile: UserProfile;
  onBack: () => void;
  onSave: () => void;
  onDelete: () => void;
  isSaved: boolean;
}

const ResultsDashboard = ({ result, profile, onBack, onSave, onDelete, isSaved }: Props) => {
  const handlePrint = () => {
    const disclosures = Array.from(document.querySelectorAll<HTMLDetailsElement>("#career-report details"));
    const previousStates = disclosures.map(disclosure => disclosure.open);
    disclosures.forEach(disclosure => { disclosure.open = true; });
    const restoreDisclosureState = () => {
      disclosures.forEach((disclosure, index) => { disclosure.open = previousStates[index]; });
    };
    window.addEventListener("afterprint", restoreDisclosureState, { once: true });
    window.print();
  };

  const handleDownload = () => {
    const text = `
CareerPath AI - Career Report for ${profile.name}
====================================================
Generated on: ${new Date().toLocaleDateString()}

Profile: ${profile.qualification} | ${profile.stream} | ${profile.location}
Interests: ${profile.interests.join(", ")}
Strengths: ${profile.strengths.join(", ")}
Career Goal: ${profile.careerGoal} | Work Style: ${profile.workStyle}

TOP CAREER RECOMMENDATIONS
${result.careers.map((c, i) => `${i + 1}. ${c.title} (${c.match}% match; catalog reviewed ${c.catalogUpdated})${c.salaryReference ? ` - Glassdoor base-pay reference ${c.salaryReference.basePayRange} (average ${c.salaryReference.averageBasePay}; checked ${c.salaryReference.checkedDate}; ${c.salaryReference.sourceUrl})` : " - salary reference unavailable"}\n  Why: ${c.reasons.join("; ")}\n  Improve: ${c.improvementTips.join("; ")}`).join("\n")}
\nCAREER SOURCES AND LIMITATIONS
${result.careers.flatMap(c => c.evidence.map(e => `• ${c.title}: ${e.status.toUpperCase()} — ${e.title} (${e.url}; checked ${e.lastChecked}). Supports: ${e.supports} Limitation: ${e.limitation}`)).join("\n")}
• Salary figures are Glassdoor India base-pay estimates with per-role links and checked dates where available; they are not guaranteed offers or forecasts. Glassdoor says its most-likely range represents the 25th–75th percentile and uses user-submitted salaries and its estimation model.

ROADMAP
${result.roadmap.map(r => `${r.years} - ${r.title}\n${r.items.map(i => `  • ${i}`).join("\n")}\n${r.actions.map(a => `  • ${a.timeframe}: ${a.action}`).join("\n")}`).join("\n\n")}

SUGGESTED COURSES
${result.courses.map(c => `• ${c.name} (${c.platform}, ${c.duration}; targets ${c.targets.join(", ")})\n  Source: ${c.sourceTitle} (${c.sourceUrl}); checked ${c.sourceChecked}; qualification valid through ${c.validityUntil}. ${c.sourceNote}`).join("\n") || "No currently valid, role-specific sourced course was verified for the leading recommendation."}

TOOLS TO LEARN
${result.tools.join(", ")}

SALARY INFORMATION
${result.careers.filter(c => c.salaryReference).map(c => `• ${c.title}: ${c.salaryReference!.basePayRange} base pay; average ${c.salaryReference!.averageBasePay}. Source: ${c.salaryReference!.sourceTitle} (${c.salaryReference!.sourceUrl}); checked ${c.salaryReference!.checkedDate}. ${c.salaryReference!.note}`).join("\n") || "No role-specific salary reference was available for the recommended careers."}
No salary forecast or growth projection is included.
    `.trim();

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CareerPath_${profile.name.replace(/\s/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="career-report" className="w-full max-w-5xl mx-auto space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Your Career Roadmap, <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>{profile.name}</span>
          </h1>
          <p className="text-muted-foreground mt-1">{profile.qualification} • {profile.stream} • {profile.location}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onBack} className="gap-1.5 print:hidden"><ArrowLeft className="w-4 h-4" /> Edit</Button>
          <Button variant="outline" size="sm" onClick={onSave} className="gap-1.5 print:hidden"><Star className="w-4 h-4" /> {isSaved ? "Update Save" : "Save"}</Button>
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5 print:hidden"><Printer className="w-4 h-4" /> Print / PDF</Button>
          <Button variant="outline" size="sm" onClick={onDelete} disabled={!isSaved} className="gap-1.5 print:hidden"><Trash2 className="w-4 h-4" /> Delete Saved Report</Button>
          <Button size="sm" onClick={handleDownload} className="gap-1.5 gradient-primary text-primary-foreground border-0 hover:opacity-90 print:hidden"><Download className="w-4 h-4" /> Download</Button>
        </div>
      </div>

      {/* Career Cards */}
      <section>
        <SectionHeader icon={<Target className="w-5 h-5" />} title="Recommended Careers" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.careers.map((career, i) => (
            <Card key={i} className="p-5 border-0 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">{career.icon}</div>
              <h3 className="font-bold text-foreground text-lg">{career.title}</h3>
              <p className="text-muted-foreground text-sm mt-1 mb-3">{career.description}</p>
              <p className="text-xs font-semibold text-foreground">Why this matches</p>
              <ul className="text-xs text-muted-foreground mt-1 mb-3 space-y-1">
                {career.reasons.map((reason, j) => <li key={j}>• {reason}</li>)}
              </ul>
              <p className="text-xs font-semibold text-foreground">To improve your fit</p>
              <ul className="text-xs text-muted-foreground mt-1 mb-3 space-y-1">
                {career.improvementTips.map((tip, j) => <li key={j}>• {tip}</li>)}
              </ul>
              <details className="mb-3 text-xs">
                <summary className="cursor-pointer font-semibold text-primary">Skills and entry path</summary>
                <div className="mt-2 space-y-1 text-muted-foreground">
                  <p><span className="font-medium text-foreground">Core skills:</span> {career.skills.join(", ")}</p>
                  <p><span className="font-medium text-foreground">Typical education paths (guidance):</span> {career.education.join("; ")}</p>
                  <p><span className="font-medium text-foreground">Possible work styles (varies by employer):</span> {career.workStyles.join(", ")}</p>
                  <ul><span className="font-medium text-foreground">Suggested preparation (guidance, not formal entry requirements):</span>{career.entryRequirements.map((requirement, j) => <li key={j}>• {requirement}</li>)}</ul>
                </div>
              </details>
              <details className="mb-3 text-xs">
                <summary className="cursor-pointer font-semibold text-primary">Sources and data notes</summary>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  {career.evidence.map((item, j) => <li key={j}><span className="font-semibold">{item.status === "unverified" ? "No role mapping verified" : item.status === "adjacent" ? "Adjacent reference" : "Role reference"}:</span> <a className="underline" href={item.url} target="_blank" rel="noreferrer">{item.title}</a> (checked {item.lastChecked}; {item.validity}). Supports: {item.supports} Limitation: {item.limitation}</li>)}
                  {career.salaryReference ? <li>Glassdoor India base-pay estimate: {career.salaryReference.basePayRange} (average {career.salaryReference.averageBasePay}; checked {career.salaryReference.checkedDate}). <a className="underline" href={career.salaryReference.sourceUrl} target="_blank" rel="noreferrer">{career.salaryReference.sourceTitle}</a>. {career.salaryReference.note} These are estimates, not forecasts or guaranteed offers.</li> : <li>No role-specific India salary reference was verified for this career.</li>}
                  <li>No salary growth forecast is provided.</li>
                  <li>Career description, skill list, work styles, and suggested preparation are curated guidance, last reviewed {career.catalogUpdated}; the evidence above only supports the specific areas described.</li>
                </ul>
              </details>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">{career.salaryReference ? "Salary reference available" : "Salary reference unavailable"}</Badge>
                <div className="flex items-center gap-1.5">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full transition-all duration-700" style={{ width: `${career.match}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-primary">{career.match}%</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section>
        <SectionHeader icon={<TrendingUp className="w-5 h-5" />} title="5–10 Year Roadmap" />
        <div className="space-y-4">
          {result.roadmap.map((phase, i) => (
            <Card key={i} className="p-5 border-0 shadow-card relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 gradient-primary" />
              <div className="pl-4">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="gradient-primary text-primary-foreground border-0 text-xs">{phase.years}</Badge>
                  <h3 className="font-bold text-foreground">{phase.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {phase.items.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full gradient-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 space-y-2">
                  {phase.actions.map((action, j) => <p key={j} className="text-sm text-foreground"><span className="font-semibold">{action.timeframe}:</span> {action.action}</p>)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Skill Gap */}
      <section>
        <SectionHeader icon={<Target className="w-5 h-5" />} title="Skill Gap Analysis" />
        <Card className="p-5 border-0 shadow-card">
          <div className="space-y-4">
            {result.skillGaps.map((gap, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-foreground">{gap.skill}</span>
                  <span className="text-muted-foreground">{gap.current}% → {gap.required}%</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden relative">
                  <div className="h-full bg-muted-foreground/20 rounded-full absolute" style={{ width: `${gap.required}%` }} />
                  <div className="h-full gradient-primary rounded-full relative transition-all duration-700" style={{ width: `${gap.current}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Next: {gap.nextAction}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Courses & Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <SectionHeader icon={<BookOpen className="w-5 h-5" />} title="Suggested Courses" />
          <div className="space-y-3">
            {result.courses.length === 0 && <Card className="p-4 border-0 shadow-card text-sm text-muted-foreground">No currently valid, role-specific sourced course was verified for the leading recommendation. Check the qualification source notes above for expired or adjacent pathways.</Card>}
            {result.courses.map((course, i) => (
              <Card key={i} className="p-4 border-0 shadow-card flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{course.name}</h4>
                  <p className="text-xs text-muted-foreground">{course.platform} • {course.duration} • targets: {course.targets.join(", ")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{course.sourceNote} <a className="underline" href={course.sourceUrl} target="_blank" rel="noreferrer">{course.sourceTitle}</a>; checked {course.sourceChecked}, valid through {course.validityUntil}.</p>
                </div>
                <Badge variant={course.type === "Technical" ? "default" : "secondary"} className={course.type === "Technical" ? "gradient-primary text-primary-foreground border-0 text-xs" : "text-xs"}>
                  {course.type}
                </Badge>
              </Card>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section>
            <SectionHeader icon={<Wrench className="w-5 h-5" />} title="Tools & Technologies" />
            <Card className="p-5 border-0 shadow-card">
              <div className="flex flex-wrap gap-2">
                {result.tools.map((tool, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1.5 text-sm">{tool}</Badge>
                ))}
              </div>
            </Card>
          </section>

          <section>
            <SectionHeader icon={<DollarSign className="w-5 h-5" />} title="Salary References (not forecasts)" />
            <Card className="p-5 border-0 shadow-card">
              <p className="text-sm text-muted-foreground mb-3">India base-pay estimates from Glassdoor are shown where a role-specific page was available. These user-submission and model-based estimates vary by experience, location, and employer. No salary growth forecast is included.</p>
              <ul className="space-y-2 text-sm">{result.careers.filter(c => c.salaryReference).map(c => <li key={c.title}><strong>{c.title}:</strong> {c.salaryReference!.basePayRange} base pay; average {c.salaryReference!.averageBasePay}. <a className="underline text-primary" href={c.salaryReference!.sourceUrl} target="_blank" rel="noreferrer">{c.salaryReference!.sourceTitle}</a> (checked {c.salaryReference!.checkedDate}).</li>)}</ul>
              {!result.careers.some(c => c.salaryReference) && <p className="text-sm">No sourced salary references were found for the recommended roles.</p>}
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground">{icon}</div>
    <h2 className="text-lg font-bold text-foreground">{title}</h2>
  </div>
);

export default ResultsDashboard;
