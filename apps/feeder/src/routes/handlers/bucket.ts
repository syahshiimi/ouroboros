import { Hono } from "hono"
import {R2, S3Service} from "@ouroboros/s3-client";

const buckets = new Hono()

buckets.get('/', async (c) => {
  const data = await R2.send(new S3Service.ListBucketsCommand())
  console.log(data)
  return c.json({
    bucket: data.Buckets
  })
})

export default buckets;
