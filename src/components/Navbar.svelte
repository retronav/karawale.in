<script lang="ts">
  import siteConfig from '../site.config';
</script>

<header>
  <nav class="navbar">
    <a class="home" href="/">
      <img
        src="/assets/logo48.webp"
        alt={"My avatar; The letters 'pk' with a transculent red shadow in" +
          ' the behind, on a purplish color resembling the night sky.'}
      />
      <p class="title">{siteConfig.title}</p>
    </a>
    <section class="links">
      {#each siteConfig.menus.navbar as { label, path }, i}
        <a href={path}>{label}</a>
        {#if i < siteConfig.menus.navbar.length - 1}
          <span>|&nbsp;</span>
        {/if}
      {/each}
    </section>
  </nav>
</header>

<style lang="scss">
  @use '../styles/variables.scss' as v;
  nav.navbar {
    @include v.accent();
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    display: grid;
    @include v.size-lg {
      grid-template-columns: fit-content(30%) 1fr;
      height: 2rem;
    }
    @include v.size-md {
      row-gap: 1rem;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      min-height: 2rem;
    }
    a.home {
      @include v.size-md {
        grid-row: 1 / 2;
      }
      text-decoration: none;
      display: grid;
      grid-template-columns: 3rem 1fr;
      margin: -0.5rem 0;
      align-items: center;
      column-gap: 1rem;
      p.title {
        margin: 0;
        font-weight: 600;
      }
      img {
        width: 100%;
        border-radius: 5px;
        height: auto;
      }
    }
    section.links {
      text-align: right;
      @include v.size-md {
        grid-row: 2 / 3;
        grid-column: 2 / 3;
      }
    }
  }
</style>
