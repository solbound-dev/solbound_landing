import { cn } from '@/utils/classNames';

import styles from './Footer.module.css';

export interface SocialButtonProps {
  href?: string;
  children?: React.ReactNode;
}

const SocialButton: React.FC<Readonly<SocialButtonProps>> = ({ href, children }) => {
  return (
    <address
      className={cn(
        'w-[48px] h-[48px] rounded-[50%] border-[1px] border-gray cursor-pointer relative z-0 overflow-hidden transition-[color]',
        '[&_svg]:w-[16px] [&_svg]:h-[16px] [&_svg_path]:fill-gray [&_svg_rect]:fill-gray [&_svg_ellipse]:fill-gray',
        'before:content-[""] before:w-full before:h-0 before:absolute before:-z-1 before:bottom-0 before:left-0 before:bg-gray-light before:transition-[height]',
        'hover:before:h-full',
        styles.socialButton,
      )}
    >
      <a
        href={href}
        target='_blank'
        className='w-full h-full flex justify-center items-center'
      >
        {children}
      </a>
    </address>
  );
};

export default SocialButton;
