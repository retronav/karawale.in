import { fetchGraphQL, type SinglePostResponse, type WPPost } from "$lib/wordpress";
import { error } from "@sveltejs/kit";
import { rehype } from "rehype";
import rehypeShiki from "@shikijs/rehype";
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import type { PageServerLoad } from "./$types";

async function getPost(slug: string): Promise<WPPost | null> {
    const query = `
        query GetSinglePost($slug: ID!) {
            post(id: $slug, idType: SLUG) {
                title
                slug
                date
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
            }
        }
    `;

    const data = await fetchGraphQL<SinglePostResponse>(query, { slug });
    return data.post;
}

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPost(params.slug);

	if (!post) {
		throw error(404, "Post not found");
	}

	const pipeline = rehype().use(rehypeShiki, {
		theme: "synthwave-84",
        transformers: [transformerColorizedBrackets()]
	});

	if (post.content) {
		post.content = String(await pipeline.process(post.content));
	}

	return { post };
};
