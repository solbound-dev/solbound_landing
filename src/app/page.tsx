import StarContainer from '@/common/StarContainer';
import Footer from '@/features/Footer';
import Hero from '@/features/Hero';
import LaunchProject from '@/features/LaunchProject';
import SolboundLogotypeSvg from 'public/assets/icon/solbound-logotype.svg';
import { twMerge } from 'tailwind-merge';

const Home = () => {
  return (
    <>
      <StarContainer />
      <main className='relative z-0'>
        <Hero />
        <LaunchProject />
        <Footer />
        <div className={twMerge('w-full flex justify-center items-start overflow-hidden', 'md:-mt-[50px]')}>
          <SolboundLogotypeSvg className='w-screen opacity-10 shrink-0 scale-110 translate-y-[33%]' />
        </div>
      </main>
    </>
  );
};

export default Home;
