import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Icon, LabelToIconMap } from '@/constants/labelToIconMap';
import { cn } from '@/utils/classNames';

import SocialButton from '../Footer/SocialButton';
import styles from './Team.module.css';

export interface MemberCardProps {
  image: string;
  nftImage: string;
  name: string;
  role: string;
  socials: { ICON: string; HREF: string }[];
}

const MemberCard: React.FC<Readonly<MemberCardProps>> = ({ image, nftImage, name, role, socials }) => {
  return (
    <figure className={cn('flex flex-col w-[260px]', 'md:w-[330px]', styles.memberCard)}>
      <div className={twMerge('w-[260px] h-[310px] mb-6 relative', 'md:w-[330px] md:h-[390px]')}>
        <Image
          className={cn(
            'object-cover w-[260px] h-[310px] bg-black absolute overflow-hidden rounded-[8px] shadow-[inset_0_0_0_8px_#FFFFFF0D] cursor-pointer',
            'md:w-[330px] md:h-[390px]',
            styles.image,
          )}
          src={image}
          alt={name}
          width={330}
          height={390}
        />
        <Image
          className={cn(
            'object-cover w-[260px] h-[310px] bg-black absolute overflow-hidden rounded-[8px] shadow-[inset_0_0_0_8px_#FFFFFF0D] cursor-pointer',
            'md:w-[330px] md:h-[390px]',
            styles.nftImage,
          )}
          src={nftImage}
          alt={`${nftImage} NFT`}
          width={330}
          height={390}
        />
      </div>
      <figcaption>
        <h3 className='mb-3 h6 text-gray uppercase'>{name}</h3>
        <h4 className='body-1 mb-10'>{role}</h4>
        <ul className='flex items-center gap-4'>
          {socials.map(({ ICON, HREF }) => {
            const IconElement = LabelToIconMap[ICON as Icon];

            if (!IconElement) {
              throw new Error(`"${ICON}" icon not found`);
            }

            return (
              <li key={ICON}>
                <SocialButton href={HREF}>
                  <IconElement />
                </SocialButton>
              </li>
            );
          })}
        </ul>
      </figcaption>
    </figure>
  );
};

export default MemberCard;
