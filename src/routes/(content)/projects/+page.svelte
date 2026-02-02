<script lang="ts">
	import CDCase from '$lib/CDCase.svelte';
	import CDCatalogue from '$lib/CDCatalogue.svelte';

	let catalogue: CDCatalogue;

	function openCatalogueItem(id: string) {
		catalogue?.openItem(id);
		// Scroll to catalogue
		document.querySelector('.catalogue')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<svelte:head>
	<title>retronav : projects</title>
	<meta
		name="description"
		content="Explore Pranav Karawale's technical projects, creative works, and professional endeavors at Pravideon Pvt. Ltd. View the curated collection of engineering and design achievements."
	/>

	<!-- OpenGraph Tags -->
	<meta property="og:title" content="Projects by Pranav Karawale | retronav" />
	<meta
		property="og:description"
		content="Technical projects, creative works, and professional endeavors. A curated collection of engineering and design achievements."
	/>
	<meta property="og:image" content="https://karawale.in/logo.png" />
	<meta property="og:url" content="https://karawale.in/projects" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Projects by Pranav Karawale | retronav" />
	<meta
		name="twitter:description"
		content="Technical projects, creative works, and professional endeavors. A curated collection of engineering and design achievements."
	/>
	<meta name="twitter:image" content="https://karawale.in/logo.png" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://karawale.in/projects" />
</svelte:head>

<header>
	<hgroup>
		<h1 class="title">A collection of CDs with <i>cool stuff</i>.</h1>
		<address class="byline">
			<small>BY</small><br />
			<span>Pranav Karawale</span>
		</address>
		<p class="description">
			These are my technical projects, creative works, bits of academia, business endeavors and
			more, burned into a CD and neatly packaged.
		</p>
	</hgroup>
</header>

<section class="collection">
	<h2>Editor's choice</h2>
	<div>
		<CDCase onReveal={() => openCatalogueItem('group-pravideon')}>
			<enhanced:img
				class="cd-cover"
				src="$lib/assets/cd-art/pravideon.png?enhanced&w=180"
				width="180px"
				height="180px"
				alt="Pravideon Pvt. Ltd"
			/>
		</CDCase>
		<CDCase onReveal={() => openCatalogueItem('Bratify')}>
			<enhanced:img
				class="cd-cover"
				src="$lib/assets/cd-art/bratify.png?enhanced&w=180"
				width="180px"
				height="180px"
				alt="bratify"
			/>
		</CDCase>
		<CDCase onReveal={() => openCatalogueItem('LoRaPWN')}>
			<enhanced:img
				class="cd-cover"
				src="$lib/assets/cd-art/lorapwn.png?enhanced&w=180"
				width="180px"
				height="180px"
				alt="LoRaPWN"
			/>
		</CDCase>
		<CDCase onReveal={() => openCatalogueItem('Ixora')}>
			<enhanced:img
				class="cd-cover"
				src="$lib/assets/cd-art/ixora.png?enhanced&w=180"
				width="180px"
				height="180px"
				alt="Ixora"
			/>
		</CDCase>
		<CDCase onReveal={() => openCatalogueItem('Rosette')}>
			<enhanced:img
				class="cd-cover"
				src="$lib/assets/cd-art/rosette.png?enhanced&w=180"
				width="180px"
				height="180px"
				alt="Rosette"
			/>
		</CDCase>
	</div>
</section>
<section class="content">
	<h2>Full Catalogue</h2>

	<section class="catalogue">
		<div class="window">
			<div class="navbar">
				<div class="buttons">
					<span class="btn close"></span>
					<span class="btn minimize"></span>
				</div>
				<div class="title-bar">Catalogue</div>
				<div></div>
			</div>
			<CDCatalogue bind:this={catalogue} />
		</div>
	</section>
</section>

<style lang="scss">
	@use '$lib/styles/variables' as *;
	@use 'sass:color';

	header {
		text-align: center;
	}

	.title {
		color: $golden;
		margin: 0;
	}

	.byline {
		margin-bottom: 1rem;
		color: $golden;
	}

	.content {
		margin: 0 auto;
		padding: 0 1rem;

		h2 {
			text-align: center;
			margin-bottom: 2rem;
		}
	}

	.collection {
		padding: 2rem;
		text-align: center;

		div {
			display: flex;
			gap: 1rem;
			flex-wrap: wrap;
			justify-content: center;
		}
	}

	.cd-cover {
		border-radius: 3px;
	}

	.catalogue {
		.window {
			margin: 1rem auto;
			border: 1px solid color.adjust($golden, $alpha: -0.8);
			box-shadow: 0 0 20px 3px color.adjust($golden, $alpha: -0.9);

			.navbar {
				display: flex;
				align-items: center;
				justify-content: space-between;
				background: color.adjust($golden, $alpha: -0.9);
				padding: 0.5rem 1rem;
				border-bottom: 1px solid color.adjust($golden, $alpha: -0.8);

				.buttons {
					display: flex;
					gap: 0.5rem;

					.btn {
						width: 12px;
						height: 12px;
						border-radius: 50%;
						display: inline-block;
						transition: all 0.2s ease;

						&.close {
							background: $red;
							box-shadow: 0 0 5px color.adjust($red, $alpha: -0.3);

							&:hover {
								box-shadow:
									0 0 4px color.adjust($red, $alpha: -0.3),
									inset 0 0 2px $foreground;
							}
						}

						&.minimize {
							background: $golden;
							box-shadow: 0 0 5px color.adjust($golden, $alpha: -0.3);

							&:hover {
								box-shadow:
									0 0 4px color.adjust($golden, $alpha: -0.3),
									inset 0 0 2px $foreground;
							}
						}
					}
				}

				.title-bar {
					font-family: $font-family-mono;
					font-size: var(--step--2);
				}
			}
		}
	}
</style>
