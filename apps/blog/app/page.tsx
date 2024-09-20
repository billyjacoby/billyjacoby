import AboutSection from '@/components/homepage/about';
import Blog from '@/components/homepage/blog';
import Experience from '@/components/homepage/experience';
import HeroSection from '@/components/homepage/hero-section';
import Projects from '@/components/homepage/projects';

import Skills from '@/components/homepage/skills';
import { allBlogs } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';

export default async function Home() {
  const posts = allCoreContent(sortPosts(allBlogs)).filter(
    (b) => b?.draft !== true
  );

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Blog blogs={posts} />
    </div>
  );
}
