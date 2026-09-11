import siteMetadata from '@/data/siteMetadata';
import PostLayout from '@/layouts/PostLayout';
import { POSTS_FOLDER } from '@/lib/constants';
import { isPublished, publishedPosts } from '@/lib/posts';
import { access, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import path from 'path';

type Frontmatter = {
  title: string;
  date: string;
  lastmod?: string;
  summary?: string;
  tags: string[];
};

async function readPostFile(slug: string) {
  // Guard against `..` in the catch-all segment escaping the posts folder, and
  // never serve a draft as if it were published.
  const filePath = path.resolve(path.join(POSTS_FOLDER, `${slug}.mdx`));

  if (!filePath.startsWith(path.resolve(POSTS_FOLDER))) return null;
  if (!isPublished(slug)) return null;

  try {
    await access(filePath);
  } catch {
    return null;
  }

  return readFile(filePath, { encoding: 'utf8' });
}

export async function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug.split('/') }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const markdown = await readPostFile(slug.join('/'));

  if (!markdown) {
    return;
  }

  // Frontmatter only — compiling the whole document here would double the
  // render cost of every post request.
  const frontmatter = matter(markdown).data as Frontmatter;

  const modifiedAt = new Date(
    frontmatter.lastmod || frontmatter.date
  ).toISOString();
  const publishedAt = new Date(frontmatter.date).toISOString();
  const imageList = [siteMetadata.socialBanner];
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    };
  });

  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.summary,
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

  const { content, frontmatter } = await compileMDX<Frontmatter>({
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
      slug={slug.join('/')}
    >
      {content}
    </PostLayout>
  );
}
