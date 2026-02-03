import { fetchGraphQL, type WPPage, type WPPageByUriResponse } from '$lib/wordpress';
import { processContent } from '$lib/rehype';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

async function getPage(slug: string): Promise<WPPage | null> {
	const query = `
        query GetPageByUri($uri: String!) {
            nodeByUri(uri: $uri) {
                ... on Page {
                    title
                    slug
                    date
                    modified
                    author {
                        node {
                            name
                        }
                    }
                    content(format: RENDERED)
                    metadata {
                        shortTitle
                        excerpt
                    }
                    seo {
                        title
                        description
                        canonical
                        ogTitle
                        ogDescription
                        ogImage
                    }
                }
            }
        }
    `;

	const data = await fetchGraphQL<WPPageByUriResponse>(query, {
		uri: `/${slug}`
	});
	return data.nodeByUri;
}

export const load: PageServerLoad = async ({ params }) => {
	try {
		const page = await getPage(params.slug);

		if (!page) {
			throw error(404, 'Page not found');
		}

		if (page.content) {
			page.content = await processContent(page.content);
		}

		return { page };
	} catch (err) {
		// Re-throw if it's already a SvelteKit error
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		// Otherwise throw a 500 error
		throw error(500, 'Server error');
	}
};
