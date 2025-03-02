import AboutSection from '@/components/homepage/about';
import Blog from '@/components/homepage/blog';
import Experience from '@/components/homepage/experience';
import HeroSection from '@/components/homepage/hero-section';
import Projects from '@/components/homepage/projects';

import Skills from '@/components/homepage/skills';
import postData from 'data/post-data.json';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = postData.filter((b) => b?.draft !== true);

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
