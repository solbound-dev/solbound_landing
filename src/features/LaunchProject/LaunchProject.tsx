import React from 'react';

import Button from '@/common/Button';
import VideoSection from '@/common/VideoSection';
import launchProjectContent from '@/content/launchProject.json';
import { cn } from '@/utils/classNames';

const LaunchProject = () => {
  return (
    <VideoSection
      src={'/assets/video/launch-project-astronaut.mp4'}
      dimmedPercentage={0.33}
      className='rounded-b-[24px] overflow-hidden'
    >
      <div className={cn('max-w-[700px] flex flex-col items-center gap-[56px]', 'sm:gap-[72px]')}>
        <h2
          className='h1 text-center max-w-[675px] lg:max-w-max'
          dangerouslySetInnerHTML={{ __html: launchProjectContent.TITLE }}
        />
        <Button>{launchProjectContent.CTA}</Button>
      </div>
    </VideoSection>
  );
};

export default LaunchProject;
