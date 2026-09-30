import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { cloudflareEmail } from "@emdash-cms/cloudflare/plugins";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto" }),
			storage: r2({ binding: "MEDIA" }),
			middleware: { outer: "./src/outer-middleware.ts" },
			// Sends through Cloudflare Email Sending (the EMAIL binding in wrangler.jsonc).
			// nv0j.com mail is still received by Proton, so replies to station@ land there.
			plugins: [
				cloudflareEmail({
					from: { email: "station@nv0j.com", name: "NV0J" },
				}),
			],
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "IBM Plex Sans",
			cssVariable: "--font-body",
			weights: [400, 500],
			fallbacks: ["system-ui", "sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "IBM Plex Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
		{
			provider: fontProviders.google(),
			name: "Chakra Petch",
			cssVariable: "--font-display",
			weights: [600, 700],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: false },
});
