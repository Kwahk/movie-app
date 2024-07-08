import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from './Context';
import axios from 'axios';
import YouTube from 'react-youtube';

const Movie = () => {
    const { id } = useParams();
    const { movie } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState({show:'false', msg: ""})
    const [movieData, setMovieData] = useState([]);


    const selectedMovie = movie.find((m) => m.id === parseInt(id));

    const getMovie = async(url) => {
        setIsLoading(true);
        try {
            const res = await axios.get(url);
            const data = res.data;
            console.log(data);

            if(data.total_results !== 0){
                setIsLoading(false);
                setMovieData(data.results[0]);
            }
            else{
                setIsError(
                    {show: true, msg: data.error}
                )
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let timerOut = setTimeout(() => {
            getMovie(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=9d2bff12ed955c7f1f74b83187f188ae`);
        }, 800);

        return () => clearTimeout(timerOut);

    }, []);

    if (!selectedMovie) {
        return <div>Loading...</div>
    }

    const { title, overview, poster_path, release_date } = selectedMovie;

    return (
        <>
            <section className='movie-card'>
                    <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
                    <div className='card-content'>
                        <h2>{title}</h2>
                        <p className='card-text'>{overview}</p>
                        <p className='card-text'>Release Date: {release_date}</p>
                    </div>
                </section>
            <section className='movie'>
                <YouTube videoId={`${movieData.key}`} />
            </section>
        </>
    )
}

export default Movie