"use client";

import { DEFAULT_ICON } from "@/constants/user";
import useGetLoggedInUser from "@/features/users/api/use-get-logged-in-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserIcon = ({ className }: { className?: string }) => {
  const userQuery = useGetLoggedInUser();
  const user = userQuery.data;

  return (
    <Avatar className={className}>
      <AvatarImage src={user?.image || DEFAULT_ICON} alt="UserIcon" />
      <AvatarFallback />
    </Avatar>
  );
};

export default UserIcon;
