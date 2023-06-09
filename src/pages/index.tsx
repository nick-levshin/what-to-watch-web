import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Head from 'next/head';
import requests from '@/utils/requests';
import axios from 'axios';
import { DocsMovies, Movie, User } from '../../typings';
import Row from '@/components/Row';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  appState,
  likedMoviesState,
  movieModalState,
  userState,
} from '@/atoms/detailsAtom';
import Loader from '@/components/Loader';
import { useEffect } from 'react';
import MovieModal from '@/components/MovieModal';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Props {
  popularMovies: DocsMovies;
  topRatedMovies: DocsMovies;
  topRatedSeries: DocsMovies;
  actionMovies: DocsMovies;
  comedyMovies: DocsMovies;
  horrorMovies: DocsMovies;
  dramaMovies: DocsMovies;
  documentaries: DocsMovies;
  randomMovie: Movie;
  users: User[];
}

const Home = ({
  popularMovies,
  topRatedMovies,
  topRatedSeries,
  actionMovies,
  comedyMovies,
  horrorMovies,
  dramaMovies,
  documentaries,
  randomMovie,
}: Props) => {
  const router = useRouter();
  const appSetting = useRecoilValue(appState);
  const user = useRecoilValue(userState);
  const [likedMovies, setLikedMovies] = useRecoilState(likedMoviesState);
  const showMovieModal = useRecoilValue(movieModalState);

  useEffect(() => {
    const fetchLikedMovies = async () => {
      try {
        if (user?.liked_movies?.length) {
          const { data: liked } = await axios.get(
            `${
              process.env.NEXT_PUBLIC_BASE_URL
            }movie?selectFields=id%20poster&page=1&limit=10${user?.liked_movies
              ?.map((id: number) => `&id=${id}`)
              .join('')}`,
            {
              headers: {
                'Content-type': 'application/json',
                'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
              },
            }
          );
          setLikedMovies(liked);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchLikedMovies();
  }, [user?.liked_movies]);

  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('user')) {
      router.push('/login');
    }
  }

  if (appSetting.loading) {
    return <Loader />;
  }

  return (
    <div className="relative h-screen bg-gradient-to-t from-[#010511] to-gray-900/10  lg:h-[140vh]">
      <Head>
        <title>Главная - Что бы посмотреть?</title>
      </Head>
      <Header />
      <main className="relative pl-4 lg:space-y-24 lg:pl-16">
        <Banner randomMovie={randomMovie} />
        <section className="md:space-y-24 mt-10 md:mt-20">
          <Row title="Популярное" movies={popularMovies} id="popular" />
          <Row title="Лучшие Фильмы" movies={topRatedMovies} id="movies" />
          <Row title="Лучшие Сериалы" movies={topRatedSeries} id="series" />
          <Row title="Боевики" movies={actionMovies} />
          <Row title="Комедии" movies={comedyMovies} />
          <Row title="Фильмы ужасов" movies={horrorMovies} />
          <Row title="Драмы" movies={dramaMovies} />
          <Row title="Документальные фильмы" movies={documentaries} />
          {likedMovies && (
            <Row title="Избранное" movies={likedMovies} id="liked" />
          )}
        </section>
      </main>
      {showMovieModal && (
        <MovieModal
          url={
            randomMovie.videos?.trailers.filter(
              (trailer) => trailer.site === 'youtube'
            )[0].url!
          }
        />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    topRatedMovies,
    topRatedSeries,
    popularMovies,
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
    axios.get(requests.fetchPopularMovies, {
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
      popularMovies: popularMovies.data,
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
