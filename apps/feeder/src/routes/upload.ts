import {ListBucketsCommand, R2} from "@ouroboros/s3-client";
import {Hono} from "hono";

const upload = new Hono();
upload.post('/', async (c) => {
    const { file } = await c.req.parseBody();
    if (file instanceof File) {
        const response = await R2.send(new ListBucketsCommand({}));
        console.log(response);
    }
    return c.text('Uploaded!');
});

export default upload;