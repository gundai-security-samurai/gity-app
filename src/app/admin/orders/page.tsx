"use client";

import { DataTable } from "@/components/data-display/data-table";
import useGetPayments from "@/features/payments/api/use-get-payments";
import { columns } from "@/features/payments/components/columns";

const AdminOrdersPage = () => {
  const paymentsQuery = useGetPayments();
  const data = paymentsQuery.data;

  if (paymentsQuery.isLoading) {
    return null;
  }

  return (
    <div>
      <DataTable columns={columns} data={data!} />
    </div>
  );
};

export default AdminOrdersPage;
