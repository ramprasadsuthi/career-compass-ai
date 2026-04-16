export interface UserProfile {
  name: string;
  age: number;
  location: string;
  qualification: string;
  stream: string;
  interests: string[];
  strengths: string[];
  weaknesses: string[];
  careerGoal: string;
  workStyle: string;
}

export interface CareerPath {
  title: string;
  match: number;
  description: string;
  icon: string;
  salaryRange: string;
  growth: string;
}

export interface RoadmapPhase {
  years: string;
  title: string;
  items: string[];
}

export interface SkillGap {
  skill: string;
  current: number;
  required: number;
}

export interface Course {
  name: string;
  type: "Technical" | "Non-Technical";
  platform: string;
  duration: string;
}

export interface CareerResult {
  careers: CareerPath[];
  roadmap: RoadmapPhase[];
  skillGaps: SkillGap[];
  courses: Course[];
  tools: string[];
  salaryGrowth: { year: number; salary: string }[];
}

const careerDatabase: Record<string, CareerPath[]> = {
  Technology: [
    { title: "Full Stack Developer", match: 0, description: "Build complete web applications from frontend to backend", icon: "💻", salaryRange: "₹6L - ₹25L", growth: "High" },
    { title: "Data Scientist", match: 0, description: "Extract insights from complex data using ML and statistics", icon: "📊", salaryRange: "₹8L - ₹30L", growth: "Very High" },
    { title: "Cloud Architect", match: 0, description: "Design and manage cloud infrastructure solutions", icon: "☁️", salaryRange: "₹12L - ₹40L", growth: "Very High" },
    { title: "DevOps Engineer", match: 0, description: "Bridge development and operations with automation", icon: "⚙️", salaryRange: "₹8L - ₹28L", growth: "High" },
  ],
  Design: [
    { title: "UX/UI Designer", match: 0, description: "Create intuitive and beautiful digital experiences", icon: "🎨", salaryRange: "₹5L - ₹20L", growth: "High" },
    { title: "Product Designer", match: 0, description: "Shape products from concept to launch", icon: "✨", salaryRange: "₹8L - ₹25L", growth: "High" },
    { title: "Motion Graphics Designer", match: 0, description: "Create engaging animated content", icon: "🎬", salaryRange: "₹4L - ₹18L", growth: "Medium" },
  ],
  Business: [
    { title: "Product Manager", match: 0, description: "Lead product strategy and cross-functional teams", icon: "📋", salaryRange: "₹10L - ₹35L", growth: "Very High" },
    { title: "Management Consultant", match: 0, description: "Help organizations improve performance", icon: "💼", salaryRange: "₹8L - ₹30L", growth: "High" },
    { title: "Business Analyst", match: 0, description: "Analyze business needs and translate to solutions", icon: "📈", salaryRange: "₹6L - ₹22L", growth: "High" },
  ],
  Teaching: [
    { title: "EdTech Specialist", match: 0, description: "Create innovative learning experiences with technology", icon: "📚", salaryRange: "₹5L - ₹18L", growth: "High" },
    { title: "Corporate Trainer", match: 0, description: "Train professionals in organizations", icon: "🎯", salaryRange: "₹6L - ₹20L", growth: "Medium" },
  ],
  Healthcare: [
    { title: "Health Informatics Specialist", match: 0, description: "Apply IT to healthcare data and systems", icon: "🏥", salaryRange: "₹6L - ₹22L", growth: "High" },
    { title: "Biomedical Engineer", match: 0, description: "Design medical devices and health solutions", icon: "🧬", salaryRange: "₹5L - ₹20L", growth: "High" },
  ],
};

function scoreCareer(career: CareerPath, profile: UserProfile): number {
  let score = 60 + Math.random() * 15;
  if (profile.strengths.includes("Problem Solving")) score += 5;
  if (profile.strengths.includes("Logical Thinking") && career.title.includes("Data")) score += 8;
  if (profile.strengths.includes("Creativity") && career.title.includes("Design")) score += 8;
  if (profile.strengths.includes("Leadership") && career.title.includes("Manager")) score += 8;
  if (profile.strengths.includes("Communication") && career.title.includes("Consultant")) score += 6;
  if (profile.careerGoal === "Freelancing" && (career.title.includes("Designer") || career.title.includes("Developer"))) score += 5;
  if (profile.careerGoal === "Higher Studies" && career.title.includes("Scientist")) score += 5;
  return Math.min(Math.round(score), 98);
}

