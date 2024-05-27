'use client';

import { useEffect } from 'react';

const EasterEgg = () => {
  useEffect(() => {
    console.log('%cNAJJAČA FIRMETINA BAJO', 'font-size: 48px; color:orange;');
  }, []);

  return null;
};

export default EasterEgg;
