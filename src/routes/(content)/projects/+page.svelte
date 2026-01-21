<script>
	import CDCase from "$lib/CDCase.svelte";
</script>

<svelte:head>
	<title>retronav : projects</title>
</svelte:head>

<header>
	<hgroup>
		<h1 class="title">A collection of CDs with <i>cool stuff</i>.</h1>
		<address class="byline">
			<small>BY</small><br />
			<span>Pranav Karawale</span>
		</address>
		<p class="description">
			These are my technical projects, creative works, bits of academia,
			business endeavors and more, burned to a CD and neatly packaged.
			Information about each disc will be added soon.
		</p>
	</hgroup>
</header>

<section class="collection">
	<CDCase>
		<enhanced:img
			src="$lib/assets/cd-art/pravideon.png?enhanced&w=180"
			width="180px"
			height="180px"
			alt="Pravideon Pvt. Ltd"
		/>
	</CDCase>
	<CDCase>
		<enhanced:img
			src="$lib/assets/cd-art/bratify.png?enhanced&w=180"
			width="180px"
			height="180px"
			alt="bratify"
		/>
	</CDCase>
	<CDCase>
		<enhanced:img
			src="$lib/assets/cd-art/lorapwn.png?enhanced&w=180"
			width="180px"
			height="180px"
			alt="LoEaPWN"
		/>
	</CDCase>
	<CDCase>
		<enhanced:img
			src="$lib/assets/cd-art/ixora.png?enhanced&w=180"
			width="180px"
			height="180px"
			alt="Ixora"
		/>
	</CDCase>
	<CDCase>
		<enhanced:img
			src="$lib/assets/cd-art/rosette.png?enhanced&w=180"
			width="180px"
			height="180px"
			alt="Rosette"
		/>
	</CDCase>
</section>

<style lang="scss">
	@use "$lib/styles/variables" as *;

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

	.collection {
		padding: 2rem;
		border-radius: 3px;
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	@media (min-width: 600px) {
		.description {
			max-width: 600px;
			margin: 0 auto;
		}
	}
</style>
