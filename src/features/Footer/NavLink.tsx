import React from 'react';

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const NavLink: React.FC<Readonly<NavLinkProps>> = ({ children, ...rest }) => {
  return (
    <li>
      <a
        {...rest}
        className='text-[12px] leading-[23px] tracking-[6%] font-medium cursor-pointer'
      >
        {children}
      </a>
    </li>
  );
};

export default NavLink;
