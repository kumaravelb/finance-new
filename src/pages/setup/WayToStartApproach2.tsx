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
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  
  const [companyData, setCompanyData] = useState({
    companyName: "Acme Corporation",
    companyCode: "ACME001",
    registrationNumber: "REG-2024-001",
    taxId: "TAX-123456",
    fiscalYearStart: "2024-01-01",
    currency: "USD",
    email: "info@acme.com",
    phone: "+1 234 567 8900",
    address: "123 Business Street, New York, NY 10001",
  });

  const [accountPeriodData, setAccountPeriodData] = useState({
    periodName: "FY 2024",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
  });

  const [userCreationData, setUserCreationData] = useState({
    username: "john.doe",
    email: "john.doe@acme.com",
    fullName: "John Doe",
    role: "admin",
    department: "Finance",
    status: "active",
  });

  const [transactionCodeData, setTransactionCodeData] = useState({
    code: "INV-001",
    name: "Sales Invoice",
    type: "invoice",
    category: "revenue",
    description: "Standard sales invoice transaction",
    status: "active",
  });

  const [workflowData, setWorkflowData] = useState({
    workflowName: "Invoice Approval",
    module: "accounts-payable",
    approvalSteps: "3",
    status: "active",
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

  const handleCompleteStep = () => {
    if (!selectedStep) return;
    
    const newCompleted = [...completedSteps, selectedStep];
    setCompletedSteps(newCompleted);
    
    const currentIndex = companySetupSteps.findIndex(s => s.id === selectedStep);
    
    if (currentIndex < companySetupSteps.length - 1) {
      const nextStep = companySetupSteps[currentIndex + 1];
      setSelectedStep(nextStep.id);
      setCurrentFormStep(1);
    } else {
      setShowCompletion(true);
    }
  };

  const renderFormContent = () => {
    switch (selectedStep) {
      case "company-master":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name *</Label>
                <Input value={companyData.companyName} onChange={(e) => setCompanyData({...companyData, companyName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Company Code *</Label>
                <Input value={companyData.companyCode} onChange={(e) => setCompanyData({...companyData, companyCode: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Registration Number</Label>
                <Input value={companyData.registrationNumber} onChange={(e) => setCompanyData({...companyData, registrationNumber: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Tax ID</Label>
                <Input value={companyData.taxId} onChange={(e) => setCompanyData({...companyData, taxId: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Fiscal Year Start</Label>
                <Input type="date" value={companyData.fiscalYearStart} onChange={(e) => setCompanyData({...companyData, fiscalYearStart: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Base Currency</Label>
                <Select value={companyData.currency} onValueChange={(value) => setCompanyData({...companyData, currency: value})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" value={companyData.email} onChange={(e) => setCompanyData({...companyData, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input value={companyData.phone} onChange={(e) => setCompanyData({...companyData, phone: e.target.value})} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Address</Label>
                <Textarea value={companyData.address} onChange={(e) => setCompanyData({...companyData, address: e.target.value})} rows={3} />
              </div>
            </div>
          </div>
        );
      
      case "account-period":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Period Name *</Label>
                <Input value={accountPeriodData.periodName} onChange={(e) => setAccountPeriodData({...accountPeriodData, periodName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={accountPeriodData.status} onValueChange={(value) => setAccountPeriodData({...accountPeriodData, status: value})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input type="date" value={accountPeriodData.startDate} onChange={(e) => setAccountPeriodData({...accountPeriodData, startDate: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Input type="date" value={accountPeriodData.endDate} onChange={(e) => setAccountPeriodData({...accountPeriodData, endDate: e.target.value})} />
              </div>
            </div>
          </div>
        );
      
      case "user-creation":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username *</Label>
                <Input value={userCreationData.username} onChange={(e) => setUserCreationData({...userCreationData, username: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input type="email" value={userCreationData.email} onChange={(e) => setUserCreationData({...userCreationData, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input value={userCreationData.fullName} onChange={(e) => setUserCreationData({...userCreationData, fullName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={userCreationData.role} onValueChange={(value) => setUserCreationData({...userCreationData, role: value})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Input value={userCreationData.department} onChange={(e) => setUserCreationData({...userCreationData, department: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={userCreationData.status} onValueChange={(value) => setUserCreationData({...userCreationData, status: value})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      
      case "transaction-code":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Transaction Code *</Label>
                <Input value={transactionCodeData.code} onChange={(e) => setTransactionCodeData({...transactionCodeData, code: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Transaction Name *</Label>
                <Input value={transactionCodeData.name} onChange={(e) => setTransactionCodeData({...transactionCodeData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={transactionCodeData.type} onValueChange={(value) => setTransactionCodeData({...transactionCodeData, type: value})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invoice">Invoice</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="receipt">Receipt</SelectItem>
                    <SelectItem value="journal">Journal Entry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={transactionCodeData.category} onValueChange={(value) => setTransactionCodeData({...transactionCodeData, category: value})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="asset">Asset</SelectItem>
                    <SelectItem value="liability">Liability</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Description</Label>
                <Textarea value={transactionCodeData.description} onChange={(e) => setTransactionCodeData({...transactionCodeData, description: e.target.value})} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={transactionCodeData.status} onValueChange={(value) => setTransactionCodeData({...transactionCodeData, status: value})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      
      case "workflow":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Workflow Name *</Label>
                <Input value={workflowData.workflowName} onChange={(e) => setWorkflowData({...workflowData, workflowName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Module</Label>
                <Select value={workflowData.module} onValueChange={(value) => setWorkflowData({...workflowData, module: value})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accounts-payable">Accounts Payable</SelectItem>
                    <SelectItem value="accounts-receivable">Accounts Receivable</SelectItem>
                    <SelectItem value="general-ledger">General Ledger</SelectItem>
                    <SelectItem value="purchase-order">Purchase Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Approval Steps</Label>
                <Input value={workflowData.approvalSteps} onChange={(e) => setWorkflowData({...workflowData, approvalSteps: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={workflowData.status} onValueChange={(value) => setWorkflowData({...workflowData, status: value})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (showCompletion) {
      return (
        <div className="flex items-center justify-center min-h-[500px]">
          <Card className="p-12 max-w-2xl text-center bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20">
            <div className="space-y-6">
              <div className="text-6xl">🎉</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Hurray! Finance Setup is Completed
              </h1>
              <p className="text-xl text-muted-foreground">
                Feel the power of streamlined finance experience...
              </p>
              <p className="text-lg">
                Your company is now fully configured and ready to start managing financial operations.
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg" onClick={() => window.location.href = '/'}>
                  Go to Dashboard
                </Button>
                <Button size="lg" variant="outline" onClick={() => {
                  setShowCompletion(false);
                  setCompletedSteps([]);
                  setSelectedStep("company-master");
                }}>
                  Start Over
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    if (selectedStep) {
      const currentStepInfo = companySetupSteps.find(s => s.id === selectedStep);
      
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{currentStepInfo?.title}</h2>
            <p className="text-muted-foreground mt-1">Configure {currentStepInfo?.title.toLowerCase()} settings</p>
          </div>

          <Card className="p-6">
            {renderFormContent()}

            <div className="flex justify-end mt-6 pt-6 border-t">
              <Button onClick={handleCompleteStep}>
                Complete & Next
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
      <div className="grid grid-cols-6 gap-4">
        {mainSetupItems.map((item) => (
          <Card
            key={item.id}
            className={cn(
              "p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2",
              selectedMain === item.id && "bg-primary text-primary-foreground border-primary shadow-lg"
            )}
            onClick={() => handleMainClick(item.id)}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <item.icon className={cn("h-8 w-8", selectedMain === item.id && "text-primary-foreground")} />
              <div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className={cn("text-xs", selectedMain === item.id ? "text-primary-foreground/80" : "text-muted-foreground")}>
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
                  "p-4 cursor-pointer transition-all hover:shadow-md border-2 relative",
                  selectedStep === step.id && "bg-primary text-primary-foreground border-primary shadow-lg",
                  completedSteps.includes(step.id) && selectedStep !== step.id && "bg-green-50 dark:bg-green-950 border-green-500"
                )}
                onClick={() => handleStepClick(step.id)}
              >
                <div className="flex items-center gap-3">
                  <step.icon className={cn(
                    "h-6 w-6 flex-shrink-0",
                    selectedStep === step.id && "text-primary-foreground",
                    completedSteps.includes(step.id) && selectedStep !== step.id && "text-green-600 dark:text-green-400"
                  )} />
                  <span className="text-sm font-medium">{step.title}</span>
                  {completedSteps.includes(step.id) && (
                    <span className="ml-auto text-green-600 dark:text-green-400">✓</span>
                  )}
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
