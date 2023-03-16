import { apiUrl } from "./core.request";

export const fetchMovies = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    const moviesFromApi = data.map((movie) => ({
      id: movie._id,
      title: movie.Title,
      description: movie.Description,
      image: movie.ImageURL,
      genre: movie.Genre,
      director: movie.Director,
    }));

    return moviesFromApi
    //localStorage.setItem("movies", JSON.stringify(moviesFromApi));
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};