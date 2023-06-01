export interface App {
  loading: boolean;
}

export interface Query {
  sort?: string;
  type?: string;
  genre?: string;
  year?: number[];
  rating?: number[];
}

export interface Movie {
  id: number;
  name: string;
  type: string;
  year: number;
  description: string;
  shortDescription: string;
  slogan: string;
  rating: {
    kp: number;
    imdb: number;
  };
  movieLength: number;
  poster: {
    url: string;
  };
  genres: [
    {
      name: string;
    }
  ];
  countries: [
    {
      name: string;
    }
  ];
  persons?: [
    {
      id: number;
      photo: string;
      name: string;
      profession: string;
      enProfession: string;
    }
  ];
  facts?: [
    {
      value: string;
    }
  ];
  videos?: {
    trailers: [
      {
        url: string;
        site: string;
      }
    ];
  };
}

export interface Person {
  id: number;
  name: string;
  photo: string;
  birthday: string;
  death?: string;
  profession: [{ value: string }];
  birthPlace?: [{ value: string }];
  movies: [{ id: number; name: string; rating: number }];
  facts: [{ value: string }];
}

export interface Comment {
  id?: number;
  created_at?: string;
  text?: string;
  users?: {
    username?: string;
  };
  movieId?: number;
}

export interface DocsMovies {
  docs: [Movie];
  total: number;
  page: number;
  pages: number;
}

export interface User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  created_at?: string;
  liked_movies?: number[];
}
