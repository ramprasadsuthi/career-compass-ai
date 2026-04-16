import { CareerResult, UserProfile } from "@/lib/careerEngine";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Star, TrendingUp, BookOpen, Wrench, DollarSign, Target } from "lucide-react";

interface Props {
  result: CareerResult;
  profile: UserProfile;
  onBack: () => void;
}

const ResultsDashboard = ({ result, profile, onBack }: Props) => {
  const handleSave = () => {
    localStorage.setItem("careerpath_profile", JSON.stringify(profile));
    localStorage.setItem("careerpath_result", JSON.stringify(result));
    alert("Results saved! You can revisit them anytime.");
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
${result.careers.map((c, i) => `${i + 1}. ${c.title} (${c.match}% match) - ${c.salaryRange}`).join("\n")}

ROADMAP
${result.roadmap.map(r => `${r.years} - ${r.title}\n${r.items.map(i => `  • ${i}`).join("\n")}`).join("\n\n")}

SUGGESTED COURSES
${result.courses.map(c => `• ${c.name} (${c.platform}, ${c.duration})`).join("\n")}

TOOLS TO LEARN
${result.tools.join(", ")}

SALARY GROWTH
${result.salaryGrowth.map(s => `Year ${s.year}: ${s.salary}`).join(" → ")}
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
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Your Career Roadmap, <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>{profile.name}</span>
          </h1>
          <p className="text-muted-foreground mt-1">{profile.qualification} • {profile.stream} • {profile.location}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onBack} className="gap-1.5"><ArrowLeft className="w-4 h-4" /> Edit</Button>
          <Button variant="outline" size="sm" onClick={handleSave} className="gap-1.5"><Star className="w-4 h-4" /> Save</Button>
          <Button size="sm" onClick={handleDownload} className="gap-1.5 gradient-primary text-primary-foreground border-0 hover:opacity-90"><Download className="w-4 h-4" /> Download</Button>
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
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">{career.salaryRange}</Badge>
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
            {result.courses.map((course, i) => (
              <Card key={i} className="p-4 border-0 shadow-card flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{course.name}</h4>
                  <p className="text-xs text-muted-foreground">{course.platform} • {course.duration}</p>
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
            <SectionHeader icon={<DollarSign className="w-5 h-5" />} title="Salary Growth" />
            <Card className="p-5 border-0 shadow-card">
              <div className="flex items-end justify-between gap-2 h-32">
                {result.salaryGrowth.map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <span className="text-xs font-semibold text-foreground">{s.salary}</span>
                    <div className="w-full gradient-primary rounded-t-lg transition-all duration-500" style={{ height: `${20 + i * 20}%` }} />
                    <span className="text-xs text-muted-foreground">Yr {s.year}</span>
                  </div>
                ))}
              </div>
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
