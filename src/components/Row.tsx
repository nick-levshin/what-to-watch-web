import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { DocsMovies } from '../../typings';
import Thumbnail from './Thumbnail';
import { useRef, useState } from 'react';

interface Props {
  id?: string;
  title: string;
  movies: DocsMovies | null;
}

const Row = ({ title, movies, id }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-[280px] space-y-0.5 md:space-y-2">
      <h2
        className="w-[320px] cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl"
        id={id}
      >
        {title}
      </h2>
      {movies && (
        <div className="group relative md:-ml-2">
          <ChevronLeftIcon
            className={`absolute top-0 bottom-0 left-2 z-40 m-auto w-12 h-12 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
              !isMoved && 'hidden'
            }`}
            onClick={() => handleClick('left')}
          />
          <div
            ref={rowRef}
            className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
          >
            {movies?.docs.map((movie) => (
              <Thumbnail key={movie.id} movie={movie} />
            ))}
          </div>
          <ChevronRightIcon
            className="absolute top-0 bottom-0 right-2 z-40 m-auto w-12 h-12 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
            onClick={() => handleClick('right')}
          />
        </div>
      )}
    </div>
  );
};

export default Row;
