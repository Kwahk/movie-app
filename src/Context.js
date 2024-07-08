import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=9d2bff12ed955c7f1f74b83187f188ae`;

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({show:'false', msg: ""})
    const [query, setQuery] = useState("")

    const getMovies = async(url) => {
        setIsLoading(true);
        try {
            const res = await axios.get(url);
            const data = res.data;
            console.log(data);

            if(data.total_results !== 0){
                setIsLoading(false);
                setMovie(data.results);
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
            getMovies(`${API_URL}&query=${query}`);
        }, 800);

        return () => clearTimeout(timerOut);

    }, [query]);

    return <AppContext.Provider value={{isLoading, isError, movie, query, setQuery}}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppProvider, AppContext, useGlobalContext }