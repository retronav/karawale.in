<nav class="navbar">
    <a href="/projects"><button>Projects</button></a>
    <a href="/about"><button>About me</button></a>
</nav>

<style lang="scss">
	@use "sass:color";
	@use "$lib/styles/variables" as *;

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