"use client";

import { forwardRef } from "react";

import Link from "next/link";

import UserIcon from "@/components/base/user-icon";
import useGetLoggedInUser from "@/features/users/api/use-get-logged-in-user";
import { signOut } from "next-auth/react";
import { Button, type ButtonProps } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const routes: { href: string; label: string }[] = [];

const UserButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const userQuery = useGetLoggedInUser();
  const user = userQuery.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full size-8"
          ref={ref}
          {...props}
        >
          <UserIcon className="size-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="mx-2 w-48">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        {routes.map((route) => (
          <DropdownMenuItem key={route.href} asChild>
            <Link href={route.href}>{route.label}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={() => signOut()}>
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
UserButton.displayName = "UserButton";

export default UserButton;
