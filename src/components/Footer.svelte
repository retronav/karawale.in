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
  <small>
  <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />The content on this website is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.</small>
</footer>

<style lang="scss">
  @use '../styles/variables.scss' as v;
  footer {
    @include v.accent();
    text-align: center;
    padding: 1rem 2rem;
    ul.links {
      @include v.links();
    }
  }
</style>
