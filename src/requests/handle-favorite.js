import { apiUrl } from "./core.request";

export const handleFavoriteMovie = async (data) => {
  const addFavoriteMovie = await fetch(`https://movie-api-8cvs.onrender.com/users/${data.access}/movies/${movieId}`,
    {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${storedToken}`,
      "Content-Type": "application/json", 
      }
     })
    const addResponse = await addFavoriteMovie.json()

    const removeFavoriteMovie = await fetch (`https://movie-api-8cvs.onrender.com/users/${username}/movies/${movieId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json"
      }
    })     
    const removeResponse = await removeFavoriteMovie.json()

    if (addResponse) {
      alert("Movie added to favorites");
      return addResponse
    }
    if (removeResponse) {
      alert("Movie removed from favorites");
      return removeResponse
    } else {
      alert("Something went wrong");
    }    
}
