import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Schedule {
  id: number;
  source: string;
  fromDate: Date;
  toDate: Date;
  runStartDate: Date;
  runStartTime: string;
  runEndDate: Date;
  refreshType: "full" | "incremental";
  status: "scheduled" | "running" | "completed" | "failed";
}

export default function UPRScheduler() {
  const [source, setSource] = useState<string>("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [runStartDate, setRunStartDate] = useState<Date>();
  const [runStartTime, setRunStartTime] = useState<string>("00:00");
  const [runEndDate, setRunEndDate] = useState<Date>();
  const [refreshType, setRefreshType] = useState<"full" | "incremental">("full");
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      source: "RETAIL",
      fromDate: new Date("2024-01-01"),
      toDate: new Date("2024-03-31"),
      runStartDate: new Date("2024-04-01"),
      runStartTime: "09:00",
      runEndDate: new Date("2024-04-15"),
      refreshType: "full",
      status: "completed"
    },
    {
      id: 2,
      source: "COMMERCIAL",
      fromDate: new Date("2024-04-01"),
      toDate: new Date("2024-06-30"),
      runStartDate: new Date("2024-07-01"),
      runStartTime: "14:30",
      runEndDate: new Date("2024-07-15"),
      refreshType: "incremental",
      status: "running"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (source && fromDate && toDate && runStartDate && runEndDate) {
      const newSchedule: Schedule = {
        id: schedules.length + 1,
        source,
        fromDate,
        toDate,
        runStartDate,
        runStartTime,
        runEndDate,
        refreshType,
        status: "scheduled"
      };
      setSchedules([...schedules, newSchedule]);
      // Reset form
      setSource("");
      setFromDate(undefined);
      setToDate(undefined);
      setRunStartDate(undefined);
      setRunStartTime("00:00");
      setRunEndDate(undefined);
      setRefreshType("full");
    }
  };

  const getStatusBadge = (status: Schedule["status"]) => {
    const variants = {
      scheduled: "outline",
      running: "default",
      completed: "secondary",
      failed: "destructive"
    } as const;
    return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">UPR Scheduler</h1>
          <p className="text-muted-foreground mt-2">
            Schedule UPR register extraction and processing
          </p>
        </div>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl">Create New Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="source">Register Source</Label>
                <Select value={source} onValueChange={setSource}>
                  <SelectTrigger id="source">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RETAIL">RETAIL</SelectItem>
                    <SelectItem value="COMMERCIAL">COMMERCIAL</SelectItem>
                    <SelectItem value="MEDICAL">MEDICAL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fromDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !toDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Run Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !runStartDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {runStartDate ? format(runStartDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={runStartDate} onSelect={setRunStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Run Start Time</Label>
                <Input
                  type="time"
                  value={runStartTime}
                  onChange={(e) => setRunStartTime(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Run End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !runEndDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {runEndDate ? format(runEndDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={runEndDate} onSelect={setRunEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Refresh Type</Label>
                <RadioGroup value={refreshType} onValueChange={(value) => setRefreshType(value as "full" | "incremental")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full" />
                    <Label htmlFor="full" className="font-normal">Full Refresh</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="incremental" id="incremental" />
                    <Label htmlFor="incremental" className="font-normal">Incremental Refresh</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Schedule
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl">Scheduled Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>From Date</TableHead>
                <TableHead>To Date</TableHead>
                <TableHead>Run Start</TableHead>
                <TableHead>Run Start Time</TableHead>
                <TableHead>Run End</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{schedule.source}</Badge>
                  </TableCell>
                  <TableCell>{format(schedule.fromDate, "PP")}</TableCell>
                  <TableCell>{format(schedule.toDate, "PP")}</TableCell>
                  <TableCell>{format(schedule.runStartDate, "PP")}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{schedule.runStartTime}</Badge>
                  </TableCell>
                  <TableCell>{format(schedule.runEndDate, "PP")}</TableCell>
                  <TableCell>
                    <Badge variant={schedule.refreshType === "full" ? "default" : "secondary"}>
                      {schedule.refreshType}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
