import siteMetadata from '@/data/siteMetadata';
import Link from 'next/link';

export const SiteLogo = () => {
  return (
    <Link href="/" aria-label={siteMetadata.headerTitle}>
      <div className="flex items-center justify-between">
        {typeof siteMetadata.headerTitle === 'string' ? (
          <div className="h-6 text-2xl text-3xl font-bold font-semibold text-accent-green sm:block">
            {siteMetadata.headerTitle}
          </div>
        ) : (
          siteMetadata.headerTitle
        )}
      </div>
    </Link>
  );
};
