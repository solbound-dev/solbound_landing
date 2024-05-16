import React from 'react';

import { cn } from '@/utils/classNames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<Readonly<ButtonProps>> = ({ className, children, ...rest }) => {
  return (
    <button
      className={cn(
        'py-6 px-8 text-[12px] leading-[23px] tracking-[6%] font-medium uppercase border-[1px] border-gray rounded-[100px] relative z-0 overflow-hidden transition-[color]',
        'before:content-[""] before:w-full before:h-0 before:absolute before:-z-1 before:bottom-0 before:left-0 before:bg-gray-light before:transition-[height]',
        'hover:text-black hover:before:h-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
