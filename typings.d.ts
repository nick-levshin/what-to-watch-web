export interface Movie {
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
  movieLingth: number;
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
}
