<script lang="ts">
	import Navbar from "$lib/Navbar.svelte";
	let { children } = $props();
</script>

<Navbar />
<section>
    {@render children()}
</section>

<style lang="scss">
    section {
        margin: 1rem;
    }
</style>
