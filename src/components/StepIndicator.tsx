import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                i < currentStep
                  ? "gradient-primary text-primary-foreground"
                  : i === currentStep
                  ? "gradient-primary text-primary-foreground shadow-elevated scale-110"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs mt-1.5 font-medium hidden sm:block ${i <= currentStep ? "text-primary" : "text-muted-foreground"}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 sm:w-16 h-0.5 mx-1 transition-all duration-300 ${i < currentStep ? "gradient-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
