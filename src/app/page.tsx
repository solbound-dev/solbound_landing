import StarContainer from '@/common/StarContainer';
import Hero from '@/features/Hero';

const Home = () => {
  return (
    <>
      <StarContainer />
      <main className='relative z-0'>
        <Hero />
      </main>
    </>
  );
};

export default Home;
