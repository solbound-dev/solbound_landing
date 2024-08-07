'use client';

import React, { RefObject, forwardRef, useRef } from 'react';

import { cn } from '@/utils/classNames';

interface ServiceCardProps {
  label: string;
  primarySrc: string;
  primaryMovSrc?: string;
  secondaryWebmSrc?: string;
  secondaryMovSrc?: string;
  secondaryRef?: RefObject<HTMLVideoElement>;
  className?: string;
}

const SUPPORTED_ASSET_EXTENSIONS = ['webm', 'mp4'];

const ServiceCard = forwardRef<HTMLVideoElement, ServiceCardProps>(
  ({ label, primaryMovSrc, primarySrc, secondaryMovSrc, secondaryWebmSrc, secondaryRef, className = '' }, ref) => {
    const assetExtension = primarySrc.split('.')[1];

    if (!SUPPORTED_ASSET_EXTENSIONS.includes(assetExtension)) {
      throw new Error(`ServiceCard supports only ${SUPPORTED_ASSET_EXTENSIONS.join(', ')} assets`);
    }

    return (
      <div
        className={cn(
          'w-full h-full aspect-[1.4/1] border-[8px] border-[#FFFFFF0D] bg-black rounded-[18px] relative',
          className,
        )}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          ref={ref}
          className='w-full h-auto absolute top-[50%] left-0 -translate-y-[50%]'
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
        {secondaryMovSrc && secondaryRef && (
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            ref={secondaryRef}
            className='w-full h-auto absolute top-[50%] left-0 -translate-y-[50%] opacity-0'
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
