import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { POSTS_FOLDER } from '@/lib/constants';
import matter from 'gray-matter';
import { PostData } from 'types/post';

function getAllPostFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });

  return entries.reduce<string[]>((files, entry) => {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively get files from subdirectories
      return [...files, ...getAllPostFiles(fullPath)];
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      // Only include .mdx files
      return [...files, fullPath];
    }

    return files;
  }, []);
}

// Export the main function for external use
export async function generatePostData() {
  const postFiles = getAllPostFiles(POSTS_FOLDER);

  const datas = postFiles.reduce<{
    tagData: { [key: string]: number };
    postData: PostData[];
  }>(
    (acc, fullPath) => {
      try {
        const fileContents = readFileSync(fullPath, 'utf8');
        const slug = fullPath
          .replace(POSTS_FOLDER, '')
          .replace('.mdx', '')
          .replace('/', '');
        const { data } = matter(fileContents);
        acc.postData.push({ ...data, slug } as PostData);

        if (data.tags?.length) {
          for (const tag of data.tags) {
            acc.tagData[tag] = (acc.tagData[tag] || 0) + 1;
          }
        }
      } catch (_error) {
        // Skip if file can't be read
      }
      return acc;
    },
    { tagData: {}, postData: [] }
  );

  const tagOutputPath = join(process.cwd(), './data/tag-data.json');
  const dataOutputPath = join(process.cwd(), './data/post-data.json');
  mkdirSync(dirname(tagOutputPath), { recursive: true });
  mkdirSync(dirname(dataOutputPath), { recursive: true });
  writeFileSync(tagOutputPath, JSON.stringify(datas.tagData, null, 2));
  writeFileSync(dataOutputPath, JSON.stringify(datas.postData, null, 2));
}

// Keep the direct execution for running via script
if (require.main === module) {
  generatePostData();
}
