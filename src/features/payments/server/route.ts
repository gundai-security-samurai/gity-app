import { squareClient } from "@/lib/square";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      token: z.string(),
      productIds: z.string().array(),
    })
  ),
  async (c) => {
    const { token, productIds } = c.req.valid("json");

    const { result: orderResult } = await squareClient.ordersApi.createOrder({
      order: {
        locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
        lineItems: [
          {
            catalogObjectId: productId,
            quantity: String(quantity),
          },
        ],
      },
    });

    if (orderResult.errors) {
      return c.json({ error: "Can not create order" }, 500);
    }

    const orderId = orderResult.order?.id;

    const { result: paymentResult } =
      await squareClient.paymentsApi.createPayment({
        sourceId: token,
        idempotencyKey: crypto.randomUUID(),
        amountMoney: {
          amount: itemVariation.priceMoney.amount * quantity,
          currency: "JPY",
        },
        orderId,
      });

    return c.json({});
  }
);

export default app;
