<script lang="ts">
  import siteConfig from '../site.config';
</script>

<footer>
  <section class="links">
    <p>Social Media links</p>
    {#each siteConfig.menus.footerSocial as { label, path }, i}
      <a href={path}>{label}</a>
      {#if (i < siteConfig.menus.footerSocial.length - 1)}
        <span>|&nbsp;</span>
      {/if}
    {/each}
  </section>
  &copy; {new Date().getUTCFullYear()} {siteConfig.copyrightHolder}
  <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
    CC BY-NC 4.0
  </a>
</footer>

<style lang="scss">
  @use '../styles/variables.scss' as v;
  footer {
    @include v.accent();
    text-align: center;
    font-size: 0.9rem;
    margin-top: 1rem;
    padding: 1rem 2rem;
    section.links {
      @include v.size-lg {
        width: 70%;
        margin: 0 auto;
        margin-bottom: 1rem;
      }
      p {
        margin-top: 0;
      }
    }
  }
</style>
