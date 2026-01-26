const WP_API_URL = import.meta.env.VITE_WP_API_URL;

// Types for WordPress GraphQL responses
export interface WPFeaturedImage {
    node: {
        sourceUrl: string;
        altText?: string;
        caption?: string;
    } | null;
}

export interface WPAuthor {
    node: {
        name: string;
    };
}

export interface WPCategory {
    name: string;
}

export interface WPPostListItem {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    readingTime: number;
    featuredImage: WPFeaturedImage | null;
    categories: {
        nodes: WPCategory[];
    };
}

export interface WPPost {
    title: string;
    slug: string;
    date: string;
    content: string;
    excerpt?: string;
    readingTime?: number;
    featuredImage: WPFeaturedImage | null;
    author: WPAuthor | null;
}

export interface BlogPostsResponse {
    posts: {
        nodes: WPPostListItem[];
    };
}

export interface SinglePostResponse {
    post: WPPost | null;
}

export async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const response = await fetch(WP_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    }

    return json.data as T;
}
