<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';

	const errorMessages: Record<number, { title: string; message: string }> = {
		404: {
			title: 'Page Not Found',
			message: "The page you're looking for doesn't exist or has been moved."
		},
		500: {
			title: 'Server Error',
			message: 'Something went wrong on our end. Please try again later.'
		}
	};

	const status = $derived($page.status);
	const errorInfo = $derived(
		errorMessages[status] || {
			title: 'Error',
			message: $page.error?.message || 'An unexpected error occurred.'
		}
	);
</script>

<svelte:head>
	<title>retronav : {status} {errorInfo.title}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="error-container">
	<div class="error-content">
		<div class="error-code">
			<span class="glitch" data-text={status}>{status}</span>
		</div>
		<h1 class="error-title">{errorInfo.title}</h1>
		<p class="error-message">{errorInfo.message}</p>
		<nav class="error-nav">
			<a href={resolve('/')}>
				<button>Return Home</button>
			</a>
		</nav>
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/variables' as *;
	@use 'sass:color';

	.error-container {
		display: grid;
		place-items: center;
		min-height: 70vh;
		padding: 2rem;
		text-align: center;
	}

	.error-content {
		max-width: 600px;
	}

	.error-code {
		font-size: clamp(4rem, 15vw, 8rem);
		font-weight: bold;
		color: $golden;
		margin-bottom: 1rem;
		font-family: $font-family-mono;

		.glitch {
			position: relative;
			display: inline-block;

			&::before,
			&::after {
				content: attr(data-text);
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}

			&::before {
				left: 2px;
				text-shadow: -2px 0 $red;
				clip: rect(44px, 450px, 56px, 0);
				animation: glitch-anim 5s infinite linear alternate-reverse;
			}

			&::after {
				left: -2px;
				text-shadow: -2px 0 color.adjust($golden, $lightness: 20%);
				clip: rect(44px, 450px, 56px, 0);
				animation: glitch-anim 4s infinite linear alternate-reverse;
			}
		}
	}

	@keyframes glitch-anim {
		0% {
			clip: rect(31px, 9999px, 94px, 0);
		}
		10% {
			clip: rect(85px, 9999px, 72px, 0);
		}
		20% {
			clip: rect(18px, 9999px, 39px, 0);
		}
		30% {
			clip: rect(63px, 9999px, 12px, 0);
		}
		40% {
			clip: rect(45px, 9999px, 8px, 0);
		}
		50% {
			clip: rect(98px, 9999px, 33px, 0);
		}
		60% {
			clip: rect(22px, 9999px, 77px, 0);
		}
		70% {
			clip: rect(55px, 9999px, 91px, 0);
		}
		80% {
			clip: rect(9px, 9999px, 46px, 0);
		}
		90% {
			clip: rect(71px, 9999px, 19px, 0);
		}
		100% {
			clip: rect(38px, 9999px, 67px, 0);
		}
	}

	.error-title {
		color: $golden;
		font-size: var(--step-2);
		margin-bottom: 1rem;
	}

	.error-message {
		color: color.adjust($foreground, $alpha: -0.2);
		font-size: var(--step-0);
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.error-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;

		a {
			text-decoration: none;
		}

		button {
			min-width: 140px;
		}
	}

	@media (max-width: 600px) {
		.error-container {
			padding: 1rem;
		}

		.error-nav {
			flex-direction: column;
			align-items: stretch;

			button {
				width: 100%;
			}
		}
	}
</style>
