import { fetchGraphQL, type SinglePostResponse, type WPPost } from '$lib/wordpress';
import { processContent } from '$lib/rehype';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

async function getPost(slug: string): Promise<WPPost | null> {
	const query = `
        query GetSinglePost($slug: ID!) {
            post(id: $slug, idType: SLUG) {
                title
                slug
                date
                modified
                content(format: RENDERED)
                excerpt
                readingTime
                featuredImage {
                    node {
                        sourceUrl
                        caption
                    }
                }
                author {
                    node {
                        name
                    }
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
    `;

	const data = await fetchGraphQL<SinglePostResponse>(query, { slug });
	return data.post;
}

export const load: PageServerLoad = async ({ params }) => {
	try {
		const post = await getPost(params.slug);

		if (!post) {
			throw error(404, 'Post not found');
		}

		if (post.content) {
			post.content = await processContent(post.content);
		}

		return { post };
	} catch (err) {
		// Re-throw if it's already a SvelteKit error
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		// Otherwise throw a 500 error
		throw error(500, 'Server error');
	}
};
