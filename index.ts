import { Hono } from "hono";

const app = new Hono();

app.post("/", async (c) => {
    const { url, fetchOptions } = await c.req.json() as { url: string; fetchOptions: {} };
    const response = await fetch(url, fetchOptions);
    return c.body(await response.text())
});

app.get("/", async (c) => c.json({"message": "hi! post with body {url:string} to get the result back"}))

export default app;
