import { atom } from 'recoil';
import { App, DocsMovies, Movie, User } from '../../typings';

export const appState = atom<App>({
  key: 'appState',
  default: { loading: false },
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

export const personIdState = atom<number | null>({
  key: 'personIdState',
  default: null,
});

export const likedMoviesState = atom<DocsMovies | null>({
  key: 'likedMoviesState',
  default: null,
});
