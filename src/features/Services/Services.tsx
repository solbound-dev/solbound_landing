'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import React, { useRef } from 'react';

import Section from '@/common/Section';
import TitleParagraph from '@/common/TitleParagraph';
import servicesContent from '@/content/services.json';
import techContent from '@/content/tech.json';
import { useGSAP } from '@gsap/react';

import ServiceCard from './ServiceCard';
import Technologies from './Technologies';

const Services = () => {
  const primaryVideoRef = useRef<HTMLVideoElement | null>(null);
  const destructuredVideoRef = useRef<HTMLVideoElement>(null);
  const placeholderRef = useRef<HTMLImageElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(useGSAP, ScrollTrigger);

      const primaryVideo = primaryVideoRef.current;
      const destructuredVideo = destructuredVideoRef.current;
      const placeholderImage = placeholderRef.current;
      const boundingClient = primaryVideo?.getBoundingClientRect();
      const techSection = techRef.current;

      if (primaryVideo && boundingClient && destructuredVideo && placeholderImage && techSection) {
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.refresh();

        // this is just for type safety
        // set sectionBoundingClient to videoBounding client in case that section is not found
        const sectionClient = document.querySelector('#services')?.getBoundingClientRect() || boundingClient;
        const placeholderClient = placeholderImage?.getBoundingClientRect() || boundingClient;
        const techClient = techSection?.getBoundingClientRect() || boundingClient;

        const sectionTop = sectionClient.top + document.body.scrollTop;
        const primaryVideoTop = boundingClient.top + document.body.scrollTop;
        const placeholderTop = placeholderClient.top + document.body.scrollTop;
        const techTop = techClient.top + document.body.scrollTop;

        const scale = window.innerWidth / boundingClient.width;
        const clientMiddle = boundingClient.left + boundingClient.width / 2;
        const xMiddleTransform = window.innerWidth / 2 - clientMiddle;

        const distanceFromSectionTop = primaryVideoTop + boundingClient.height / 2 - sectionTop;
        const yPinStart = (distanceFromSectionTop / sectionClient.height) * 100;
        const destructuredScale = (1.4 * placeholderClient.width) / boundingClient.width;

        const placeholderMiddle = placeholderTop + placeholderClient.height / 2 - sectionTop;
        const yPinEnd = (placeholderMiddle / sectionClient.height) * 100;
        const xPlaceholderTransform = placeholderClient.left + placeholderClient.width / 2 - clientMiddle;

        const techSectionMiddle = techTop - sectionTop;
        const techMiddlePercentage = (techSectionMiddle / sectionClient.height) * 100;

        const primaryVideoTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#services',
            start: `${yPinStart}% 50%`,
            end: `${yPinEnd}% 50%`,
            scrub: 1,
            toggleActions: 'play complete complete play',
          },
        });

        primaryVideoTimeline.to(primaryVideo, {
          x: xMiddleTransform,
          height: 'auto',
          scale,
          duration: 3,
        });

        primaryVideoTimeline.to(primaryVideo, {
          opacity: 0.9,
          duration: 3,
        });

        primaryVideoTimeline.to(primaryVideo, {
          opacity: 0.01,
          duration: 3,
          scale: destructuredScale,
          x: xPlaceholderTransform,
        });

        const descruturedImageTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#services',
            start: `${yPinStart}% 50%`,
            end: `${yPinEnd}% 50%`,
            scrub: 1,
          },
        });

        descruturedImageTimeline.to(destructuredVideo, {
          x: xMiddleTransform,
          height: 'auto',
          scale,
          duration: 3,
        });

        descruturedImageTimeline.to(destructuredVideo, {
          opacity: 0.7,
          duration: 3,
        });

        descruturedImageTimeline.to(destructuredVideo, {
          opacity: 1,
          duration: 3,
          scale: destructuredScale,
          x: xPlaceholderTransform,
        });

        ScrollTrigger.create({
          trigger: '#services',
          pin: primaryVideo,
          start: `${yPinStart}% 50%`,
          end: `${yPinEnd}% 50%`,
          pinSpacing: false,
        });

        ScrollTrigger.create({
          trigger: '#services',
          pin: destructuredVideo,
          start: `${yPinStart}% 50%`,
          end: `${yPinEnd}% 50%`,
          pinSpacing: false,
        });

        ScrollTrigger.create({
          trigger: '#services',
          start: `${techMiddlePercentage}% bottom`,
          end: `${techMiddlePercentage}% bottom`,
          onEnter: () => techSection?.classList.toggle('opacity-100'),
          onLeaveBack: () => techSection?.classList.remove('opacity-100'),
        });

        const resetState = () => {
          ScrollTrigger.clearScrollMemory();
          window.history.scrollRestoration = 'manual';
        };

        window.addEventListener('beforeunload', resetState);

        return () => {
          window.removeEventListener('beforeunload', resetState);
        };
      }
    },
    { dependencies: [primaryVideoRef, destructuredVideoRef, placeholderRef, techRef], revertOnUpdate: true },
  );

  return (
    <Section
      id='services'
      className='flex flex-col items-end py-[100px]'
    >
      <TitleParagraph
        title={servicesContent.TITLE}
        paragraph={servicesContent.PARAGRAPH}
        classes={{ container: 'w-full mb-[80px]', paragraph: 'max-w-[630px]' }}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-full max-w-[920px]'>
        <ServiceCard
          primarySrc={'/assets/video/services-transparent/spaceship-2.mp4'}
          label='Web3 Gaming'
        />
        <ServiceCard
          primarySrc={'/assets/video/services-transparent/spaceship-3.mp4'}
          label='Consulting'
        />
        <ServiceCard
          primarySrc={'/assets/video/services-transparent/spaceship-1.webm'}
          primaryMovSrc={'/assets/video/services-transparent/spaceship-1.mov'}
          secondaryWebmSrc={'/assets/video/services-transparent/spaceship-1-destructuring.webm'}
          secondaryMovSrc='/assets/video/services-transparent/spaceship-1-destructuring.mov'
          label='Blockchain Tooling'
          ref={primaryVideoRef}
          secondaryRef={destructuredVideoRef}
          className='order-last md:order-[unset]'
        />
        <ServiceCard
          primarySrc={'/assets/video/services-transparent/spaceship-4.mp4'}
          label='Custom Web3 projects'
        />
      </div>
      <div className='hidden md:block h-screen w-full' />
      <div className='hidden md:block h-screen w-full' />
      <div className='h-screen w-full' />
      <div
        ref={techRef}
        className='w-full opacity-0 transition-opacity duration-500'
      >
        <TitleParagraph
          title={techContent.TITLE}
          paragraph={techContent.PARAGRAPH}
          classes={{ container: 'mb-[80px]', paragraph: 'max-w-[400px]' }}
        />
        <div className='flex justify-center'>
          <div className='relative w-full max-w-[1000px]'>
            <Image
              src='/assets/images/tech/spaceship.png'
              alt='Spaceship'
              className='absolute w-[70%] left-[44%] top-[45%] -translate-x-1/2 -translate-y-1/2 opacity-0'
              ref={placeholderRef}
              width={500}
              height={320}
            />
            <Technologies />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Services;
