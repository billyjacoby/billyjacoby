// @flow strict
import Image from 'next/image';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';

import { timeConverter } from '@/utils/time-converter';

function BlogCard({ blog }: { blog: any }) {
  return (
    <div className="group relative rounded-lg border border-[#1d293a] bg-[#1b203e] transition-all duration-500 hover:border-[#464c6a]">
      <div className="h-44 w-auto cursor-pointer overflow-hidden rounded-t-lg lg:h-52">
        {blog?.cover_image ? (
          <Image
            src={blog?.cover_image}
            height={1080}
            width={1920}
            alt=""
            className="size-full transition-all duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="size-full bg-green-500 transition-all duration-300 group-hover:scale-110" />
        )}
      </div>
      <div className="flex flex-col p-2 sm:p-3">
        <div className="flex items-center justify-between text-sm text-accent-green">
          <p>{timeConverter(blog.published_at)}</p>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1">
              <BsHeartFill />
              <span>{blog.public_reactions_count}</span>
            </p>
            {blog.comments_count > 0 && (
              <p className="flex items-center gap-1">
                <FaCommentAlt />
                <span>{blog.comments_count}</span>
              </p>
            )}
          </div>
        </div>
        <Link target="_blank" href={blog.url}>
          <p className="my-2 cursor-pointer text-lg font-medium text-white hover:text-violet-500 sm:text-xl lg:my-3">
            {blog.title}
          </p>
        </Link>
        <p className="mb-2 text-sm text-accent-green">
          {`${blog.reading_time_minutes} Min Read`}
        </p>
        <p className="line-clamp-3 pb-3 text-sm text-[#d3d8e8] lg:pb-6 lg:text-base">
          {blog.description}
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
