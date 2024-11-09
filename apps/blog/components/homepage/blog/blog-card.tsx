import Image from 'next/image';
import Link from 'next/link';

import { timeConverter } from '@/lib/utils';
import type { Blog } from 'contentlayer/generated';
import type { CoreContent } from 'pliny/utils/contentlayer';

function BlogCard({ blog }: { blog: CoreContent<Blog> }) {
  const titleInitials = blog.title.slice(0, 2);
  const [firstLetter, secondLetter] = [
    titleInitials.charAt(0).toUpperCase(),
    titleInitials.charAt(1).toLowerCase(),
  ];

  return (
    <div className="group relative rounded-lg border border-[#1d293a] bg-[#1b203e] transition-all duration-500 hover:border-[#464c6a]">
      <div className="h-44 w-auto overflow-hidden rounded-t-lg lg:h-52">
        {blog?.images ? (
          <Image
            src={blog?.images?.[0]}
            height={1080}
            width={1920}
            alt=""
            className="size-full transition-all duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="size-full bg-gradient-to-br from-violet-600 to-violet-400 transition-all duration-300 group-hover:scale-110">
            <div className="flex size-full items-center justify-center">
              <span className="text-white/90">
                <span className="text-[8rem] font-bold leading-none">
                  {firstLetter}
                </span>
                <span className="text-[6rem] font-semibold leading-none">
                  {secondLetter}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col p-2 sm:p-3">
        <div className="flex items-center justify-between text-sm text-accent-green">
          <p>{timeConverter(blog.date)}</p>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1">
              {/* //TODO */}
              {/* <BsHeartFill /> */}
              {/* <span>{blog.public_reactions_count}</span> */}
            </p>
          </div>
        </div>
        <Link href={blog.canonicalUrl ?? blog.path}>
          <p className="my-2 cursor-pointer text-lg font-medium text-white hover:text-violet-500 sm:text-xl lg:my-3">
            {blog.title}
          </p>
        </Link>
        <p className="mb-2 text-sm text-accent-green">
          {`${blog.readingTime?.text} `}
        </p>
        <p className="line-clamp-3 pb-3 text-sm text-[#d3d8e8] lg:pb-6 lg:text-base">
          {blog.summary}
        </p>
        {/* <div className="">
          <Link target='_blank' href={blog.url}>
            <button className='bg-violet-500 text-white px-3 py-1.5 rounded-full text-xs'>
              Read More
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default BlogCard;
