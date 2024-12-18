import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { recognitionLogs } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db.select().from(recognitionLogs);

    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator("query", z.object({ id: z.string().optional() })),
    async (c) => {
      const { id } = c.req.valid("query");

      if (!id) {
        return c.json({ error: "Id is not found" }, 404);
      }

      const [data] = await db
        .select()
        .from(recognitionLogs)
        .where(eq(recognitionLogs.id, id));

      return c.json({ data });
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        id: z.string(),
      })
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
    }
  );

export default app;
