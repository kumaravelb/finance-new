import { cn } from "@/lib/utils";

interface SetupStepperProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

export function SetupStepper({ currentStep, totalSteps, onStepClick }: SetupStepperProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
        <div key={step} className="flex items-center">
          <button
            onClick={() => onStepClick?.(step)}
            disabled={step > currentStep}
            className={cn(
              "h-12 w-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all",
              step === currentStep && "bg-primary text-primary-foreground scale-110 shadow-lg",
              step < currentStep && "bg-green-500 text-white cursor-pointer hover:scale-105",
              step > currentStep && "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {step}
          </button>
          {index < totalSteps - 1 && (
            <div className={cn(
              "h-1 w-16 mx-2",
              step < currentStep ? "bg-green-500" : "bg-muted"
            )} />
          )}
        </div>
      ))}
    </div>
  );
}
