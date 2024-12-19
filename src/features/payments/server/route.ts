import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { payments } from "@/db/schema";
import { authMiddleware } from "@/lib/auth-middleware";
import { squareClient } from "@/lib/square";

const app = new Hono()
  .get(
    "/",
    authMiddleware,
    zValidator(
      "query",
      z.object({
        userId: z.string().optional(),
      })
    ),
    async (c) => {
      const { userId } = c.req.valid("query");

      const data = await db
        .select()
        .from(payments)
        .where(userId ? eq(payments.userId, userId) : undefined);

      return c.json({ data });
    }
  )
  .post(
    "/",
    authMiddleware,
    zValidator(
      "json",
      z.object({
        token: z.string(),
        productIds: z.string().array(),
      })
    ),
    async (c) => {
      try {
        const { user } = c.get("session");
        const { token, productIds } = c.req.valid("json");

        const { result: catalogResult } =
          await squareClient.catalogApi.listCatalog(undefined, "ITEM");

        const productCount = productIds.reduce<Record<string, number>>(
          (acc, productId) => {
            const id = catalogResult.objects?.find(
              (object) => object.id === productId
            )?.itemData?.variations?.[0].id;
            if (!id) return acc;
            acc[id] = (acc[id] || 0) + 1;
            return acc;
          },
          {}
        );

        const { result: orderResult } =
          await squareClient.ordersApi.createOrder({
            order: {
              locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
              lineItems: Object.entries(productCount).map(([id, count]) => ({
                catalogObjectId: id,
                quantity: String(count),
              })),
            },
          });

        if (orderResult.errors) {
          return c.json({ error: "Can not create order" }, 500);
        }

        const orderId = orderResult.order?.id;
        const amount = orderResult.order?.totalMoney?.amount;

        if (!amount) {
          return c.json({ error: "amount is undefined" }, 500);
        }

        const { result: paymentResult } =
          await squareClient.paymentsApi.createPayment({
            sourceId: token,
            idempotencyKey: crypto.randomUUID(),
            amountMoney: {
              amount: BigInt(amount),
              currency: "JPY",
            },
            orderId,
          });

        if (paymentResult.errors) {
          return c.json({ error: "Can not create payment" }, 500);
        }

        if (!paymentResult.payment?.id) {
          return c.json({ error: "paymentId is not found" }, 500);
        }

        const [data] = await db
          .insert(payments)
          .values({
            userId: user.id,
            squarePaymentId: paymentResult.payment.id,
            amount: String(paymentResult.payment.amountMoney?.amount),
          })
          .returning();

        return c.json({ data });
      } catch (error) {
        console.error("Error create payment data:", error);
        return c.json({ error: "Server internal error" }, 500);
      }
    }
  );

export default app;
