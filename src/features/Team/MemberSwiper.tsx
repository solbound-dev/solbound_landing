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
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener('pointermove', onMouseMove);
  };

  const removeEventListeners = () => {
    document.removeEventListener('pointermove', onMouseMove);
  };

  const onMouseMove = (e: PointerEvent) => {
    const boundingClient = ref.current?.getBoundingClientRect();
    if (!boundingClient) return;
    if (e.pointerType === 'touch') {
      setPosition({
        x: -1000,
        y: -1000,
      });
      return;
    }
    setPosition({
      x: e.pageX - boundingClient.left - window.scrollX,
      y: e.pageY - boundingClient.top - window.scrollY,
    });
  };

  const getWidthAndHeight = () => {
    if (areSocialsHovered || !isCursorVisible) {
      return { height: 0, width: 0 };
    }

    return { height: undefined, width: undefined };
  };

  return (
    <div
      className={cn('relative cursor-none')}
      ref={ref}
      onMouseEnter={() => setIsCursorVisible(true)}
      onMouseLeave={() => setIsCursorVisible(false)}
    >
      <div
        className='w-32 h-32 rounded-full overflow-hidden bg-white absolute z-30 flex justify-center items-center pointer-events-none'
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          transition: 'width 0.2s, height 0.2s',
          ...getWidthAndHeight(),
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
        className={cn('!overflow-visible [&>div]:overflow-visible select-none md:[&>div]:pl-[30%]')}
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
        {/* Swiper hack  */}
        <SwiperSlide className={cn('!w-[220px]', 'md:!w-[330px]')} />
      </Swiper>
    </div>
  );
};

export default MemberSwiper;
