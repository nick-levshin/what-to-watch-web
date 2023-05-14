import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Head from 'next/head';
import requests from '@/utils/requests';
import axios from 'axios';
import { Movie } from '../../typings';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Props {
  awaitMovies: Movie[];
  topRatedMovies: Movie[];
  topRatedSeries: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  dramaMovies: Movie[];
  documentaries: Movie[];
  randomMovie: Movie;
}

const Home = ({
  awaitMovies,
  topRatedMovies,
  topRatedSeries,
  actionMovies,
  comedyMovies,
  horrorMovies,
  dramaMovies,
  documentaries,
  randomMovie,
}: Props) => {
  return (
    <div className="relative h-screen bg-gradient-to-t from-[#010511] to-gray-900/10  lg:h-[140vh]">
      <Head>
        <title>Главная - Что бы посмотреть</title>
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner randomMovie={randomMovie} />
        <section></section>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    awaitMovies,
    topRatedMovies,
    topRatedSeries,
    actionMovies,
    comedyMovies,
    horrorMovies,
    dramaMovies,
    documentaries,
    randomMovie,
  ] = await Promise.all([
    axios.get(requests.fetchTopRatedMovies, {
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': API_KEY,
      },
    }),
    axios.get(requests.fetchTopRatedSeries, {
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': API_KEY,
      },
    }),
    axios.get(requests.fetchAwaitMovies, {
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': API_KEY,
      },
    }),
    axios.get(requests.fetchActionMovies, {
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': API_KEY,
      },
    }),
    axios.get(requests.fetchComedyMovies, {
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': API_KEY,
      },
    }),
    axios.get(requests.fetchHorrorMovies, {
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': API_KEY,
      },
    }),
    axios.get(requests.fetchDramaMovies, {
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': API_KEY,
      },
    }),
    axios.get(requests.fetchDocumentaries, {
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': API_KEY,
      },
    }),
    axios.get(requests.fetchRandomMovie, {
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': API_KEY,
      },
    }),
  ]);

  return {
    props: {
      awaitMovies: awaitMovies.data,
      topRatedMovies: topRatedMovies.data,
      topRatedSeries: topRatedSeries.data,
      actionMovies: actionMovies.data,
      comedyMovies: comedyMovies.data,
      horrorMovies: horrorMovies.data,
      dramaMovies: dramaMovies.data,
      documentaries: documentaries.data,
      randomMovie: randomMovie.data,
    },
  };
};
