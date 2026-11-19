import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import StepIndicator from "./StepIndicator";
import { UserProfile } from "@/lib/careerEngine";
import { ArrowLeft, ArrowRight, Sparkles, User, GraduationCap, Heart, Zap, AlertTriangle, Target, Briefcase } from "lucide-react";

const STEPS = ["Basic", "Education", "Interests", "Strengths", "Weaknesses", "Goals", "Work Style"];

const INTERESTS = ["Technology", "Design", "Business", "Teaching", "Healthcare", "Finance", "Marketing", "Science"];
const STRENGTHS = ["Communication", "Logical Thinking", "Creativity", "Leadership", "Problem Solving", "Teamwork", "Adaptability"];
const WEAKNESSES = ["Public Speaking", "Coding", "Time Management", "Confidence", "Networking", "Decision Making"];
const QUALIFICATIONS = ["10th", "Inter / 12th", "Diploma", "Degree", "B.Tech / B.E.", "M.Tech / M.E.", "MBA", "Other"];
const STREAMS = ["MPC", "BiPC", "CEC", "CSE", "ECE", "EEE", "Mechanical", "Civil", "Commerce", "Arts", "Other"];
const GOALS = ["Job", "Business", "Freelancing", "Higher Studies"];
const WORK_STYLES = ["Remote", "Office", "Hybrid"];

interface Props {
  onSubmit: (profile: UserProfile) => void;
  initialProfile?: UserProfile | null;
}

const ToggleChip = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
      selected
        ? "gradient-primary text-primary-foreground border-transparent shadow-card"
        : "bg-card text-foreground border-border hover:border-primary/40 hover:shadow-card"
    }`}
  >
    {label}
  </button>
);

const MultiStepForm = ({ onSubmit, initialProfile }: Props) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>(initialProfile || {
    name: "", age: 18, location: "", qualification: "", stream: "",
    interests: [], strengths: [], weaknesses: [], careerGoal: "", workStyle: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof UserProfile, value: any) => {
    setProfile(p => ({ ...p, [field]: value }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  const toggleArray = (field: "interests" | "strengths" | "weaknesses", val: string) => {
    setProfile(p => ({
      ...p,
      [field]: (p[field] as string[]).includes(val)
        ? (p[field] as string[]).filter(v => v !== val)
        : [...(p[field] as string[]), val],
    }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!profile.name.trim()) e.name = "Name is required";
      if (!profile.age || profile.age < 14 || profile.age > 60) e.age = "Enter a valid age (14-60)";
      if (!profile.location.trim()) e.location = "Location is required";
    }
    if (step === 1) {
      if (!profile.qualification) e.qualification = "Select your qualification";
      if (!profile.stream) e.stream = "Select your stream";
    }
    if (step === 2 && profile.interests.length === 0) e.interests = "Select at least one interest";
    if (step === 3 && profile.strengths.length === 0) e.strengths = "Select at least one strength";
    if (step === 5 && !profile.careerGoal) e.careerGoal = "Select a career goal";
    if (step === 6 && !profile.workStyle) e.workStyle = "Select a work style";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const prev = () => setStep(s => Math.max(s - 1, 0));
  const handleSubmit = () => { if (validate()) onSubmit(profile); };

  const stepIcons = [User, GraduationCap, Heart, Zap, AlertTriangle, Target, Briefcase];
  const StepIcon = stepIcons[step];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <StepIndicator steps={STEPS} currentStep={step} />
      <Card className="p-6 sm:p-8 shadow-elevated border-0 animate-fade-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <StepIcon className="w-5 h-5 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{STEPS[step]} Info</h2>
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input value={profile.name} onChange={e => update("name", e.target.value)} placeholder="Enter your name" className="mt-1.5" />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label>Age</Label>
              <Input type="number" value={profile.age} onChange={e => update("age", +e.target.value)} className="mt-1.5" />
              {errors.age && <p className="text-destructive text-xs mt-1">{errors.age}</p>}
            </div>
            <div>
              <Label>City</Label>
              <Input value={profile.location} onChange={e => update("location", e.target.value)} placeholder="e.g. Hyderabad" className="mt-1.5" />
              {errors.location && <p className="text-destructive text-xs mt-1">{errors.location}</p>}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <Label className="mb-2 block">Qualification</Label>
              <div className="flex flex-wrap gap-2">
                {QUALIFICATIONS.map(q => <ToggleChip key={q} label={q} selected={profile.qualification === q} onClick={() => update("qualification", q)} />)}
              </div>
              {errors.qualification && <p className="text-destructive text-xs mt-1">{errors.qualification}</p>}
            </div>
            <div>
              <Label className="mb-2 block">Stream / Branch</Label>
              <div className="flex flex-wrap gap-2">
                {STREAMS.map(s => <ToggleChip key={s} label={s} selected={profile.stream === s} onClick={() => update("stream", s)} />)}
              </div>
              {errors.stream && <p className="text-destructive text-xs mt-1">{errors.stream}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <Label className="mb-3 block">What interests you? (Select multiple)</Label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(i => <ToggleChip key={i} label={i} selected={profile.interests.includes(i)} onClick={() => toggleArray("interests", i)} />)}
            </div>
            {errors.interests && <p className="text-destructive text-xs mt-1">{errors.interests}</p>}
          </div>
        )}

        {step === 3 && (
          <div>
            <Label className="mb-3 block">Your top strengths (Select multiple)</Label>
            <div className="flex flex-wrap gap-2">
              {STRENGTHS.map(s => <ToggleChip key={s} label={s} selected={profile.strengths.includes(s)} onClick={() => toggleArray("strengths", s)} />)}
            </div>
            {errors.strengths && <p className="text-destructive text-xs mt-1">{errors.strengths}</p>}
          </div>
        )}

        {step === 4 && (
          <div>
            <Label className="mb-3 block">Areas to improve (Optional)</Label>
            <div className="flex flex-wrap gap-2">
              {WEAKNESSES.map(w => <ToggleChip key={w} label={w} selected={profile.weaknesses.includes(w)} onClick={() => toggleArray("weaknesses", w)} />)}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <Label className="mb-3 block">What's your career goal?</Label>
            <div className="flex flex-wrap gap-2">
              {GOALS.map(g => <ToggleChip key={g} label={g} selected={profile.careerGoal === g} onClick={() => update("careerGoal", g)} />)}
            </div>
            {errors.careerGoal && <p className="text-destructive text-xs mt-1">{errors.careerGoal}</p>}
          </div>
        )}

        {step === 6 && (
          <div>
            <Label className="mb-3 block">Preferred work style?</Label>
            <div className="flex flex-wrap gap-2">
              {WORK_STYLES.map(w => <ToggleChip key={w} label={w} selected={profile.workStyle === w} onClick={() => update("workStyle", w)} />)}
            </div>
            {errors.workStyle && <p className="text-destructive text-xs mt-1">{errors.workStyle}</p>}
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prev} disabled={step === 0} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next} className="gap-2 gradient-primary text-primary-foreground border-0 hover:opacity-90">
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2 gradient-primary text-primary-foreground border-0 hover:opacity-90">
              <Sparkles className="w-4 h-4" /> Generate My Career Path
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MultiStepForm;
