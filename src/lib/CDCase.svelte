<!-- Mega job from https://codepen.io/MxHarr/pen/aZpEMY for initial inspiration -->
<script lang="ts">
	import cd from "$lib/assets/cd.png?enhanced";

	const { children, onReveal } = $props<{
		children?: any;
		onReveal?: () => void;
	}>();

	let isFlipped = $state(false);
	let rotationY = $state(0);

	function toggleFlip() {
		if (!isFlipped) {
			onReveal?.();
		}
		rotationY += 180;
		isFlipped = !isFlipped;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			toggleFlip();
			event.preventDefault();
		}
	}
</script>

<div
	class="flip-container"
	class:flipped={isFlipped}
	onclick={toggleFlip}
	onkeydown={handleKeydown}
	role="button"
	tabindex="0"
	aria-pressed={isFlipped}
	aria-label="View Project Details"
>
	<div class="flipper" style={`transform: rotateY(${rotationY}deg);`}>
		<!-- FRONT SIDE -->
		<div class="face front">
			<div class="cd-case">
				<div class="album-art">
					<div class="album-art-content">
						{@render children?.()}
					</div>
					<!-- Plastic Case Highlights -->
					<div class="sup pos-tl"></div>
					<div class="sup pos-tr"></div>
					<div class="sup pos-bl"></div>
					<div class="sup pos-br"></div>
				</div>
				<div class="spine"></div>
			</div>
		</div>

		<div class="face back">
			<div class="cd-tray">
				<div class="sup pos-tl"></div>
				<div class="sup pos-tr"></div>
				<div class="sup pos-bl"></div>
				<div class="sup pos-br"></div>
				<div class="cd-disc">
					<div class="album-art-backside"></div>
					<div class="disc-hole"></div>
					<enhanced:img
						src={cd}
						alt="CD Disc"
						width="180px"
						height="180px"
						sizes="180px"
					/>
				</div>

				<div class="spine"></div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use "$lib/styles/variables" as *;
	@use "sass:color";

	.flip-container {
		width: 230px;
		height: 206px;
		perspective: 1000px;
		cursor: pointer;
		outline: none;

		&:active {
			outline: none;
		}

		&:hover {
			.cd-case,
			.cd-tray {
				box-shadow: 0 0 20px 3px $golden;
			}
		}
	}

	.flipper {
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		transform-style: preserve-3d;
	}

	.face {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		transform-style: preserve-3d;
		user-select: none;
		pointer-events: none;
		top: 0;
		left: 0;
		border-radius: 3px;
		box-shadow:
			0px 2px 10px 1px rgba(0, 0, 0, 0.6),
			inset 0px 0px 20px 2px rgba(0, 0, 0, 0.4),
			inset 0px 0px 5px 1px rgba(255, 255, 255, 0.6),
			inset 0px 0px 0px 1px rgba(255, 255, 255, 0.2);
	}

	.front {
		z-index: auto;
	}

	.back {
		transform: rotateY(180deg);
	}

	.cd-case {
		height: 206px;
		width: 230px;
		display: inline-block;

		.album-art {
			height: 200px;
			width: 200px;
			border-radius: 3px;
			box-shadow:
				0px 0px 5px 1px rgba(0, 0, 0, 0.5),
				inset 0px 0px 16px 2px rgba(0, 0, 0, 0.1),
				inset 0px 0px 0px 1px rgba(255, 255, 255, 0.3);
			position: relative;
			top: 3px;
			left: 25px;
			overflow: hidden;

			.album-art-content {
				position: absolute;
				height: 100%;
				width: 100%;
				top: 0;
				left: 0;
				border-radius: 3px;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 20px;
				box-sizing: border-box;
			}

			.sup {
				height: 10px;
				width: 20px;
				background: rgba(255, 255, 255, 0.15);
				box-shadow:
					inset 0px 0px 6px 1px rgba(0, 0, 0, 0.22),
					inset 0px 0px 1px 1px rgba(255, 255, 255, 0.17);
				position: absolute;
				z-index: 10;
			}
			.pos-tl {
				top: 0;
				left: 20px;
				border-radius: 0 0 5px 5px;
			}
			.pos-tr {
				top: 0;
				left: 160px;
				border-radius: 0 0 5px 5px;
			}
			.pos-bl {
				top: auto;
				bottom: 0;
				left: 20px;
				border-radius: 5px 5px 0 0;
			}
			.pos-br {
				top: auto;
				bottom: 0;
				left: 160px;
				border-radius: 5px 5px 0 0;
			}
		}

		.spine {
			height: 120px;
			width: 15px;
			background: linear-gradient(
				rgba(255, 255, 255, 0.2) 0%,
				rgba(255, 255, 255, 0.07) 100%
			);
			box-shadow:
				3px 0px 5px 0px rgba(0, 0, 0, 0.23),
				inset 0px 0px 7px 0px rgba(0, 0, 0, 0.22),
				inset 0px 0px 0px 1px rgba(255, 255, 255, 0.22);
			position: absolute;
			top: 40px;
			left: 5px;
			border-radius: 0 50% 50% 0;
		}
	}

	.cd-tray {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border: 1px solid rgba(255, 255, 255, 0.1);

		.cd-disc {
			height: 200px;
			width: 200px;
			border-radius: 3px;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow:
				0px 0px 5px 1px rgba(0, 0, 0, 0.5),
				inset 0px 0px 16px 2px rgba(0, 0, 0, 0.1),
				inset 0px 0px 0px 1px rgba(255, 255, 255, 0.3);
			position: relative;
			bottom: 1px;
			right: 10px;
			background: #150b14;
			overflow: hidden;

			.album-art-backside {
				height: 180px;
				width: 180px;
				position: absolute;
				padding: 20px;
				transform: scaleX(-1);
				z-index: 0;
				border-radius: 3px;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 20px;
				box-sizing: border-box;
				user-select: none;
				pointer-events: none;
				background: color.adjust($background, $lightness: 10%, $alpha: 0.8);
			}

			.disc-hole {
				height: 40px;
				width: 40px;
				background: #150b14;
				border-radius: 50%;
				box-shadow:
					0px 0px 5px 1px rgba(0, 0, 0, 0.5),
					inset 0px 0px 10px 2px rgba(255, 255, 255, 0.1);
				position: absolute;
				z-index: 1;
			}

			:global(img),
			:global(picture) {
				position: relative;
				z-index: 1;
				animation: spin 20s linear infinite;
			}
		}

		.sup {
			height: 10px;
			width: 20px;
			background: rgba(255, 255, 255, 0.15);
			box-shadow:
				inset 0px 0px 6px 1px rgba(0, 0, 0, 0.22),
				inset 0px 0px 1px 1px rgba(255, 255, 255, 0.17);
			position: absolute;
			z-index: 10;
		}
		.pos-tl {
			top: 0;
			left: 20px;
			border-radius: 0 0 5px 5px;
		}
		.pos-tr {
			top: 0;
			left: 160px;
			border-radius: 0 0 5px 5px;
		}
		.pos-bl {
			top: auto;
			bottom: 0;
			left: 20px;
			border-radius: 5px 5px 0 0;
		}
		.pos-br {
			top: auto;
			bottom: 0;
			left: 160px;
			border-radius: 5px 5px 0 0;
		}

		.spine {
			height: 120px;
			width: 15px;
			background: linear-gradient(
				rgba(255, 255, 255, 0.2) 0%,
				rgba(255, 255, 255, 0.07) 100%
			);
			box-shadow:
				3px 0px 5px 0px rgba(0, 0, 0, 0.23),
				inset 0px 0px 7px 0px rgba(0, 0, 0, 0.22),
				inset 0px 0px 0px 1px rgba(255, 255, 255, 0.22);
			position: absolute;
			top: 40px;
			right: 5px;
			left: auto;
			border-radius: 50% 0 0 50%;
		}
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
