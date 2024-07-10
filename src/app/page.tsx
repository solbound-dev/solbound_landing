import EasterEgg from '@/common/EasterEgg/EasterEgg';
import StarContainer from '@/common/StarContainer';
import Footer from '@/features/Footer';
import Hero from '@/features/Hero';
import LaunchProject from '@/features/LaunchProject';
import Projects from '@/features/Projects/Projects';
import Team from '@/features/Team';
import { cn } from '@/utils/classNames';

import SolboundLogotypeSvg from 'public/assets/icon/solbound-logotype.svg';

const Home = () => {
  return (
    <>
      <StarContainer />
      <main className='relative z-0 overflow-hidden'>
        <Hero />
        {/*<Team />
        <Projects />
        <LaunchProject />
        <Footer />
        <div className={cn('w-full flex justify-center items-start overflow-hidden', 'md:-mt-[50px]')}>
          <SolboundLogotypeSvg className='w-screen opacity-10 shrink-0 scale-110 translate-y-[33%]' />
        </div>/
        */}
        <EasterEgg />
      </main>
    </>
  );
};

export default Home;
