import Header from '@/components/Header';
import axios from 'axios';
import Head from 'next/head';
import { DocsMovies } from '../../typings';
import { Pagination } from '@mui/material';
import MoviesGrid from '@/components/MoviesGrid';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { appState, queryState } from '@/atoms/detailsAtom';
import Loader from '@/components/Loader';
import debounce from 'lodash.debounce';
import SideMenu from '@/components/SideMenu';

const Search = () => {
  const [currentMovies, setCurrentMovies] = useState<DocsMovies | null>(null);
  const appSetting = useRecoilValue(appState);
  const query = useRecoilValue(queryState);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleSearch, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }movie?selectFields=id%20poster%20name%20rating.kp%20year%20movieLength${
          query?.sort && query?.sort !== 'base' && `&sortField=${query.sort}`
        }&page=${page}&limit=48${search && `&name=${search}`}${
          query?.type && query?.type !== 'base' && `&type=${query.type}`
        }${query?.year && `&year=${query.year[0]}-${query.year[1]}`}${
          query?.rating && `&rating.kp=${query.rating[0]}-${query.rating[1]}`
        }${
          query?.genre &&
          query?.genre !== 'base' &&
          `&genres.name=${query.genre}`
        }`,
        {
          headers: {
            'Content-type': 'application/json',
            'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );
      setCurrentMovies(data);
      setInitialLoading(false);
      setLoading(false);
    };

    fetchMovies();
  }, [
    page,
    search,
    query?.sort,
    query?.type,
    query?.genre,
    query?.year,
    query?.rating,
  ]);

  if (appSetting.loading) {
    return <Loader />;
  }

  return (
    <div className="relative h-screen bg-gradient-to-t from-[#010511] to-gray-900/10">
      <Head>
        <title>Поиск - Что бы посмотреть?</title>
      </Head>
      <Header />
      <main className="pt-20 px-5 pb-12 transition-all md:px-10">
        <div className="flex gap-4 items-center">
          <div className="cursor-pointer">
            <SideMenu />
          </div>
          <label className="inline-block w-full">
            <input
              type="search"
              placeholder="Введите название фильма"
              className="input"
              onChange={debouncedResults}
            />
          </label>
        </div>
        {initialLoading ? (
          <div className="h-[70vh] flex items-center justify-center">
            <span className="movieLoader"></span>
          </div>
        ) : (
          <>
            {currentMovies?.total ? (
              <>
                <div className="mt-6">
                  <Pagination
                    className="flex justify-center"
                    count={
                      currentMovies?.pages > 100 ? 100 : currentMovies?.pages
                    }
                    color="primary"
                    showFirstButton
                    showLastButton
                    onChange={(_, value) => setPage(value)}
                  />
                </div>
                {loading ? (
                  <div className="h-[70vh] flex items-center justify-center">
                    <span className="movieLoader"></span>
                  </div>
                ) : (
                  <MoviesGrid movies={currentMovies} />
                )}
              </>
            ) : (
              <div className="h-[70vh] flex items-center justify-center">
                <h1 className="text-4xl font-bold text-center lg:text-5xl">
                  По вашему запросу ничего не найдено
                </h1>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Search;
