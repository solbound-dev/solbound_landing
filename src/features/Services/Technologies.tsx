import Image from 'next/image';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/utils/classNames';

const TECHNOLOGIES = [
  {
    src: '/assets/images/tech/metaplex.png',
    alt: 'Metaplex',
    width: 210,
    height: 140,
    classes: 'col-[1/27] row-[8/27]',
  },
  {
    src: '/assets/images/tech/react.png',
    alt: 'React',
    width: 80,
    height: 200,
    classes: 'col-[60/71] row-[1/23]',
  },
  {
    src: '/assets/images/tech/rust.png',
    alt: 'Rust',
    width: 220,
    height: 110,
    classes: 'col-[-28/-1] row-[23/37]',
  },
  {
    src: '/assets/images/tech/node.png',
    alt: 'Node',
    width: 250,
    height: 160,
    classes: 'w-[103%] col-[60/92] row-[46/66]',
  },
  {
    src: '/assets/images/tech/nextJs.png',
    alt: 'NextJS',
    width: 140,
    height: 180,
    classes: 'col-[30/44] row-[48/66]',
  },
  {
    src: '/assets/images/tech/aws.png',
    alt: 'AWS',
    width: 200,
    height: 110,
    classes: 'col-[1/24] row-[45/56]',
  },
];

const Technologies = () => {
  return (
    <div className='w-full max-w-[1000px] aspect-[1000/660] grid grid-cols-[repeat(100,minmax(0,1fr))] grid-rows-[repeat(66,minmax(0,1fr))]'>
      {TECHNOLOGIES.map(({ src, alt, classes }, i) => (
        <div
          key={alt}
          className={cn('relative w-full h-full z-1', classes)}
        >
          <Image
            key={alt}
            src={src}
            layout='fill'
            objectFit='cover'
            alt={alt}
          />
        </div>
      ))}
    </div>
  );
};

export default Technologies;
