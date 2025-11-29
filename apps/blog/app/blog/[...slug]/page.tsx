import siteMetadata from '@/data/siteMetadata';
import PostLayout from '@/layouts/PostLayout';
import { POSTS_FOLDER } from '@/lib/constants';
import { access, readFile } from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import path from 'path';

async function readPostFile(slug: string) {
  const filePath = path.resolve(path.join(POSTS_FOLDER, `${slug}.mdx`));

  try {
    await access(filePath);
  } catch (err) {
    return null;
  }

  const fileContent = await readFile(filePath, { encoding: 'utf8' });
  return fileContent;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  console.log('🪵 | slug:', slug);
  const markdown = await readPostFile(slug.join('/'));
  console.log('🪵 | markdown:', markdown);

  if (!markdown) {
    return;
  }

  const { frontmatter, content } = await compileMDX<{
    title: string;
    date: string;
    lastmod: string;
    tags: string[];
  }>({
    source: markdown,
    options: { parseFrontmatter: true },
  });

  const modifiedAt = new Date(
    frontmatter.lastmod || frontmatter.date
  ).toISOString();
  const publishedAt = modifiedAt;
  const imageList = [siteMetadata.socialBanner];
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    };
  });

  // TODO: get a summary here somehow

  return {
    title: frontmatter.title,
    // description: frontmatter.summary,
    openGraph: {
      title: frontmatter.title,
      // description: frontmatter.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: modifiedAt || publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: [siteMetadata.author],
      // authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      // description: frontmatter.summary,
      images: imageList,
    },
  };
}
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const markdown = await readPostFile(slug.join('/'));

  if (!markdown) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<{
    title: string;
    date: string;
    lastmod: string;
    tags: string[];
  }>({
    source: markdown,
    options: { parseFrontmatter: true },
  });

  return (
    <PostLayout
      authorDetails={[
        {
          name: 'Billy Jacoby',
          avatar: '/static/images/billy-avatar.png',
          twitter: 'https://x.com/billyjacoby',
          bluesky: 'https://bsky.app/profile/billyjaco.by',
        },
      ]}
      date={frontmatter.date}
      lastmod={frontmatter.lastmod}
      title={frontmatter.title}
      tags={frontmatter.tags}
    >
      {content}
    </PostLayout>
  );
}
