import { useState } from "react";
import { DataTable } from "@/components/DataTable";

const columns = [
  { key: "vendorCode", label: "Vendor Code" },
  { key: "vendorName", label: "Vendor Name" },
  { key: "email", label: "Email", type: "email" as const },
  { key: "phone", label: "Phone", type: "tel" as const },
  { key: "category", label: "Category" },
];

const initialData = [
  {
    id: "1",
    vendorCode: "VEN001",
    vendorName: "Tech Supplies Co.",
    email: "contact@techsupplies.com",
    phone: "+1234567892",
    category: "Electronics",
  },
  {
    id: "2",
    vendorCode: "VEN002",
    vendorName: "Office Essentials Ltd.",
    email: "sales@officeessentials.com",
    phone: "+1234567893",
    category: "Stationery",
  },
];

export default function VendorMaster() {
  const [vendors, setVendors] = useState(initialData);

  const handleAdd = (vendor: any) => {
    setVendors([...vendors, vendor]);
  };

  const handleEdit = (id: string, updatedVendor: any) => {
    setVendors(vendors.map((v) => (v.id === id ? { ...v, ...updatedVendor } : v)));
  };

  const handleDelete = (id: string) => {
    setVendors(vendors.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-6">
      <DataTable
        title="Vendor Master"
        columns={columns}
        data={vendors}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
