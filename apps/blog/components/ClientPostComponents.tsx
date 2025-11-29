'use client';

import siteMetadata from '@/data/siteMetadata';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}.mdx`;
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/${path}`
  )}`;

export function ClientPostComponents({ children }: React.PropsWithChildren) {
  const path = usePathname();
  console.log('🪵 | ClientPostComponents | path:', path);

  console.log('🪵 | ClientPostComponents | path:', path);
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
      <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
        {children}
      </div>
      <div className="pb-6 pt-6 text-center text-sm text-gray-700 dark:text-gray-300">
        {/* <Link href={discussUrl(path)} rel="nofollow">
        Discuss on Twitter
      </Link>
      {` • `} */}
        <Link href={editUrl(path)}>View on GitHub</Link>
      </div>
      {siteMetadata.comments && (
        <div
          className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
          id="comment"
        >
          {/* <Comments slug={slug} /> */}
        </div>
      )}
    </div>
  );
}
