import { fetchGraphQL } from '$lib/wordpress';

interface PostForRSS {
	title: string;
	slug: string;
	date: string;
	excerpt: string;
}

interface PostsRSSResponse {
	posts: {
		nodes: PostForRSS[];
	};
}

async function getPostsForRSS(): Promise<PostForRSS[]> {
	const query = `
		query GetPostsForRSS {
			posts(where: { categoryName: "blog" }, first: 50) {
				nodes {
					title
					slug
					date
					excerpt
				}
			}
		}
	`;

	const data = await fetchGraphQL<PostsRSSResponse>(query);
	return data.posts.nodes;
}

function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function stripHtml(html: string): string {
	return html.replace(/<[^>]*>/g, '').trim();
}

export async function GET() {
	const posts = await getPostsForRSS();
	const baseUrl = 'https://karawale.in';
	const buildDate = new Date().toUTCString();

	const items = posts
		.map((post) => {
			const pubDate = new Date(post.date).toUTCString();
			const description = stripHtml(post.excerpt);

			return `		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${baseUrl}/posts/${post.slug}</link>
			<guid isPermaLink="true">${baseUrl}/posts/${post.slug}</guid>
			<pubDate>${pubDate}</pubDate>
			<description>${escapeXml(description)}</description>
		</item>`;
		})
		.join('\n');

	const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<?xml-stylesheet type="text/xsl" href="/rss-style.xsl" ?>
<rss version="2.0"
	xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>retronav - Pranav Karawale</title>
		<link>${baseUrl}</link>
		<description>Blog posts by Pranav Karawale. Thoughts on technology, engineering, and design.</description>
		<language>en-us</language>
		<lastBuildDate>${buildDate}</lastBuildDate>
		<atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
		<image>
			<url>${baseUrl}/logo.png</url>
			<title>retronav - Pranav Karawale</title>
			<link>${baseUrl}</link>
		</image>
${items}
	</channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
