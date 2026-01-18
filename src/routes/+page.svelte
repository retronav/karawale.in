<script lang="ts">
	// @ts-ignore : the w property is valid
	import logoImage from "$lib/assets/logo.png?enhanced&w=128;256";
	import SynthwaveGrid from "$lib/SynthwaveGrid.svelte";
</script>

<main>
	<div class="grid">
		<SynthwaveGrid>
			{#snippet logo()}
				<enhanced:img src={logoImage} alt="Logo" width="256" sizes="(max-width: 1200px) 128px, 256px"/>
			{/snippet}

			<div class="content">
				<h1>Precision <i>beyond</i> pixels.</h1>
				<div class="byline">
					<small>BY</small><br />
					<span>Pranav Karawale</span>
				</div>

				<div class="info">
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic beatae
						sapiente fugiat soluta mollitia. Non ipsa a blanditiis illum enim, odit
						voluptatum nesciunt unde eum, nisi nihil minima corrupti perspiciatis
						vel, delectus animi velit commodi. Similique non consequuntur pariatur
						mollitia veritatis. Pariatur quidem tenetur quos, assumenda ex minus
						enim neque laudantium, ipsa dolorum ut tempore aperiam debitis labore
						libero fugit quas, in qui expedita id corrupti consectetur consequuntur?
						Deserunt ducimus repudiandae similique eum nulla officiis quo
						accusantium delectus consequatur repellendus fuga voluptates possimus
						illo rerum debitis laborum eaque, beatae odit doloribus perspiciatis
						sapiente ab facere porro omnis. Dignissimos, harum dolor!
					</p>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa laboriosam ab nemo officia sed dolores impedit laborum nihil fuga eius reiciendis provident, ratione quibusdam dolorum possimus commodi, voluptas quasi doloribus ullam? Aperiam voluptatum similique voluptas, ab ipsam natus quae reprehenderit inventore. Et iure explicabo eum aliquam sunt vero dolorem harum!
					</p>
				</div>
			</div>
		</SynthwaveGrid>
	</div>
</main>

<style lang="scss">
	@use 'sass:color';
	@use '$lib/styles/variables' as *;

	.grid {
		width: 100%;
		height: 100vh;
	}

	.content {
		text-align: center;

		h1 {
			margin: 0;
			font-weight: 900;
			letter-spacing: -2px;
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
		}
	}

	@media (max-width: 1200px) {
		.content .info {
			grid-template-columns: 1fr;
		}
	}

	// p {
	// 	border: 1px solid var(--foreground);
	// 	padding: 1rem;
	// 	border-radius: 8px;
	// 	background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.04) 100%);
	// 	box-shadow:
	//     /* Darker, top-left shadow (inset) */
	// 		inset 5px 5px 10px rgba(0, 0, 0, 0.5),
	// 		/* Lighter, bottom-right shadow (inset) */ inset -5px -5px 10px
	// 			rgba(255, 255, 255, 0.1);

	// }
</style>
