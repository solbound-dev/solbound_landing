import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface SectionProps {
  children?: React.ReactNode;
  className?: string;
}

const Section: React.FC<Readonly<SectionProps>> = ({ children, className }) => {
  return <section className={twMerge('max-w-content m-auto p-6 relative', className)}>{children}</section>;
};

export default Section;
