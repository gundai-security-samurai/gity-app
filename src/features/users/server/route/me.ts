import { db } from "@/db/drizzle";
import { payments, users } from "@/db/schema";
import { authMiddleware } from "@/lib/auth-middleware";
import { squareClient } from "@/lib/square";
import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono()
  .get("/", authMiddleware, async (c) => {
    try {
      const { user } = c.get("session");

      const [data] = await db.select().from(users).where(eq(users.id, user.id));
      return c.json({ data });
    } catch (error) {
      console.error("Error fetching user data:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  })
  .get("/orders/latest", authMiddleware, async (c) => {
    try {
      const { user } = c.get("session");

      const [payment] = await db
        .select()
        .from(payments)
        .where(eq(payments.userId, user.id))
        .orderBy(desc(payments.createdAt));

      if (!payment) {
        return c.json({ error: "payment is not found" }, 404);
      }

      const { result: paymentResult } =
        await squareClient.paymentsApi.getPayment(payment.squarePaymentId);

      if (paymentResult.errors || !paymentResult.payment) {
        return c.json({ error: "square payment is not found" }, 404);
      }

      const { result: orderResult } =
        await squareClient.ordersApi.retrieveOrder(
          paymentResult.payment.orderId!,
        );

      if (orderResult.errors || !orderResult.order) {
        return c.json({ error: "square order is not found" }, 404);
      }

      const _products = await Promise.all(
        (orderResult.order.lineItems ?? []).map(async (item) => {
          const { result: catalogResult } =
            await squareClient.catalogApi.retrieveCatalogObject(
              item.catalogObjectId!,
              true,
            );
          const { result } =
            await squareClient.catalogApi.retrieveCatalogObject(
              catalogResult.object?.itemVariationData?.itemId!,
              true,
            );
          return result;
        }),
      );

      const products = _products.map((item) => ({
        id: item.object?.id!,
        name: item.object?.itemData?.name!,
        description: item.object?.itemData?.description,
        price: Number(
          item.object?.itemData?.variations?.[0].itemVariationData?.priceMoney
            ?.amount,
        )!,
        image: item.relatedObjects?.find((object) => object.type === "IMAGE")
          ?.imageData?.url,
      }));

      const data = {
        orderId: orderResult.order.id!,
        amount: orderResult.order.totalMoney?.amount,
        products,
      };

      return c.json({ data });
    } catch (error) {
      console.error("Error fetching user order data:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  });

export default app;
