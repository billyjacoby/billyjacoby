/* eslint-disable @typescript-eslint/no-explicit-any */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const importAll = (r: any): Promise<any[]> =>
  Promise.all(
    r.keys().map(async (fileName: string) => {
      const page = r(fileName);
      const frontmatter = page.frontmatter || {};

      const slug = fileName.slice(2).replace(/\.mdx$/, '');

      return {
        author: frontmatter.author,
        component: page.default,
        date: frontmatter.date ? new Date(frontmatter.date) : new Date(),
        description: frontmatter.description,
        slug,
        title: frontmatter.title,
      };
    })
  );

export const getAllPosts = async (): Promise<any[]> =>
  importAll(
    //@ts-expect-error - this is a dynamic import
    require.context('../posts', true, /\.mdx$/)
  );

export const getPostBySlug = async (slug: string): Promise<any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const post = require(`../posts/${slug}.mdx`);
    const frontmatter = post.frontmatter || {};

    return {
      ...frontmatter,
      component: post.default,
      date: frontmatter.date ? new Date(frontmatter.date) : new Date(),
      slug,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    throw error;
  }
};
