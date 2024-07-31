import Image from 'next/image';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/utils/classNames';

const TECHNOLOGIES = [
  {
    src: '/assets/images/tech/metaplex.png',
    alt: 'Metaplex',
    width: 208,
    height: 143,
    classes: 'left-[-23%] top-[-18%]',
  },
  {
    src: '/assets/images/tech/react.png',
    alt: 'React',
    width: 81,
    height: 200,
    classes: 'right-[-8%] top-[-41%]',
  },
  {
    src: '/assets/images/tech/rust.png',
    alt: 'Rust',
    width: 223,
    height: 112,
    classes: 'right-[-50%] top-[17%]',
  },
  {
    src: '/assets/images/tech/node.png',
    alt: 'Node',
    width: 246,
    height: 155,
    classes: 'right-[-24%] bottom-[-50%]',
  },
  {
    src: '/assets/images/tech/nextJs.png',
    alt: 'NextJS',
    width: 140,
    height: 175,
    classes: 'right-[47%] bottom-[-58%]',
  },
  {
    src: '/assets/images/tech/aws.png',
    alt: 'AWS',
    width: 200,
    height: 110,
    classes: 'left-[-23%] bottom-[-36%]',
  },
];

const Technologies = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  if (typeof window === 'undefined') return null;

  return (
    <div ref={ref}>
      {TECHNOLOGIES.map(({ src, alt, width, height, classes }, i) => (
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
          />
        </div>
      ))}
    </div>
  );
};

export default Technologies;
