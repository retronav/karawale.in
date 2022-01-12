<script lang="ts">
  import siteConfig from '../site.config';
</script>

<footer>
  <p>Social Media links</p>
  <ul class="links">
    {#each siteConfig.menus.footerSocial as { label, path }, _}
      <li class="link"><a href={path}>{label}</a></li>
    {/each}
  </ul>
  <p>All opinions posted here are my own, unless specified otherwise.</p>
  <small
    >The content on this website is licensed under a
    <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"
      >CC BY-NC 4.0 License</a
    >.</small
  >
</footer>

<style lang="scss">
  @use '../styles/variables.scss' as v;
  footer {
    @include v.accent();
    text-align: center;
    margin-top: 1rem;
    padding: 1rem 2rem;
    ul.links {
      @include v.size-lg {
        width: 70%;
        margin: 0 auto;
      }
      @include v.links();
      grid-auto-rows: 3rem;
      li, li a {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
