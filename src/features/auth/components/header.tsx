import Link from "next/link";

import Logo from "@/components/base/logo";
import Container from "@/components/layout/container";

const Header = () => {
  return (
    <header className="py-3 bg-primary">
      <Container className="flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
      </Container>
    </header>
  );
};

export default Header;
