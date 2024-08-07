'use client';

import React, { useLayoutEffect, useRef } from 'react';

import Section from '@/common/Section';
import TitleParagraph from '@/common/TitleParagraph';
import servicesContent from '@/content/services.json';

import ServiceCard from './ServiceCard';

const Services = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const resultRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const callback = (event: Event) => {
      const element = ref.current;
      const resultElement = resultRef.current;

      if (!element || !resultElement) {
        return;
      }

      const { top, left } = element.getBoundingClientRect();

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const offset = viewportHeight / 2 - top;

      const imageElement = Array.from(element.childNodes).find((entry) => entry.nodeName === 'IMG');

      const scale = resultElement.clientWidth / element.clientWidth - 1;

      if (!imageElement) {
        return;
      }

      const middle = viewportWidth / 2;
      const targetLeft = middle - resultElement.clientWidth / 2;

      if (offset > 0 && top > -element.clientHeight) {
        const percentage = 1 - (top + element.clientHeight) / (viewportHeight / 2 + element.clientHeight);

        console.log(targetLeft, left);
        (imageElement as HTMLImageElement).style.scale = `${scale * percentage + 1}`;
        (imageElement as HTMLImageElement).style.transform =
          `translate3d(0, calc(50% + ${percentage * (targetLeft - left)}), 0)`;
      } else if (offset > 0 && top < -element.clientHeight) {
        (imageElement as HTMLImageElement).style.scale = `${scale + 1}`;
      } else {
        (imageElement as HTMLImageElement).style.scale = '1';
      }
    };

    document.addEventListener('scroll', callback);

    return () => {
      document.removeEventListener('scroll', callback);
    };
  }, []);

  return (
    <>
      <Section
        id='services'
        className='flex flex-col items-end py-[100px]'
      >
        <TitleParagraph
          title={servicesContent.TITLE}
          paragraph={servicesContent.PARAGRAPH}
          classes={{ container: 'w-full mb-[80px]', paragraph: 'max-w-[630px]' }}
        />
        <div className='flex flex-wrap gap-[24px] w-full max-w-[920px]'>
          <ServiceCard
            src={'/assets/video/services/spaceship-2.mp4'}
            label='Web3 Gaming'
          />
          <ServiceCard
            src={'/assets/video/services/spaceship-3.mp4'}
            label='Consulting'
          />
          <ServiceCard
            src={'/assets/video/services/spaceship-1.mp4'}
            label='Blockchain Tooling'
            ref={ref}
          />
          <ServiceCard
            src={'/assets/video/services/spaceship-4.mp4'}
            label='Custom Web3 projects'
          />
        </div>
      </Section>
    </>
  );
};

export default Services;
