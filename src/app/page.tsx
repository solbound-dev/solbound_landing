import StarContainer from '@/common/StarContainer';
import Hero from '@/features/Hero';
import LaunchProject from '@/features/LaunchProject';

const Home = () => {
  return (
    <>
      <StarContainer />
      <main className='relative z-0'>
        <Hero />
        <LaunchProject />
      </main>
    </>
  );
};

export default Home;
