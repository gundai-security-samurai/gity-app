"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import useGetRecentOrder from "../api/use-get-recent-order";

const RecentOrder = () => {
  const orderQuery = useGetRecentOrder();
  const order = orderQuery.data;
  return (
    <div className="bg-secondary rounded-xl p-4 min-h-24 flex gap-4 items-center justify-between">
      <div className="grid auto-cols-auto grid-cols-2 rounded-md overflow-hidden">
        {order?.products.slice(0, 3).map((product) => (
          <div
            key={product.id}
            className={cn(
              "w-12 relative aspect-square",
              order.products.length === 1 && "w-24 col-span-2",
            )}
          >
            <Image
              fill
              src={product.image!}
              alt="selectedImage"
              className="object-cover"
            />
          </div>
        ))}
        {(order?.products.length ?? 0) > 3 && (
          <div
            className={cn(
              "w-12 flex items-center justify-center bg-gray-300 aspect-square",
            )}
          >
            <MoreHorizontal className="text-white" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h5 className="text-white">最近買ったもの</h5>
        <ul>
          {order?.products.map((product) => (
            <li key={product.id} className="text-xs text-white">
              {product.name}
            </li>
          ))}
        </ul>
      </div>
      <Button variant="outline" className="text-secondary border-none">
        また買う
      </Button>
    </div>
  );
};

export default RecentOrder;
