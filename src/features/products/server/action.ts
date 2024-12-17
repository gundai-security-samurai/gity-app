"use server";

import { squareClient } from "@/lib/square";

export const getMerchandises = async () => {
  const { result } = await squareClient.catalogApi.listCatalog(
    undefined,
    "ITEM",
  );
  console.dir(result, { depth: null });
  const products = result.objects?.map((item) => ({
    id: item.id,
    name: item.itemData?.name,
    description: item.itemData?.description,
    price: item.itemData?.variations?.[0].itemVariationData?.priceMoney?.amount,
  }));

  return products;
};
