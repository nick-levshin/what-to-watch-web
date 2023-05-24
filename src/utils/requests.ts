const requests = {
  fetchPopularMovies: `${process.env.NEXT_PUBLIC_BASE_URL}movie?selectFields=id%20poster&sortField=rating.kp&page=1&limit=10&year=2023`,
  fetchTopRatedMovies: `${process.env.NEXT_PUBLIC_BASE_URL}movie?selectFields=id%20poster&sortField=rating.kp&page=1&limit=10`,
  fetchTopRatedSeries: `${process.env.NEXT_PUBLIC_BASE_URL}movie?selectFields=id%20poster&sortField=rating.kp&page=1&limit=10&isSeries=true`,
  fetchActionMovies: `${process.env.NEXT_PUBLIC_BASE_URL}movie?selectFields=id%20poster&sortField=rating.kp&page=1&limit=10&genres.name=боевик`,
  fetchComedyMovies: `${process.env.NEXT_PUBLIC_BASE_URL}movie?selectFields=id%20poster&sortField=rating.kp&page=1&limit=10&genres.name=комедия`,
  fetchHorrorMovies: `${process.env.NEXT_PUBLIC_BASE_URL}movie?selectFields=id%20poster&sortField=rating.kp&page=1&limit=10&genres.name=ужасы`,
  fetchDramaMovies: `${process.env.NEXT_PUBLIC_BASE_URL}movie?selectFields=id%20poster&sortField=rating.kp&page=1&limit=10&genres.name=драма`,
  fetchDocumentaries: `${process.env.NEXT_PUBLIC_BASE_URL}movie?selectFields=id%20poster&sortField=rating.kp&page=1&limit=10&genres.name=документальный`,
  fetchRandomMovie: `${process.env.NEXT_PUBLIC_BASE_URL}movie/random`,
};

export default requests;
