"use client";
import { Skeleton } from "@/components/ui/skeleton";
import useGetProducts from "../api/use-get-products";
import useOpenProduct from "../hooks/use-open-product";
import ProductItem from "./product-item";

const PurductList = () => {
  const productsQuery = useGetProducts();
  const { onOpen } = useOpenProduct();

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const distributed = productsQuery.data?.reduce<any[][]>(
    (acc, item, index) => {
      acc[index % 4].push(item);
      return acc;
    },
    [[], [], [], []],
  );

  if (productsQuery.isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {new Array(4).fill(0).map((_, w) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={w} className="grid gap-4">
            {new Array(3).fill(0).map((_, i) => (
              <Skeleton
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={i}
                className="w-full"
                style={{ height: Math.floor(Math.random() * 100) + 100 }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {distributed?.map((arr, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={index} className="flex flex-col gap-4 items-start">
          {arr.map((product) => (
            <button
              type="button"
              key={product.id}
              className="w-full"
              onClick={() => onOpen(product.id)}
            >
              <ProductItem data={product} />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PurductList;
