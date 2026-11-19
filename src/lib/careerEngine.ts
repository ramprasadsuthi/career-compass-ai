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
  salaryReference?: SalaryReference;
  growth: string;
  skills: string[];
  education: string[];
  workStyles: string[];
  entryRequirements: string[];
  reasons: string[];
  improvementTips: string[];
  catalogUpdated: string;
  sources: CatalogSource[];
  evidence: CareerEvidence[];
}

export interface SalaryReference {
  basePayRange: string;
  averageBasePay: string;
  sourceTitle: string;
  sourceUrl: string;
  checkedDate: string;
  note: string;
}

export interface CatalogSource { name: string; url: string; scope: string; lastChecked: string }
export interface CareerEvidence { status: "direct" | "adjacent" | "unverified"; title: string; url: string; supports: string; limitation: string; lastChecked: string; validity: string }

export const CAREER_CATALOG_SOURCES: CatalogSource[] = [
  { name: "NSDC National Occupational Standards", url: "https://www.nsdcindia.org/national-occupational-standards-and-model-curriculum", scope: "India skills and competency framework; it does not directly validate this prototype's role mappings.", lastChecked: "2026-11-19" },
  { name: "Labour Bureau Occupational Wage Survey", url: "https://www.labourbureau.gov.in/occupational-wage-survey", scope: "Official survey methodology and selected-sector wage reports; the latest surfaced round uses a 2016 reference date and does not support current salary forecasts for these specific careers.", lastChecked: "2026-11-19" },
  { name: "PLFS Annual Report 2023–24", url: "https://www.dge.gov.in/sites/default/files/2025-05/Annual_Report_Periodic_Labour_Force_Survey_23_24_0.pdf", scope: "Official Indian labour and earnings statistics, aggregated by broad NCO occupational divisions; not salary data for each listed career.", lastChecked: "2026-11-19" },
];

export interface RoadmapAction { timeframe: string; action: string }
export interface RoadmapPhase { years: string; title: string; items: string[]; actions: RoadmapAction[] }
export interface SkillGap { skill: string; current: number; required: number; nextAction: string }
export interface Course { name: string; type: "Technical" | "Non-Technical"; platform: string; duration: string; targets: string[]; sourceTitle: string; sourceUrl: string; sourceChecked: string; validityUntil: string; sourceNote: string }
export interface CareerResult {
  careers: CareerPath[];
  roadmap: RoadmapPhase[];
  skillGaps: SkillGap[];
  courses: Course[];
  tools: string[];
  salaryGrowth: { year: number; salary: string }[];
}

type CareerDefinition = Omit<CareerPath, "match" | "reasons" | "improvementTips" | "evidence"> & {
  interests: string[];
  strengths: string[];
  goals: string[];
};

