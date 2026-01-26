import { fetchGraphQL, type BlogPostsResponse, type WPPostListItem } from '$lib/wordpress';
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
    const posts = await getBlogPosts();

    return {
        posts
    };
};
