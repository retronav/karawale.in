<script>
	let { logo, children } = $props();
</script>

<div class="container">
	<div class="logo">
		{@render logo()}
		<div class="horizon"></div>
	</div>
	<div class="lines"></div>
	<div class="content">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	@use "sass:color";
	@use "$lib/styles/variables" as *;

	$height: 256px;

	@media (prefers-reduced-motion: reduce) {
		.lines {
			animation: none;
		}
	}

	@media (max-width: 1200px) {
		.logo :global(img) {
			width: calc($height / 2);
			height: calc($height / 2);
		}

		.container {
			grid-template-rows: repeat(2, calc($height / 4)) 1fr !important;
		}
	}

	.container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(2, calc($height / 2)) 1fr;
	}
	.logo {
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / 3;
		display: grid;
		place-items: center;
		z-index: 3;

		opacity: 0.85;
		transition: all 0.25s ease;

		&:hover {
			opacity: 1;
			filter: drop-shadow(0 0 20px #{color.adjust($red, $alpha: -0.3)});
		}

		.horizon {
			position: absolute;
			bottom: 50%;
			left: 50%;
			transform: translate(-50%, 50%);
			width: 100%;
			height: 2px;
			z-index: -1;
			background: linear-gradient(
				90deg,
				#{color.adjust($pink, $alpha: -0.9)} 0%,
				#{color.adjust($pink, $alpha: -0.9)} 25%,
				#{color.adjust($pink)} 50%,
				#{color.adjust($pink, $alpha: -0.9)} 75%,
				#{color.adjust($pink, $alpha: -0.9)} 100%
			);
			box-shadow: 0 0 10px #{color.adjust($red, $alpha: -0.3)};
		}
	}

	.lines {
		grid-column: 1 / -1;
		grid-row: 2 / 4;
		width: 100%;
		height: 100%;
		background-size: 1rem 1rem;
		background-image: linear-gradient(
				to right,
				#{color.adjust($golden, $alpha: -0.8)} 1px,
				transparent 1px
			),
			linear-gradient(
				to bottom,
				#{color.adjust($golden, $alpha: -0.8)} 1px,
				transparent 1px
			);
		transform: perspective(100vh) rotateX(80deg);
		transform-origin: top center;
		animation: 20s linear infinite crawlingWall;
		background-position-y: top;
		clip-path: polygon(30% 0%, 70% 0%, 70% 100%, 30% 100%);
	}

	.content {
		grid-column: 1 / -1;
		grid-row: 3 / 4;
		z-index: 2;
		margin: 0 2rem;
	}

	@keyframes crawlingWall {
		to {
			background-position-y: bottom;
		}
	}
</style>
