import Link from "next/link";

import { Button } from "@/components/ui/button";
import Container from "../layout/container";
import Logo from "./logo";
import Navigation from "./navigation";

const Header = () => {
  return (
    <header className="py-3 bg-primary">
      <Container className="flex items-center justify-between">
        <div className="flex gap-4">
          <Link href="/">
            <Logo />
          </Link>
          <Button asChild variant="link" className="text-white">
            <Link href="/admin">管理画面へ</Link>
          </Button>
        </div>
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;
