import React from 'react';
import { appState, personModalState } from '@/atoms/detailsAtom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import MuiModal from '@mui/material/Modal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Person } from '../../typings';
import Image from 'next/image';
import nophoto from '@/assets/nophoto.jpg';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';

interface Props {
  id: number | null;
}

const ActorModal = ({ id }: Props) => {
  const [showModal, setShowModal] = useRecoilState(personModalState);
  const [appSettings, setAppSettings] = useRecoilState(appState);
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);
  const router = useRouter();

  const handleMovieClick = (id: number) => {
    setShowModal(false);
    setAppSettings({ loading: true });
    router.push(`/${id}`).then(() => setAppSettings({ loading: false }));
  };

  const fetchActor = async () => {
    const res = await axios.get(`https://api.kinopoisk.dev/v1/person/${id}`, {
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    return res.data;
  };

  useEffect(() => {
    fetchActor().then((res) => setCurrentPerson(res));
  }, []);

  return (
    <MuiModal
      open={showModal}
      onClose={() => setShowModal(false)}
      className="fixed !top-10 left-0 right-0 z-50 mx-auto w-5/6 max-w-5xl overflow-hidden overflow-y-scroll rounded-md !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-red-600 mb-10"
    >
      <>
        {currentPerson && (
          <>
            <button
              onClick={() => setShowModal(false)}
              className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 bg-[#181818]hover:bg-[#181818]"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="bg-[#1f1c1c] flex flex-col md:flex-row md:gap-6 md:p-4 md:items-center">
              <div className="relative h-[450px] min-w-[150px] md:min-w-[300px]">
                <Image
                  src={currentPerson?.photo || nophoto}
                  alt={currentPerson?.name || 'actor'}
                  fill
                  sizes="(min-width: 768px) 188px, 150px"
                  className="rounded-sm object-cover md:rounded"
                />
              </div>
              <div className="rounded-b-md text-center md:w-full md:text-lg">
                <h3 className="text-3xl font-bold py-1 md:text-4xl">
                  {currentPerson?.name}
                </h3>
                {currentPerson?.birthday && (
                  <h4 className="text-gray-400">
                    {currentPerson?.birthday
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('.')}
                    {currentPerson?.death && (
                      <>
                        {' - '}
                        {currentPerson?.death
                          .slice(0, 10)
                          .split('-')
                          .reverse()
                          .join('.')}
                      </>
                    )}
                  </h4>
                )}
                <span className="text-gray-400">
                  {!!currentPerson?.birthPlace?.length &&
                    currentPerson?.birthPlace && (
                      <>
                        {' ('}
                        {currentPerson?.birthPlace?.map(
                          (item, index, array) => (
                            <React.Fragment key={item.value}>
                              {item.value}
                              {index !== array.length - 1 && ', '}
                            </React.Fragment>
                          )
                        )}
                        {')'}
                      </>
                    )}
                </span>
                <div className="text-left p-2 text-lg list font-semibold md:text-xl lg:text-2xl">
                  Лучшие фильмы:{' '}
                  <ul className="text-base pl-3 font-normal md:text-lg lg:text-xl">
                    {currentPerson?.movies
                      .filter(
                        (movie, index, array) =>
                          movie.rating &&
                          movie.name &&
                          index === array.findIndex((t) => t.id === movie.id)
                      )
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 7)
                      .map((movie) => (
                        <li
                          key={movie.id}
                          onClick={() => handleMovieClick(movie.id)}
                        >
                          <span>
                            <button className="text-white hover:text-gray-300 transition text-left">
                              {movie.name}
                            </button>
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            {!!currentPerson.facts.length && (
              <div className="text-left p-2 text-lg font-semibold bg-[#1f1c1c] rounded-b md:text-2xl">
                Знали ли вы, что...
                <ul className="text-base pl-3 font-normal mt-1 marker:text-[#dc2626] marker:text-lg list-disc md:text-lg md:marker:text-2xl">
                  {currentPerson.facts.slice(0, 5).map((fact, i) => (
                    <li className="py-1 ml-4" key={i}>
                      {parse(fact.value)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </>
    </MuiModal>
  );
};

export default ActorModal;
