<script lang="ts">
	import favicon from "$lib/assets/favicon.png";
	import "$lib/styles/index.scss";
	import { MediaQuery } from "svelte/reactivity";

	let { children } = $props();

	$effect(() => {
		const mobile = new MediaQuery("max-width: 600px");

		if (mobile) {
			document.body.classList.add("mobile-device");
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
	<meta name="theme-color" content="#150b14" />
	<meta
		name="description"
		content="Pranav Karawale's personal home on the web."
	/>

	<!-- OpenGraph Tags -->
	<meta property="og:title" content="retronav - Pranav Karawale" />
	<meta
		property="og:description"
		content="Pranav Karawale's personal home on the web. Digital artisan & architect of systems."
	/>
	<meta property="og:image" content="https://karawale.in/logo.png" />
	<meta property="og:url" content="https://karawale.in/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="retronav" />

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="retronav - Pranav Karawale" />
	<meta
		name="twitter:description"
		content="Pranav Karawale's personal home on the web. Digital artisan & architect of systems."
	/>
	<meta name="twitter:image" content="https://karawale.in/logo.png" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://karawale.in/" />

	<title>retronav</title>
</svelte:head>

<main>
	{@render children()}
	<!-- <CrtEffect /> -->
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
