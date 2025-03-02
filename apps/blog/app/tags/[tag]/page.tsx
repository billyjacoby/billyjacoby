import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayoutWithTags';
import { genPageMetadata } from 'app/seo';
import tagData from 'app/tag-data.json';
import { slug } from 'github-slugger';
import { Metadata } from 'next';

import postData from 'data/post-data.json';

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
  const tagKeys = Object.keys(tagCounts);
  const paths = tagKeys.map((tag) => ({
    tag: tag,
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
  const filteredPosts = postData
    .filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag))
    .sort(
      (a, b) =>
        new Date(b.lastmod ?? b.date).getTime() -
        new Date(a.lastmod ?? a.date).getTime()
    );
  return <ListLayout posts={filteredPosts} title={title} />;
}
