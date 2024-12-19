"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import RecentOrder from "@/features/users/components/recent-order";
import UserInfo from "@/features/users/components/user-info";

const actions = [
  {
    href: "/products",
    label: "商品一覧",
    label2: "SHOP",
    disabled: false,
  },
  {
    href: "/settings/account",
    label: "アカウント設定",
    label2: "ACCOUNT",
    disabled: true,
  },
  {
    href: "/document",
    label: "セキュリティドキュメント",
    label2: "SECURITY DOCUMENT",
    disabled: true,
  },
];

const HomePage = () => {
  const router = useRouter();
  const session = useSession();

  if (!session) {
    router.push("/sign-in");
  }

  return (
    <div className="h-full flex flex-col">
      <UserInfo />
      <div className="bg-background w-screen mx-[calc(50%-50vw)] flex-1 py-4">
        <Container className="space-y-4">
          <RecentOrder />
          <section className="grid grid-cols-3 gap-2 md:gap-6 md:grid-cols-4">
            {actions.map((action) => (
              <Button
                key={action.href}
                variant="block"
                disabled={action.disabled}
                onClick={() => router.push(action.href)}
                className="size-full"
              >
                <div className="aspect-square w-full md:aspect-video">
                  <h3 className="whitespace-pre-wrap text-start text-xs font-bold text-primary md:text-lg">
                    {action.label}
                  </h3>
                  <p className="whitespace-pre-wrap text-start text-xs text-primary/50 md:text-base">
                    {action.label2}
                  </p>
                </div>
              </Button>
            ))}
          </section>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
