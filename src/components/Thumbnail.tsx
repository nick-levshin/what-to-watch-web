import Image from 'next/image';
import { Movie } from '../../typings';
import noposter from '@/assets/noposter.jpg';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { appState } from '@/atoms/detailsAtom';

interface Props {
  movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
  const router = useRouter();
  const [appSetting, setAppSettings] = useRecoilState(appState);

  const handleMovieClick = (id: number) => {
    setAppSettings({ loading: true });
    router.push(`/${id}`).then(() => setAppSettings({ loading: false }));
  };

  return (
    <div className="relative h-[200px] min-w-[150px] cursor-pointer transition duration-200 ease-out md:h-[250px] md:min-w-[188px] md:hover:scale-105">
      <Image
        src={movie?.poster?.url || noposter}
        alt={movie?.name || `${movie?.id}`}
        fill
        sizes="(min-width: 768px) 188px, 150px"
        className="rounded-sm object-cover md:rounded cursor-pointer"
        onClick={() => handleMovieClick(movie?.id)}
      />
    </div>
  );
};

export default Thumbnail;
