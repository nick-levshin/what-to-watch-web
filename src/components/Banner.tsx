import Image from 'next/image';
import { Movie } from '../../typings';
import { InformationCircleIcon, PlayIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { appState, movieModalState } from '@/atoms/detailsAtom';
import { useRecoilState } from 'recoil';

interface Props {
  randomMovie: Movie;
}

const Banner = ({ randomMovie }: Props) => {
  const router = useRouter();
  const [appSetting, setAppSettings] = useRecoilState(appState);
  const [showMovieModal, setShowMovieModal] = useRecoilState(movieModalState);

  const handleMovieClick = (id: number) => {
    setAppSettings({ loading: true });
    router.push(`/${id}`).then(() => setAppSettings({ loading: false }));
  };

  return (
    <div className="flex flex-col space-y-2 py-24 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-screen w-full -z-10">
        <Image
          src={randomMovie?.poster?.url}
          alt="random movie"
          fill
          className="object-cover"
        />
      </div>
      <h1 className=" text-shadow-md text-2xl lg:text-7xl md:text-4xl font-bold">
        {randomMovie?.name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {randomMovie?.shortDescription || randomMovie.description}
      </p>

      <div className="flex space-x-3">
        {!!randomMovie.videos?.trailers.filter(
          (trailer) => trailer.site === 'youtube'
        ).length && (
          <button
            className="bannerButton bg-white text-black"
            onClick={() => setShowMovieModal(true)}
          >
            <PlayIcon className="w-4 h-4 text-black md:h-7 md:w-7" />
            Смотреть
          </button>
        )}
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => handleMovieClick(randomMovie.id)}
        >
          Информация <InformationCircleIcon className="w-5 h-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
