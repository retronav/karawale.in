<script lang="ts">
  import siteConfig from '../site.config';
</script>

<footer>
  <section class="links">
    {#each siteConfig.menus.footerSocial as { label, path }, i}
      <a href={path}>{label}</a>
      {#if i < siteConfig.menus.footerSocial.length - 1}
        <span>|&nbsp;</span>
      {/if}
    {/each}
  </section>
  <section class="copyright">
    &copy; {new Date().getUTCFullYear()}
    {siteConfig.copyrightHolder}
    <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
      CC BY-NC 4.0
    </a>
  </section>
</footer>

<style lang="scss">
  @use '../styles/variables.scss' as v;
  footer {
    @include v.accent();
    position: relative;
    bottom: 0;
    text-align: center;
    font-size: 0.9rem;
    margin-top: 2rem;
    padding: 1rem 2rem;
    @include v.size-lg {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    section.links {
      margin-bottom: 1rem;
      p {
        margin-top: 0;
      }
    }
  }
</style>
