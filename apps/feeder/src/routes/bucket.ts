import { ListBucketsCommand, R2 } from "@ouroboros/s3-client"
import { Hono } from "hono"

const buckets = new Hono()

buckets.get('/', async (c) => {
    const data = await R2.send(new ListBucketsCommand({ Bucket: 'test-bucket' }))
    console.log(data)
    return c.json({
      bucket: data.Buckets
    })
  })

export default buckets;