import Image from 'next/image';
import Link from 'next/link';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaTwitterSquare } from 'react-icons/fa';

import { FancyCodeBlock } from './fancy-codeblock';

import { personalData } from '@/utils/data/personal';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

      <div className="grid grid-cols-1 items-start gap-y-8 lg:grid-cols-2 lg:gap-12">
        <div className="order-2 flex flex-col items-start justify-center p-2 lg:order-1 lg:pt-10">
          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            Hello, <br />
            I'm <span className=" text-pink-500">{personalData.name}</span>
            {", I'm a Professional "}
            <span className=" text-accent-green">
              {personalData.designation}
            </span>
            .
          </h1>

          <div className="my-12 flex w-full items-center justify-evenly gap-5">
            <Link
              href={personalData.github}
              target="_blank"
              className="text-pink-500 transition-all duration-300 hover:scale-125"
            >
              <BsGithub size={60} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target="_blank"
              className="text-pink-500 transition-all duration-300 hover:scale-125"
            >
              <BsLinkedin size={60} />
            </Link>
            <Link
              href={personalData.twitter}
              target="_blank"
              className="text-pink-500 transition-all duration-300 hover:scale-125"
            >
              <FaTwitterSquare size={60} />
            </Link>
          </div>
        </div>
        <div className="relative order-1 rounded-lg border border-[#1b2c68a0] bg-gradient-to-r from-[#0d1224] to-[#0a0d37] lg:order-2">
          <div className="flex flex-row">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-px w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>
          <div className="px-4 py-5 lg:px-8">
            <div className="flex flex-row space-x-2">
              <div className="size-3 rounded-full bg-red-400"></div>
              <div className="size-3 rounded-full bg-orange-400"></div>
              <div className="size-3 rounded-full bg-green-200"></div>
            </div>
          </div>
          <div className="overflow-hidden border-t-2 border-indigo-900 p-4 lg:p-8">
            <FancyCodeBlock />
          </div>
        </div>
      </div>
    </section>
  );
}
