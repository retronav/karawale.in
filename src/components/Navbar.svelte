<script lang="ts">
  import siteConfig from '../site.config';
</script>

<header>
  <nav class="navbar">
    <a class="title" href="/">{siteConfig.title}</a>
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
    display: grid;
    grid-column-gap: 1rem;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    @include v.size-lg {
      grid-template-columns: repeat(2, 1fr);
      height: 2rem;
    }
    @include v.size-md {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, 1fr);
      min-height: 2rem;
    }

    a.title {
      font-weight: 600;
      text-decoration: none;
      @include v.size-md {
        grid-row: 1 / 2;
      }
    }
    section.links {
      text-align: right;
    }
  }
</style>
