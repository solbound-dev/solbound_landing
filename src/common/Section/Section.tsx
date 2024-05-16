import React, { createElement } from 'react';

import { cn } from '@/utils/classNames';

export interface SectionProps {
  el?: string;
  children?: React.ReactNode;
  className?: string;
}

const Section: React.FC<Readonly<SectionProps>> = ({ el = 'section', children, className }) => {
  return createElement(el, { className: cn('max-w-content m-auto p-6 relative', className) }, children);
};

export default Section;
