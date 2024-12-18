import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";

import faceRecognitions from "@/features/face-recognitions/server/route";
import payments from "@/features/payments/server/route";
import products from "@/features/products/server/route";
import users from "@/features/users/server/route";

export const maxDuration = 59;

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  console.log(err);
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "Internal error" }, 500);
});

const routes = app
  .route("/products", products)
  .route("/payments", payments)
  .route("/users", users)
  .route("/face-recognitions", faceRecognitions);

export const GET = handle(app);
export const PUT = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
