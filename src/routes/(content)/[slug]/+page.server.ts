import { fetchGraphQL, type WPPage, type WPPageByUriResponse } from "$lib/wordpress";
import { processContent } from "$lib/rehype";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

async function getPage(slug: string): Promise<WPPage | null> {
    const query = `
        query GetPageByUri($uri: String!) {
            nodeByUri(uri: $uri) {
                ... on Page {
                    title
                    slug
                    content(format: RENDERED)
                    metadata {
                        shortTitle
                        excerpt
                    }
                }
            }
        }
    `;

    const data = await fetchGraphQL<WPPageByUriResponse>(query, { uri: `/${slug}` });
    return data.nodeByUri;
}

export const load: PageServerLoad = async ({ params }) => {
	const page = await getPage(params.slug);

	if (!page) {
		throw error(404, "Page not found");
	}

	if (page.content) {
		page.content = await processContent(page.content);
	}

	return { page };
};
