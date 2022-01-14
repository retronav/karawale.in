export function filterPosts(posts: any[]) {
  return posts.filter((post: { draft: boolean }) =>
    import.meta.env.PROD ? !post.draft : true
  );
}
