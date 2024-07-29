import React, { createElement } from 'react';

import { cn } from '@/utils/classNames';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  el?: string;
  id?: string;
  children?: React.ReactNode;
  className?: string;
}

const Section: React.FC<Readonly<SectionProps>> = ({ el = 'section', id, children, className, ...rest }) => {
  return createElement(el, { id, className: cn('max-w-content m-auto p-6 relative', className), ...rest }, children);
};

export default Section;
