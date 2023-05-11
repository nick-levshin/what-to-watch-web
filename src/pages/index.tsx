import Header from '@/components/Header';
import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="relative h-screen bg-gradient-to-t from-[#010511] to-gray-900/10  lg:h-[140vh]">
      <Head>
        <title>Главная - Что бы посмотреть</title>
      </Head>
      <Header />
      <main>
        <section></section>
      </main>
    </div>
  );
};

export default Home;
