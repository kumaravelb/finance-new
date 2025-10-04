import { useState } from "react";
import { DataTable } from "@/components/DataTable";

const columns = [
  { key: "productCode", label: "Product Code" },
  { key: "productName", label: "Product Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price", type: "number" as const },
  { key: "stock", label: "Stock", type: "number" as const },
];

const initialData = [
  {
    id: "1",
    productCode: "PRD001",
    productName: "Laptop",
    category: "Electronics",
    price: "1200",
    stock: "50",
  },
  {
    id: "2",
    productCode: "PRD002",
    productName: "Mouse",
    category: "Accessories",
    price: "25",
    stock: "200",
  },
  {
    id: "3",
    productCode: "PRD003",
    productName: "Keyboard",
    category: "Accessories",
    price: "75",
    stock: "150",
  },
];

export default function ProductMaster() {
  const [products, setProducts] = useState(initialData);

  const handleAdd = (product: any) => {
    setProducts([...products, product]);
  };

  const handleEdit = (id: string, updatedProduct: any) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)));
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <DataTable
        title="Product Master"
        columns={columns}
        data={products}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
