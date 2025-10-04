import { useNavigate } from "react-router-dom";
import { Building2, Network, Users, DollarSign, ShieldCheck, Package } from "lucide-react";
import { SetupWidget } from "@/components/SetupWidget";

const setupItems = [
  { id: "company", icon: Building2, title: "Company Set up", path: "/setup/company" },
  { id: "accounts", icon: Network, title: "Accounts Set up", path: "/setup/accounts" },
  { id: "customers", icon: Users, title: "Customers Set up", path: "/setup/customers" },
  { id: "currency", icon: DollarSign, title: "Currency & Exchange Rates", path: "/setup/currency" },
  { id: "risk", icon: ShieldCheck, title: "Risk Control", path: "/setup/risk" },
  { id: "masters", icon: Package, title: "Standard Masters", path: "/setup/masters" },
];

export default function WayToStart() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Way to Start</h1>
        <p className="text-muted-foreground mt-2">
          Follow these steps to configure your company setup
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {setupItems.map((item) => (
          <SetupWidget
            key={item.id}
            icon={item.icon}
            title={item.title}
            onClick={() => navigate(item.path)}
            isActive={item.id === "company"}
          />
        ))}
      </div>
    </div>
  );
}