const careerCatalog: CareerDefinition[] = [
  { title: "Full Stack Developer", description: "Build complete web applications from frontend to backend", icon: "💻", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Technology"], skills: ["Coding", "Logical Thinking", "Problem Solving"], strengths: ["Logical Thinking", "Problem Solving", "Creativity"], education: ["Computer science or engineering degree", "Relevant diploma or demonstrable portfolio"], workStyles: ["Remote", "Office", "Hybrid"], entryRequirements: ["Build web development fundamentals", "Create and deploy portfolio projects"], goals: ["Job", "Freelancing", "Business"] },
  { title: "Data Scientist", description: "Use statistics and machine learning to find patterns in data", icon: "📊", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Technology", "Science", "Finance"], skills: ["Statistics", "Python", "Logical Thinking", "Problem Solving"], strengths: ["Logical Thinking", "Problem Solving"], education: ["Statistics, mathematics, computer science, or related degree"], workStyles: ["Remote", "Office", "Hybrid"], entryRequirements: ["Learn statistics and Python", "Build analysis projects using real datasets"], goals: ["Job", "Higher Studies"] },
  { title: "Cloud Architect", description: "Design secure, scalable cloud infrastructure solutions", icon: "☁️", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Technology"], skills: ["Cloud Platforms", "Networking", "Security", "Communication"], strengths: ["Logical Thinking", "Problem Solving", "Leadership"], education: ["Computer science or IT degree, or equivalent experience"], workStyles: ["Remote", "Office", "Hybrid"], entryRequirements: ["Gain systems or cloud engineering experience", "Earn a cloud platform certification"], goals: ["Job"] },
  { title: "DevOps Engineer", description: "Automate software delivery and improve system reliability", icon: "⚙️", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Technology"], skills: ["Linux", "Cloud Platforms", "Automation", "Problem Solving"], strengths: ["Logical Thinking", "Adaptability", "Problem Solving"], education: ["Computer science, IT, or equivalent practical experience"], workStyles: ["Remote", "Office", "Hybrid"], entryRequirements: ["Learn Linux, Git, CI/CD, and cloud fundamentals", "Build and operate a deployment project"], goals: ["Job"] },
  { title: "UX/UI Designer", description: "Research user needs and design clear digital experiences", icon: "🎨", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Design", "Technology"], skills: ["User Research", "Visual Design", "Prototyping", "Communication"], strengths: ["Creativity", "Communication", "Empathy"], education: ["Design degree or equivalent portfolio and practical experience"], workStyles: ["Remote", "Office", "Hybrid"], entryRequirements: ["Learn design fundamentals and prototyping", "Create case studies showing your design process"], goals: ["Job", "Freelancing"] },
  { title: "Product Designer", description: "Shape product experiences from discovery through launch", icon: "✨", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Design", "Business", "Technology"], skills: ["User Research", "Visual Design", "Product Thinking", "Communication"], strengths: ["Creativity", "Communication", "Leadership"], education: ["Design, HCI, or related degree; portfolio is important"], workStyles: ["Remote", "Office", "Hybrid"], entryRequirements: ["Build research and prototyping skills", "Document end-to-end product case studies"], goals: ["Job", "Freelancing"] },
  { title: "Motion Graphics Designer", description: "Create animated visual content for products and media", icon: "🎬", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Design", "Marketing"], skills: ["Animation", "Visual Design", "Storytelling"], strengths: ["Creativity", "Adaptability"], education: ["Design or media training, or equivalent portfolio"], workStyles: ["Remote", "Office", "Hybrid"], entryRequirements: ["Learn animation and editing tools", "Build a focused showreel"], goals: ["Job", "Freelancing"] },
  { title: "Product Manager", description: "Set product direction and coordinate teams to deliver outcomes", icon: "📋", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Business", "Technology", "Marketing"], skills: ["Product Thinking", "Communication", "Leadership", "Data Analysis"], strengths: ["Leadership", "Communication", "Problem Solving"], education: ["Any relevant degree; product experience and domain knowledge matter"], workStyles: ["Remote", "Office", "Hybrid"], entryRequirements: ["Build domain and analytics knowledge", "Practice prioritization and product case studies"], goals: ["Job", "Business"] },
  { title: "Management Consultant", description: "Help organizations solve business and operational problems", icon: "💼", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Business", "Finance"], skills: ["Analysis", "Communication", "Problem Solving", "Presentation"], strengths: ["Logical Thinking", "Communication", "Adaptability"], education: ["Bachelor's degree; business or quantitative background can help"], workStyles: ["Office", "Hybrid"], entryRequirements: ["Practice structured problem solving", "Build analysis, presentation, and domain experience"], goals: ["Job", "Higher Studies"] },
  { title: "Business Analyst", description: "Translate business needs into measurable requirements and solutions", icon: "📈", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Business", "Finance", "Technology"], skills: ["Data Analysis", "Requirements", "Communication", "Problem Solving"], strengths: ["Logical Thinking", "Communication", "Attention to Detail"], education: ["Business, finance, IT, or related degree"], workStyles: ["Office", "Hybrid", "Remote"], entryRequirements: ["Learn spreadsheets, SQL, and requirements analysis", "Complete a case study using business data"], goals: ["Job"] },
  { title: "EdTech Specialist", description: "Design and deliver technology-supported learning experiences", icon: "📚", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Teaching", "Technology"], skills: ["Instructional Design", "Communication", "Digital Tools"], strengths: ["Communication", "Creativity", "Adaptability"], education: ["Education, subject-area, or instructional design background"], workStyles: ["Remote", "Office", "Hybrid"], entryRequirements: ["Learn instructional design basics", "Create a sample digital lesson"], goals: ["Job", "Freelancing"] },
  { title: "Corporate Trainer", description: "Help teams build practical skills through structured learning", icon: "🎯", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Teaching", "Business"], skills: ["Facilitation", "Communication", "Instructional Design"], strengths: ["Communication", "Leadership", "Empathy"], education: ["Relevant subject expertise; training experience is valuable"], workStyles: ["Office", "Hybrid"], entryRequirements: ["Develop facilitation and course design skills", "Build a sample workshop and gather feedback"], goals: ["Job", "Freelancing"] },
  { title: "Health Informatics Specialist", description: "Improve healthcare services through health data and information systems", icon: "🏥", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Healthcare", "Technology", "Science"], skills: ["Health Data", "Analysis", "Privacy", "Communication"], strengths: ["Logical Thinking", "Communication", "Attention to Detail"], education: ["Health sciences, IT, or health informatics background"], workStyles: ["Office", "Hybrid"], entryRequirements: ["Learn health information systems and data standards", "Understand privacy and clinical workflows"], goals: ["Job", "Higher Studies"] },
  { title: "Biomedical Engineer", description: "Apply engineering principles to medical devices and healthcare problems", icon: "🧬", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Healthcare", "Science", "Technology"], skills: ["Engineering", "Biology", "Design", "Problem Solving"], strengths: ["Logical Thinking", "Creativity", "Problem Solving"], education: ["Biomedical, electrical, or related engineering degree"], workStyles: ["Office", "Hybrid"], entryRequirements: ["Build biology and engineering fundamentals", "Seek laboratory, design, or clinical project experience"], goals: ["Job", "Higher Studies"] },
  { title: "Financial Analyst", description: "Evaluate financial performance and support investment or business decisions", icon: "💹", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Finance", "Business"], skills: ["Financial Modeling", "Accounting", "Data Analysis", "Communication"], strengths: ["Logical Thinking", "Attention to Detail", "Communication"], education: ["Finance, accounting, economics, or commerce background"], workStyles: ["Office", "Hybrid"], entryRequirements: ["Learn accounting and financial modeling", "Build a valuation or budgeting case study"], goals: ["Job", "Higher Studies"] },
  { title: "Digital Marketing Specialist", description: "Plan and measure campaigns across search, social, and digital channels", icon: "📣", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Marketing", "Business", "Design"], skills: ["Content Strategy", "Analytics", "SEO", "Communication"], strengths: ["Creativity", "Communication", "Adaptability"], education: ["Marketing, business, or communications background; portfolio helps"], workStyles: ["Remote", "Office", "Hybrid"], entryRequirements: ["Learn channel fundamentals and analytics", "Run and document a small campaign"], goals: ["Job", "Freelancing", "Business"] },
  { title: "Research Scientist", description: "Investigate scientific questions through experiments and data analysis", icon: "🔬", salaryRange: "Not available", growth: "Not verified", catalogUpdated: "2026-11-19", sources: CAREER_CATALOG_SOURCES, interests: ["Science", "Healthcare", "Technology"], skills: ["Research Methods", "Statistics", "Scientific Writing", "Problem Solving"], strengths: ["Logical Thinking", "Curiosity", "Attention to Detail"], education: ["Relevant science degree; research roles often require postgraduate study"], workStyles: ["Office", "Hybrid"], entryRequirements: ["Build subject knowledge and research methods", "Join a supervised research project"], goals: ["Higher Studies", "Job"] },
];

const qualificationValidity: Record<string, string> = {
  "14250": "Valid through 2028-05-08", "14625": "Valid through 2028-10-07", "15107": "Valid through 2028-05-08",
  "11620": "Valid through 2027-03-15", "13743": "Valid through 2028-02-18", "11627": "Valid through 2027-03-15",
  "10136": "Expired 2026-10-31; current revision not verified", "14732": "Valid through 2028-10-07",
  "3198": "Expired 2025-06-30; current revision not verified", "3199": "Expired 2025-06-30; current revision not verified",
  "1003": "NQR lists validity as N.A.; verify with awarding body", "12061": "Valid through 2027-03-15", "9959": "Expired 2026-09-29; current revision not verified",
  "11636": "Valid through 2027-03-15", "10101": "Valid through 2026-11-30",
};
const unverifiedEvidence = (title: string): CareerEvidence[] => [{ status: "unverified", title: "National Qualification Register search", url: "https://nqr.gov.in/qualifications-search", supports: "A place to check current Indian qualification records for this career.", limitation: `No role-specific qualification was verified for ${title}; the profile details remain editorial guidance.`, lastChecked: "2026-11-19", validity: "No qualification record mapped" }];
const evidence = (status: CareerEvidence["status"], title: string, id: string, supports: string, limitation: string): CareerEvidence[] => [{ status, title, url: `https://nqr.gov.in/qualifications/${id}`, supports, limitation, lastChecked: "2026-11-19", validity: qualificationValidity[id] || "NQR validity date not established; verify before relying" }];

const careerEvidence: Record<string, CareerEvidence[]> = {
  "Full Stack Developer": evidence("direct", "Full Stack Development qualification (NQR 14250)", "14250", "Role description, front-end/backend modules, eligibility pathways, and required project work.", "This NIELIT qualification is one training pathway; it is not a universal licensing or hiring requirement."),
  "Data Scientist": evidence("direct", "Data Scientist qualification (NQR 14625)", "14625", "Role description, data science skills, progression, and eligibility routes.", "This qualification describes one pathway; it does not establish universal entry requirements."),
  "Cloud Architect": evidence("adjacent", "Essentials of Cloud Computing and Virtualization (NQR 15107)", "15107", "Current NIELIT upskilling qualification covers cloud foundations and lists Cloud Architect as a progression pathway.", "This is a 210-hour Level 4 upskilling qualification, not a role-specific Cloud Architect occupational standard; it does not establish senior-role entry requirements."),
  "DevOps Engineer": evidence("adjacent", "DevOps Engineer certificate (NQR 11620)", "11620", "DevOps concepts, technologies, entry-level course eligibility, and progression to DevOps Engineer.", "This is an IBM OEM certificate pathway, not a universal job entry requirement."),
  "UX/UI Designer": evidence("direct", "User Experience Designer qualification (NQR 13743)", "13743", "UX role description, design activities, and entry eligibility.", "This is the closest direct UX occupational qualification; UI requirements may differ by employer."),
  "Product Designer": evidence("adjacent", "UX Design qualification (NQR 11627)", "11627", "UX design process, portfolio work, and listed progression to Product Designer.", "This is a UX certificate and progression reference, not a standalone Product Designer standard."),
  "Motion Graphics Designer": evidence("adjacent", "Graphic Designer / Motion Graphic Artist qualification (NQR 10136)", "10136", "Visual design and motion graphics role preparation and modules.", "The qualification combines graphic design and motion graphics; role scope can vary."),
  "Product Manager": [{ status: "direct", title: "Product Manager – Web & Mobile qualification", url: "https://www.nqr.gov.in/qualification/file/QF_SSC%20Q8401_Product%20Manager%20W%26M.pdf", supports: "Product ownership, business/customer requirements, go-to-market work, and entry criteria for web/mobile product managers.", limitation: "This standard is scoped to web and mobile products; the file does not show a current validity date.", lastChecked: "2026-11-19", validity: "Current validity not displayed in the linked qualification file; verify before enrollment" }],
  "Management Consultant": [{ status: "adjacent", title: "Business Analytics qualification file and career map", url: "https://nqr.gov.in/sites/default/files/Q%20file_Business%20Analytics.pdf", supports: "Lists Management Consultant as a possible progression role from Business Analyst and documents an analytics qualification pathway.", limitation: "The file's planned review date was March 2025 and it says the course is not registered in NQR; it is not a current Management Consultant qualification.", lastChecked: "2026-11-19", validity: "Review date passed (March 2025); current status not verified" }],
  "Business Analyst": evidence("direct", "Business Analyst qualification (NQR 14732)", "14732", "Current qualification names Business Analyst and covers analytics, sector electives, eligibility, and progression through Lead BA.", "The curriculum is strongly analytics-oriented and is a training qualification, not a universal employer requirement."),
  "EdTech Specialist": evidence("adjacent", "Instructional Designer (VET and Skills) qualification (NQR 3198)", "3198", "Learning intervention design, learner assessment, and training material development.", "This supports instructional design work; it does not define all EdTech specialist roles."),
  "Corporate Trainer": evidence("adjacent", "Trainer (VET and Skills) qualification (NQR 3199)", "3199", "Trainer responsibilities, delivery skills, eligibility options, and training standards.", "This record's stated validity ended in 2025 and must be checked against a current revision; it targets vocational training, not necessarily corporate settings."),
  "Health Informatics Specialist": evidence("adjacent", "Healthcare Informatics for Medical Data Management module (NQR 11636)", "11636", "Current NIELIT Multiomics Data qualification includes a 60-hour module on healthcare informatics for medical data management.", "The parent qualification is for Multiomics Data and life-sciences data, not a full Health Informatics Specialist standard."),
  "Biomedical Engineer": evidence("direct", "Junior Biomedical Engineer / Technician qualification (NQR 1003)", "1003", "Medical equipment support, biomedical engineering progression, technical modules, and the distinction between engineer and technician pathways.", "The qualification is a junior equipment-focused pathway; senior engineering roles may require an engineering degree."),
  "Financial Analyst": evidence("adjacent", "Data Analysis with Python and SQL (NQR 10101)", "10101", "The NQR lists Financial Analyst among progression roles and includes data analysis, visualization, Python, and SQL learning modules.", "This is a data analysis qualification, not a finance or financial modelling standard; it expires 2026-11-30.",),
  "Digital Marketing Specialist": evidence("adjacent", "Digital Sales and Marketing Executive qualification (NQR 12061)", "12061", "Marketing, SEO/SEM, online reputation, and digital campaign modules.", "This is an executive qualification rather than a one-to-one specialist job standard."),
  "Research Scientist": evidence("adjacent", "Research Scientist – Pharma, Biological Products and Medical Devices (NQR 9959)", "9959", "The qualification describes a pharma/biological-products research pathway and progression to Research Scientist.", "This is a domain-specific qualification and expired 2026-09-29; no current revision was verified, so treat it as historical context rather than a current standard."),
};

// Glassdoor figures are current India base-pay estimates, not guaranteed offers or forecasts.
// The pages use the 25th–75th percentile range, combining user-submitted pay and Glassdoor estimates.
const salaryReferences: Record<string, SalaryReference> = {
  "Full Stack Developer": { basePayRange: "₹4L–₹12L/year", averageBasePay: "₹7L/year", sourceTitle: "Full Stack Developer salaries in India — Glassdoor", sourceUrl: "https://www.glassdoor.co.in/Salaries/india-full-stack-developer-salary-SRCH_IL.0%2C5_IN115_KO6%2C27_P2.htm", checkedDate: "2026-11-19", note: "All experience levels; Glassdoor's most-likely base-pay range. Actual pay varies by experience, city, and employer." },
  "Data Scientist": { basePayRange: "₹9L–₹18.6L/year", averageBasePay: "₹12.5L/year", sourceTitle: "Data Scientist salaries in India — Glassdoor", sourceUrl: "https://www.glassdoor.co.in/Salaries/india-data-scientist-salary-SRCH_IL.0%2C5_KO6%2C20_IP3.htm", checkedDate: "2026-11-19", note: "All experience levels; Glassdoor's most-likely base-pay range. Actual pay varies by experience, city, and employer." },
  "Cloud Architect": { basePayRange: "₹11.8L–₹30L/year", averageBasePay: "₹20L/year", sourceTitle: "Cloud Architect salaries in India — Glassdoor", sourceUrl: "https://www2.glassdoor.co.in/Salaries/cloud-architect-salary-SRCH_IN115_KO0%2C15.htm", checkedDate: "2026-11-19", note: "All experience levels; Glassdoor's most-likely base-pay range. Actual pay varies by experience, city, and employer." },
  "DevOps Engineer": { basePayRange: "₹5L–₹13L/year", averageBasePay: "₹8L/year", sourceTitle: "DevOps Engineer salaries in India — Glassdoor", sourceUrl: "https://www.glassdoor.co.in/Salaries/india-DevOps-Engineer.-salary-SRCH_IL.0%2C5_IN115_KO6%2C22.htm", checkedDate: "2026-11-19", note: "All experience levels; Glassdoor's most-likely base-pay range. Actual pay varies by experience, city, and employer." },
  "UX/UI Designer": { basePayRange: "₹4L–₹8L/year", averageBasePay: "₹6L/year", sourceTitle: "UI & UX Designer salaries in India — Glassdoor", sourceUrl: "https://www.glassdoor.co.in/Salaries/UI%20%26%20UX%20Designer-salary-SRCH_KO0%2C16.htm", checkedDate: "2026-11-19", note: "Closest Glassdoor title match (UI & UX Designer); all experience levels. Actual pay varies by experience, city, and employer." },
  "Product Manager": { basePayRange: "₹13L–₹28L/year", averageBasePay: "₹20L/year", sourceTitle: "Product Manager salaries in India — Glassdoor", sourceUrl: "https://www.glassdoor.co.in/Salaries/india-product-manager-salary-SRCH_IL.0%2C5_KO6%2C21.htm", checkedDate: "2026-11-19", note: "All experience levels; Glassdoor's most-likely base-pay range. Actual pay varies by experience, city, and employer." },
  "Management Consultant": { basePayRange: "₹12L–₹24L/year", averageBasePay: "₹18L/year", sourceTitle: "Management Consultant salaries in India — Glassdoor", sourceUrl: "https://www.glassdoor.co.in/Salaries/management-consultant-salary-SRCH_KO0%2C21_IP5.htm", checkedDate: "2026-11-19", note: "All experience levels; Glassdoor's most-likely base-pay range. Actual pay varies by experience, city, and employer." },
  "Business Analyst": { basePayRange: "₹6L–₹12L/year", averageBasePay: "₹8L/year", sourceTitle: "Business Analyst salaries in India — Glassdoor", sourceUrl: "https://www.glassdoor.co.in/Salaries/india-business-analyst-salary-SRCH_IL.0%2C5_IN115_KO6%2C22.htm", checkedDate: "2026-11-19", note: "All experience levels; Glassdoor's most-likely base-pay range. Actual pay varies by experience, city, and employer." },
  "Financial Analyst": { basePayRange: "₹3L–₹8L/year", averageBasePay: "₹5L/year", sourceTitle: "Financial Analyst salaries in India — Glassdoor", sourceUrl: "https://www.glassdoor.co.in/Salaries/india-financial-analyst-salary-SRCH_IL.0%2C5_KO6%2C23_IP2.htm", checkedDate: "2026-11-19", note: "All experience levels; Glassdoor's most-likely base-pay range. Actual pay varies by experience, city, and employer." },
  "Digital Marketing Specialist": { basePayRange: "₹3L–₹7L/year", averageBasePay: "₹5L/year", sourceTitle: "Digital Marketing Specialist salaries in India — Glassdoor", sourceUrl: "https://www.glassdoor.co.in/Salaries/digital-marketing-specialist-salary-SRCH_KO0%2C28.htm", checkedDate: "2026-11-19", note: "All experience levels; Glassdoor's most-likely base-pay range. Actual pay varies by experience, city, and employer." },
};

type SourcedCourse = Omit<Course, "targets">;
const sourcedCourses: Record<string, SourcedCourse> = {
  "Full Stack Developer": { name: "Full Stack Development qualification", type: "Technical", platform: "NIELIT / NQR", duration: "390 hours", sourceTitle: "NQR Qualification 14250", sourceUrl: "https://nqr.gov.in/qualifications/14250", validityUntil: "2028-05-08", sourceNote: "NQR lists frontend, backend Python, databases, employability skills, and a project; training availability depends on an approved provider." },
  "Data Scientist": { name: "Data Scientist qualification modules", type: "Technical", platform: "NQR / IT-ITeS SSC", duration: "See module hours in source", sourceTitle: "NQR Qualification 14625", sourceUrl: "https://nqr.gov.in/qualifications/14625", validityUntil: "2028-10-07", sourceNote: "Covers data quality, statistical analysis, model validation, and visualisation; check awarding bodies for active batches." },
  "Cloud Architect": { name: "Essentials of Cloud Computing and Virtualization (Upskilling)", type: "Technical", platform: "NIELIT / NQR", duration: "210 hours", sourceTitle: "NQR Qualification 15107", sourceUrl: "https://nqr.gov.in/qualifications/15107", validityUntil: "2028-05-08", sourceNote: "Current Level 4 foundation/upskilling qualification with a Cloud Architect progression pathway; it does not qualify a learner by itself for a senior architect role." },
  "Business Analyst": { name: "Business Analyst qualification", type: "Technical", platform: "ASAP Kerala / NQR", duration: "510–600 hours", sourceTitle: "NQR Qualification 14732", sourceUrl: "https://nqr.gov.in/qualifications/14732", validityUntil: "2028-10-07", sourceNote: "Current analytics-oriented Business Analyst qualification with sector electives including banking and finance; check the awarding body for approved provider availability." },
  "DevOps Engineer": { name: "DevOps programming certificate", type: "Technical", platform: "IBM / NQR", duration: "221 hours", sourceTitle: "NQR Qualification 11620", sourceUrl: "https://nqr.gov.in/qualifications/11620", validityUntil: "2027-03-15", sourceNote: "NQR lists DevOps as a progression role and describes Linux, containers, CI/CD, cloud deployment, and labs." },
  "UX/UI Designer": { name: "User Experience Designer qualification", type: "Technical", platform: "NQR / IT-ITeS SSC", duration: "Module hours listed in source", sourceTitle: "NQR Qualification 13743", sourceUrl: "https://nqr.gov.in/qualifications/13743", validityUntil: "2028-02-18", sourceNote: "Includes UX guidelines, design systems, research, information architecture, and user flows." },
  "Product Designer": { name: "UX Design certificate", type: "Technical", platform: "Google / NQR", duration: "234 hours", sourceTitle: "NQR Qualification 11627", sourceUrl: "https://nqr.gov.in/qualifications/11627", validityUntil: "2027-03-15", sourceNote: "The UX certificate lists Product Designer as a progression role; it is an adjacent learning path, not a product-design occupational standard." },
  "Financial Analyst": { name: "Data Analysis with Python and SQL", type: "Technical", platform: "NIELIT / NQR", duration: "120 hours", sourceTitle: "NQR Qualification 10101", sourceUrl: "https://nqr.gov.in/qualifications/10101", validityUntil: "2026-11-30", sourceNote: "NQR lists Financial Analyst as a progression role; the qualification teaches analytics, not finance-specific modelling." },
  "Digital Marketing Specialist": { name: "Digital Marketing and E-commerce certificate", type: "Technical", platform: "Google / NQR", duration: "166 hours", sourceTitle: "NQR Qualification 11622", sourceUrl: "https://nqr.gov.in/qualifications/11622", validityUntil: "2027-03-15", sourceNote: "Covers digital marketing strategy, channels, analytics, e-commerce, and customer loyalty; it is an adjacent course pathway." },
  "Health Informatics Specialist": { name: "Healthcare Informatics for Medical Data Management", type: "Technical", platform: "NIELIT / NQR", duration: "60 hours", sourceTitle: "NQR Qualification 11636", sourceUrl: "https://nqr.gov.in/qualifications/11636", validityUntil: "2027-03-15", sourceNote: "A specific qualification module in a Multiomics Data course; it is adjacent to, not a full Health Informatics Specialist course." },
};
export const CAREER_EVIDENCE_COVERAGE = Object.keys(careerEvidence);
export const CAREER_CATALOG_TITLES = careerCatalog.map(career => career.title);
export const getCareerEvidence = (title: string): CareerEvidence[] => careerEvidence[title] || unverifiedEvidence(title);

export const CAREER_INTERESTS = ["Technology", "Design", "Business", "Teaching", "Healthcare", "Finance", "Marketing", "Science"] as const;

const goalCareerTitles: Record<string, string[]> = {
  Business: ["Product Manager", "Digital Marketing Specialist", "Business Analyst"],
  Freelancing: ["UX/UI Designer", "Motion Graphics Designer", "Full Stack Developer", "Digital Marketing Specialist"],
  "Higher Studies": ["Research Scientist", "Data Scientist", "Biomedical Engineer"],
};

const strengthAliases: Record<string, string[]> = {
  "Logical Thinking": ["Logical Thinking", "Analysis", "Statistics", "Data Analysis"],
  "Problem Solving": ["Problem Solving", "Analysis", "Engineering"],
  Creativity: ["Creativity", "Visual Design", "Design", "Storytelling"],
  Leadership: ["Leadership", "Facilitation", "Product Thinking"],
  Communication: ["Communication", "Presentation", "Scientific Writing", "Facilitation"],
  Teamwork: ["Communication", "Leadership", "Facilitation"],
  Adaptability: ["Adaptability", "Digital Tools", "Content Strategy"],
};

function getCareerSignals(career: CareerDefinition, profile: UserProfile) {
  const reasons: string[] = [];
  const tips: string[] = [];
  const matchedInterests = profile.interests.filter(i => career.interests.includes(i));
  if (matchedInterests.length) reasons.push(`Matches your interest in ${matchedInterests.join(" and ")}`);
  const matchedStrengths = profile.strengths.filter(s => (strengthAliases[s] || [s]).some(skill => career.skills.includes(skill) || career.strengths.includes(skill)));
  matchedStrengths.forEach(s => reasons.push(`Uses your ${s.toLowerCase()} strength`));
  if (career.education.some(e => e.toLowerCase().includes(profile.qualification.toLowerCase()) || e.toLowerCase().includes(profile.stream.toLowerCase()))) {
    reasons.push(`Connects with your ${profile.qualification} qualification or ${profile.stream} background`);
  }
  if ((goalCareerTitles[profile.careerGoal] || []).includes(career.title)) reasons.push(`Fits your ${profile.careerGoal.toLowerCase()} goal`);
  if (career.workStyles.includes(profile.workStyle)) reasons.push(`Supports your preferred ${profile.workStyle.toLowerCase()} work style`);

  const weaknessSkills: Record<string, string[]> = {
    "Public Speaking": ["Communication", "Presentation", "Facilitation"],
    Coding: ["Coding", "Python"],
    "Time Management": ["Leadership", "Product Thinking"],
    Confidence: career.skills,
    Networking: ["Communication", "Leadership"],
    "Decision Making": ["Product Thinking", "Analysis", "Financial Modeling"],
  };
  const relevantWeaknesses = profile.weaknesses.filter(w => (weaknessSkills[w] || []).some(skill => career.skills.includes(skill)));
  relevantWeaknesses.forEach(w => tips.push(`Build ${w.toLowerCase()} through practice projects or guided feedback`));
  if (!matchedStrengths.length) tips.push(`Develop a foundation in ${career.skills.slice(0, 2).join(" and ")}`);

  const score = Math.min(98, 45 + matchedInterests.length * 22 + matchedStrengths.length * 6 + ((goalCareerTitles[profile.careerGoal] || []).includes(career.title) ? 8 : 0) + (career.workStyles.includes(profile.workStyle) ? 5 : 0) + (career.education.some(e => e.toLowerCase().includes(profile.qualification.toLowerCase()) || e.toLowerCase().includes(profile.stream.toLowerCase())) ? 5 : 0) - relevantWeaknesses.length * 3);
  return { score, reasons: reasons.length ? reasons : ["Included as an adjacent option based on your selected interests"], tips: tips.length ? tips : ["Build deeper experience in the skills this role requires"] };
}

export function generateCareerResult(profile: UserProfile): CareerResult {
  const selectedInterests = profile.interests.length ? profile.interests : ["Technology"];
  const matchingCareers = careerCatalog.filter(career => career.interests.some(i => selectedInterests.includes(i)));
  const scored = matchingCareers.map(career => {
    const signals = getCareerSignals(career, profile);
    const { interests: _i, strengths: _s, goals: _g, ...path } = career;
    const salaryReference = salaryReferences[career.title];
    return { ...path, salaryRange: salaryReference?.basePayRange || "Not available", salaryReference, match: signals.score, reasons: signals.reasons, improvementTips: signals.tips, evidence: getCareerEvidence(career.title) };
  }).sort((a, b) => b.match - a.match || a.title.localeCompare(b.title));
  const careers = scored.slice(0, 5);
  const lead = careers[0];
  const skillGaps: SkillGap[] = lead ? lead.skills.map((skill, index) => {
    const hasRelatedStrength = profile.strengths.some(s => (strengthAliases[s] || [s]).some(alias => alias.toLowerCase() === skill.toLowerCase()));
    const relevantWeakness = profile.weaknesses.find(w => (w === "Coding" && /coding|python/i.test(skill)) || (w === "Public Speaking" && /communication|presentation/i.test(skill)) || (w === "Decision Making" && /analysis|financial modeling|product thinking/i.test(skill)));
    const current = hasRelatedStrength ? 65 : 25;
    return { skill, current, required: 75 + (index % 3) * 5, nextAction: relevantWeakness ? `Start with a beginner ${skill.toLowerCase()} exercise to address ${relevantWeakness.toLowerCase()}` : `Complete a small project that demonstrates ${skill.toLowerCase()}` };
  }) : [];
  const course = lead ? sourcedCourses[lead.title] : undefined;
  const courses: Course[] = course && new Date(`${course.validityUntil}T23:59:59`) >= new Date()
    ? [{ ...course, sourceChecked: "2026-11-19", targets: lead.skills.slice(0, 3) }]
    : [];
  const roadmap: RoadmapPhase[] = lead ? [
    { years: "Year 1–2", title: "Foundation", items: lead.entryRequirements, actions: [{ timeframe: "First month", action: `Choose one learning resource for ${lead.skills[0]} and schedule weekly practice` }, { timeframe: "By month 3", action: `Complete a small project demonstrating ${lead.skills.slice(0, 2).join(" and ")}` }, { timeframe: "By year 2", action: "Collect feedback, refine your portfolio, and apply for internships or entry roles" }] },
    { years: "Year 3–5", title: "Specialization", items: [`Gain relevant experience as a ${lead.title}`, `Build depth in ${lead.skills.slice(0, 2).join(" and ")}`, "Seek mentorship and take on progressively larger projects"], actions: [{ timeframe: "Each quarter", action: "Set one measurable skill goal and review project outcomes with a mentor" }, { timeframe: "By year 5", action: "Build a portfolio of 2–3 substantial projects in a focused specialty" }] },
    { years: "Year 5–10", title: "Advanced Growth", items: ["Move toward senior or specialist responsibilities", "Share knowledge and mentor others", "Review opportunities against your career goal"], actions: [{ timeframe: "Annually", action: "Review your role, skills, and goals; choose a next step based on evidence and feedback" }] },
  ] : [];
  return { careers, roadmap, skillGaps, courses, tools: lead ? ["A portfolio for your chosen field", "Git & GitHub", "A task planner", ...lead.skills.slice(0, 4)] : [], salaryGrowth: [] };
}
