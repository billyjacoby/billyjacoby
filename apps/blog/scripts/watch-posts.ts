import { POSTS_FOLDER } from '@/lib/constants';
import { watch } from 'node:fs';
import { generatePostData } from './get-post-data';

let timeoutId: NodeJS.Timeout | null = null;

function watchPosts() {
  console.log(`Watching for changes in ${POSTS_FOLDER}`);

  // Initial generation
  generatePostData();

  // Watch for changes
  watch(POSTS_FOLDER, { recursive: true }, async (eventType, filename) => {
    if (!filename?.endsWith('.mdx')) return;

    // Debounce the regeneration to avoid multiple runs for simultaneous changes
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      console.log(`Changes detected in posts folder: ${filename}`);
      await generatePostData();
      console.log('Post data regenerated');
    }, 300);
  });
}

if (require.main === module) {
  watchPosts();
}

export { watchPosts };
