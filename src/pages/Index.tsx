import { useState, useEffect } from "react";
import MultiStepForm from "@/components/MultiStepForm";
import ResultsDashboard from "@/components/ResultsDashboard";
import { UserProfile, CareerResult, generateCareerResult } from "@/lib/careerEngine";
import { Sparkles, Loader2 } from "lucide-react";

const Index = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [result, setResult] = useState<CareerResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (p: UserProfile) => {
    setProfile(p);
    setLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setResult(generateCareerResult(p));
      setLoading(false);
    }, 2500);
  };

  const handleBack = () => {
    setResult(null);
  };

  // Check for saved results
  useEffect(() => {
    const saved = localStorage.getItem("careerpath_profile");
    if (saved && !profile) {
      // Could restore, but let user start fresh
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gradient-hero">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center animate-pulse">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary-foreground">Analyzing Your Profile</h2>
            <p className="text-primary-foreground/60 mt-2">Our AI is crafting your personalized career roadmap...</p>
          </div>
          <Loader2 className="w-8 h-8 text-primary-foreground/60 mx-auto animate-spin" />
        </div>
      </div>
    );
  }

  if (result && profile) {
    return (
      <div className="min-h-screen bg-background">
        <div className="gradient-hero py-6 px-4 mb-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-xl font-bold text-primary-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> CareerPath AI
            </h1>
          </div>
        </div>
        <div className="px-4 pb-16">
          <ResultsDashboard result={result} profile={profile} onBack={handleBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="gradient-hero py-16 sm:py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-elevated">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary-foreground tracking-tight">
            CareerPath AI
          </h1>
          <p className="text-primary-foreground/70 mt-4 text-lg max-w-md mx-auto">
            Discover your ideal career path with AI-powered guidance. Get a personalized 5–10 year roadmap in minutes.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 -mt-8 pb-16">
        <MultiStepForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Index;
