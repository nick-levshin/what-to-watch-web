export interface App {
  loading: boolean;
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
  videos: {
    trailers: [
      {
        url: string;
      }
    ];
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
  persons: [
    {
      id: number;
      photo: string;
      name: string;
      profession: string;
      enProfession: string;
    }
  ];
}

export interface DocsMovies {
  docs: [Movie];
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}
