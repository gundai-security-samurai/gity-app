import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <div className={cn("relative aspect-[4/1] h-8", className)}>
      <Image fill src="/logo.png" alt="Logo" className="object-contain" />
    </div>
  );
};

export default Logo;
