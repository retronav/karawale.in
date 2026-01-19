<script lang="ts">
    // @ts-ignore : the w property is valid
	import logo from "$lib/assets/logo.png?enhanced&w=96";
</script>

<nav class="navbar">
	<a href="/" aria-label="Go to home">
		<enhanced:img
			src={logo}
			alt="Logo"
            width="48"
            height="48"
            class="logo"
		/>
	</a>
    <section class="items">
        <a href="/about"><button>About</button></a>
    </section>
</nav>

<style lang="scss">
    @use "sass:color";
    @use "$lib/styles/variables" as *;

    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        background-color: var(--color-bg);
        border-bottom: 1px solid color.adjust($golden, $alpha: -0.2);
}
</style>
