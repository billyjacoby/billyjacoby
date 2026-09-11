import siteMetadata from '@/data/siteMetadata';
import Link from 'next/link';

// Posts live in `apps/blog/posts/<slug>.mdx` within the monorepo.
const editUrl = (slug: string) =>
  `${siteMetadata.siteRepo}/blob/main/apps/blog/posts/${slug}.mdx`;

export function ClientPostComponents({
  children,
  slug,
}: React.PropsWithChildren<{ slug: string }>) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
      <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
        {children}
      </div>
      <div className="pb-6 pt-6 text-center text-sm text-gray-700 dark:text-gray-300">
        <Link href={editUrl(slug)}>View on GitHub</Link>
      </div>
    </div>
  );
}
