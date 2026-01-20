<script lang="ts">
	import SynthwaveGrid from "$lib/SynthwaveGrid.svelte";
	import Navbar from "$lib/Navbar.svelte";
    import logoImage from "$lib/assets/logo.png?enhanced&w=128,64";
	let { children } = $props();
</script>

<SynthwaveGrid small>
	{#snippet logo()}
        <a href="/" aria-label="Go back to main page" title="Go back to main page">
            <enhanced:img
                src={logoImage}
                alt="Logo"
                width="128"
				sizes="(max-width: 1200px) 64px, 128px"
            />
        </a>
	{/snippet}

	<Navbar />

	{@render children()}
</SynthwaveGrid>

