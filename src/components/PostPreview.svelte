<script lang="ts">
  export let post;
</script>

<section class="post-preview">
  <h1>{post.title}</h1>
  <small>
    <time datetime={post.date}>
      {new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }).format(new Date(post.date))}
    </time>
  </small>
  {#if post.summary}
    <p>{post.summary}</p>
  {/if}
  <a href={post.url}>Read more...</a>
</section>

<style lang="scss">
  @use '../styles/variables.scss' as v;
  .post-preview {
    @include v.accent;
    margin: 1rem;
    padding: 1rem;
    h1 {
      margin: 0;
    }
  }
</style>
