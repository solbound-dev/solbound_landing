'use client';

import Image from 'next/image';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/utils/classNames';

const technologies = (isSm: boolean) => [
  {
    src: isSm ? '/assets/images/tech/metaplex-m.svg' : '/assets/images/tech/metaplex.png',
    alt: 'Metaplex',
    width: isSm ? 54 : 208,
    height: isSm ? 86 : 143,
    classes: isSm ? 'left-[1%] top-[5%]' : 'left-[-23%] top-[-18%]',
  },
  {
    src: isSm ? '/assets/images/tech/react-m.svg' : '/assets/images/tech/react.png',
    alt: 'React',
    width: isSm ? 41 : 81,
    height: isSm ? 132 : 200,
    classes: isSm ? 'right-[3%] top-[-26%]' : 'right-[-8%] top-[-41%]',
  },
  {
    src: isSm ? '/assets/images/tech/rust-m.svg' : '/assets/images/tech/rust.png',
    alt: 'Rust',
    width: isSm ? 52 : 223,
    height: isSm ? 76 : 112,
    classes: isSm ? 'right-[-12%] top-[26%]' : 'right-[-50%] top-[17%]',
  },
  {
    src: isSm ? '/assets/images/tech/node-m.svg' : '/assets/images/tech/node.png',
    alt: 'Node',
    width: isSm ? 100 : 246,
    height: isSm ? 62 : 155,
    classes: isSm ? 'right-[-2%] bottom-[-21%]' : 'right-[-24%] bottom-[-50%]',
  },
  {
    src: isSm ? '/assets/images/tech/nextJs-m.svg' : '/assets/images/tech/nextJs.png',
    alt: 'NextJS',
    width: isSm ? 70 : 140,
    height: isSm ? 75 : 175,
    classes: isSm ? 'right-[47%] bottom-[-27%]' : 'right-[47%] bottom-[-58%]',
  },
  {
    src: isSm ? '/assets/images/tech/aws-m.svg' : '/assets/images/tech/aws.png',
    alt: 'AWS',
    width: isSm ? 77 : 200,
    height: isSm ? 48 : 110,
    classes: isSm ? 'left-[1%] bottom-[-8%]' : 'left-[-23%] bottom-[-36%]',
  },
];

const Technologies = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  if (typeof window === 'undefined') return null;

  return (
    <div ref={ref}>
      {technologies(window.innerWidth < 940).map(({ src, alt, width, height, classes }, i) => (
        <div
          key={alt}
          className={cn(classes, 'absolute z-1')}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <Image
            key={alt}
            src={src}
            layout='fill'
            objectFit='cover'
            alt={alt}
            className={cn('opacity-0 transition-opacity duration-1000', {
              'opacity-100': inView,
            })}
            style={{
              transitionDelay: `${i * 500}ms`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Technologies;
