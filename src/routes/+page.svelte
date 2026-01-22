<script lang="ts">
	// @ts-ignore : the w property is valid
	import logoImage from "$lib/assets/logo.png?enhanced&w=128;256";
	import SynthwaveGrid from "$lib/SynthwaveGrid.svelte";
	import favicon from "$lib/assets/favicon.png";
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

<SynthwaveGrid>
	{#snippet logo()}
		<enhanced:img
			src={logoImage}
			alt="Logo"
			width="256"
			sizes="(max-width: 1200px) 128px, 256px"
		/>
	{/snippet}

	<article class="content">
		<header>
			<h1>Precision <i>beyond</i> pixels.</h1>
			<address class="byline">
				<small>BY</small><br />
				<span>Pranav Karawale</span>
			</address>
		</header>

		<section class="info">
			<section>
				<p>
					Time and this world wait for no one. What waits though, is the lasting
					impression of your first smart phone, or the crisp pages of the
					magazine which your fingers sift through as you flip through the
					colorful images. Impressions, that are a collective of the various
					experiences of the authors, the makers, the creators. Impressions,
					that give rise to trends, and become an inspiration for one or many.
					Impressions, that shape the beginnings of something revolutionary.
				</p>
				<p>
					These experiences however, are also forgotten in time and space. New
					advancements render technology obsolete, or the world simply moves on
					from the creations which were once deemed so novel and revolutionary.
					Some aesthetics, designs, patterns either stand the test of time and
					transcend every generation, or simply get left behind as a relic of
					happier times, or in some cases, become a core creative inspiration
					for a few people and become cult classics. This appreciation of a
					niche is what captures the individuality within a group of people.
				</p>
			</section>
			<section>
				<p>
					Welcome to my personal corner of the web. This is a digital home for
					my engineering projects, my musings, my curiosities, my design
					philosophies, my personality with a quill that paints nostalgia on the
					fabric of the future.
				</p>
				<p>Use one of the following buttons to visit:</p>
				<nav>
					<a href="/projects">
						<button>Projects</button>
					</a>
					<a href="/about">
						<button>About me</button>
					</a>
				</nav>
				<div class="spacer"></div>
			</section>
		</section>
	</article>
</SynthwaveGrid>

<style lang="scss">
	@use "sass:color";
	@use "$lib/styles/variables" as *;

	.content {
		text-align: center;

		h1 {
			margin: 0;
			color: inherit;
			color: $golden;
		}

		.byline {
			margin-bottom: 1rem;
			color: $golden;
		}

		.info {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
			text-align: left;
			color: inherit;

			section:nth-child(1) {
				border-right: 1px solid color.adjust($foreground, $alpha: -0.2);
			}

			section {
				padding: 0 1ch;
			}
		}

		nav {
			margin-top: 1rem;
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;

			a {
				height: fit-content;
			}
		}
	}

	@media (max-width: 600px) {
		.content .info {
			grid-template-columns: 1fr;
			gap: 0;

			section:nth-child(1) {
				border-right: none;
			}
		}

		.spacer {
			height: 4rem;
		}
	}
</style>
