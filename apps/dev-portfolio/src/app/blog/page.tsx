import BlogCard from '../components/homepage/blog/blog-card';

import { personalData } from '@/utils/data/personal';

async function getBlogs() {
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}

async function page() {
  const blogs = await getBlogs();

  return (
    <div className="py-8">
      <div className="my-5 flex justify-center lg:py-8">
        <div className="flex  items-center">
          <span className="h-[2px] w-24 bg-[#1a1443]"></span>
          <span className="w-fit rounded-md bg-[#1a1443] p-2 px-5 text-2xl text-white">
            All Blog
          </span>
          <span className="h-[2px] w-24 bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:gap-8 xl:gap-10">
        {blogs.map((blog, i) => (
          <BlogCard blog={blog} key={i} />
        ))}
      </div>
    </div>
  );
}

export default page;
