<script lang="ts">
	import '$lib/styles/index.scss';
	import { MediaQuery } from 'svelte/reactivity';
	import favicon from '$lib/assets/favicon.png';
	import { dev } from '$app/environment';

	let { children } = $props();

	$effect(() => {
		const mobile = new MediaQuery('max-width: 600px');

		if (mobile) {
			document.body.classList.add('mobile-device');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/png" />
	<link
		rel="preload"
		href="/fonts/eb-garamond-latin-wght-normal.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/victor-mono-latin-wght-normal.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/eb-garamond-latin-wght-italic.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="alternate"
		type="application/rss+xml"
		title="retronav's blog"
		href="https://karawale.com/rss.xml"
	/>
	<meta name="theme-color" content="#150b14" />
	{#if !dev}
		<script
			defer
			src="https://umami.karawale.com/script.js"
			data-website-id="42cc931d-c958-4319-9c8b-d1fceed25d88"
			crossorigin="anonymous"
		></script>
	{/if}
</svelte:head>

<main>
	{@render children()}
	<footer>
		<p>
			&copy; {new Date().getFullYear()} Pranav Karawale.
		</p>
	</footer>
</main>

<style lang="scss">
	main {
		width: 100%;
		min-height: 100%;
	}

	footer {
		text-align: center;
		padding: 2rem 1rem;
		color: var(--golden);
		font-size: var(--step--2);
	}
</style>
