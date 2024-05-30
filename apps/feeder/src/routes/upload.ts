import {Hono} from "hono";
import {nanoid} from "nanoid";
import {R2, PutObjectCommand} from "@ouroboros/s3-client";

const upload = new Hono();
upload.post('/', async (c) => {
    const { file } = await c.req.parseBody();
    if (file instanceof File) {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const response = await R2.send(new PutObjectCommand({
            Bucket: `${process.env.R2_BUCKET_NAME}`,
            Body: buffer,
            Key: nanoid() + "-" + file.name,
            ContentType: file.type
        }))
        console.log(response)
    }
    return c.text('Uploaded!');
});

export default upload;