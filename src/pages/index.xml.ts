import type { APIRoute } from "astro";

// Hugo's feed URLs. EmDash redirect rules skip paths with a file
// extension, so these are endpoints rather than seed redirects.
export const GET: APIRoute = ({ redirect }) => redirect("/rss.xml", 301);
