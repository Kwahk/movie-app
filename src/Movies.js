import React from 'react'
import{useGlobalContext} from './Context';
import { NavLink } from 'react-router-dom';

const Movies = () => {
    const {movie, isLoading} = useGlobalContext();

    if(isLoading) {
        return (
            <div className='movie-section'>
                <div className='loading'>Loading...</div>
            </div>
        )
    }
  return (
    <>
        <section className='movie-page'>
            <div className='grid grid-4-col'>
                {movie.map((curMovie => {
                    const {id, title, poster_path} = curMovie;
                    return(
                        <NavLink to={`movie/${id}`} key={id}> 
                            <div className='card'>
                                <div className='card-info'>
                                    <h2>{title}</h2>
                                    <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={id}/>
                                </div>
                            </div>
                        </NavLink>
                    )
                }))}
            </div>
        </section>
    </>
  )
}

export default Movies