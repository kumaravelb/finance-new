import { useState } from "react";
import { Building2, Network, Users, DollarSign, ShieldCheck, Package, Code, Calendar, UserPlus, ArrowLeftRight, Workflow, Box, FolderTree, Landmark, FileText, Wallet, Settings, UserCog, TrendingUp, BadgeDollarSign, Banknote, RefreshCw, IdCard, AlertTriangle, FileCode, SettingsIcon, FileSpreadsheet, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SetupStepper } from "@/components/SetupStepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

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

const accountsSetupSteps = [
  { id: "account-group", icon: Box, title: "Account Group" },
  { id: "account-category", icon: FolderTree, title: "Account Category" },
  { id: "account-master", icon: Landmark, title: "Account Master" },
  { id: "asset-category", icon: FileText, title: "Asset Category" },
  { id: "bank-masters", icon: Wallet, title: "Bank Masters" },
  { id: "opening-bal-setup", icon: Settings, title: "Opening Bal Set up" },
];

const customersSetupSteps = [
  { id: "customer-group-master", icon: UserCog, title: "Customer Group Master" },
  { id: "customer-category-master", icon: TrendingUp, title: "Customer Category Master" },
  { id: "customer-master", icon: Users, title: "Customer Master" },
  { id: "insured-master", icon: BadgeDollarSign, title: "Insured Master" },
];

const currencySetupSteps = [
  { id: "currency", icon: Banknote, title: "Currency" },
  { id: "exchange-rates", icon: RefreshCw, title: "Exchange Rates" },
];

const riskSetupSteps = [
  { id: "civil-id-master", icon: IdCard, title: "Civil ID Master" },
  { id: "customer-risk-profile-master", icon: AlertTriangle, title: "Customer Risk Profile Master" },
];

const mastersSetupSteps = [
  { id: "application-codes", icon: FileCode, title: "Application Codes" },
  { id: "application-para", icon: SettingsIcon, title: "Application Para" },
  { id: "report-headings", icon: FileSpreadsheet, title: "Report headings" },
  { id: "recuring-jvs", icon: RotateCcw, title: "Recuring JVs" },
];

