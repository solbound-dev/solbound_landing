import Image from 'next/image';
import React from 'react';

import { cn } from '@/utils/classNames';

const TECHNOLOGIES = [
  {
    src: '/assets/images/tech/metaplex.png',
    alt: 'Metaplex',
    width: 210,
    height: 140,
    classes: cn('col-[1/27] row-[8/27]', 'sm:col-[1/22] sm:row-[8/22]'),
  },
  {
    src: '/assets/images/tech/react.png',
    alt: 'React',
    width: 80,
    height: 200,
    classes: cn('col-[60/71] row-[1/23]', 'sm:col-[70/78] sm:row-[1/21]'),
  },
  {
    src: '/assets/images/tech/rust.png',
    alt: 'Rust',
    width: 220,
    height: 110,
    classes: cn('col-[-28/-1] row-[23/37]', 'sm:col-[-23/-1] sm:row-[25/36]'),
  },
  {
    src: '/assets/images/tech/node.png',
    alt: 'Node',
    width: 250,
    height: 160,
    classes: cn('w-[103%] col-[60/92] row-[46/66]', 'sm:col-[60/85] sm:row-[46/62]'),
  },
  {
    src: '/assets/images/tech/nextJs.png',
    alt: 'NextJS',
    width: 140,
    height: 180,
    classes: cn('col-[30/44] row-[48/66]', 'sm:col-[30/44] sm:row-[48/66]'),
  },
  {
    src: '/assets/images/tech/aws.png',
    alt: 'AWS',
    width: 200,
    height: 110,
    classes: cn('col-[1/24] row-[45/56]', 'sm:col-[1/21] sm:row-[45/56]'),
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
