"use client";

import { useCallback } from "react";

import { Store, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Gity from "../icon/gity";
import Container from "../layout/container";

const routes = [
  { href: "/products", icon: Store },
  { href: "/ ", icon: Gity },
  { href: "/settings/profile", icon: User },
];

const BottomNavigation = () => {
  const pathname = usePathname();

  const _isActive = useCallback(
    (href: string) => pathname === href,
    [pathname],
  );

  return (
    <footer className="pt-2 pb-4 bg-primary rounded-t-xl">
      <Container>
        <nav className="flex items-center justify-evenly">
          {routes.map((item) => (
            <Link key={item.href} href={item.href} className="p-4">
              <item.icon className="text-white" />
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
};

export default BottomNavigation;
