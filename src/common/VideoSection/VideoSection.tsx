import React from 'react';

import { cn } from '@/utils/classNames';

import Section from '../Section';

export interface VideoSectionProps {
  src: string;
  dimmedPercentage?: number;
  className?: string;
  children?: React.ReactNode;
}

const VideoSection: React.FC<Readonly<VideoSectionProps>> = ({ src, dimmedPercentage = 0, className, children }) => {
  if (dimmedPercentage > 1 || dimmedPercentage < 0) {
    throw new Error('dimmedPercentage must be a value between 0 and 1');
  }

  return (
    <Section className={cn('w-screen max-w-full h-screen p-0', 'sm:p-6', className)}>
      <div className={cn('w-full h-full p-6 flex flex-col justify-center items-center relative z-0')}>{children}</div>
      <div
        className={cn(
          'w-full h-full rounded-none overflow-hidden absolute top-0 left-0 -z-1',
          'sm:w-[calc(100%-48px)] sm:h-[calc(100%-48px)] sm:top-6 sm:left-6 sm:rounded-[24px]',
        )}
      >
        <video
          autoPlay
          loop
          muted
          controls={false}
          height='100%'
          className='w-full h-full object-cover'
        >
          <source
            src={src}
            type='video/mp4'
          />
          Your browser does not support the video tag.
        </video>
        <div
          style={{ opacity: `${dimmedPercentage}` }}
          className='w-full h-full bg-black opacity-50 absolute top-0 left-0 z-1'
        />
      </div>
    </Section>
  );
};

export default VideoSection;
