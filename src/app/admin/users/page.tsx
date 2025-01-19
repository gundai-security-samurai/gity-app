"use client";

import { DataTable } from "@/components/data-display/data-table";
import useGetUsers from "@/features/users/api/use-get-users";
import { columns } from "@/features/users/components/columns";

const AdminUsersPage = () => {
  const usersQuery = useGetUsers();
  const data = usersQuery.data;

  if (usersQuery.isLoading) {
    return null;
  }

  return (
    <div>
      <DataTable columns={columns} data={data!} />
    </div>
  );
};

export default AdminUsersPage;
