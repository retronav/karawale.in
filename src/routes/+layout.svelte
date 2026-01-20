<script lang="ts">
	import favicon from "$lib/assets/favicon.png";
	// import CrtEffect from "$lib/CrtEffect.svelte";
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

<style lang="scss">
	main {
		width: 100%;
		min-height: 100%;
	}
</style>

<svelte:head>
	<link
		rel="icon"
		href={favicon}
		type="image/png"
	/>
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
	<title>retronav</title>
</svelte:head>

<main>
	{@render children()}
	<!-- <CrtEffect /> -->
</main>

