import { defineMiddleware } from "astro:middleware";

// Registered via emdash({ middleware: { outer } }) so it runs before EmDash
// initializes: www requests are redirected without touching the database.
export const onRequest = defineMiddleware(({ url }, next) => {
	if (url.hostname === "www.nv0j.com") {
		return new Response(null, {
			status: 301,
			headers: { Location: `https://nv0j.com${url.pathname}${url.search}` },
		});
	}
	return next();
});
