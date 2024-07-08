import React from 'react'
import { useGlobalContext } from './Context'

const Search = () => {
    const {query, setQuery, isError} = useGlobalContext();
    return (<>
        <section className='search-section'>
            <h2>검색할 영화를 입력하세요</h2>
            <form action='#' onSubmit={(e) => e.preventDefault()}>
                <div>
                    <input type='text' placeholder='여기에 영화를 입력하세요' value={query} onChange={(e) => setQuery(e.target.value)}/>
                </div>
            </form>
            <div className='card-error'>
                <p>{isError.show && isError.msg}</p>
            </div>
        </section>
    </>)
}

export default Search