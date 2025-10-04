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

interface AccountPeriod {
  id: string;
  periodName: string;
  startDate: string;
  endDate: string;
  status: string;
}

export default function AccountPeriodMaster() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [periods, setPeriods] = useState<AccountPeriod[]>([
    { id: "1", periodName: "FY 2024-2025", startDate: "2024-04-01", endDate: "2025-03-31", status: "Active" },
  ]);

  const [newPeriod, setNewPeriod] = useState({
    periodName: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  const handleAdd = () => {
    if (!newPeriod.periodName || !newPeriod.startDate || !newPeriod.endDate) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setPeriods([
      ...periods,
      { ...newPeriod, id: Date.now().toString() },
    ]);

    setNewPeriod({
      periodName: "",
      startDate: "",
      endDate: "",
      status: "Active",
    });

    toast({
      title: "Period Added",
      description: "Account period has been added successfully",
    });
  };

  const handleDelete = (id: string) => {
    setPeriods(periods.filter(p => p.id !== id));
    toast({
      title: "Period Deleted",
      description: "Account period has been removed",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/setup/company")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Account Period Master</h1>
          <p className="text-muted-foreground mt-1">Manage financial accounting periods</p>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle>Add New Period</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="periodName">Period Name *</Label>
              <Input
                id="periodName"
                value={newPeriod.periodName}
                onChange={(e) => setNewPeriod({ ...newPeriod, periodName: e.target.value })}
                placeholder="e.g., FY 2024-2025"
              />
            </div>

            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={newPeriod.startDate}
                onChange={(e) => setNewPeriod({ ...newPeriod, startDate: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={newPeriod.endDate}
                onChange={(e) => setNewPeriod({ ...newPeriod, endDate: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={newPeriod.status} onValueChange={(value) => setNewPeriod({ ...newPeriod, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add Period
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Periods</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {periods.map((period) => (
                <TableRow key={period.id}>
                  <TableCell className="font-medium">{period.periodName}</TableCell>
                  <TableCell>{period.startDate}</TableCell>
                  <TableCell>{period.endDate}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      period.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" :
                      period.status === "Inactive" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" :
                      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
                    }`}>
                      {period.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(period.id)}
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
