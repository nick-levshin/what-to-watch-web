import { atom } from 'recoil';
import { App, DocsMovies, Movie, Query, User } from '../../typings';

export const appState = atom<App>({
  key: 'appState',
  default: { loading: true },
});

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const movieState = atom<Movie | null>({
  key: 'movieState',
  default: null,
});

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const personModalState = atom({
  key: 'personModalState',
  default: false,
});

export const movieModalState = atom({
  key: 'movieModalState',
  default: false,
});

export const personIdState = atom<number | null>({
  key: 'personIdState',
  default: null,
});

export const likedMoviesState = atom<DocsMovies | null>({
  key: 'likedMoviesState',
  default: null,
});

export const queryState = atom<Query | null>({
  key: 'queryState',
  default: {
    sort: '',
    type: '',
    genre: '',
    year: [1950, 2030],
    rating: [1, 10],
  },
});
