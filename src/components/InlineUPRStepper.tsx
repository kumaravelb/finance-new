import { cn } from "@/lib/utils";

export type InlineStepStatus = "completed" | "inprogress" | "error" | "pending";

export interface InlineStep {
  id: string;
  title: string;
  status: InlineStepStatus;
}

interface InlineUPRStepperProps {
  steps: InlineStep[];
  className?: string;
}

export function InlineUPRStepper({ steps, className }: InlineUPRStepperProps) {
  const getStepStyles = (status: InlineStepStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "inprogress":
        return "bg-blue-500 text-white border-blue-600 relative overflow-hidden";
      case "error":
        return "bg-red-100 text-red-800 border-red-300";
      case "pending":
      default:
        return "bg-gray-50 text-gray-500 border-gray-200";
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <div key={step.id} className="flex items-center">
            <div className="relative">
              <div
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-medium border whitespace-nowrap transition-all",
                  getStepStyles(step.status)
                )}
              >
                {step.status === "inprogress" && (
                  <div
                    className="absolute inset-0 overflow-hidden rounded opacity-30"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.8) 10px, rgba(255,255,255,0.8) 20px)',
                      backgroundSize: '200% 200%',
                      animation: 'diagonal-stripes 2s linear infinite'
                    }}
                  />
                )}
                <span className="relative z-10">{step.title}</span>
              </div>
            </div>
            {!isLast && (
              <svg
                className={cn(
                  "w-3 h-3 mx-0.5",
                  step.status === "completed" ? "text-green-600" :
                  step.status === "inprogress" ? "text-blue-600" :
                  "text-gray-400"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        );
      })}
      <style>{`
        @keyframes diagonal-stripes {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
      `}</style>
    </div>
  );
}
