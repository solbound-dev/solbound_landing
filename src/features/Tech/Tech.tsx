'use client';

import Image from 'next/image';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import Section from '@/common/Section';
import TitleParagraph from '@/common/TitleParagraph';
import techContent from '@/content/tech.json';
import { cn } from '@/utils/classNames';

import Technologies from './Technologies';

const Tech = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  return (
    <Section
      id='tech'
      className='overflow-visible my-[300px]'
    >
      <TitleParagraph
        title={techContent.TITLE}
        paragraph={techContent.PARAGRAPH}
        classes={{ container: 'mb-[80px]', paragraph: 'max-w-[400px]' }}
      />
      <div className={cn('flex justify-center')}>
        <div
          className={cn(
            'hidden lg:block relative translate-x-[-6%] md:translate-x-0 mx-[4px] my-[0px] sm:mx-[120px] sm:my-[200px]',
          )}
        >
          <Image
            src='/assets/images/tech/spaceship.png'
            alt='Spaceship'
            width={500}
            height={320}
          />
          <Technologies />
        </div>
        <div
          ref={ref}
          className={cn('block lg:hidden relative md:translate-x-0 mx-[4px] my-[0px] opacity-0 duration-1000', {
            'opacity-100': inView,
          })}
        >
          <Image
            src='/assets/images/tech/spaceship-mobile.png'
            alt='Spaceship'
            width={500}
            height={320}
          />
        </div>
      </div>
    </Section>
  );
};

export default Tech;
