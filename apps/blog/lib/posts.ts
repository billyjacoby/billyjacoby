import postData from 'data/post-data.json';
import { PostData } from 'types/post';

/** Newest first, using `lastmod` when present and falling back to `date`. */
const byNewest = (a: PostData, b: PostData) =>
  new Date(b.lastmod ?? b.date).getTime() -
  new Date(a.lastmod ?? a.date).getTime();

/**
 * Every post that should be publicly visible, newest first.
 *
 * Drafts are excluded here — this is the single source of truth for post
 * visibility, so listings, tag pages, the sitemap and the RSS feed all agree.
 * Use `isPublished` to gate direct access to a single post.
 */
export const publishedPosts: PostData[] = (postData as PostData[])
  .filter((post) => post?.draft !== true)
  .sort(byNewest);

export const isPublished = (slug: string): boolean =>
  publishedPosts.some((post) => post.slug === slug);
