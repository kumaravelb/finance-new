import { useState } from "react";
import { Building2, Network, Users, DollarSign, ShieldCheck, Package, Code, Calendar, UserPlus, ArrowLeftRight, Workflow } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SetupStepper } from "@/components/SetupStepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const mainSetupItems = [
  { id: "company", icon: Building2, title: "Company Set up", description: "Configure company details and settings" },
  { id: "accounts", icon: Network, title: "Accounts Set up", description: "Set up chart of accounts" },
  { id: "customers", icon: Users, title: "Customers Set up", description: "Manage customer information" },
  { id: "currency", icon: DollarSign, title: "Currency & Exchange", description: "Configure currencies and rates" },
  { id: "risk", icon: ShieldCheck, title: "Risk Control", description: "Set up risk management" },
  { id: "masters", icon: Package, title: "Standard Masters", description: "Configure master data" },
];

const companySetupSteps = [
  { id: "company-master", icon: Code, title: "Company Master" },
  { id: "account-period", icon: Calendar, title: "Account Period" },
  { id: "user-creation", icon: UserPlus, title: "User Creation" },
  { id: "transaction-code", icon: ArrowLeftRight, title: "Transaction Code" },
  { id: "workflow", icon: Workflow, title: "Workflow Master" },
];

export default function WayToStartApproach2() {
  const [selectedMain, setSelectedMain] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [currentFormStep, setCurrentFormStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    companyCode: "",
    registrationNumber: "",
    taxId: "",
    fiscalYearStart: "",
    currency: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleMainClick = (id: string) => {
    setSelectedMain(id);
    if (id === "company") {
      setSelectedStep("company-master");
    }
  };

  const handleStepClick = (stepId: string) => {
    setSelectedStep(stepId);
    setCurrentFormStep(1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderCompanyMasterForm = () => {
    switch (currentFormStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyCode">Company Code *</Label>
                <Input
                  id="companyCode"
                  value={formData.companyCode}
                  onChange={(e) => handleInputChange("companyCode", e.target.value)}
                  placeholder="Enter company code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                  placeholder="Enter registration number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID</Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  placeholder="Enter tax ID"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fiscalYearStart">Fiscal Year Start</Label>
                <Input
                  id="fiscalYearStart"
                  type="date"
                  value={formData.fiscalYearStart}
                  onChange={(e) => handleInputChange("fiscalYearStart", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Base Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="company@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter company address"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">Additional Settings</h3>
              <p className="text-muted-foreground">Configure additional company preferences</p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">Review & Submit</h3>
              <p className="text-muted-foreground">Review your company configuration</p>
              <div className="mt-6 p-4 bg-muted rounded-lg text-left">
                <p><strong>Company:</strong> {formData.companyName || "Not set"}</p>
                <p><strong>Code:</strong> {formData.companyCode || "Not set"}</p>
                <p><strong>Currency:</strong> {formData.currency || "Not set"}</p>
                <p><strong>Email:</strong> {formData.email || "Not set"}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (selectedStep === "company-master") {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Company Master</h2>
            <p className="text-muted-foreground mt-1">Configure company details and settings</p>
          </div>

          <SetupStepper
            currentStep={currentFormStep}
            totalSteps={5}
            onStepClick={setCurrentFormStep}
          />

          <Card className="p-6">
            {renderCompanyMasterForm()}

            <div className="flex justify-between mt-6 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentFormStep(Math.max(1, currentFormStep - 1))}
                disabled={currentFormStep === 1}
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentFormStep(Math.min(5, currentFormStep + 1))}
                disabled={currentFormStep === 5}
              >
                {currentFormStep === 5 ? "Submit" : "Next"}
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Select a configuration step</h3>
          <p className="text-muted-foreground">Choose from the options on the left to begin</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Way to Start - Approach 2</h1>
        <p className="text-muted-foreground">
          Modern split-view setup wizard with vertical navigation and detailed forms
        </p>
      </div>

      {/* Top Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mainSetupItems.map((item) => (
          <Card
            key={item.id}
            className={cn(
              "p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2",
              selectedMain === item.id && "bg-primary text-primary-foreground border-primary shadow-lg"
            )}
            onClick={() => handleMainClick(item.id)}
          >
            <div className="flex items-start gap-4">
              <item.icon className={cn("h-10 w-10", selectedMain === item.id && "text-primary-foreground")} />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className={cn("text-sm", selectedMain === item.id ? "text-primary-foreground/80" : "text-muted-foreground")}>
                  {item.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Information Section */}
      {!selectedMain && (
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">Welcome to Company Setup</h2>
            <p className="text-muted-foreground mb-4">
              Follow these guided steps to configure your company. Each section contains detailed forms 
              and settings to help you get started quickly and efficiently.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-background rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">6</div>
                <div className="text-sm text-muted-foreground">Setup Areas</div>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">5</div>
                <div className="text-sm text-muted-foreground">Configuration Steps</div>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">~15</div>
                <div className="text-sm text-muted-foreground">Minutes to Complete</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Split View: Vertical Widgets + Content */}
      {selectedMain && (
        <div className="flex gap-6">
          {/* Left Sidebar - Vertical Widgets (20%) */}
          <div className="w-1/5 space-y-3">
            {companySetupSteps.map((step) => (
              <Card
                key={step.id}
                className={cn(
                  "p-4 cursor-pointer transition-all hover:shadow-md border-2",
                  selectedStep === step.id && "bg-primary text-primary-foreground border-primary shadow-lg"
                )}
                onClick={() => handleStepClick(step.id)}
              >
                <div className="flex items-center gap-3">
                  <step.icon className={cn("h-6 w-6 flex-shrink-0", selectedStep === step.id && "text-primary-foreground")} />
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Right Content Area (80%) */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
}
