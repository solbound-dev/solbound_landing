import React from 'react';

import { cn } from '@/utils/classNames';

export interface TitleParagraphParams {
  title: string;
  paragraph: string;
  classes?: {
    container?: string;
    title?: string;
    paragraph?: string;
  };
}

const TitleParagraph: React.FC<TitleParagraphParams> = ({ title, paragraph, classes = {} }) => {
  return (
    <div className={cn('flex flex-col', 'md:flex-row', classes.container)}>
      <h2 className={cn('h6 mb-[64px]', 'md:w-[30%] md:mb-0', classes.title)}>{title}</h2>
      <p className={cn('body-1', 'md:w-[70%]', classes.paragraph)}>{paragraph}</p>
    </div>
  );
};

export default TitleParagraph;
