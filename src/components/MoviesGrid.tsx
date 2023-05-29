import React from 'react';
import { DocsMovies } from '../../typings';
import MovieCard from './MovieCard';

interface Props {
  movies: DocsMovies | null;
}

const MoviesGrid = ({ movies }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-3 md:gap-6 lg:gap-10 mt-10">
      {movies?.docs.map((movie) => (
        <React.Fragment key={movie.id}>
          <MovieCard movie={movie} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MoviesGrid;
