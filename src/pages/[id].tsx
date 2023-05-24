import { appState, modalState, movieState } from '@/atoms/detailsAtom';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import Head from 'next/head';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import noposter from '@/assets/noposter.jpg';
import axios from 'axios';
import { DocsMovies } from '../../typings';
import { useRouter } from 'next/router';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import ActorsRow from '@/components/ActorsRow';
import Modal from '@/components/Modal';

interface Props {
  currentMovie: DocsMovies;
}

const Details = ({ currentMovie }: Props) => {
  const [appSetting, setAppSettings] = useRecoilState(appState);
  const showModal = useRecoilState(modalState);
  const movie = currentMovie.docs[0];
  const rowActorsArray = movie.persons
    .filter((person) => person.enProfession === 'director')
    .slice(0, 5)
    .concat(
      movie.persons
        .filter((person) => person.enProfession === 'actor')
        .slice(0, 5)
    );

  if (appSetting.loading) {
    return <Loader />;
  }

  return (
    <div className="relative h-screen bg-gradient-to-t from-[#010511] to-gray-900/10">
      <Head>
        <title>{movie?.name} - Что бы посмотреть?</title>
      </Head>
      <Header />
      <main className="px-4 lg:space-y-24 lg:px-16 pb-8 bg-[#141414]">
        <div className="flex justify-center">
          <div className="flex items-center flex-col gap-6 md:flex-row md:space-y-24 mt-20 md:mt-24 lg:gap-14">
            <div className="relative w-[300px] h-[400px] md:min-w-[400px] md:h-[533px]">
              <Image
                src={movie?.poster?.url || noposter}
                alt={movie?.name || `${movie?.id}`}
                fill
                sizes="(min-width: 768px) 300px, 400px"
              />
            </div>
            <div className="max-w-[600px]">
              <div className="w-full lg:text-lg">
                <h1 className="text-3xl font-semibold lg:text-4xl">
                  {movie?.name}
                </h1>
                <p className="my-4">{movie?.description}</p>
                <div className="mt-4 flex gap-4 text-gray-400 flex-wrap">
                  <span className="bg-[#dc2626] px-1.5 rounded text-white">
                    {movie?.rating.kp.toFixed(1)}
                  </span>
                  <span>{movie?.year}</span>
                  {movie?.genres.map((genre) => (
                    <span key={genre.name}>{genre.name}</span>
                  ))}
                  {movie?.countries.map((country) => (
                    <span key={country.name}>{country.name}</span>
                  ))}
                  {movie?.movieLength && <span>{movie?.movieLength} мин</span>}
                </div>
              </div>
              <div className="w-full text-gray-400 mt-4 lg:text-lg">
                <p className="mb-2">
                  Режиссеры:{' '}
                  {movie.persons
                    .filter((person) => person.enProfession === 'director')
                    .slice(0, 5)
                    .map((person, index, array) => (
                      <>
                        <button
                          className="text-white underline hover:text-gray-300 transition"
                          key={person.id}
                        >
                          {person.name}
                        </button>
                        {index !== array.length - 1 && ', '}
                      </>
                    ))}
                </p>
                <p>
                  Актеры:{' '}
                  {movie.persons
                    .filter((person) => person.enProfession === 'actor')
                    .slice(0, 5)
                    .map((person, index, array) => (
                      <>
                        <button
                          className="text-white underline hover:text-gray-300 transition"
                          key={person.id}
                        >
                          {person.name}
                        </button>
                        {index !== array.length - 1 && ', '}
                      </>
                    ))}
                </p>
              </div>
              <div className="mt-6 flex gap-4 items-center font-semibold lg:text-lg">
                <button className="bg-[#dc2626] p-3 rounded hover:bg-[#ee3f3f] transition">
                  Смотреть фильм
                </button>
                <button className="bg-[hsla(216,4%,55%,.3)] p-3 rounded hover:bg-[#5a5959] transition">
                  Трейлер
                </button>
                <button className="bg-[hsla(216,4%,55%,.3)] p-3 rounded hover:bg-[#5a5959] transition">
                  <BookmarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-6 lg:text-3xl">
            Актеры и создатели:
          </h3>
          <ActorsRow persons={rowActorsArray} />
        </div>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default Details;

export const getServerSideProps = async (context: {
  params: { id: number };
}) => {
  const [movie] = await Promise.all([
    axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}movie?selectFields=id%20name%20poster%20year%20description%20rating%20movieLength%20genres%20countries%20persons&page=1&id=${context.params.id}`,
      {
        headers: {
          'Content-type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    ),
  ]);

  return {
    props: {
      currentMovie: movie.data,
    },
  };
};