export default function WayToStartApproach2() {
  const [selectedMain, setSelectedMain] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [currentFormStep, setCurrentFormStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [completedMainModules, setCompletedMainModules] = useState<string[]>([]);
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

  // Get current steps based on selected main module
  const getCurrentSteps = () => {
    switch (selectedMain) {
      case "company":
        return companySetupSteps;
      case "accounts":
        return accountsSetupSteps;
      case "customers":
        return customersSetupSteps;
      case "currency":
        return currencySetupSteps;
      case "risk":
        return riskSetupSteps;
      case "masters":
        return mastersSetupSteps;
      default:
        return companySetupSteps;
    }
  };

  const handleMainClick = (id: string) => {
    setSelectedMain(id);
    setCompletedSteps([]); // Reset completed steps when switching modules
    if (id === "company") {
      setSelectedStep("company-master");
    } else if (id === "accounts") {
      setSelectedStep("account-group");
    } else if (id === "customers") {
      setSelectedStep("customer-group-master");
    } else if (id === "currency") {
      setSelectedStep("currency");
    } else if (id === "risk") {
      setSelectedStep("civil-id-master");
    } else if (id === "masters") {
      setSelectedStep("application-codes");
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

    const currentSteps = getCurrentSteps();
    const currentIndex = currentSteps.findIndex(s => s.id === selectedStep);

    if (currentIndex < currentSteps.length - 1) {
      // Move to next sub-step within current module
      const nextStep = currentSteps[currentIndex + 1];
      setSelectedStep(nextStep.id);
      setCurrentFormStep(1);
    } else {
      // All sub-steps completed, mark current main module as completed
      const newCompletedMainModules = selectedMain && !completedMainModules.includes(selectedMain)
        ? [...completedMainModules, selectedMain]
        : completedMainModules;

      setCompletedMainModules(newCompletedMainModules);

      // Check if all main modules are completed
      if (newCompletedMainModules.length >= mainSetupItems.length) {
        setShowCompletion(true);
        setSelectedMain(null);
        setSelectedStep(null);
      } else {
        // Move to next main module automatically
        const currentMainIndex = mainSetupItems.findIndex(m => m.id === selectedMain);
        if (currentMainIndex < mainSetupItems.length - 1) {
          const nextMainModule = mainSetupItems[currentMainIndex + 1];
          setSelectedMain(nextMainModule.id);
          setCompletedSteps([]); // Reset completed steps for new module

          // Set first step of next module
          switch (nextMainModule.id) {
            case "company":
              setSelectedStep("company-master");
              break;
            case "accounts":
              setSelectedStep("account-group");
              break;
            case "customers":
              setSelectedStep("customer-group-master");
              break;
            case "currency":
              setSelectedStep("currency");
              break;
            case "risk":
              setSelectedStep("civil-id-master");
              break;
            case "masters":
              setSelectedStep("application-codes");
              break;
          }
          setCurrentFormStep(1);
        }
      }
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

  // Define color for each main module
  const moduleColors = [
    "hsl(217 91% 60%)",  // blue - Company
    "hsl(142 76% 36%)",  // green - Accounts
    "hsl(262 83% 58%)",  // purple - Customers
    "hsl(24 94% 50%)",   // orange - Currency
    "hsl(346 77% 50%)",  // rose - Risk
    "hsl(340 82% 42%)",  // maroon - Masters
  ];

  // Calculate granular progress including sub-steps
  // Each module = 16.67% (100/6), each sub-step varies based on module's step count
  const modulePercentage = 100 / mainSetupItems.length; // ~16.67%

  // Get substep percentage for current module
  const getCurrentSubStepPercentage = () => {
    const currentSteps = getCurrentSteps();
    return modulePercentage / currentSteps.length;
  };

  // Calculate current progress:
  // - Completed modules: completedMainModules.length * 16.67%
  // - Current module sub-steps: completedSteps.length * (16.67% / num_steps_in_module)
  const completedModulesProgress = completedMainModules.length * modulePercentage;
  const currentModuleSubStepsProgress = selectedMain && !completedMainModules.includes(selectedMain)
    ? completedSteps.length * getCurrentSubStepPercentage()
    : 0;

  const financeProgressPercentage = completedModulesProgress + currentModuleSubStepsProgress;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Way to Start - Approach 2</h1>
        <p className="text-muted-foreground">
          Modern split-view setup wizard with vertical navigation and detailed forms
        </p>
      </div>

      {/* Finance Setup Progress Bar */}
      <Card className="p-6 border-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Finance Setup Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedMainModules.length} of {mainSetupItems.length} modules completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{Math.round(financeProgressPercentage)}%</div>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </div>

          {/* Segmented Progress Bar */}
          <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
            {mainSetupItems.map((item, index) => {
              const isCompleted = completedMainModules.includes(item.id);
              const isCurrentModule = selectedMain === item.id;

              // Calculate fill percentage for this segment
              let segmentFill = 0;
              if (isCompleted) {
                segmentFill = 100;
              } else if (isCurrentModule) {
                // Calculate percentage within this module (0-100%)
                const currentSteps = getCurrentSteps();
                const moduleCompletionPercentage = (completedSteps.length / currentSteps.length) * 100;
                segmentFill = moduleCompletionPercentage;
              }

              return (
                <div
                  key={item.id}
                  className="relative"
                  style={{ width: `${modulePercentage}%` }}
                >
                  <div
                    className="h-3 transition-all duration-500"
                    style={{
                      width: `${segmentFill}%`,
                      backgroundColor: moduleColors[index]
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-xs text-muted-foreground">
            {mainSetupItems.map((item, index) => (
              <div key={item.id} className="flex flex-col items-center gap-1" style={{ width: `${modulePercentage}%` }}>
                <div className={cn(
                  "w-3 h-3 rounded-full border-2"
                )}
                style={{
                  backgroundColor: completedMainModules.includes(item.id) ? moduleColors[index] : 'transparent',
                  borderColor: moduleColors[index]
                }} />
                <span className="text-center text-xs">{Math.round((index + 1) * modulePercentage)}%</span>
                <span className="text-center text-[10px] leading-tight">{item.title.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Top Widgets */}
      <div className="grid grid-cols-6 gap-4">
        {mainSetupItems.map((item) => (
          <Card
            key={item.id}
            className={cn(
              "p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 relative",
              selectedMain === item.id && "bg-primary text-primary-foreground border-primary shadow-lg",
              completedMainModules.includes(item.id) && selectedMain !== item.id && "bg-primary/10 dark:bg-primary/20 border-primary"
            )}
            onClick={() => handleMainClick(item.id)}
          >
            {completedMainModules.includes(item.id) && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                ✓
              </div>
            )}
            <div className="flex flex-col items-center gap-3 text-center">
              <item.icon className={cn(
                "h-8 w-8",
                selectedMain === item.id && "text-primary-foreground",
                completedMainModules.includes(item.id) && selectedMain !== item.id && "text-primary"
              )} />
              <div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className={cn(
                  "text-xs",
                  selectedMain === item.id ? "text-primary-foreground/80" :
                  completedMainModules.includes(item.id) ? "text-primary/80" :
                  "text-muted-foreground"
                )}>
                  {item.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Information Section or Completion Message */}
      {!selectedMain && !showCompletion && (
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

      {/* Completion Message */}
      {showCompletion && (
        <Card className="p-12 text-center bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20">
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
                setCompletedMainModules([]);
                setSelectedMain("company");
                setSelectedStep("company-master");
              }}>
                Start Over
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Split View: Vertical Widgets + Content */}
      {selectedMain && (
        <div className="flex gap-6">
          {/* Left Sidebar - Vertical Widgets (20%) */}
          <div className="w-1/5 space-y-3">
            {getCurrentSteps().map((step) => (
              <Card
                key={step.id}
                className={cn(
                  "p-4 cursor-pointer transition-all hover:shadow-md border-2 relative",
                  selectedStep === step.id && "bg-primary text-primary-foreground border-primary shadow-lg",
                  completedSteps.includes(step.id) && selectedStep !== step.id && "bg-primary/10 dark:bg-primary/20 border-primary"
                )}
                onClick={() => handleStepClick(step.id)}
              >
                <div className="flex items-center gap-3">
                  <step.icon className={cn(
                    "h-6 w-6 flex-shrink-0",
                    selectedStep === step.id && "text-primary-foreground",
                    completedSteps.includes(step.id) && selectedStep !== step.id && "text-primary"
                  )} />
                  <span className="text-sm font-medium">{step.title}</span>
                  {completedSteps.includes(step.id) && (
                    <span className="ml-auto text-primary">✓</span>
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
