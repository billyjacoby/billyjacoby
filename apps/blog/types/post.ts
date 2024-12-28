export type PostData = {
  slug: string;
  title: string;
  date: string;
  lastmod?: string;
  tags: string[];
  draft: boolean;
  summary: string;
  canonicalUrl?: string;
};
