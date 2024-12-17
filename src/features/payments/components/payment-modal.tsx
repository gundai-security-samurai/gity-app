"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useOrderCart from "@/features/orders/hooks/use-order-cart";
import useGetProducts from "@/features/products/api/use-get-products";
import useOpenPayment from "../hooks/use-open-payment";
import PaymentForm from "./payment-form";

const PaymentModal = () => {
  const { isOpen, onClose } = useOpenPayment();
  const { productIds, removeProduct } = useOrderCart();

  const productsQuery = useGetProducts();

  const products = productsQuery.data?.filter((product) =>
    productIds.includes(product.id),
  );

  const quantity = products?.reduce((acc, product) => {
    const count = productIds.filter((id) => id === product.id).length;
    return acc + product.price * count;
  }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>購入</DialogTitle>
          <DialogDescription>決済画面</DialogDescription>
        </DialogHeader>

        <PaymentForm />
        <div className="flex flex-col gap-2">
          {products?.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-3 items-center gap-2"
            >
              <p>{product.name}</p>
              <p className="text-end">
                {`${productIds.filter((id) => id === product.id).length}点`}
              </p>
              <Button
                size="sm"
                variant="destructive"
                className="w-fit justify-self-end"
                onClick={() => removeProduct(product.id)}
              >
                削除
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <p className="text-3xl text-end">{`合計 ${quantity?.toLocaleString()}円`}</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
