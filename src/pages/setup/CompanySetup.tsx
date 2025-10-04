import { useNavigate } from "react-router-dom";
import { Code, Calendar, UserPlus, ArrowLeftRight, Workflow } from "lucide-react";
import { SetupWidget } from "@/components/SetupWidget";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const companySetupSteps = [
  { id: "company-master", icon: Code, title: "Company Master", path: "/setup/company/master" },
  { id: "account-period", icon: Calendar, title: "Account Period Master", path: "/setup/company/account-period" },
  { id: "user-creation", icon: UserPlus, title: "User Creation Master", path: "/setup/company/user-creation" },
  { id: "transaction-code", icon: ArrowLeftRight, title: "Transaction Code", path: "/setup/company/transaction-code" },
  { id: "workflow", icon: Workflow, title: "Workflow Master", path: "/setup/company/workflow" },
];

export default function CompanySetup() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/setup")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Company Set up</h1>
          <p className="text-muted-foreground mt-2">
            Configure company-related settings and masters
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {companySetupSteps.map((step) => (
          <SetupWidget
            key={step.id}
            icon={step.icon}
            title={step.title}
            onClick={() => navigate(step.path)}
            isActive={step.id === "company-master"}
          />
        ))}
      </div>
    </div>
  );
}
