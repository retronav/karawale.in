<script lang="ts">
	import '@wordpress/block-library/build-style/common.css';
	import '@wordpress/block-library/build-style/style.css';
	import '@wordpress/block-library/build-style/theme.css';

	import SvelteSeo from 'svelte-seo';
	import { ArrowLeft } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import type { WPSeo } from '$lib/wordpress';

	let { data } = $props();

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	const post = $derived(data.post);
	const seo = $derived(post.seo || ({} as Partial<WPSeo>));

	const title = $derived(
		seo.title && seo.title !== 'retronav' ? seo.title : `${post.title} - retronav`
	);

	const canonical = $derived(
		seo.canonical && seo.canonical !== 'https://karawale.in/'
			? seo.canonical
			: `https://karawale.in/posts/${post.slug}`
	);

	const openGraphImages = $derived(seo.ogImage ? [{ url: seo.ogImage, alt: post.title }] : []);
</script>

<SvelteSeo
	{title}
	description={seo.description}
	{canonical}
	openGraph={{
		title: seo.ogTitle || post.title,
		description: seo.ogDescription || seo.description,
		url: canonical,
		type: 'article',
		images: openGraphImages
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		image: seo.ogImage ? [seo.ogImage] : [],
		datePublished: post.date,
		dateModified: post.modified,
		author: {
			'@type': 'Person',
			name: post.author?.node?.name || 'Pranav Karawale'
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': canonical
		}
	}}
/>

<article class="post wp-content">
	<header>
		<h1 class="title">{post.title}</h1>
		<div class="meta">
			{#if post.author?.node}
				<span class="author">By {post.author.node.name}</span>
			{/if}
			<time datetime={post.date}>
				{formatDate(post.date)}
			</time>
			{#if post.readingTime}
				<span>{post.readingTime} min read</span>
			{/if}
		</div>
	</header>

	{#if post.featuredImage?.node?.sourceUrl}
		<figure class="feature-image">
			<img src={post.featuredImage.node.sourceUrl} alt={post.title} />
			{#if post.featuredImage.node.caption}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<figcaption>{@html post.featuredImage.node.caption}</figcaption>
			{/if}
		</figure>
	{/if}

	<section class="content">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html post.content}
	</section>
</article>

<nav class="back-link">
	<a href={resolve('/posts')}>
		<button>
			<ArrowLeft size={16} />
			Back to posts
		</button>
	</a>
</nav>

<style lang="scss">
	@use '$lib/styles/variables' as *;
	@use 'sass:color';

	.back-link {
		max-width: 600px;
		margin-top: 2rem;

		a {
			text-decoration: none;
		}

		button {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
		}
	}

	.post {
		width: 600px;
		margin: 0 auto;

		header {
			text-align: center;
			margin-bottom: 2rem;
		}

		.title {
			color: $golden;
			margin: 0 0 1rem;
		}

		.meta {
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			font-size: var(--step--1);
			color: $golden;
		}
	}

	.feature-image {
		margin: 0 0 2rem;

		img {
			width: 100%;
			border: 1px solid color.adjust($golden, $alpha: -0.6);
			border-radius: 4px;
		}

		figcaption {
			text-align: center;
			font-size: var(--step--1);
			color: color.adjust($foreground, $alpha: -0.4);
			margin-top: 0.5rem;
			font-style: italic;
		}
	}

	@media (max-width: 600px) {
		.post {
			width: calc(100% - 2rem);
			margin: 0;
		}
	}
</style>
