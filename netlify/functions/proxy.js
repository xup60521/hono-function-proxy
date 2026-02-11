// netlify/functions/proxy.js

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "GET") {
      return {
        statusCode: 200,
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          message: "hi! POST JSON body { url: string, fetchOptions?: object }",
        }),
      };
    }

    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "Missing request body" }),
      };
    }

    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body;

    const { url, fetchOptions } = JSON.parse(rawBody);

    if (typeof url !== "string" || !url) {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "`url` must be a non-empty string" }),
      };
    }

    const res = await fetch(url, fetchOptions || {});
    const text = await res.text();

    // Mimic your original behavior: return response text
    return {
      statusCode: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        error: "Internal Server Error",
        details: err && err.message ? err.message : String(err),
      }),
    };
  }
};