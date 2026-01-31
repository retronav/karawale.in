<script lang="ts">
	import "@wordpress/block-library/build-style/common.css";
	import "@wordpress/block-library/build-style/style.css";
	import "@wordpress/block-library/build-style/theme.css";

	let { data } = $props();

	const page = $derived(data.page);
</script>

<svelte:head>
	<title>retronav : {(page.metadata?.shortTitle ?? page.title).toLowerCase()}</title>
	<meta name="description" content={page.metadata?.excerpt} />

	<!-- OpenGraph Tags -->
	<meta property="og:title" content={page.title} />
	<meta property="og:description" content={page.metadata?.excerpt} />
	<meta property="og:image" content="https://karawale.in/logo.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={page.title} />
	<meta name="twitter:description" content={page.metadata?.excerpt} />
	<meta name="twitter:image" content="https://karawale.in/logo.png" />
</svelte:head>

<article class="page wp-content">
	<header>
		<h1 class="title">{page.title}</h1>
		<address class="byline">
			<small>BY</small><br />
			<span>Pranav Karawale</span>
		</address>
	</header>

	<section class="content">
		{@html page.content}
	</section>
</article>

<style lang="scss">
	@use "$lib/styles/variables" as *;
	@use "sass:color";

	.page {
		width: 600px;
		margin: 0 auto;

		header {
			text-align: center;
			margin-bottom: 2rem;
		}

		.title {
		color: $golden;
		margin: 0;
	}

	.byline {
		margin-bottom: 1rem;
		color: $golden;
	}
	}

	@media (max-width: 600px) {
		.page {
			width: calc(100% - 2rem);
			margin: 0;
		}
	}
</style>
