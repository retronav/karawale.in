<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<nav class="navbar">
	<a href={resolve('/projects')}><button>Projects</button></a>
	<a href={resolve('/about')}><button>About me</button></a>
</nav>

<style lang="scss">
	@use 'sass:color';
	@use '$lib/styles/variables' as *;

	.navbar {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		margin-bottom: 2rem;
	}

	.navbar a {
		text-decoration: none;
	}
</style>
