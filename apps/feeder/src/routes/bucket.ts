import { Hono } from "hono"
import {R2, ListBucketsCommand} from "@ouroboros/s3-client";

const buckets = new Hono()

buckets.get('/', async (c) => {
  const data = await R2.send(new ListBucketsCommand())
  console.log(data)
  return c.json({
    bucket: data.Buckets
  })
})

export default buckets;
