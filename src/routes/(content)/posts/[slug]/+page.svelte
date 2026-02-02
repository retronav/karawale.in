<script lang="ts">
	import '@wordpress/block-library/build-style/common.css';
	import '@wordpress/block-library/build-style/style.css';
	import '@wordpress/block-library/build-style/theme.css';

	import { ArrowLeft } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	let { data } = $props();

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	const post = $derived(data.post);
</script>

<svelte:head>
	<title>retronav : {post.title}</title>
	<meta name="description" content={post.excerpt || post.title} />

	<!-- OpenGraph Tags -->
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt || post.title} />
	<meta
		property="og:image"
		content={post.featuredImage?.node?.sourceUrl || 'https://karawale.in/logo.png'}
	/>
	<meta property="og:url" content="https://karawale.in/posts/{post.slug}" />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={post.date} />
	{#if post.author?.node}
		<meta property="article:author" content={post.author.node.name} />
	{/if}

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.excerpt || post.title} />
	<meta
		name="twitter:image"
		content={post.featuredImage?.node?.sourceUrl || 'https://karawale.in/logo.png'}
	/>

	<!-- Canonical URL -->
	<link rel="canonical" href="https://karawale.in/posts/{post.slug}" />
</svelte:head>

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
