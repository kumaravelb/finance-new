import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface WorkflowStep {
  stepNumber: number;
  stepName: string;
  approver: string;
}

interface Workflow {
  id: string;
  workflowName: string;
  module: string;
  steps: WorkflowStep[];
  status: string;
}

export default function WorkflowMaster() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [workflows, setWorkflows] = useState<Workflow[]>([
    { 
      id: "1", 
      workflowName: "Invoice Approval", 
      module: "Sales",
      steps: [
        { stepNumber: 1, stepName: "Review", approver: "Manager" },
        { stepNumber: 2, stepName: "Approve", approver: "Director" },
      ],
      status: "Active" 
    },
  ]);

  const [newWorkflow, setNewWorkflow] = useState({
    workflowName: "",
    module: "",
    status: "Active",
  });

  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [newStep, setNewStep] = useState({
    stepName: "",
    approver: "",
  });

  const handleAddStep = () => {
    if (!newStep.stepName || !newStep.approver) {
      toast({
        title: "Validation Error",
        description: "Please fill step name and approver",
        variant: "destructive",
      });
      return;
    }

    setWorkflowSteps([
      ...workflowSteps,
      {
        stepNumber: workflowSteps.length + 1,
        stepName: newStep.stepName,
        approver: newStep.approver,
      },
    ]);

    setNewStep({ stepName: "", approver: "" });
  };

  const handleRemoveStep = (stepNumber: number) => {
    setWorkflowSteps(workflowSteps.filter(s => s.stepNumber !== stepNumber));
  };

  const handleAddWorkflow = () => {
    if (!newWorkflow.workflowName || !newWorkflow.module || workflowSteps.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill workflow details and add at least one step",
        variant: "destructive",
      });
      return;
    }

    setWorkflows([
      ...workflows,
      { 
        ...newWorkflow, 
        id: Date.now().toString(),
        steps: workflowSteps,
      },
    ]);

    setNewWorkflow({
      workflowName: "",
      module: "",
      status: "Active",
    });
    setWorkflowSteps([]);

    toast({
      title: "Workflow Created",
      description: "Workflow has been created successfully",
    });
  };

  const handleDeleteWorkflow = (id: string) => {
    setWorkflows(workflows.filter(w => w.id !== id));
    toast({
      title: "Workflow Deleted",
      description: "Workflow has been removed",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/setup/company")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Workflow Master</h1>
          <p className="text-muted-foreground mt-1">Configure approval workflows</p>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle>Create New Workflow</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="workflowName">Workflow Name *</Label>
              <Input
                id="workflowName"
                value={newWorkflow.workflowName}
                onChange={(e) => setNewWorkflow({ ...newWorkflow, workflowName: e.target.value })}
                placeholder="e.g., Invoice Approval"
              />
            </div>

            <div>
              <Label htmlFor="module">Module *</Label>
              <Select value={newWorkflow.module} onValueChange={(value) => setNewWorkflow({ ...newWorkflow, module: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="--Select Module--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Purchase">Purchase</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Inventory">Inventory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={newWorkflow.status} onValueChange={(value) => setNewWorkflow({ ...newWorkflow, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Workflow Steps</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="stepName">Step Name</Label>
                <Input
                  id="stepName"
                  value={newStep.stepName}
                  onChange={(e) => setNewStep({ ...newStep, stepName: e.target.value })}
                  placeholder="e.g., Review, Approve"
                />
              </div>

              <div>
                <Label htmlFor="approver">Approver Role</Label>
                <Select value={newStep.approver} onValueChange={(value) => setNewStep({ ...newStep, approver: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Role--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Director">Director</SelectItem>
                    <SelectItem value="CFO">CFO</SelectItem>
                    <SelectItem value="CEO">CEO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={handleAddStep} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Step
                </Button>
              </div>
            </div>

            {workflowSteps.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Configured Steps:</h4>
                <div className="space-y-2">
                  {workflowSteps.map((step) => (
                    <div key={step.stepNumber} className="flex items-center justify-between bg-background p-3 rounded">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">Step {step.stepNumber}</Badge>
                        <span className="font-medium">{step.stepName}</span>
                        <span className="text-sm text-muted-foreground">→ {step.approver}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveStep(step.stepNumber)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleAddWorkflow}>
              <Plus className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workflow Name</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Steps</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell className="font-medium">{workflow.workflowName}</TableCell>
                  <TableCell>{workflow.module}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {workflow.steps.map((step) => (
                        <Badge key={step.stepNumber} variant="secondary" className="text-xs">
                          {step.stepNumber}. {step.stepName}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      workflow.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" :
                      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
                    }`}>
                      {workflow.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
