import type { ReactNode } from "react";

import BottomNavigation from "@/components/base/bottom-navigation";
import Header from "@/components/base/header";
import Container from "@/components/layout/container";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return (
    <div className="min-h-dvh h-full flex flex-col">
      <Header />
      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
          <Container className="h-full">{children}</Container>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default UserLayout;
