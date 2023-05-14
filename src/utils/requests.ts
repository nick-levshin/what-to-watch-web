const BASE_URL = 'https://api.kinopoisk.dev/v1.3/';

const requests = {
  fetchAwaitMovies: `${BASE_URL}movie?sortField=rating.await&page=1&limit=10`,
  fetchTopRatedMovies: `${BASE_URL}movie?sortField=rating.kp&page=1&limit=10`,
  fetchTopRatedSeries: `${BASE_URL}movie?sortField=rating.kp&page=1&limit=10&isSeries=true`,
  fetchActionMovies: `${BASE_URL}movie?sortField=rating.kp&page=1&limit=10&genres.name=боевик`,
  fetchComedyMovies: `${BASE_URL}movie?sortField=rating.kp&page=1&limit=10&genres.name=комедия`,
  fetchHorrorMovies: `${BASE_URL}movie?sortField=rating.kp&page=1&limit=10&genres.name=ужасы`,
  fetchDramaMovies: `${BASE_URL}movie?sortField=rating.kp&page=1&limit=10&genres.name=драма`,
  fetchDocumentaries: `${BASE_URL}movie?sortField=rating.kp&page=1&limit=10&genres.name=документальный`,
  fetchRandomMovie: `${BASE_URL}movie/random`,
};

export default requests;
