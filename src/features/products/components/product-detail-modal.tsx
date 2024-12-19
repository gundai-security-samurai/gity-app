"use client";

import { useMedia } from "react-use";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useOrderCart from "@/features/orders/hooks/use-order-cart";
import Image from "next/image";
import useGetProduct from "../api/use-get-product";
import useOpenProduct from "../hooks/use-open-product";

const ProductDetailModal = () => {
  const { id, isOpen, onClose } = useOpenProduct();
  const { addProduct } = useOrderCart();
  const md = useMedia("(min-width: 768px)", false);

  const productQuery = useGetProduct(id);

  const handleAddProduct = () => {
    if (!id) return;
    addProduct(id);
    onClose();
  };

  if (productQuery.isLoading) {
    return null;
  }

  if (md) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          {productQuery.data?.image && (
            <div className="relative aspect-[16/9] m-4">
              <Image
                fill
                src={productQuery.data?.image}
                alt="Product Image"
                className="object-cover rounded-md"
              />
            </div>
          )}
          <DialogHeader>
            <DialogTitle className="text-start">
              {productQuery.data?.name}
            </DialogTitle>
            <DialogDescription className="text-start">
              <p className="">{`在庫${productQuery.data?.quantity}`}</p>
              <p className="">{productQuery.data?.description}</p>
            </DialogDescription>
            <p className="text-4xl font-bold text-start">{`¥${productQuery.data?.price.toLocaleString() ?? "-"}`}</p>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={onClose}>
              やめる
            </Button>
            <Button
              variant="secondary"
              className="px-8"
              onClick={handleAddProduct}
              disabled={(productQuery.data?.quantity ?? 0) <= 0}
            >
              {(productQuery.data?.quantity ?? 0) <= 0
                ? "売り切れ"
                : "カートに追加する"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        {productQuery.data?.image && (
          <div className="relative aspect-[16/9] m-4">
            <Image
              fill
              src={productQuery.data?.image}
              alt="Product Image"
              className="object-cover rounded-md"
            />
          </div>
        )}
        <DrawerHeader>
          <DrawerTitle className="text-start">
            {productQuery.data?.name}
          </DrawerTitle>
          <DrawerDescription className="text-start">
            <p className="">{`在庫${productQuery.data?.quantity}`}</p>
            <p className="">{productQuery.data?.description}</p>
          </DrawerDescription>
          <p className="text-4xl font-bold text-start">{`¥${productQuery.data?.price.toLocaleString() ?? "-"}`}</p>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={onClose}>
              やめる
            </Button>
            <Button
              variant="secondary"
              className="px-8"
              onClick={handleAddProduct}
              disabled={(productQuery.data?.quantity ?? 0) <= 0}
            >
              {(productQuery.data?.quantity ?? 0) <= 0
                ? "売り切れ"
                : "カートに追加する"}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDetailModal;
