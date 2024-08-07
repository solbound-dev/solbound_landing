import React from 'react';

import Section from '@/common/Section';
import { Icon, LabelToIconMap } from '@/constants/labelToIconMap';
import footerContent from '@/content/footer.json';
import { cn } from '@/utils/classNames';

import NavLink from './NavLink';
import SocialButton from './SocialButton';

const Footer = () => {
  return (
    <>
      <Section
        el='footer'
        className={cn(
          'px-12 pt-12 flex flex-col gap-16 items-center justify-between',
          'lg:w-[80%] lg:px-0',
          'md:flex-row md:gap-4 md:py-0 md:pt-0',
        )}
      >
        <nav>
          <ul className={cn('flex flex-col gap-10 items-center', 'md:flex-row md:gap-16')}>
            {footerContent.NAVIGATION.map(({ LABEL, HREF }) => (
              <NavLink
                key={LABEL}
                href={HREF}
              >
                {LABEL}
              </NavLink>
            ))}
          </ul>
        </nav>
        <ul className='flex gap-4'>
          {footerContent.SOCIAL.map(({ ICON, HREF }) => {
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
      </Section>
    </>
  );
};

export default Footer;
