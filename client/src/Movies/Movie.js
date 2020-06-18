import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList }) 
{
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = () => {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = () =>
  {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then( res => 
      {
        setMovieList( prev => prev.filter( movie => movie.id != params.id ) );
        history.push( "/" );
      } )
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie();
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const onClick = e =>
  {
    e.preventDefault();
    console.log( movie );
    history.push( `/update-movie/${ movie.id }` );
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className="save-button lower" onClick={deleteMovie}>
        Delete
      </div>

      <button onClick = { onClick } >Update</button>
    </div>
  );
}

export default Movie;
