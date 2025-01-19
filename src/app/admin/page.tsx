import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="size-full py-4 flex md:items-center md:justify-center flex-col md:flex-row gap-4">
      <Button asChild size="lg" variant="block" className="">
        <Link href="/admin/products">商品一覧</Link>
      </Button>
      <Button asChild size="lg" variant="block" className="">
        <Link href="/admin/orders">注文一覧</Link>
      </Button>
      <Button asChild size="lg" variant="block" className="">
        <Link href="/admin/users">ユーザー一覧</Link>
      </Button>
      <Button asChild size="lg" variant="block" className="">
        <Link href="/admin/logs">ログ一覧</Link>
      </Button>
    </div>
  );
};

export default AdminPage;
