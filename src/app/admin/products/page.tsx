"use client";

import { DataTable } from "@/components/data-display/data-table";
import useGetProducts from "@/features/products/api/use-get-products";
import { columns } from "@/features/products/components/columns";

const AdminProductsPage = () => {
  const productsQuery = useGetProducts();
  const data = productsQuery.data;

  if (productsQuery.isLoading) {
    return null;
  }

  return (
    <div>
      <DataTable columns={columns} data={data!} />
    </div>
  );
};

export default AdminProductsPage;
