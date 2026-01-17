import { Hono } from "hono";

const app = new Hono();

app.post("/", async (c) => {
    const { url, fetchOptions } = await c.req.json() as { url: string; fetchOptions: {} };
    const response = await fetch(url, fetchOptions);
    const contentType = response.headers.get("content-type");
    
    if (contentType?.includes("application/json")) {
        return c.json(await response.json());
    }
    
    return c.body(await response.text());
});

export default app;
