import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export default function UpdateForm( { setMovieList } ) 
{
  const { push } = useHistory();
  const [ movie, setMovie ] = useState( {} );
  const params = useParams();

  useEffect( () =>
  {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  }, [ params.id ] );

  const onChange = e => setMovie( { ...movie, [ e.target.name ] : e.target.name === "stars" ? e.target.value.split( "," ) : e.target.value } ) 
  
  const onSubmit = e =>
  {
    e.preventDefault();
    console.log( "Submit =>", movie );

    axios.put( `http://localhost:5000/api/movies/${params.id}`, movie )
      .then( response =>
        {
          setMovieList( previous => [ movie, ...previous.filter( movie => movie.id != params.id ) ] );
          setMovie( {} );
          push( "/" );
        } )
      .catch( error => console.error( error ) ); 
  } 
  
  return (
    <form onSubmit = { onSubmit }>
      <input type="text" name = "title" value = { movie.title } onChange = { onChange } />
      <input type="text" name = "director" value = { movie.director } onChange = { onChange } />
      <input type="text" name = "metascore" value = { movie.metascore } onChange = { onChange } />
      <textarea name="stars" id="" cols="30" rows="3" value = { movie.stars ? movie.stars.join( "," ) : "N/A" } onChange = { onChange }></textarea>
      <button>Update</button>
    </form>
  )
}
