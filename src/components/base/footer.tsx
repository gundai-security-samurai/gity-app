import Image from "next/image";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="bg-primary h-36 flex flex-col items-center justify-between py-4">
      <Logo />
      <div className="">
        <div className="flex items-center justify-center">
          <div className="relative aspect-square h-10">
            <Image
              src="/pbl-icon.png"
              alt="pbl-icon"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[5/1] h-5 me-2">
            <Image
              src="/pbl-logo.png"
              alt="pbl-logo"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <p className="text-white/80 text-xs">© 2024 PBL2 security samurai</p>
      </div>
    </footer>
  );
};

export default Footer;
