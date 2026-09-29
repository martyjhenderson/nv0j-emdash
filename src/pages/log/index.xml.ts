import type { APIRoute } from "astro";

// Hugo's section feed URL; see src/pages/index.xml.ts.
export const GET: APIRoute = ({ redirect }) => redirect("/rss.xml", 301);
