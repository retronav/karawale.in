import { fetchGraphQL, type PagesListResponse, type WPPageListItem } from '$lib/wordpress';

interface PostSlug {
	slug: string;
	date: string;
}

interface PostSlugsResponse {
	posts: {
		nodes: PostSlug[];
	};
}

async function getPostSlugs(): Promise<PostSlug[]> {
	const query = `
		query GetPostSlugs {
			posts(where: { categoryName: "blog" }) {
				nodes {
					slug
					date
				}
			}
		}
	`;

	const data = await fetchGraphQL<PostSlugsResponse>(query);
	return data.posts.nodes;
}

async function getPages(): Promise<WPPageListItem[]> {
	const query = `
		query GetPages {
			pages {
				nodes {
					title
					slug
					date
				}
			}
		}
	`;

	const data = await fetchGraphQL<PagesListResponse>(query);
	return data.pages.nodes;
}

export const prerender = true;

export async function GET() {
	const [posts, pages] = await Promise.all([getPostSlugs(), getPages()]);

	const postUrls = posts
		.map(
			(post) => `	<url>
		<loc>https://karawale.in/posts/${post.slug}</loc>
		<lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.7</priority>
	</url>`
		)
		.join('\n');

	const pageUrls = pages
		.map(
			(page) => `	<url>
		<loc>https://karawale.in/${page.slug}</loc>
		<lastmod>${new Date(page.date).toISOString().split('T')[0]}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.6</priority>
	</url>`
		)
		.join('\n');

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
	<url>
		<loc>https://karawale.in/posts</loc>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
	</url>
${postUrls}
${pageUrls}
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
