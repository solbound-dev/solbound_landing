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
      <div
        className={cn(
          'w-full absolute top-[50%] flex justify-center translate-y-[50%] z-10 px-2',
          'md:px-8 -translate-y-[5%]',
        )}
      >
        <div className={cn('w-full flex justify-between max-w-[1400px]')}>
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
        {projectsContent.PROJECTS.map(({ NAME, IMAGE, BACKGROUND, XHANDLE, YEAR, CLIENT, TAGS, XURL }) => (
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
              xUrl={XURL}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProjectSwiper;
