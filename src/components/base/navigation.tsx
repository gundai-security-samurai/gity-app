"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import UserButton from "./user-button";

const Navigation = () => {
  const session = useSession();

  return (
    <nav className="flex items-center gap-x-3">
      {session ? (
        <UserButton />
      ) : (
        <Button asChild size="sm">
          <Link href="/sign-in">ログイン</Link>
        </Button>
      )}
    </nav>
  );
};

export default Navigation;
