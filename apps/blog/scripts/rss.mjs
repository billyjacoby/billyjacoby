import { mkdirSync, writeFileSync } from 'fs';
import GithubSlugger from 'github-slugger';
import path from 'path';
import { sortPosts } from 'pliny/utils/contentlayer.js';
import { escape } from 'pliny/utils/htmlEscaper.js';
import tagData from '../data/tag-data.json' with { type: 'json' };
import postData from '../data/post-data.json' with { type: 'json' };
import siteMetadata from '../data/siteMetadata.js';

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`;

const generateRss = (config, posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/blog</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${
        config.siteUrl
      }/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`;

async function generateRSS(config, allBlogs, page = 'feed.xml') {
  const publishPosts = allBlogs.filter((post) => post.draft !== true);
  // RSS for blog post
  if (publishPosts.length > 0) {
    const rss = generateRss(config, sortPosts(publishPosts));
    writeFileSync(`./public/${page}`, rss);
  }

  if (publishPosts.length > 0) {
    // tag-data.json stores human-readable tag names; URLs use the slugged form.
    for (const tag of Object.keys(tagData)) {
      const tagSlug = GithubSlugger.slug(tag);
      const filteredPosts = publishPosts.filter((post) =>
        post.tags?.map((t) => GithubSlugger.slug(t)).includes(tagSlug)
      );
      if (filteredPosts.length === 0) continue;
      const rss = generateRss(
        config,
        sortPosts(filteredPosts),
        `tags/${tagSlug}/${page}`
      );
      const rssPath = path.join('public', 'tags', tagSlug);
      mkdirSync(rssPath, { recursive: true });
      writeFileSync(path.join(rssPath, page), rss);
    }
  }
}

const rss = () => {
  generateRSS(siteMetadata, postData);
  console.log('RSS feed generated...');
};
export default rss;
