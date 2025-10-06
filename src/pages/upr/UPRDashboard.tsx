import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UPRStepper, Step, StepStatus } from "@/components/UPRStepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UPRRecord {
  uploadId: number;
  description: string;
  type: string;
  reportingPeriod: string;
  opCount: number;
  preCount: number;
  status: string;
  engineerId: number;
  createdDate: string;
  uploadBy: string;
  steps: Step[];
}

export default function UPRDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [records] = useState<UPRRecord[]>([
    {
      uploadId: 292,
      description: "Q2 25 - Reinsurance",
      type: "Reinsurance",
      reportingPeriod: "31/12/2024 - 20/06/2025",
      opCount: 971,
      preCount: 263,
      status: "completed",
      engineerId: 989,
      createdDate: "09/09/2024",
      uploadBy: "sha..",
      steps: [
        { id: "step1", title: "Register & TB Extraction", status: "completed" },
        { id: "step2", title: "Register VS TB Summary", status: "completed" },
        { id: "step3", title: "TB Recon", status: "completed" },
        { id: "step4", title: "UPR Movement", status: "completed" },
      ],
    },
    {
      uploadId: 290,
      description: "Q2 25 - Insurance",
      type: "Insurance",
      reportingPeriod: "31/12/2024 - 20/06/2025",
      opCount: 963,
      preCount: 264,
      status: "inprogress",
      engineerId: 988,
      createdDate: "08/09/2024",
      uploadBy: "sha..",
      steps: [
        { id: "step1", title: "Register & TB Extraction", status: "completed" },
        { id: "step2", title: "Register VS TB Summary", status: "completed" },
        { id: "step3", title: "TB Recon", status: "inprogress" },
        { id: "step4", title: "UPR Movement", status: "pending" },
      ],
    },
    {
      uploadId: 289,
      description: "Q2 25 - Reinsurance",
      type: "Reinsurance",
      reportingPeriod: "31/12/2024 - 20/06/2025",
      opCount: 971,
      preCount: 263,
      status: "error",
      engineerId: 0,
      createdDate: "08/09/2024",
      uploadBy: "sha..",
      steps: [
        { id: "step1", title: "Register & TB Extraction", status: "completed" },
        { id: "step2", title: "Register VS TB Summary", status: "completed" },
        { id: "step3", title: "TB Recon", status: "error" },
        { id: "step4", title: "UPR Movement", status: "pending" },
      ],
    },
    {
      uploadId: 288,
      description: "Q2 25 - Insurance",
      type: "Insurance",
      reportingPeriod: "31/12/2024 - 20/06/2025",
      opCount: 963,
      preCount: 264,
      status: "completed",
      engineerId: 0,
      createdDate: "08/09/2024",
      uploadBy: "sha..",
      steps: [
        { id: "step1", title: "Register & TB Extraction", status: "completed" },
        { id: "step2", title: "Register VS TB Summary", status: "completed" },
        { id: "step3", title: "TB Recon", status: "completed" },
        { id: "step4", title: "UPR Movement", status: "completed" },
      ],
    },
    {
      uploadId: 287,
      description: "UAT RI Q2",
      type: "Reinsurance",
      reportingPeriod: "31/12/2024 - 20/06/2025",
      opCount: 971,
      preCount: 263,
      status: "pending",
      engineerId: 998,
      createdDate: "10/08/2024",
      uploadBy: "vign..",
      steps: [
        { id: "step1", title: "Register & TB Extraction", status: "pending" },
        { id: "step2", title: "Register VS TB Summary", status: "pending" },
        { id: "step3", title: "TB Recon", status: "pending" },
        { id: "step4", title: "UPR Movement", status: "pending" },
      ],
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "inprogress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.uploadId.toString().includes(searchTerm);
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: records.length,
    pending: records.filter(r => r.status === "pending").length,
    inprogress: records.filter(r => r.status === "inprogress").length,
    completed: records.filter(r => r.status === "completed").length,
    error: records.filter(r => r.status === "error").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">UPR Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Track and monitor UPR processing status
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className={`cursor-pointer transition-all ${statusFilter === "all" ? "ring-2 ring-primary" : ""}`} onClick={() => setStatusFilter("all")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">All</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.all}</div>
          </CardContent>
        </Card>
        <Card className={`cursor-pointer transition-all ${statusFilter === "pending" ? "ring-2 ring-primary" : ""}`} onClick={() => setStatusFilter("pending")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Not Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.pending}</div>
          </CardContent>
        </Card>
        <Card className={`cursor-pointer transition-all ${statusFilter === "inprogress" ? "ring-2 ring-primary" : ""}`} onClick={() => setStatusFilter("inprogress")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts.inprogress}</div>
          </CardContent>
        </Card>
        <Card className={`cursor-pointer transition-all ${statusFilter === "completed" ? "ring-2 ring-primary" : ""}`} onClick={() => setStatusFilter("completed")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts.completed}</div>
          </CardContent>
        </Card>
        <Card className={`cursor-pointer transition-all ${statusFilter === "error" ? "ring-2 ring-primary" : ""}`} onClick={() => setStatusFilter("error")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statusCounts.error}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">UPR Records</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredRecords.map((record) => (
            <Card key={record.uploadId} className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">Upload #{record.uploadId}</CardTitle>
                      {getStatusBadge(record.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{record.description}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">{record.type}</p>
                    <p className="text-muted-foreground">{record.reportingPeriod}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <UPRStepper steps={record.steps} />
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-4 border-t text-sm">
                  <div>
                    <p className="text-muted-foreground">OP Count</p>
                    <p className="font-semibold">{record.opCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pre Count</p>
                    <p className="font-semibold">{record.preCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Engineer ID</p>
                    <p className="font-semibold">{record.engineerId || "-"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="font-semibold">{record.createdDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Upload By</p>
                    <p className="font-semibold">{record.uploadBy}</p>
                  </div>
                  <div className="flex items-end justify-end">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
