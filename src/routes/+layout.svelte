<script lang="ts">
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
