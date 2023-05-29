import Image from 'next/image';
import { Movie } from '../../typings';
import noposter from '@/assets/noposter.jpg';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { appState } from '@/atoms/detailsAtom';

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const router = useRouter();
  const [appSettings, setAppSettings] = useRecoilState(appState);

  const handleMovieClick = (id: number) => {
    setAppSettings({ loading: true });
    router.push(`/${id}`).then(() => setAppSettings({ loading: false }));
  };

  return (
    <div
      className="col-span-4 md:col-span-3 lg:col-span-2 w-full h-full relative cursor-pointer transition duration-500 md:hover:scale-105 wrapper"
      onClick={() => handleMovieClick(movie?.id)}
    >
      <div className="z-50 absolute top-0 bottom-0 left-0 right-0 transition-opacity duration-500 bg-[#010511]/70 opacity-0 p-4 flex flex-col justify-end">
        {!!movie?.rating.kp && (
          <span className="bg-[#dc2626] px-1.5 rounded text-white absolute top-4 left-4 lg:text-lg">
            {movie?.rating.kp.toFixed(1)}
          </span>
        )}
        <h3 className="text-xl font-bold lg:text-2xl">{movie.name}</h3>
        <div className="flex gap-2 text-gray-300 lg:text-lg">
          <span>{movie.year}</span>
          {!!movie.movieLength && <span>{movie.movieLength} мин</span>}
        </div>
      </div>
      <img
        src={(movie.poster?.url || noposter.src) as string}
        alt={`${movie.id}`}
        className="rounded-xl object-cover h-full"
      />
    </div>
  );
};

export default MovieCard;
