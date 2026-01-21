export const prerender = true;

export async function GET() {
	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
	xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xhtml="http://www.w3.org/1999/xhtml"
	xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
	xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
	xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
	xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
	<url>
		<loc>https://karawale.in/</loc>
		<changefreq>monthly</changefreq>
		<priority>1.0</priority>
	</url>
	<url>
		<loc>https://karawale.in/about</loc>
		<changefreq>monthly</changefreq>
		<priority>0.8</priority>
	</url>
	<url>
		<loc>https://karawale.in/projects</loc>
		<changefreq>monthly</changefreq>
		<priority>0.8</priority>
	</url>
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
