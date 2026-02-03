<script lang="ts">
	import '@wordpress/block-library/build-style/common.css';
	import '@wordpress/block-library/build-style/style.css';
	import '@wordpress/block-library/build-style/theme.css';
	import SvelteSeo from 'svelte-seo';
	import type { WPSeo } from '$lib/wordpress';

	let { data } = $props();

	const page = $derived(data.page);
	const seo = $derived(page.seo || ({} as Partial<WPSeo>));

	const title = $derived(
		seo.title && seo.title !== 'retronav' ? seo.title : `${page.title} - retronav`
	);

	const canonical = $derived(
		seo.canonical && seo.canonical !== 'https://karawale.in/'
			? seo.canonical
			: `https://karawale.in/${page.slug}`
	);

	const openGraphImages = $derived(seo.ogImage ? [{ url: seo.ogImage, alt: page.title }] : []);
</script>

<SvelteSeo
	{title}
	description={seo.description}
	{canonical}
	openGraph={{
		title: seo.ogTitle || page.title,
		description: seo.ogDescription || seo.description,
		url: canonical,
		type: 'website',
		images: openGraphImages
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		headline: page.title,
		image: seo.ogImage ? [seo.ogImage] : [],
		datePublished: page.date,
		dateModified: page.modified,
		author: {
			'@type': 'Person',
			name: page.author?.node?.name || 'Pranav Karawale'
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': canonical
		}
	}}
/>

<article class="page wp-content">
	<header>
		<h1 class="title">{page.title}</h1>
		<address class="byline">
			<small>BY</small><br />
			<span>Pranav Karawale</span>
		</address>
	</header>

	<section class="content">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html page.content}
	</section>
</article>

<style lang="scss">
	@use '$lib/styles/variables' as *;
	@use 'sass:color';

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
