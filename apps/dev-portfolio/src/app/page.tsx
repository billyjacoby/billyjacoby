import AboutSection from './components/homepage/about';
import Blog from './components/homepage/blog';
import Experience from './components/homepage/experience';
import HeroSection from './components/homepage/hero-section';
import Projects from './components/homepage/projects';

import Skills from '@/app/components/homepage/skills';
import { personalData } from '@/utils/data/personal';

async function getData() {
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  const filtered = data.sort(() => Math.random() - 0.5);

  return filtered;
}

export default async function Home() {
  const blogs = await getData();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Blog blogs={blogs} />
    </>
  );
}
