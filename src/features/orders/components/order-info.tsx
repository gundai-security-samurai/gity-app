"use client";
import { Button } from "@/components/ui/button";
import useOpenPayment from "@/features/payments/hooks/use-open-payment";
import useGetProducts from "@/features/products/api/use-get-products";
import useOrderCart from "../hooks/use-order-cart";

const OrderInfo = () => {
  const { productIds } = useOrderCart();
  const { onOpen } = useOpenPayment();

  const productsQuery = useGetProducts();

  const products = productsQuery.data?.filter((product) =>
    productIds.includes(product.id),
  );

  const quantity = products?.reduce((acc, product) => {
    const count = productIds.filter((id) => id === product.id).length;
    return acc + product.price * count;
  }, 0);

  return (
    <div className="bg-background rounded-md p-2 px-4 flex items-center justify-between">
      <div className="">
        <p>{`合計 ${productIds.length}点`}</p>
        <p className="text-primary text-2xl font-bold">{`¥${quantity?.toLocaleString() ?? 0}`}</p>
      </div>
      <Button variant="secondary" onClick={onOpen}>
        買う
      </Button>
    </div>
  );
};

export default OrderInfo;
