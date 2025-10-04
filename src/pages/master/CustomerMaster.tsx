import { useState } from "react";
import { DataTable } from "@/components/DataTable";

const columns = [
  { key: "code", label: "Customer Code" },
  { key: "name", label: "Customer Name" },
  { key: "email", label: "Email", type: "email" as const },
  { key: "phone", label: "Phone", type: "tel" as const },
  { key: "address", label: "Address" },
];

const initialData = [
  {
    id: "1",
    code: "CUST001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St, New York",
  },
  {
    id: "2",
    code: "CUST002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    address: "456 Oak Ave, Boston",
  },
];

export default function CustomerMaster() {
  const [customers, setCustomers] = useState(initialData);

  const handleAdd = (customer: any) => {
    setCustomers([...customers, customer]);
  };

  const handleEdit = (id: string, updatedCustomer: any) => {
    setCustomers(customers.map((c) => (c.id === id ? { ...c, ...updatedCustomer } : c)));
  };

  const handleDelete = (id: string) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <DataTable
        title="Customer Master"
        columns={columns}
        data={customers}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
