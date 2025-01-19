import { and, between, eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { payments, recognitionLogs } from "@/db/schema";
import { users } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db
      .select()
      .from(recognitionLogs)
      .innerJoin(users, eq(users.id, recognitionLogs.userId))
      .leftJoin(
        payments,
        and(
          eq(payments.userId, users.id),
          between(
            payments.createdAt,
            sql`${recognitionLogs.timestamp} - INTERVAL '10 minutes'`,
            sql`${recognitionLogs.timestamp} + INTERVAL '10 minutes'`,
          ),
        ),
      );

    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Id is not found" }, 404);
      }

      const [data] = await db
        .select()
        .from(recognitionLogs)
        .innerJoin(users, eq(users.id, recognitionLogs.userId))
        .leftJoin(
          payments,
          and(
            eq(payments.userId, users.id),
            between(
              payments.createdAt,
              sql`${recognitionLogs.timestamp} - INTERVAL '10 minutes'`,
              sql`${recognitionLogs.timestamp} + INTERVAL '10 minutes'`,
            ),
          ),
        )
        .where(eq(recognitionLogs.id, id));

      return c.json({ data });
    },
  )
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        id: z.string(),
        detected_at: z.coerce.date().optional(),
      }),
    ),
    async (c) => {
      const { id } = c.req.valid("json");

      // const [user] = await db.select().from(users).where(eq(users.id, id));

      const [data] = await db
        .insert(recognitionLogs)
        .values({
          userId: id,
          timestamp: new Date(),
        })
        .returning();

      return c.json({ data });
    },
  );

export default app;
