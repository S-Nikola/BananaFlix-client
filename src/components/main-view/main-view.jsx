import { useState } from "react";

import { MovieCard } from "../main-card/main-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        id: 1,
        title: "Arrival",
        director: "Denis Villeneuve",
        ImageURL:"https://upload.wikimedia.org/wikipedia/en/d/df/Arrival%2C_Movie_Poster.jpg",
      },
      {
        id: 2,
        title: "The Lord of the Rings: Fellowship of the Ring",
        director:"Peter Jackson",
        ImageURL:"https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg",
      },
      {
        id: 3,
        title: "Before the Rain",
        director:"Milcho Manchevski",
        ImageURL:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Beforetherain.jpg/220px-Beforetherain.jpg",
      },
      {
        id: 4,
        title: "Schindler's List",
        director:"Steven Spielberg",
        ImageURL:"https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg",
      }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};