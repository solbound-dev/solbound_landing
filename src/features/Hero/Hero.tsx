'use server';

import React from 'react';

import SolboundLogotypeSvg from 'public/assets/icon/solbound-logotype.svg';
import Button from '@/common/Button';
import VideoSection from '@/common/VideoSection';
import { twMerge } from 'tailwind-merge';

const Hero = () => {
  return (
    <VideoSection
      src='/assets/video/hero-astronaut.mp4'
      dimmedPercentage={0.2}
    >
      <SolboundLogotypeSvg className={twMerge('w-[95px] absolute top-14 left-[50%] -translate-x-[50%]', 'sm:top-6')} />
      <div className={twMerge('flex flex-col items-center gap-[56px]', 'sm:gap-[72px]')}>
        <h2 className='h1 text-center max-w-[675px] lg:max-w-max'>NAVIGATE THE WEB3 COSMOS WITH US</h2>
        <Button>LAUNCH YOUR PROJECT</Button>
      </div>
    </VideoSection>
  );
};

export default Hero;
