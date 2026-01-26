<script lang="ts">
	import "@wordpress/block-library/build-style/common.css";
	import "@wordpress/block-library/build-style/style.css";
	import "@wordpress/block-library/build-style/theme.css";

	import { ArrowLeft } from "@lucide/svelte";
	let { data } = $props();

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
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
		content={post.featuredImage?.node?.sourceUrl ||
			"https://karawale.in/logo.png"}
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
		content={post.featuredImage?.node?.sourceUrl ||
			"https://karawale.in/logo.png"}
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
				<figcaption>{@html post.featuredImage.node.caption}</figcaption>
			{/if}
		</figure>
	{/if}

	<section class="content">
		{@html post.content}
	</section>
</article>

<nav class="back-link">
	<a href="/posts">
		<button>
			<ArrowLeft size={16} />
			Back to posts
		</button>
	</a>
</nav>

<style lang="scss">
	@use "$lib/styles/variables" as *;
	@use "sass:color";

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

	:global(.content) {
		line-height: 1.5;

		:global(h2),
		:global(h3),
		:global(h4) {
			color: $golden;
			line-height: 1;
		}

		:global(a) {
			color: $links;
		}

		:global(code) {
			font-family: $font-family-mono;
			background: color.adjust($background, $lightness: 10%);
			padding: 0.1em 0.3em;
			border-radius: 3px;
			width: 100%;
			font-size: var(--step--1);
		}

		:global(pre) {
			font-size: var(--step--1);
			background: color.adjust($background, $lightness: 5%);
			padding: 1rem;
			border-radius: 4px;
			overflow-x: auto;
			white-space: pre-wrap;
			word-break: break-all;
			border: 1px solid color.adjust($foreground, $alpha: -0.8);

			:global(code) {
				background: none;
				padding: 0;
			}
		}

		:global(blockquote) {
			border-left: 3px solid $golden;
			margin-left: 0;
			padding-left: 1rem;
			color: color.adjust($foreground, $alpha: -0.2);
			font-style: italic;
		}

		:global(img) {
			border-radius: 4px;
		}
	}

	@media (max-width: 600px) {
		.post {
			width: calc(100% - 2rem);
			margin: 0;
		}
	}
</style>
