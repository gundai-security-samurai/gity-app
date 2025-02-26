"use server";

import { createMiddleware } from "hono/factory";
import type { Session, User } from "next-auth";

import { auth } from "./auth";

type AdditionalContext = Record<
  "Variables",
  {
    session: Session & { user: User & { id: string } };
  }
>;

export const authMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const session = await auth();

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    if (!session.user) {
      return c.json({ error: "User not found" }, 404);
    }

    c.set("session", session as Session & { user: User & { id: string } });

    await next();
  },
);
