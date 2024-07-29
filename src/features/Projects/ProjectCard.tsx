import Image from 'next/image';
import React from 'react';

import projectsContent from '@/content/projects.json';
import { cn } from '@/utils/classNames';

export interface ProjectCardProps {
  name: string;
  image: string;
  background: string;
  xHandle: string;
  year: number;
  client: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, image, background, xHandle, year, client, tags }) => {
  return (
    <div
      className={cn('w-full max-w-[1440px] m-auto flex flex-col justify-end px-8 pb-[64px] z-0 relative', 'md:pb-0')}
    >
      <div
        style={{ background: background }}
        className={cn(
          'absolute bottom-[64px] left-[50%] -translate-x-[50%] w-screen h-[calc(100%+300px)] -z-1',
          'md:h-[calc(100%+800px)] md:bottom-0',
        )}
      />
      <div className='flex flex-col items-center w-[100%] m-auto'>
        <div className={cn('max-w-[100%] w-full', 'md:w-auto', 'lg:min-w-[875px] lg:-mb-[320px]', '2xl:-mb-[400px]')}>
          <div className={cn('flex justify-between items-center mb-[148px]', 'md:mb-6')}>
            <h3 className={cn('h6 hidden', 'md:block')}>{projectsContent.TITLE}</h3>
            <h4 className={cn('h6 hidden', 'md:block')}>{projectsContent.SUBTITLE}</h4>
            <h3 className={cn('h6', 'md:hidden')}>{projectsContent.MOBILE_TITLE}</h3>
          </div>
          <div className='whitespace-nowrap'>
            <h1
              className={cn(
                'inline-block',
                'h1 mix-blend-soft-light mb-6 text-[55px] leading-[44px]',
                'md:text-[100px] md:leading-[86px]',
                'lg:text-[170px] lg:leading-[166px] lg:h-[320px]',
                '2xl:text-[257px] 2xl:leading-[214px] 2xl:h-[428px]',
              )}
              style={{ animation: 'scrolling-left1 20s linear infinite' }}
            >
              &nbsp;&nbsp;&nbsp;{name}
            </h1>
            <h1
              className={cn(
                'inline-block',
                'h1 mix-blend-soft-light mb-6 text-[55px] leading-[44px]',
                'md:text-[100px] md:leading-[86px]',
                'lg:text-[170px] lg:leading-[166px] lg:h-[320px]',
                '2xl:text-[257px] 2xl:leading-[214px] 2xl:h-[428px]',
              )}
              style={{ animation: 'scrolling-left2 20s linear infinite', animationDelay: '10s' }}
            >
              &nbsp;&nbsp;&nbsp;{name}
            </h1>
          </div>
          <div className='w-full flex justify-between items-center'>
            <div>
              <div className='h6 uppercase'>{xHandle}</div>
              <div className='h6 uppercase'>{year}</div>
            </div>
            <div>
              <div className='h6 uppercase text-right'>CLIENT</div>
              <div className='h6 uppercase text-right'>{client}</div>
            </div>
          </div>
        </div>

        <Image
          src={image}
          alt={name}
          width={1166}
          height={656}
          className={cn('relative z-10 ml-8 min-w-[550px] max-w-[800px] w-full', '2xl:max-w-[1166px]')}
        />

        <div
          className={cn(
            'w-screen px-4 flex flex-wrap justify-center items-center gap-2 absolute bottom-[16px] left-[50%] -translate-x-[50%] z-20',
            'md:bottom-[16px]',
            'lg:bottom-[48px]',
          )}
        >
          {tags.map((tag) => (
            <div
              key={tag}
              className={cn('py-3 px-4 bg-black rounded-[50px] text-[12px]', 'lg:py-6 lg:px-14')}
            >
              <span className='text-[#FFFFFF80]'>#</span>
              {tag}
            </div>
          ))}
        </div>

        <div
          className={cn('w-screen absolute -bottom-0 h-[135px] z-10', 'md:hidden')}
          style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 52.65%)' }}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
