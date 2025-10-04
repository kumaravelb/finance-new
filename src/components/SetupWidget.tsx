import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SetupWidgetProps {
  icon: LucideIcon;
  title: string;
  onClick: () => void;
  isActive?: boolean;
  isCompleted?: boolean;
}

export function SetupWidget({ icon: Icon, title, onClick, isActive, isCompleted }: SetupWidgetProps) {
  return (
    <Card
      className={cn(
        "p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:shadow-lg hover:scale-105",
        "min-h-[200px] border-2",
        isActive && "bg-primary text-primary-foreground border-primary shadow-lg",
        isCompleted && !isActive && "border-green-500 bg-green-50 dark:bg-green-950",
        !isActive && !isCompleted && "hover:border-primary/50"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-16 w-16", isActive && "text-primary-foreground")} />
      <h3 className="text-lg font-semibold text-center">{title}</h3>
    </Card>
  );
}
