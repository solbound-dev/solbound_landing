import React, { useRef, useState } from 'react';
import { EffectFade } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import projectsContent from '@/content/projects.json';
import { cn } from '@/utils/classNames';

import NavigationButton from './NavigationButton';
import ProjectCard from './ProjectCard';

const ProjectSwiper = () => {
  const [swiper, setSwiper] = useState<SwiperClass>();

  return (
    <>
      <div className='w-full max-w-[1440px] h-full flex items-center absolute bottom-0 left-[50%] -translate-x-[50%] z-10'>
        <div className={cn('w-full flex justify-between mt-[115px] p-2', 'md:p-8')}>
          <NavigationButton
            direction='left'
            onClick={() => swiper?.slidePrev()}
          />
          <NavigationButton onClick={() => swiper?.slideNext()} />
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        className='!overflow-visible [&>div]:overflow-visible'
        onSwiper={(swiper) => setSwiper(swiper)}
        modules={[EffectFade]}
        fadeEffect={{ crossFade: true }}
        effect='fade'
        rewind
      >
        {projectsContent.PROJECTS.map(({ NAME, IMAGE, BACKGROUND, XHANDLE, YEAR, CLIENT, TAGS }) => (
          <SwiperSlide
            key={NAME}
            className='!w-screen'
          >
            <ProjectCard
              name={NAME}
              image={IMAGE}
              background={BACKGROUND}
              xHandle={XHANDLE}
              year={YEAR}
              client={CLIENT}
              tags={TAGS}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProjectSwiper;
