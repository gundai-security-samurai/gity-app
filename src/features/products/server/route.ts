import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";

import { authMiddleware } from "@/lib/auth-middleware";
import { squareClient } from "@/lib/square";

const app = new Hono()
  .get("/", authMiddleware, async (c) => {
    const { result } = await squareClient.catalogApi.listCatalog(
      undefined,
      "ITEM"
    );

    const _data = await Promise.all(
      (result.objects ?? []).map(async (item) => {
        const { result } = await squareClient.catalogApi.retrieveCatalogObject(
          item.id,
          true
        );
        return result;
      })
    );

    const data = _data.map((item) => ({
      id: item.object?.id!,
      name: item.object?.itemData?.name!,
      description: item.object?.itemData?.description,
      price: Number(
        item.object?.itemData?.variations?.[0].itemVariationData?.priceMoney
          ?.amount
      )!,
      image: item.relatedObjects?.find((object) => object.type === "IMAGE")
        ?.imageData?.url,
    }));

    return c.json({ data });
  })
  .get(
    "/:id",
    authMiddleware,
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 404);
      }

      const { result } = await squareClient.catalogApi.retrieveCatalogObject(
        id,
        true
      );

      const {
        result: { counts },
      } = await squareClient.inventoryApi.retrieveInventoryCount(
        result.object?.itemData?.variations?.[0].id!
      );

      const data = {
        id: result.object?.id!,
        name: result.object?.itemData?.name!,
        description: result.object?.itemData?.description,
        price: Number(
          result.object?.itemData?.variations?.[0].itemVariationData?.priceMoney
            ?.amount
        )!,
        image: result.relatedObjects?.find((object) => object.type === "IMAGE")
          ?.imageData?.url,
        quantity: Number(counts?.[0].quantity ?? 0),
      };

      return c.json({ data });
    }
  );

export default app;
