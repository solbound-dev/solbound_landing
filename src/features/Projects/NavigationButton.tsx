import React from 'react';

import { cn } from '@/utils/classNames';

import ChevronRightSvg from 'public/assets/icon/chevron-right.svg';

export interface NavigationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: 'up' | 'right' | 'down' | 'left';
}

const NavigationButton: React.FC<Readonly<NavigationButtonProps>> = ({ direction = 'right', ...rest }) => {
  return (
    <button
      className={cn(
        'w-[48px] h-[48px] flex justify-center items-center rounded-[50%] bg-black transition-[transform]',
        'hover:scale-90',
        'md:w-[72px] md:h-[72px]',
      )}
      {...rest}
    >
      <ChevronRightSvg
        className={cn('w-[24px] h-[24px]', {
          '-rotate-[90deg]': direction === 'up',
          'rotate-[90deg]': direction === 'down',
          'rotate-[180deg]': direction === 'left',
        })}
      />
    </button>
  );
};

export default NavigationButton;
