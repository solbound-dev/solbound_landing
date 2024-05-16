import React from 'react';

import Section from '@/common/Section';
import TitleParagraph from '@/common/TitleParagraph';
import teamContent from '@/content/team.json';

import MemberSwiper from './MemberSwiper';

const Team = () => {
  return (
    <Section className='overflow-visible py-[100px]'>
      <TitleParagraph
        title={teamContent.TITLE}
        paragraph={teamContent.PARAGRAPH}
        classes={{ container: 'mb-[80px]', paragraph: 'max-w-[630px]' }}
      />
      <MemberSwiper />
    </Section>
  );
};

export default Team;
