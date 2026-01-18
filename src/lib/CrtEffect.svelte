<script lang="ts">
	// Almost all of this is taken from https://mitchivin.com/
	import "$lib/styles/crtEffect.scss";

	// Configuration Constants
	const SCANLINE_MIN_DELAY_MS = 1000;
	const SCANLINE_MAX_DELAY_MS = 3000;
	const SCANLINE_BASE_DURATION_MS = 3000;
	const SCANLINE_DURATION_RANDOM_ADDITION_MS = 1000;
	const SESSION_STORAGE_KEY = "crt_animation_active";

	let scanlineElement = $state<HTMLDivElement>();

	$effect(() => {
		if (!scanlineElement) return;

		let isRunning = false;
		let timeoutId: number;

		const triggerScanline = () => {
			if (!scanlineElement) return;

			void scanlineElement.offsetHeight;

			const duration =
				SCANLINE_BASE_DURATION_MS +
				SCANLINE_DURATION_RANDOM_ADDITION_MS * Math.random();

			scanlineElement.style.willChange = "transform";
			scanlineElement.style.transition = `transform ${duration}ms linear`;
			scanlineElement.style.transform = "translateY(110vh)";

			isRunning = true;

			try {
				sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
			} catch (e) {}
		};

		const handleTransitionEnd = () => {
			if (!scanlineElement) return;

			scanlineElement.style.willChange = "auto";

			scanlineElement.style.transition = "none";
			scanlineElement.style.transform = "translateY(-100%)";

			const nextDelay =
				SCANLINE_MIN_DELAY_MS + SCANLINE_MAX_DELAY_MS * Math.random();
			timeoutId = window.setTimeout(triggerScanline, nextDelay);
		};

		const handleInteraction = () => {
			if (!isRunning) triggerScanline();
		};

		const handleResize = () => {
			window.clearTimeout(timeoutId);
			timeoutId = window.setTimeout(triggerScanline, 500);
		};

		scanlineElement.addEventListener("transitionend", handleTransitionEnd);

		window.addEventListener("mousemove", handleInteraction, { once: true });
		window.addEventListener("resize", handleResize);

		try {
			if (sessionStorage.getItem(SESSION_STORAGE_KEY) === "true") {
				timeoutId = window.setTimeout(triggerScanline, 500);
			}
		} catch (e) {}

		return () => {
			window.clearTimeout(timeoutId);
			if (scanlineElement) {
				scanlineElement.removeEventListener(
					"transitionend",
					handleTransitionEnd
				);
			}
			window.removeEventListener("mousemove", handleInteraction);
			window.removeEventListener("resize", handleResize);
		};
	});
</script>

<div class="crt-effect"></div>

<div class="crt-scanline" bind:this={scanlineElement}></div>

<div class="crt-vignette"></div>
<div class="crt-noise"></div>
<div class="crt-flicker"></div>
<div class="crt-aberration"></div>
<div class="crt-persistence"></div>
