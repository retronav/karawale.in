import { fetchGraphQL, type PagesListResponse, type WPPageListItem } from '$lib/wordpress';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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
	try {
		const pages = await getPages();
		return { pages };
	} catch (err) {
		// Re-throw if it's already a SvelteKit error
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		// Otherwise throw a 500 error
		throw error(500, 'Server error');
	}
};
