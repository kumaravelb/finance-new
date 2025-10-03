import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const transactions = [
  {
    id: "TRX-001",
    type: "income",
    description: "Salary Deposit",
    category: "Income",
    amount: 5200.00,
    date: "2025-10-01",
    status: "completed"
  },
  {
    id: "TRX-002",
    type: "expense",
    description: "Office Rent",
    category: "Rent",
    amount: 1200.00,
    date: "2025-10-02",
    status: "completed"
  },
  {
    id: "TRX-003",
    type: "income",
    description: "Freelance Project",
    category: "Income",
    amount: 1500.00,
    date: "2025-09-28",
    status: "completed"
  },
  {
    id: "TRX-004",
    type: "expense",
    description: "AWS Services",
    category: "Subscription",
    amount: 89.99,
    date: "2025-09-27",
    status: "completed"
  },
  {
    id: "TRX-005",
    type: "expense",
    description: "Marketing Campaign",
    category: "Marketing",
    amount: 450.00,
    date: "2025-09-25",
    status: "pending"
  },
  {
    id: "TRX-006",
    type: "income",
    description: "Investment Returns",
    category: "Investment",
    amount: 820.50,
    date: "2025-09-24",
    status: "completed"
  },
  {
    id: "TRX-007",
    type: "expense",
    description: "Office Supplies",
    category: "Office",
    amount: 156.30,
    date: "2025-09-22",
    status: "completed"
  },
  {
    id: "TRX-008",
    type: "income",
    description: "Product Sales",
    category: "Sales",
    amount: 2340.00,
    date: "2025-09-20",
    status: "completed"
  },
];

export default function Transactions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">View and manage all your financial transactions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>A list of your recent financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full p-2 ${
                        transaction.type === "income" 
                          ? "bg-green-100 dark:bg-green-900/20" 
                          : "bg-red-100 dark:bg-red-900/20"
                      }`}>
                        {transaction.type === "income" ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-xs text-muted-foreground">{transaction.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={transaction.status === "completed" ? "default" : "secondary"}
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    <span className={transaction.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </span>
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
