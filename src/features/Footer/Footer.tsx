import React from 'react';

import Section from '@/common/Section';
import XSvg from 'public/assets/icon/x.svg';
import LinkedInSvg from 'public/assets/icon/linkedin.svg';
import DiscordSvg from 'public/assets/icon/discord.svg';

import NavLink from './NavLink';
import SocialButton from './SocialButton';
import { twMerge } from 'tailwind-merge';

const Footer = () => {
  return (
    <>
      <Section
        el='footer'
        className={twMerge(
          'px-12 pt-12 flex flex-col gap-16 items-center justify-between',
          'lg:w-[80%] lg:px-0',
          'md:flex-row md:gap-4 md:py-0 md:pt-0',
        )}
      >
        <nav>
          <ul className={twMerge('flex flex-col gap-10 items-center', 'md:flex-row md:gap-16')}>
            <NavLink>ABOUT</NavLink>
            <NavLink>SERVICES</NavLink>
            <NavLink>WORK</NavLink>
            <NavLink>TESTIMONIALS</NavLink>
          </ul>
        </nav>
        <ul className='flex gap-4'>
          <li>
            <SocialButton>
              <DiscordSvg />
            </SocialButton>
          </li>
          <li>
            <SocialButton>
              <XSvg />
            </SocialButton>
          </li>
          <li>
            <SocialButton>
              <LinkedInSvg />
            </SocialButton>
          </li>
        </ul>
      </Section>
    </>
  );
};

export default Footer;
