'use client';

import dynamic from 'next/dynamic';

// `lottie-web` calls `document.createElement` at module scope, so it cannot be
// evaluated during SSR/prerender. Loading it browser-only keeps the pages that
// use it statically renderable.
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const AnimationLottie = ({
  animationPath,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationPath: any;
  width?: number;
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPath,
    style: {
      width: '95%',
    },
  };

  return <Lottie {...defaultOptions} />;
};

export default AnimationLottie;
