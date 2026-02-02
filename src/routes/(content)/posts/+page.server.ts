import { fetchGraphQL, type BlogPostsResponse, type WPPostListItem } from '$lib/wordpress';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

async function getBlogPosts(): Promise<WPPostListItem[]> {
	const query = `
        query GetBlogPosts {
            posts(where: { categoryName: "blog" }) {
                nodes {
                    title
                    slug
                    date
                    excerpt
                    readingTime
                    featuredImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    categories {
                        nodes {
                            name
                        }
                    }
                }
            }
        }
    `;

	const data = await fetchGraphQL<BlogPostsResponse>(query);
	return data.posts.nodes;
}

export const load: PageServerLoad = async () => {
	try {
		const posts = await getBlogPosts();

		return {
			posts
		};
	} catch (err) {
		// Re-throw if it's already a SvelteKit error
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		// Otherwise throw a 500 error
		throw error(500, 'Server error');
	}
};
