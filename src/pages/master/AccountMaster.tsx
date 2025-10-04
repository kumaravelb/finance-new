import { useState } from "react";
import { DataTable } from "@/components/DataTable";

const columns = [
  { key: "accountNumber", label: "Account Number" },
  { key: "accountName", label: "Account Name" },
  { key: "accountType", label: "Account Type" },
  { key: "balance", label: "Balance", type: "number" as const },
  { key: "status", label: "Status" },
];

const initialData = [
  {
    id: "1",
    accountNumber: "ACC1001",
    accountName: "Cash Account",
    accountType: "Asset",
    balance: "50000",
    status: "Active",
  },
  {
    id: "2",
    accountNumber: "ACC1002",
    accountName: "Revenue Account",
    accountType: "Income",
    balance: "125000",
    status: "Active",
  },
  {
    id: "3",
    accountNumber: "ACC1003",
    accountName: "Expense Account",
    accountType: "Expense",
    balance: "35000",
    status: "Active",
  },
];

export default function AccountMaster() {
  const [accounts, setAccounts] = useState(initialData);

  const handleAdd = (account: any) => {
    setAccounts([...accounts, account]);
  };

  const handleEdit = (id: string, updatedAccount: any) => {
    setAccounts(accounts.map((a) => (a.id === id ? { ...a, ...updatedAccount } : a)));
  };

  const handleDelete = (id: string) => {
    setAccounts(accounts.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <DataTable
        title="Account Master"
        columns={columns}
        data={accounts}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
