<script lang="ts">
	let { data } = $props();

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}
</script>

<svelte:head>
	<title>retronav : posts</title>
	<meta
		name="description"
		content="Blog posts by Pranav Karawale. Thoughts on technology, engineering, and design."
	/>

	<!-- OpenGraph Tags -->
	<meta property="og:title" content="Posts | retronav" />
	<meta
		property="og:description"
		content="Blog posts by Pranav Karawale. Thoughts on technology, engineering, and design."
	/>
	<meta property="og:image" content="https://karawale.in/logo.png" />
	<meta property="og:url" content="https://karawale.in/posts" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Posts | retronav" />
	<meta
		name="twitter:description"
		content="Blog posts by Pranav Karawale. Thoughts on technology, engineering, and design."
	/>
	<meta name="twitter:image" content="https://karawale.in/logo.png" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://karawale.in/posts" />
</svelte:head>

<header>
	<h1 class="title">Some <i>thoughts</i> and <i>ramblings</i></h1>
	<address class="byline">
		<small>BY</small><br />
		<span>Pranav Karawale</span>
	</address>
</header>

<section class="content">
	{#if data.posts.length === 0}
		<p class="empty">No posts yet. Check back soon!</p>
	{:else}
		<ul class="posts-list">
			{#each data.posts as post}
				<li class="post-card">
					<a href="/posts/{post.slug}">
						{#if post.featuredImage?.node?.sourceUrl}
							<img
								class="feature-image"
								src={post.featuredImage.node.sourceUrl}
								alt={post.featuredImage.node.altText || post.title}
								loading="lazy"
							/>
						{/if}
						<div class="post-info">
							<h2>{post.title}</h2>
							<p class="excerpt">{@html post.excerpt}</p>
							<div class="meta">
								<time datetime={post.date}>
									{formatDate(post.date)}
								</time>
								{#if post.readingTime}
									<span>&sdot; {post.readingTime} min read</span>
								{/if}
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style lang="scss">
	@use "$lib/styles/variables" as *;
	@use "sass:color";

	header {
		text-align: center;
	}

	.title {
		color: $golden;
		margin: 0;
	}

	.byline {
		margin-bottom: 1rem;
		color: $golden;
	}

	.content {
		max-width: 800px;
		margin: 1rem auto;
	}

	.empty {
		text-align: center;
		color: color.adjust($foreground, $alpha: -0.4);
	}

	.posts-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.post-card {
		background: color.adjust($background, $alpha: -0.5);
		border: 1px solid color.adjust($golden, $alpha: -0.6);
		border-radius: 4px;
		overflow: hidden;
		transition: all 0.3s ease;

		&:hover {
			border-color: $golden;
			box-shadow: 0 0 20px color.adjust($golden, $alpha: -0.7);
		}

		a {
			text-decoration: none;
			color: inherit;
			display: block;
		}

		.feature-image {
			width: 100%;
			height: 200px;
			object-fit: cover;
			border-bottom: 1px solid color.adjust($golden, $alpha: -0.6);
		}

		.post-info {
			padding: 1rem;

			h2 {
				margin: 0 0 0.5rem;
				color: $golden;
				font-size: var(--step-1);
			}

			.excerpt {
				margin: 0 0 1rem;
				color: color.adjust($foreground, $alpha: -0.2);
				display: -webkit-box;
				overflow: hidden;

				// Wordpress adds another p tag inside excerpt
				:global(p) {
					margin: 0;
				}
			}

			.meta {
				display: flex;
				gap: 1rem;
				font-size: var(--step--1);
				color: color.adjust($golden, $alpha: -0.2);
				font-family: $font-family-mono;

				time {
					text-transform: uppercase;
				}
			}
		}
	}

	@media (max-width: 600px) {
		.post-card .feature-image {
			height: 150px;
		}
	}
</style>
