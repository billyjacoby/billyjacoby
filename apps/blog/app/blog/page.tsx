import ListLayout from '@/layouts/ListLayoutWithTags';
import { genPageMetadata } from 'app/seo';
import postData from 'data/post-data.json';

const POSTS_PER_PAGE = 5;

export const metadata = genPageMetadata({ title: 'Blog' });

export default async function BlogPage() {
  const posts = postData
    .filter((b) => b?.draft !== true)
    .sort((a, b) => {
      return (
        new Date(b.lastmod ?? b.date).getTime() -
        new Date(a.lastmod ?? a.date).getTime()
      );
    });
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  );
}
