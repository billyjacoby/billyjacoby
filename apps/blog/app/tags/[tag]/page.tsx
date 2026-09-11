import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayoutWithTags';
import { publishedPosts } from '@/lib/posts';
import { genPageMetadata } from 'app/seo';
import { slug } from 'github-slugger';
import { Metadata } from 'next';
import tagData from 'data/tag-data.json';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: encodedTag } = await params;
  const tag = decodeURI(encodedTag);
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  });
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>;
  // Keys are human-readable tag names ("3d printing"); routes use the slug.
  const paths = Object.keys(tagCounts).map((tag) => ({
    tag: slug(tag),
  }));
  return paths;
};

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1);
  const filteredPosts = publishedPosts.filter((post) =>
    post.tags?.map((t) => slug(t)).includes(tag)
  );
  return <ListLayout posts={filteredPosts} title={title} />;
}
