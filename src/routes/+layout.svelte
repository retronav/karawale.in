<script lang="ts">
	import favicon from "$lib/assets/favicon.png";
	import CrtEffect from "$lib/CrtEffect.svelte";
	import "$lib/styles/global.scss";
	import "$lib/styles/typography.scss";
	import "$lib/styles/bg.scss";
	import "@fontsource-variable/eb-garamond";
	import "@fontsource-variable/eb-garamond/wght-italic";
	import "@fontsource-variable/jetbrains-mono";
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
		height: 100%;
		contain: layout;
	}
</style>

<svelte:head>
	<link
		rel="icon"
		href={favicon}
		type="image/png"
	/>
</svelte:head>

<main>
	{@render children()}
	<!-- <CrtEffect /> -->
</main>

