import React from 'react';
import { twMerge } from 'tailwind-merge';

import VideoSection from '@/common/VideoSection';
import Button from '@/common/Button';

const LaunchProject = () => {
  return (
    <VideoSection
      src={'/assets/video/launch-project-astronaut.mp4'}
      dimmedPercentage={0.33}
      className='rounded-b-[24px] overflow-hidden'
    >
      <div className={twMerge('max-w-[700px] flex flex-col items-center gap-[56px]', 'sm:gap-[72px]')}>
        <h2 className='h1 text-center max-w-[675px] lg:max-w-max'>
          WANNA GO
          <br />
          TO THE MOON?
        </h2>
        <Button>LAUNCH YOUR PROJECT</Button>
      </div>
    </VideoSection>
  );
};

export default LaunchProject;
