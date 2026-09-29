/**
 * Log entries keep the Hugo permalinks: /YYYY/MM/DD/slug/ built from the
 * UTC publish date. Must agree with the posts collection's urlPattern
 * ("/{year}/{month}/{day}/{slug}") in seed/seed.json.
 */
export function entryPath(slug: string, publishedAt?: Date | null): string {
	if (!publishedAt) return `/log/${slug}/`;
	const y = publishedAt.getUTCFullYear();
	const m = String(publishedAt.getUTCMonth() + 1).padStart(2, "0");
	const d = String(publishedAt.getUTCDate()).padStart(2, "0");
	return `/${y}/${m}/${d}/${slug}/`;
}

const pad = (n: number) => String(n).padStart(2, "0");
const MONTHS = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December",
];

/** "Aug 15, 2026" -- Hugo's "Jan 02, 2006" */
export function shortDate(date: Date): string {
	return `${MONTHS[date.getUTCMonth()]!.slice(0, 3)} ${pad(date.getUTCDate())}, ${date.getUTCFullYear()}`;
}

/** "August 15, 2026" -- Hugo's "January 02, 2006" */
export function longDate(date: Date): string {
	return `${MONTHS[date.getUTCMonth()]} ${pad(date.getUTCDate())}, ${date.getUTCFullYear()}`;
}

/** "2026-08-15" for <time datetime> */
export function isoDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}
