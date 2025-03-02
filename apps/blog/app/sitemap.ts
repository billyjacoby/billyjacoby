import siteMetadata from '@/data/siteMetadata';
import postData from 'data/post-data.json';
import { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;
  const blogRoutes = postData.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: post.date,
  }));

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogRoutes];
}
