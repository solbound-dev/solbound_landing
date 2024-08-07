'use client';

import React from 'react';

import Section from '@/common/Section';
import { cn } from '@/utils/classNames';

import ProjectSwiper from './ProjectSwiper';

const Projects = () => {
  return (
    <Section
      id='work'
      className={cn('w-screen max-w-full p-0 overflow-visible relative z-0 bg-black', 'md:pt-[200px]')}
    >
      <ProjectSwiper />
    </Section>
  );
};

export default Projects;
