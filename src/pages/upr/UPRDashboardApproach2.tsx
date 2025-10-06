import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { InlineUPRStepper, InlineStep } from "@/components/InlineUPRStepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Plus, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UPRRecord {
  id: number;
  uploadId: number;
  description: string;
  type: string;
  reportingPeriod: string;
  opCount: number;
  preCount: number;
  status: string;
  actions: string;
  engineerId: number;
  createdDate: string;
  uploadBy: string;
  steps: InlineStep[];
}

export default function UPRDashboardApproach2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [batchIdFilter, setBatchIdFilter] = useState<string>("all");
  const [reportingPeriodFilter, setReportingPeriodFilter] = useState<string>("all");
  const [uploadedByFilter, setUploadedByFilter] = useState<string>("all");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState("5");

  const [records] = useState<UPRRecord[]>([
    {
      id: 1,
      uploadId: 292,
      description: "Q2 25 - Reinsurance",
      type: "Reinsurance",
      reportingPeriod: "31/12/2024 - 20/06/2025",
      opCount: 971,
      preCount: 263,
      status: "completed",
      actions: "",
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
      id: 2,
      uploadId: 290,
      description: "Q2 25 - Insurance",
      type: "Insurance",
      reportingPeriod: "31/12/2024 - 20/06/2025",
      opCount: 963,
      preCount: 264,
      status: "inprogress",
      actions: "",
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
      id: 3,
      uploadId: 289,
      description: "Q2 25 - Reinsurance",
      type: "Reinsurance",
      reportingPeriod: "31/12/2024 - 20/06/2025",
      opCount: 971,
      preCount: 263,
      status: "error",
      actions: "Actuarial Data Ap...",
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
      id: 4,
      uploadId: 288,
      description: "Q2 25 - Insurance",
      type: "Insurance",
      reportingPeriod: "31/12/2024 - 20/06/2025",
      opCount: 963,
      preCount: 264,
      status: "error",
      actions: "Actuarial Data Ap...",
      engineerId: 0,
      createdDate: "08/09/2024",
      uploadBy: "sha..",
      steps: [
        { id: "step1", title: "Register & TB Extraction", status: "completed" },
        { id: "step2", title: "Register VS TB Summary", status: "completed" },
        { id: "step3", title: "TB Recon", status: "completed" },
        { id: "step4", title: "UPR Movement", status: "error" },
      ],
    },
    {
      id: 5,
      uploadId: 287,
      description: "UAT RI Q2",
      type: "Reinsurance",
      reportingPeriod: "31/12/2024 - 20/06/2025",
      opCount: 971,
      preCount: 263,
      status: "completed",
      actions: "",
      engineerId: 998,
      createdDate: "10/08/2024",
      uploadBy: "vign..",
      steps: [
        { id: "step1", title: "Register & TB Extraction", status: "completed" },
        { id: "step2", title: "Register VS TB Summary", status: "completed" },
        { id: "step3", title: "TB Recon", status: "completed" },
        { id: "step4", title: "UPR Movement", status: "completed" },
      ],
    },
  ]);

  const statusCounts = {
    all: records.length,
    pending: records.filter((r) => r.status === "pending").length,
    inprogress: records.filter((r) => r.status === "inprogress").length,
    completed: records.filter((r) => r.status === "completed").length,
    error: records.filter((r) => r.status === "error").length,
  };

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.uploadId.toString().includes(searchTerm);
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesBatchId = batchIdFilter === "all" || record.uploadId.toString() === batchIdFilter;
    const matchesReportingPeriod = reportingPeriodFilter === "all" || record.reportingPeriod === reportingPeriodFilter;
    const matchesUploadedBy = uploadedByFilter === "all" || record.uploadBy === uploadedByFilter;
    return matchesSearch && matchesStatus && matchesBatchId && matchesReportingPeriod && matchesUploadedBy;
  });

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredRecords.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredRecords.map((r) => r.id));
    }
  };

  const getRowClassName = (record: UPRRecord, index: number) => {
    if (selectedRows.includes(record.id)) {
      return "bg-blue-50";
    }
    return index % 2 === 0 ? "bg-white" : "bg-gray-50/50";
  };

  const uniqueBatchIds = ["all", ...Array.from(new Set(records.map(r => r.uploadId.toString())))];
  const uniqueReportingPeriods = ["all", ...Array.from(new Set(records.map(r => r.reportingPeriod)))];
  const uniqueUploadedBy = ["all", ...Array.from(new Set(records.map(r => r.uploadBy)))];

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">UPR Module</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor UPR processing batches
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Reset
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            New Batch
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Batch ID</label>
              <Select value={batchIdFilter} onValueChange={setBatchIdFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Upload ID" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueBatchIds.map((id) => (
                    <SelectItem key={id} value={id}>
                      {id === "all" ? "Select Upload ID" : id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reporting Period</label>
              <Select value={reportingPeriodFilter} onValueChange={setReportingPeriodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Reporting Period" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueReportingPeriods.map((period) => (
                    <SelectItem key={period} value={period}>
                      {period === "all" ? "Select Reporting Period" : period}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Uploaded By</label>
              <Select value={uploadedByFilter} onValueChange={setUploadedByFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Processed By" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueUploadedBy.map((user) => (
                    <SelectItem key={user} value={user}>
                      {user === "all" ? "Select Processed By" : user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Batch Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select Status</SelectItem>
                  <SelectItem value="pending">Not Started</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="error">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Filter Buttons */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              onClick={() => setStatusFilter("all")}
              className={`px-6 py-2 rounded text-sm font-bold ${
                statusFilter === "all"
                  ? "bg-gray-400 text-white hover:bg-gray-500"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              All
            </Button>
            <Button
              onClick={() => setStatusFilter("pending")}
              className={`px-6 py-2 rounded text-sm font-bold ${
                statusFilter === "pending"
                  ? "bg-yellow-500 text-black hover:bg-yellow-600"
                  : "bg-yellow-400 text-black hover:bg-yellow-500"
              }`}
            >
              Not Started
            </Button>
            <Button
              onClick={() => setStatusFilter("inprogress")}
              className={`px-6 py-2 rounded text-sm font-bold ${
                statusFilter === "inprogress"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              In Progress
            </Button>
            <Button
              onClick={() => setStatusFilter("completed")}
              className={`px-6 py-2 rounded text-sm font-bold ${
                statusFilter === "completed"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              Completed
            </Button>
            <Button
              onClick={() => setStatusFilter("error")}
              className={`px-6 py-2 rounded text-sm font-bold ${
                statusFilter === "error"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Failed
            </Button>
            <Button
              className="px-6 py-2 rounded text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 ml-auto"
            >
              New Batch
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="w-16 sticky left-0 bg-gray-100 z-10 border">
                    Select
                  </TableHead>
                  <TableHead className="font-semibold sticky left-16 bg-gray-100 z-10 border">Batch ID</TableHead>
                  <TableHead className="font-semibold bg-gray-100 border min-w-[150px]">Description</TableHead>
                  <TableHead className="font-semibold bg-gray-100 border min-w-[150px]">Reporting Date</TableHead>
                  <TableHead className="font-semibold bg-gray-100 border min-w-[500px]">Progress Status</TableHead>
                  <TableHead className="font-semibold bg-gray-100 border min-w-[120px]">Created Date</TableHead>
                  <TableHead className="font-semibold bg-gray-100 border min-w-[100px]">Processed By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record, index) => (
                  <TableRow
                    key={record.id}
                    className={`${getRowClassName(record, index)} hover:bg-blue-50/50 transition-colors border-b`}
                  >
                    <TableCell className="sticky left-0 z-10 border text-center" style={{ backgroundColor: getRowClassName(record, index).includes('blue') ? 'rgb(239 246 255)' : index % 2 === 0 ? 'white' : 'rgb(249 250 251)' }}>
                      <Checkbox
                        checked={selectedRows.includes(record.id)}
                        onCheckedChange={() => toggleRowSelection(record.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium sticky left-16 z-10 border" style={{ backgroundColor: getRowClassName(record, index).includes('blue') ? 'rgb(239 246 255)' : index % 2 === 0 ? 'white' : 'rgb(249 250 251)' }}>{record.uploadId}</TableCell>
                    <TableCell className="border">{record.description}</TableCell>
                    <TableCell className="text-sm border">{record.reportingPeriod}</TableCell>
                    <TableCell className="border">
                      <InlineUPRStepper steps={record.steps} />
                    </TableCell>
                    <TableCell className="text-sm border">{record.createdDate}</TableCell>
                    <TableCell className="border">{record.uploadBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
            <div className="flex items-center gap-2 text-sm">
              <span>Show</span>
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-20 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span>entries</span>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">«</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">‹</Button>
              <Button size="sm" className="h-8 w-8 p-0 bg-[#C1272D] hover:bg-[#A01F24]">1</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">4</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">5</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">›</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">»</Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-[#C1272D] text-white hover:bg-[#A01F24]">
                Reports
              </Button>
              <Button variant="outline" size="sm" className="bg-[#C1272D] text-white hover:bg-[#A01F24]">
                Current Status
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
