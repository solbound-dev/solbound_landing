'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BREAKPOINTS } from '@/constants/breakpoints';
import teamContent from '@/content/team.json';
import { cn } from '@/utils/classNames';

import MemberCard from './MemberCard';

const MemberSwiper = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [areSocialsHovered, setAreSocialsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener('mousemove', onMouseMove);
  };

  const removeEventListeners = () => {
    document.removeEventListener('mousemove', onMouseMove);
  };

  const onMouseMove = (e) => {
    const boundingClient = ref.current?.getBoundingClientRect();
    if (!boundingClient) return;
    setPosition({
      x: e.pageX - boundingClient.left - window.scrollX,
      y: e.pageY - boundingClient.top - window.scrollY,
    });
  };

  return (
    <div
      className={cn('relative overflow-hidden ', 'md:!ml-[30%]')}
      ref={ref}
    >
      <div
        className='w-32 h-32 rounded-full overflow-hidden bg-white absolute z-30 flex justify-center items-center pointer-events-none'
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          width: areSocialsHovered ? 0 : undefined,
          height: areSocialsHovered ? 0 : undefined,
          transition: 'width 0.2s, height 0.2s',
        }}
      >
        <h6 className='text-black uppercase text-sm'>DRAG</h6>
      </div>

      <Swiper
        slidesPerView='auto'
        spaceBetween={24}
        breakpoints={{
          [BREAKPOINTS.md]: {
            spaceBetween: 40,
          },
        }}
        className={cn('!overflow-visible [&>div]:overflow-visible select-none')}
      >
        {teamContent.MEMBERS.map(({ IMAGE, NFT_IMAGE, NAME, ROLE, SOCIAL }) => (
          <SwiperSlide
            key={`${NAME}-${ROLE}`}
            className={cn('!w-[220px]', 'md:!w-[330px]')}
          >
            <MemberCard
              image={IMAGE}
              nftImage={NFT_IMAGE}
              name={NAME}
              role={ROLE}
              socials={SOCIAL}
              mouseEnter={() => {
                setAreSocialsHovered(true);
              }}
              mouseLeave={() => {
                setAreSocialsHovered(false);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MemberSwiper;
