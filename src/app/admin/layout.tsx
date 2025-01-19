"use client";

import Header from "@/components/base/header";
import Container from "@/components/layout/container";
import type { ReactNode } from "react";

import { ListOrdered, Logs, Store, User } from "lucide-react";
import { usePathname } from "next/navigation";

const adminRoutes = [
  {
    href: "/admin/products",
    label: "商品管理",
    subLabel: "GOODS MANAGEMENT",
    icon: Store,
  },
  {
    href: "/admin/orders",
    label: "注文管理",
    subLabel: "ORDERS MANAGEMENT",
    icon: ListOrdered,
  },
  {
    href: "/admin/users",
    label: "ユーザー管理",
    subLabel: "USERS MANAGEMENT",
    icon: User,
  },
  {
    href: "/admin/logs",
    label: "ログ管理",
    subLabel: "LOGS MANAGEMENT",
    icon: Logs,
  },
];

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <div className="min-h-dvh h-full flex flex-col">
      <Header />
      <div className="w-screen mx-[calc(50%-50vw)] bg-[#363436]">
        <Container className="py-12">
          <h2 className="text-4xl font-bold text-white">
            {adminRoutes.find((route) => route.href === pathname)?.label ??
              "管理画面"}
          </h2>
          <p className="text-white/60 text-lg">
            {adminRoutes.find((route) => route.href === pathname)?.subLabel ??
              "ADMIN"}
          </p>
        </Container>
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
          <Container className="h-full">{children}</Container>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
