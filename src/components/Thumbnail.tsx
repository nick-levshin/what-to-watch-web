import Image from 'next/image';
import { Movie } from '../../typings';
import noposter from '@/assets/noposter.jpg';

interface Props {
  movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
  return (
    <div className="relative h-[200px] min-w-[150px] cursor-pointer transition duration-200 ease-out md:h-[250px] md:min-w-[188px] md:hover:scale-105">
      <Image
        src={movie?.poster?.url || noposter}
        alt={movie?.name}
        fill
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  );
};

export default Thumbnail;
