import Image from 'next/image';
// import { BsPersonWorkspace } from 'react-icons/bs';

import AnimationLottie from '@/components/helper/animation-lottie';
import GlowCard from '@/components/helper/glow-card';
import experience from '../../public/lottie/code.json';
import { experiences } from '@/data/experience';

function Experience() {
  return (
    <div
      id="experience"
      className="relative z-50 my-12 border-t border-[#25213b] lg:my-24"
    >
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="my-5 flex justify-center lg:py-8">
        <div className="flex  items-center">
          <span className="h-[2px] w-24 bg-[#1a1443]"></span>
          <span className="w-fit rounded-md bg-[#1a1443] p-2 px-5 text-xl text-white">
            Experience
          </span>
          <span className="h-[2px] w-24 bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex items-start justify-center">
            <div className="size-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {experiences.map((exp) => (
                <GlowCard key={exp.id} identifier={`experience-${exp.id}`}>
                  <div className="relative p-3">
                    <Image
                      src="/blur-23.svg"
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />
                    <div className="flex justify-center">
                      <p className="text-xs text-accent-green sm:text-sm">
                        {exp.start} - {exp.end}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-8 px-3 py-5">
                      <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                        {/* //TODO */}
                        {/* <BsPersonWorkspace size={36} /> */}
                      </div>
                      <div>
                        <p className="mb-2 text-base font-medium uppercase sm:text-xl">
                          {exp.title}
                        </p>
                        <p className="text-sm sm:text-base">{exp.company}</p>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