export function generateCareerResult(profile: UserProfile): CareerResult {
  // Gather careers from interests
  const allCareers: CareerPath[] = [];
  for (const interest of profile.interests) {
    const careers = careerDatabase[interest] || [];
    allCareers.push(...careers);
  }
  if (allCareers.length === 0) {
    allCareers.push(...(careerDatabase.Technology || []));
  }

  // Score and sort
  const scored = allCareers.map(c => ({ ...c, match: scoreCareer(c, profile) }));
  scored.sort((a, b) => b.match - a.match);
  const topCareers = scored.slice(0, 5);

  const topTitle = topCareers[0]?.title || "Software Developer";

  const roadmap: RoadmapPhase[] = [
    {
      years: "Year 1–2",
      title: "Foundation",
      items: [
        `Complete ${profile.qualification === "10th" || profile.qualification === "Inter" ? "higher education in relevant field" : "foundational courses in " + topTitle}`,
        "Build core skills through online courses and certifications",
        "Work on personal projects and build a portfolio",
        "Network with professionals in the industry",
      ],
    },
    {
      years: "Year 3–5",
      title: "Specialization",
      items: [
        `Gain 1-2 years of professional experience as ${topTitle}`,
        "Specialize in a high-demand niche area",
        "Obtain advanced certifications",
        "Contribute to open-source or community projects",
        "Target mid-level positions with salary growth",
      ],
    },
    {
      years: "Year 5–10",
      title: "Advanced Growth",
      items: [
        "Move into senior or lead roles",
        "Mentor junior professionals",
        profile.careerGoal === "Business" ? "Launch your own venture" : "Become a domain expert",
        "Speak at conferences and build thought leadership",
        "Target leadership positions or specialized consulting",
      ],
    },
  ];

  const skillGaps: SkillGap[] = [
    { skill: "Technical Skills", current: profile.strengths.includes("Logical Thinking") ? 60 : 35, required: 85 },
    { skill: "Communication", current: profile.strengths.includes("Communication") ? 70 : 40, required: 80 },
    { skill: "Problem Solving", current: profile.strengths.includes("Problem Solving") ? 65 : 30, required: 90 },
    { skill: "Leadership", current: profile.strengths.includes("Leadership") ? 55 : 25, required: 75 },
    { skill: "Creativity", current: profile.strengths.includes("Creativity") ? 60 : 30, required: 80 },
  ];

  const courses: Course[] = [
    { name: "Python for Data Science", type: "Technical", platform: "Coursera", duration: "3 months" },
    { name: "Full Stack Web Development", type: "Technical", platform: "Udemy", duration: "6 months" },
    { name: "Cloud Computing with AWS", type: "Technical", platform: "AWS Academy", duration: "4 months" },
    { name: "Effective Communication", type: "Non-Technical", platform: "LinkedIn Learning", duration: "2 months" },
    { name: "Aptitude & Reasoning", type: "Non-Technical", platform: "PrepInsta", duration: "1 month" },
    { name: "Leadership & Management", type: "Non-Technical", platform: "Coursera", duration: "3 months" },
  ];

  const tools = ["VS Code", "Git & GitHub", "Figma", "Docker", "Jira", "Slack", "Google Analytics", "Notion", "ChatGPT / AI Tools"];

  const salaryGrowth = [
    { year: 1, salary: "₹3-5L" },
    { year: 3, salary: "₹8-12L" },
    { year: 5, salary: "₹15-22L" },
    { year: 7, salary: "₹22-32L" },
    { year: 10, salary: "₹30-50L+" },
  ];

  return { careers: topCareers, roadmap, skillGaps, courses, tools, salaryGrowth };
}
