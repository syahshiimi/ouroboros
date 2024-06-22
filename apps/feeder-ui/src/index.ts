import { Hono } from "hono";
import buckets from "./routes/handlers/bucket";

const app = new Hono();

app.route("/buckets", buckets);

export default {
  port: 4000,
  fetch: app.fetch,
};
