import { Check, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "completed" | "inprogress" | "error" | "pending";

export interface Step {
  id: string;
  title: string;
  status: StepStatus;
}

interface UPRStepperProps {
  steps: Step[];
  className?: string;
}

export function UPRStepper({ steps, className }: UPRStepperProps) {
  const getStepStyles = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return {
          circle: "bg-green-500 border-green-500 text-white",
          connector: "bg-green-500",
          text: "text-green-700 font-medium"
        };
      case "inprogress":
        return {
          circle: "bg-blue-500 border-blue-500 text-white animate-pulse",
          connector: "bg-gradient-to-r from-blue-500 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_infinite]",
          text: "text-blue-700 font-semibold"
        };
      case "error":
        return {
          circle: "bg-red-500 border-red-500 text-white",
          connector: "bg-gray-300",
          text: "text-red-700 font-medium"
        };
      case "pending":
      default:
        return {
          circle: "bg-white border-gray-300 text-gray-400",
          connector: "bg-gray-300",
          text: "text-gray-500"
        };
    }
  };

  const getStepIcon = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4" />;
      case "inprogress":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div className="flex items-start justify-between relative">
        {steps.map((step, index) => {
          const styles = getStepStyles(step.status);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="relative flex items-center w-full">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10",
                      styles.circle
                    )}
                  >
                    {getStepIcon(step.status)}
                  </div>
                  <p className={cn("mt-2 text-sm text-center px-2", styles.text)}>
                    {step.title}
                  </p>
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 transition-all duration-300",
                      styles.connector
                    )}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
