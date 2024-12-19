import Footer from "@/components/base/footer";
import Container from "@/components/layout/container";
import Header from "@/features/auth/components/header";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="min-h-dvh h-full flex flex-col">
      <Header />
      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
          <Container className="h-full">{children}</Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
