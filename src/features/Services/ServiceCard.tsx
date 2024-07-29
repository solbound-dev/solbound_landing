'use client';

import Image from 'next/image';
import React, { forwardRef, useRef } from 'react';

import { cn } from '@/utils/classNames';

interface ServiceCardProps {
  label: string;
  src: string;
}

const SUPPORTED_ASSET_EXTENSIONS = ['webp', 'mp4'];

const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(({ label, src }, ref) => {
  const assetExtension = src.split('.')[1];

  if (!SUPPORTED_ASSET_EXTENSIONS.includes(assetExtension)) {
    throw new Error(`ServiceCard supports only ${SUPPORTED_ASSET_EXTENSIONS.join(', ')} assets`);
  }

  return (
    <div
      className='max-w-[448px] max-h-[320px] w-full h-full aspect-[1.4/1] border-[8px] border-[#FFFFFF0D] bg-black rounded-[18px] relative'
      ref={ref}
    >
      {assetExtension === 'mp4' && (
        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className='w-full h-auto absolute top-[50%] left-0 -translate-y-[50%]'
        >
          <source src={src} />
        </video>
      )}
      {assetExtension === 'webp' && (
        <>
          <Image
            src={src}
            alt={label}
            width={448}
            height={320}
            className={cn('w-full h-full object-contain absolute bottom-[50%] left-0 translate-y-[50%] bg-none', {})}
          />
        </>
      )}

      <span className='text-[36px] leading-[40px] max-w-[80%] w-full text-center font-light absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
        {label}
      </span>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
