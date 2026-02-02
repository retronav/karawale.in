<script lang="ts">
	import SynthwaveGrid from '$lib/SynthwaveGrid.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import { resolve } from '$app/paths';
	let { children } = $props();
</script>

<SynthwaveGrid small>
	{#snippet logo()}
		<a href={resolve('/')} aria-label="Go back to main page" title="Go back to main page">
			<enhanced:img
				src="$lib/assets/logo.png?enhanced&w=128,64"
				alt="Logo"
				width="128"
				sizes="(max-width: 1200px) 64px, 128px"
			/>
		</a>
	{/snippet}

	<Navbar />

	{@render children()}
</SynthwaveGrid>
