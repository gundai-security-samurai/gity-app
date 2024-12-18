"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import OrderInfo from "@/features/orders/components/order-info";
import useOrderCart from "@/features/orders/hooks/use-order-cart";
import PurductList from "@/features/products/components/product-list";
import useGetUser from "@/features/users/api/use-get-user";
import { useRouter } from "next/navigation";

const MerchandisePage = () => {
  const router = useRouter();
  const { productIds } = useOrderCart();
  const session = useSession();
  const userQuery = useGetUser(session.data?.user?.id);

  const user = userQuery.data;

  return (
    <>
      <Drawer
        open={!user?.faceImage && !userQuery.isLoading}
        onOpenChange={() => router.back()}
      >
        <DrawerContent className="h-1/4">
          <DrawerHeader>
            <DrawerTitle>SHOPのご利用について</DrawerTitle>
            <DrawerDescription>
              商品の購入には顔写真の登録が必要です
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button asChild>
              <Link href="/settings/profile">登録する</Link>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div>
        <div className="bg-secondary w-screen mx-[calc(50%-50vw)]">
          <Container className="py-4">
            <h1 className="text-primary-foreground text-3xl font-bold">
              商品一覧
            </h1>
            <p className="text-primary-foreground/80 mb-2">SHOP</p>
            {productIds.length > 0 && <OrderInfo />}
          </Container>
        </div>
        <div className="py-8">
          <PurductList />
        </div>
      </div>
    </>
  );
};

export default MerchandisePage;
