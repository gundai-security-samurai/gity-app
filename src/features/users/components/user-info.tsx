"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import useGetLoggedInUser from "../api/use-get-logged-in-user";

const UserInfo = () => {
  const userQuery = useGetLoggedInUser();
  const user = userQuery.data;

  return (
    <div className="bg-app-backgound flex gap-4 items-center py-4">
      <div className="relative size-24">
        <Image
          fill
          src={user?.image || "/default-icon.png"}
          alt="avatar"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between flex-1 gap-2">
        <div>
          <p className="text-start">{user?.name}</p>
          <p className="text-start">{user?.email}</p>
        </div>
        <Button
          variant="outline"
          className="border-primary text-primary ml-auto"
          size="sm"
          asChild
        >
          <Link href="/settings/profile">プロフィール編集</Link>
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;
