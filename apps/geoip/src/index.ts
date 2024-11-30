import { serve } from "@hono/node-server";
import geoip from "geoip-lite";
import { Hono } from "hono";
import { cors } from "hono/cors";

const envToken = process.env.AUTH_TOKEN;
const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.post("/api/geo", async (c) => {
	const body = await c.req.json();
	const token = c.req.header("Authorization");

	if (token !== envToken) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const ip = body.ip;
	console.log("🪵 | app.post | token:", token);
	console.log("🪵 | app.post | ip:", ip);

	if (!ip) {
		return c.json({ error: "Missing required field." }, 400);
	}

	const geo = geoip.lookup(ip);

	return c.json(geo);
});

const port = 3001;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
