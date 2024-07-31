import React from 'react';

import Button from '@/common/Button';
import VideoSection from '@/common/VideoSection';
import heroContent from '@/content/hero.json';
import { cn } from '@/utils/classNames';

import SolboundLogotypeSvg from 'public/assets/icon/solbound-logotype.svg';

const Hero = () => {
  return (
    <VideoSection
      src='/assets/video/hero-astronaut.mp4'
      dimmedPercentage={0.2}
    >
      <SolboundLogotypeSvg className={cn('w-[130px] absolute top-14 left-[50%] -translate-x-[50%]', 'sm:top-6')} />
      <div className={cn('max-w-[1020px] flex flex-col items-center gap-[56px]', 'sm:gap-[72px]')}>
        <h2 className='h2 text-center max-w-[675px] lg:max-w-max'>{heroContent.TITLE}</h2>
        <a
          href='https://discord.gg/7EhHfgSB'
          target='_blank'
        >
          <Button>{heroContent.CTA}</Button>
        </a>
      </div>
    </VideoSection>
  );
};

export default Hero;
