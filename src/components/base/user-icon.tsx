"use client";

import { DEFAULT_ICON } from "@/constants/user";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserIcon = ({ className }: { className?: string }) => {
  const { data: session } = useSession();

  return (
    <Avatar className={className}>
      <AvatarImage src={session?.user?.image || DEFAULT_ICON} alt="UserIcon" />
      <AvatarFallback />
    </Avatar>
  );
};

export default UserIcon;
