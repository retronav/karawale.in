import { fetchGraphQL, type PagesListResponse, type WPPageListItem } from "$lib/wordpress";
import type { PageServerLoad } from "./$types";

async function getPages(): Promise<WPPageListItem[]> {
    const query = `
        query GetPages {
            pages {
                nodes {
                    title
                    slug
                    metadata {
                        shortTitle
                    }
                }
            }
        }
    `;

    const data = await fetchGraphQL<PagesListResponse>(query);
    return data.pages.nodes;
}

export const load: PageServerLoad = async () => {
    const pages = await getPages();
    return { pages };
};
