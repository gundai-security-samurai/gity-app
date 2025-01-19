"use client";

import { DataTable } from "@/components/data-display/data-table";
import useGetLogs from "@/features/face-recognitions/api/use-get-logs";
import { columns } from "@/features/face-recognitions/components/columns";

const AdminLogsPage = () => {
  const logsQuery = useGetLogs();
  const data = logsQuery.data;

  if (logsQuery.isLoading) {
    return null;
  }

  return (
    <div>
      <DataTable columns={columns} data={data!} />
    </div>
  );
};

export default AdminLogsPage;
