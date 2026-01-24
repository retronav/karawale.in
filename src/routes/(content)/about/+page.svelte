<script>
	import { Mail } from "@lucide/svelte";
</script>

<svelte:head>
	<title>retronav : about</title>
	<meta
		name="description"
		content="Learn about Pranav Karawale, a digital artisan and architect of systems specializing in full-stack web development, IoT, and embedded systems. Discover the philosophy behind 'Precision over Pixels'."
	/>

	<!-- OpenGraph Tags -->
	<meta property="og:title" content="About Pranav Karawale | retronav" />
	<meta
		property="og:description"
		content="Digital artisan & architect of systems. Full-stack developer specializing in web applications, IoT, and embedded systems."
	/>
	<meta property="og:image" content="https://karawale.in/logo.png" />
	<meta property="og:url" content="https://karawale.in/about" />
	<meta property="og:type" content="profile" />

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About Pranav Karawale | retronav" />
	<meta
		name="twitter:description"
		content="Digital artisan & architect of systems. Full-stack developer specializing in web applications, IoT, and embedded systems."
	/>
	<meta name="twitter:image" content="https://karawale.in/logo.png" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://karawale.in/about" />
</svelte:head>

<header>
	<h1 class="title">My <i>mini-memoir</i></h1>
	<address class="byline">
		<small>BY</small><br />
		<span>Pranav Karawale</span>
	</address>
</header>

<section class="content">
	<p>
		Looking back, I cannot believe a passed-down computer with a Pentium and
		a gigabyte of memory running Windows XP was all it took to kick off this
		lifelong obsession with computers.
	</p>

	<figure class="me">
		<enhanced:img
			class="img"
			src="$lib/assets/me.jpg"
			alt="A photo of Pranav Karawale"
			sizes="1024px"
			width="150px"
			height="200px"
		/>
	</figure>

	<p>
		I am Pranav Karawale, a
		<b>
			<i class="highlight">digital artisan</i> & an
			<i class="highlight">architect of systems</i>
		</b>, and this is my "about me". Computers, mobile phones, and
		electronics have always been a place of awe and a fountain of curiosity
		for me ever since I was a kid. This lifelong obsession has guided me to
		learn and master the skill of having a way with computers and making
		them do what I want.
		<br />
		While dragging that computer to its absolute limits, I was glued to the screen
		for hours, when a random day in 2019 I ended up on a tutorial on how to make
		a website. From there things kicked off, which has led here to this website
		and a lot of other things in my professional journey.
		<br />
		Upgrading machines and buying new laptops with hard-earned money also gave
		me a sense of responsibility regarding their care and a constant appreciation
		of the hardware, the software, the build, and the advancements technology
		has made so far. I am truly grateful to have witnessed such colossal amounts
		of innovation and privileged enough to experience it and harness its powers.
	</p>

	<h2>Precision over Pixels</h2>
	<p>
		You may have noticed this as the main tagline of my website. Well,
		what's in a design philosophy anyway? You might think that is what I am
		inferring, but that phrase is indeed my philosophy. I believe software
		should be like a LaFerrari: exquisite beauty on the outside, backed by
		raw, uncompromising power on the inside.
		<br />
		One thing I digress with Ferrari on, though, is that a machine should be
		transparent and not locked-down; it should be so simple and open at its core
		that it embraces its user to blow a soul into it with their own personal
		touch, making it something that's truly theirs. I aim to make stuff that
		is a well-engineered piece of art where every component works together, creating
		a harmony of their own. Precision of engineering spread over pixels of art.
	</p>

	<h2>What hats do I wear?</h2>
	<p>
		My expertise lies in Full-Stack web applications and the "magic" of
		connecting software with the physical world through IoT and embedded
		devices. Recently, I've been diving deep into Machine Learning on
		embedded systems. I also bring these engineering opinions to Pravideon
		Pvt. Ltd., where I serve as Co-Founder. There, I work with my team to
		build performant, reliable systems that live up to the eye candy. We
		deal with end-to-end web & mobile apps, hardware automation, and the
		union of these fields. The
		<a href="/projects">projects page</a> of my website hosts a collection of
		my work. For a more professional overview, you can check out my résumé.
	</p>

	<a href="/resume.pdf"><button>Résumé</button></a>

	<h2>What does retronav mean??</h2>
	<p>
		<code>[retro] + <s>pra</s>[nav]</code><br /> The name "retronav" is a portmanteau
		of "retro" and "nav", where "nav" is a shortened form of my first name, Pranav.
		The "retro" part signifies my love for retro aesthetics and technology from
		the 80s, 90s, 00s, which are nostalgia now, but for its time looked like
		the future.
	</p>

	<h2>Getting in touch</h2>
	<p>
		If my mini-memoir sounds interesting enough for a small conversation,
		you are absolutely welcome! I love to have a chat with people with
		interesting ideas and concrete opinions. All you need to do is send that
		email!
	</p>
	<address class="email">
		<Mail aria-hidden="true" />
		<code>pranav [at] karawale [dot] in</code>
	</address>
</section>

<style lang="scss">
	@use "$lib/styles/variables" as *;
	@use "sass:color";

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
		max-width: 600px;
		margin: 2rem auto;

		.highlight {
			color: $golden;
		}

		.email {
			display: flex;
			gap: 1ch;
		}
	}

	figure.me {
		float: right;

		.img {
			border: 1px solid $golden;
			box-shadow: 0 0 10px color.adjust($golden, $alpha: 0.5);
			margin: 0 0 0 1rem;
		}

		// figcaption {
		//	    font-size: var(--step--1);
		//	    text-align: center;
		//	 font-style: italic;
		// }
	}

	@media (max-width: 600px) {
		figure.me {
			float: none;
			display: grid;
			place-items: center;
		}
	}
</style>
