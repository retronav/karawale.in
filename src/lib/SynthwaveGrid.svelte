<script>
	let { logo, children, small = false } = $props();
</script>

<div class="container" style:--height={small ? "128px" : "256px"}>
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

	:root {
		--height: 256px;
	}

	@media (prefers-reduced-motion: reduce) {
		.lines {
			animation: none;
		}
	}

	@media (max-width: 1200px) {
		.logo :global(img) {
			width: calc(var(--height) / 2);
			height: calc(var(--height) / 2);
		}

		.container {
			grid-template-rows: repeat(2, calc(var(--height) / 4)) 1fr !important;
		}
	}

	.container {
		position: relative;
		width: 100%;
		min-height: 100vh;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(2, calc(var(--height) / 2)) 1fr;
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
		max-height: calc(100vh - var(--height) / 2);
		
		background-size: 2rem 2rem;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M0.5 0 L0.5 16 M0 0.5 L16 0.5' stroke='#{color.change($golden, $alpha: 0.25)}' stroke-width='0.5' fill='none'/%3E%3C/svg%3E");
		background-repeat: repeat;

		transform-origin: top center;
		transform: perspective(100vh) rotateX(80deg) translateY(0);
		
		clip-path: polygon(30% 0%, 70% 0%, 70% 100%, 30% 100%);
		mask-image: linear-gradient(
			to bottom,
			transparent 0%,
			transparent 20%,
			black 50%,
			black 70%,
			transparent 90%,
			transparent 100%
		);

		/* Animation */
		animation: 1s linear infinite crawlingWall;
		will-change: transform;
	}

	.content {
		grid-column: 1 / -1;
		grid-row: 3 / 4;
		z-index: 2;
		margin: 0 2rem;
	}


	@media (max-width: 600px) {
		.lines {
			background-size: 1rem 1rem;
			// increase stroke width for smaller screens
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M0.5 0 L0.5 16 M0 0.5 L16 0.5' stroke='#{color.change($golden, $alpha: 0.25)}' stroke-width='1' fill='none'/%3E%3C/svg%3E");
			background-repeat: repeat;
		}
	}

	@keyframes crawlingWall {
		0% {
			transform: perspective(100vh) rotateX(80deg) translateY(0);
		}
		100% {
			transform: perspective(100vh) rotateX(80deg) translateY(2rem);
		}
	}
</style>