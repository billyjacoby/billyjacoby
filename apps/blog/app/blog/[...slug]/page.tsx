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

export default async function PostPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = await params;
  const markdown = await readPostFile(slug.join('/'));

  if (!markdown) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: markdown,
    options: { parseFrontmatter: true },
  });

  // do something with frontmatter, like set metadata or whatever

  return <>{content}</>;
}
