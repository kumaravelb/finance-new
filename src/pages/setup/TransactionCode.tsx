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
import { Textarea } from "@/components/ui/textarea";

interface TransactionCode {
  id: string;
  code: string;
  name: string;
  type: string;
  category: string;
  description: string;
  status: string;
}

export default function TransactionCode() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [codes, setCodes] = useState<TransactionCode[]>([
    { id: "1", code: "INV", name: "Invoice", type: "Sales", category: "Revenue", description: "Sales invoice transaction", status: "Active" },
    { id: "2", code: "PAY", name: "Payment", type: "Purchase", category: "Expense", description: "Payment transaction", status: "Active" },
  ]);

  const [newCode, setNewCode] = useState({
    code: "",
    name: "",
    type: "",
    category: "",
    description: "",
    status: "Active",
  });

  const handleAdd = () => {
    if (!newCode.code || !newCode.name || !newCode.type) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setCodes([
      ...codes,
      { ...newCode, id: Date.now().toString() },
    ]);

    setNewCode({
      code: "",
      name: "",
      type: "",
      category: "",
      description: "",
      status: "Active",
    });

    toast({
      title: "Transaction Code Added",
      description: "Transaction code has been added successfully",
    });
  };

  const handleDelete = (id: string) => {
    setCodes(codes.filter(c => c.id !== id));
    toast({
      title: "Transaction Code Deleted",
      description: "Transaction code has been removed",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/setup/company")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Transaction Code Master</h1>
          <p className="text-muted-foreground mt-1">Define and manage transaction codes</p>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle>Add New Transaction Code</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Transaction Code *</Label>
                <Input
                  id="code"
                  value={newCode.code}
                  onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., INV, PAY"
                  maxLength={10}
                />
              </div>

              <div>
                <Label htmlFor="name">Transaction Name *</Label>
                <Input
                  id="name"
                  value={newCode.name}
                  onChange={(e) => setNewCode({ ...newCode, name: e.target.value })}
                  placeholder="e.g., Invoice, Payment"
                />
              </div>

              <div>
                <Label htmlFor="type">Transaction Type *</Label>
                <Select value={newCode.type} onValueChange={(value) => setNewCode({ ...newCode, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Type--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Purchase">Purchase</SelectItem>
                    <SelectItem value="Receipt">Receipt</SelectItem>
                    <SelectItem value="Payment">Payment</SelectItem>
                    <SelectItem value="Journal">Journal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newCode.category} onValueChange={(value) => setNewCode({ ...newCode, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Category--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Revenue">Revenue</SelectItem>
                    <SelectItem value="Expense">Expense</SelectItem>
                    <SelectItem value="Asset">Asset</SelectItem>
                    <SelectItem value="Liability">Liability</SelectItem>
                    <SelectItem value="Equity">Equity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCode.description}
                  onChange={(e) => setNewCode({ ...newCode, description: e.target.value })}
                  placeholder="Brief description of the transaction code"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={newCode.status} onValueChange={(value) => setNewCode({ ...newCode, status: value })}>
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
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction Code
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Transaction Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {codes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell className="font-bold">{code.code}</TableCell>
                  <TableCell className="font-medium">{code.name}</TableCell>
                  <TableCell>{code.type}</TableCell>
                  <TableCell>{code.category}</TableCell>
                  <TableCell className="max-w-xs truncate">{code.description}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      code.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" :
                      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
                    }`}>
                      {code.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(code.id)}
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
