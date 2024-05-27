'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BREAKPOINTS } from '@/constants/breakpoints';
import teamContent from '@/content/team.json';
import { cn } from '@/utils/classNames';

import MemberCard from './MemberCard';

const MemberSwiper = () => {
  return (
    <Swiper
      slidesPerView='auto'
      spaceBetween={24}
      breakpoints={{
        [BREAKPOINTS.md]: {
          spaceBetween: 40,
        },
      }}
      className={cn('!overflow-visible [&>div]:overflow-visible select-none', 'md:!pl-[30%]')}
    >
      {teamContent.MEMBERS.map(({ IMAGE, NFT_IMAGE, NAME, ROLE, SOCIAL }) => (
        <SwiperSlide
          key={`${NAME}-${ROLE}`}
          className={cn('!w-[260px]', 'md:!w-[330px]')}
        >
          <MemberCard
            image={IMAGE}
            nftImage={NFT_IMAGE}
            name={NAME}
            role={ROLE}
            socials={SOCIAL}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MemberSwiper;
