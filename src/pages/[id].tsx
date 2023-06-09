import React, { useState } from 'react';
import {
  appState,
  modalState,
  movieModalState,
  personIdState,
  personModalState,
  userState,
} from '@/atoms/detailsAtom';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import Head from 'next/head';
import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import noposter from '@/assets/noposter.jpg';
import axios from 'axios';
import { DocsMovies } from '../../typings';
import { BookmarkIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import ActorsRow from '@/components/ActorsRow';
import TrailerModal from '@/components/TrailerModal';
import ActorModal from '@/components/ActorModal';
import { supabase } from '@/utils/supabaseClient';
import { Toaster, toast } from 'react-hot-toast';
import parse from 'html-react-parser';
import MovieModal from '@/components/MovieModal';
import Comments from '@/components/Comments';
import { InformationCircleIcon, UsersIcon } from '@heroicons/react/24/solid';

interface Props {
  currentMovie: DocsMovies;
}

const Details = ({ currentMovie }: Props) => {
  const [user, setUser] = useRecoilState(userState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [showPersonModal, setShowPersonModal] =
    useRecoilState(personModalState);
  const [showMovieModal, setShowMovieModal] = useRecoilState(movieModalState);
  const appSetting = useRecoilValue(appState);
  const [currentPersonId, setCurrentPersonId] = useRecoilState(personIdState);
  const movie = currentMovie.docs[0];
  const [isLiked, setIsLiked] = useState(
    user?.liked_movies?.includes(movie.id)
  );

  const isTrailer =
    movie?.videos &&
    !!movie?.videos.trailers.filter((trailer) => trailer.site === 'youtube')
      .length;
  const rowActorsArray = movie?.persons
    ?.filter((person) => person.enProfession === 'director' && person.name)
    .slice(0, 5)
    .concat(
      movie?.persons
        .filter((person) => person.enProfession === 'actor' && person.name)
        .slice(0, 5)
    );

  const handleClick = (id: number) => {
    setCurrentPersonId(id);
    setShowPersonModal(true);
  };

  const handleLike = async () => {
    try {
      let newLikedMovies: number[];
      if (isLiked) {
        newLikedMovies = (user?.liked_movies as []).filter(
          (movieId) => movieId !== movie.id
        );
      } else {
        newLikedMovies = user?.liked_movies
          ? [...(user?.liked_movies as []), movie.id]
          : [movie.id];
      }
      const { error } = await supabase
        .from('users')
        .update({ liked_movies: newLikedMovies })
        .eq('id', user?.id);
      if (!error) {
        setUser((prev) => {
          return { ...prev, liked_movies: newLikedMovies };
        });
        setIsLiked((prev) => !prev);
        if (isLiked) {
          toast.success(`"${movie.name}" был удален из избранного`, {
            duration: 8000,
          });
        } else {
          toast.success(`"${movie.name}" был добавлен в избранное`, {
            duration: 8000,
          });
        }
      } else {
        throw new Error('Handle like error');
      }
    } catch (e) {
      console.log('Handle like error:', e);
    }
  };

  if (appSetting.loading) {
    return <Loader />;
  }

  return (
    <div className="relative h-screen bg-gradient-to-t from-[#010511] to-gray-900/10">
      <Head>
        <title>{movie?.name} - Что бы посмотреть?</title>
      </Head>
      <Header />
      <Toaster position="bottom-center" />
      <main className="px-4 lg:space-y-24 lg:px-16 pb-8 bg-[#141414]">
        <div className="flex justify-center">
          <div className="flex items-center flex-col gap-6 md:flex-row md:space-y-24 mt-20 md:mt-24 lg:gap-24">
            <div className="relative w-[300px] h-[400px] md:min-w-[400px] md:h-[533px]">
              <Image
                src={movie?.poster?.url || noposter}
                alt={movie?.name || `${movie?.id}`}
                fill
                sizes="(min-width: 768px) 300px, 400px"
              />
            </div>
            <div className="max-w-[600px] lg:max-w-[800px] !mt-0">
              <div className="w-full lg:text-lg">
                <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
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
                  {movie?.persons
                    ?.filter(
                      (person) =>
                        person.enProfession === 'director' && person.name
                    )
                    .slice(0, 5)
                    .map((person, index, array) => (
                      <React.Fragment key={person.id}>
                        <button
                          className="text-white underline hover:text-gray-300 transition"
                          onClick={() => handleClick(person.id)}
                        >
                          {person.name}
                        </button>
                        {index !== array.length - 1 && ', '}
                      </React.Fragment>
                    ))}
                </p>
                <p>
                  Актеры:{' '}
                  {movie?.persons
                    ?.filter(
                      (person) => person.enProfession === 'actor' && person.name
                    )
                    .slice(0, 5)
                    .map((person, index, array) => (
                      <React.Fragment key={person.id}>
                        <button
                          className="text-white underline hover:text-gray-300 transition"
                          onClick={() => handleClick(person.id)}
                        >
                          {person.name}
                        </button>
                        {index !== array.length - 1 && ', '}
                      </React.Fragment>
                    ))}
                </p>
              </div>
              <div className="mt-6 flex gap-4 items-center font-semibold lg:text-lg">
                {isTrailer && (
                  <>
                    <button
                      className="bg-[#dc2626] p-3 rounded hover:bg-[#ee3f3f] transition"
                      onClick={() => setShowMovieModal(true)}
                    >
                      Смотреть фильм
                    </button>
                    <button
                      className="bg-[hsla(216,4%,55%,.3)] p-3 rounded hover:bg-[#5a5959] transition"
                      onClick={() => setShowModal(true)}
                    >
                      Трейлер
                    </button>
                  </>
                )}
                <button
                  className="bg-[hsla(216,4%,55%,.3)] p-3 rounded hover:bg-[#5a5959] transition"
                  onClick={() => handleLike()}
                >
                  {isLiked ? (
                    <CheckBadgeIcon className="w-6 h-6" />
                  ) : (
                    <BookmarkIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center gap-4">
            <UsersIcon className="w-7 h-7 text-[#dc2626]" />
            <h3 className="text-2xl font-semibold lg:text-3xl">
              Актеры и создатели:
            </h3>
          </div>
          <ActorsRow persons={rowActorsArray} />
        </div>
        {!!movie?.facts?.length && (
          <div className="mt-10">
            <div className="flex items-center gap-4">
              <InformationCircleIcon className="w-7 h-7 text-[#dc2626]" />
              <h3 className="text-2xl font-semibold lg:text-3xl">
                Знали ли вы, что...
              </h3>
            </div>
            <hr className="block h-[1px] border-0 border-t-2 border-gray-500 mt-6" />
            {movie?.facts?.slice(0, 7).map((fact, index) => (
              <React.Fragment key={index}>
                <p className="p-3 lg:text-lg">{parse(fact.value)}</p>
                <hr className="block h-[1px] border-0 border-t-2 border-gray-500" />
              </React.Fragment>
            ))}
          </div>
        )}
        <Comments movieId={movie?.id} />
      </main>
      {showModal && (
        <TrailerModal
          url={
            movie.videos?.trailers.filter(
              (trailer) => trailer.site === 'youtube'
            )[0].url!
          }
          id={movie.id}
          name={movie.name}
        />
      )}
      {showMovieModal && (
        <MovieModal
          url={
            movie.videos?.trailers.filter(
              (trailer) => trailer.site === 'youtube'
            )[0].url!
          }
        />
      )}
      {showPersonModal && <ActorModal id={currentPersonId} />}
    </div>
  );
};

export default Details;

export const getServerSideProps = async (context: {
  params: { id: number };
}) => {
  const [movie] = await Promise.all([
    axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}movie?selectFields=id%20name%20poster%20year%20description%20rating%20movieLength%20genres%20countries%20persons%20videos.trailers%20facts&page=1&id=${context.params.id}`,
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
