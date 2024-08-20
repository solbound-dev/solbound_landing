'use client';

import React, { MutableRefObject, RefObject, forwardRef, useRef } from 'react';

import { cn } from '@/utils/classNames';

interface ServiceCardProps {
  label: string;
  primarySrc: string;
  primaryMovSrc?: string;
  secondaryWebmSrc?: string;
  secondaryMovSrc?: string;
  secondaryRef?: RefObject<HTMLVideoElement>;
  className?: string;
  onCanPlayPrimary?: VoidFunction;
  onCanPlaySecondary?: VoidFunction;
}

const SUPPORTED_ASSET_EXTENSIONS = ['webm', 'mp4'];

const ServiceCard = forwardRef<HTMLVideoElement, ServiceCardProps>(
  (
    {
      label,
      primaryMovSrc,
      primarySrc,
      secondaryMovSrc,
      secondaryWebmSrc,
      secondaryRef,
      onCanPlayPrimary,
      onCanPlaySecondary,
      className = '',
    },
    ref,
  ) => {
    const assetExtension = primarySrc.split('.')[1];
    const primaryRef = ref as MutableRefObject<HTMLVideoElement> | null;

    if (!SUPPORTED_ASSET_EXTENSIONS.includes(assetExtension)) {
      throw new Error(`ServiceCard supports only ${SUPPORTED_ASSET_EXTENSIONS.join(', ')} assets`);
    }

    return (
      <div
        className={cn(
          'w-full h-full aspect-[1.4/1] grid grid-cols-1 grid-rows-1 border-[8px] border-[#FFFFFF0D] bg-black rounded-[18px] relative',
          className,
        )}
      >
        <div className='grid col-[1/-1] row-[1/-1]'>
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            ref={ref}
            onCanPlay={onCanPlayPrimary}
            className='w-full h-full'
          >
            {primaryMovSrc && (
              <source
                src={primaryMovSrc}
                type='video/quicktime'
              />
            )}
            <source
              src={primarySrc}
              type={`video/${assetExtension}`}
            />
          </video>
        </div>
        {secondaryMovSrc && (
          <div className='grid col-[1/-1] row-[1/-1]'>
            <video
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              ref={secondaryRef}
              onCanPlay={onCanPlaySecondary}
              className='w-full h-full opacity-0'
            >
              <source
                src={secondaryMovSrc}
                type='video/quicktime'
              />
              <source
                src={secondaryWebmSrc}
                type='video/webm'
              />
            </video>
          </div>
        )}

        <span className='text-[36px] leading-[40px] max-w-[80%] w-full text-center font-light absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
          {label}
        </span>
      </div>
    );
  },
);

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
