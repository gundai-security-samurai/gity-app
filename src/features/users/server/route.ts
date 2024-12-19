import { v2 as cloudinary } from "cloudinary";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { insertUserSchema, users } from "@/db/schema";
import { authMiddleware } from "@/lib/auth-middleware";
import { zValidator } from "@hono/zod-validator";
import { createCloudImage, deleteCloudImage } from "./actions";
import me from "./route/me";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = new Hono()
  .route("/me", me)
  .get("/", authMiddleware, async (c) => {
    const data = await db.select().from(users);

    return c.json({ data });
  })
  .get(
    "/:id",
    authMiddleware,
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Id is not found" }, 404);
      }

      const [data] = await db.select().from(users).where(eq(users.id, id));

      return c.json({ data });
    },
  )
  .patch(
    "/:id",
    authMiddleware,
    zValidator("param", z.object({ id: z.string().optional() })),
    zValidator("json", insertUserSchema.omit({ id: true })),
    async (c) => {
      const session = c.get("session");
      const { id } = c.req.valid("param");
      const { image, faceImage, ...updateData } = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Id is not found" }, 404);
      }

      if (id !== session.user?.id) {
        return c.json({ error: "Unauthorized access" }, 403);
      }

      const [user] = await db.select().from(users).where(eq(users.id, id));

      let imageURL: string | undefined;
      if (image) {
        if (user.image) {
          await deleteCloudImage(user.image);
        }
        imageURL = await createCloudImage(image);
      }

      let faceImageURL: string | undefined;
      if (faceImage) {
        if (user.faceImage) {
          await deleteCloudImage(user.faceImage);
        }
        faceImageURL = await createCloudImage(faceImage);
      }

      const [data] = await db
        .update(users)
        .set({
          ...updateData,
          ...(imageURL && { image: imageURL }),
          ...(faceImageURL && { faceImage: faceImageURL }),
        })
        .where(eq(users.id, id))
        .returning();

      return c.json({ data });
    },
  );

export default app;
