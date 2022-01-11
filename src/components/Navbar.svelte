<script lang="ts">
  import siteConfig from '../site.config';
</script>

<header>
  <nav class="navbar">
    <a class="title" href="/">{siteConfig.title}</a>

    <ul class="links">
      {#each siteConfig.menus.navbar as { label, path }, _}
        <li class="link"><a href={path}>{label}</a></li>
      {/each}
    </ul>
  </nav>
</header>

<style lang="scss">
  @use '../styles/variables.scss' as v;
  nav.navbar {
    display: grid;
    grid-column-gap: 1rem;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    @include v.size-lg {
      grid-template-columns: repeat(3, 1fr);
      height: 3rem;
    }
    @include v.size-md {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, 3rem);
      min-height: 3rem;
    }

    a.title {
      font-weight: 600;
      text-decoration: none;
      @include v.size-md {
        grid-row: 1 / 2;
      }
    }
    ul.links {
      @include v.size-lg {
        grid-column: 3 / 4;
      }
      @include v.size-md {
        grid-row: 2 / 3;
        li a {
          // Make the links tap size large enough to be accessible
          height: 3rem;
          display: grid;
          align-items: center;
        }
      }
      @include v.links();
    }
  }
</style>
