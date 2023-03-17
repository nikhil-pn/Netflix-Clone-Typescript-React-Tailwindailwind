import { fetchRequest, MovieResponse, MovieResult } from '../common/api'
import React, { useEffect, useState } from 'react'
import { ENDPOINT } from '../common/endpoints'
import { createImageUrlBanner } from '../common/utilis'

export default function Banner() {
    const [randomMovie, setRandomMovie] = useState<MovieResult>()


    function getRandomIndex(last: number) {
        return Math.floor(Math.random() * (last - 1))
    }

    async function fetchPopularMovies() {
        const response = await fetchRequest<MovieResponse<MovieResult[]>>(ENDPOINT.MOVIES_POPULAR)
        const filteredMovies = response.results.filter((movie) => movie.backdrop_path)
        setRandomMovie(filteredMovies[getRandomIndex(filteredMovies.length)])
    }
    useEffect(() => {

        fetchPopularMovies()
    }, [])

    return (
        <section className=' relative aspect-video h-[800px] w-full'>
            <img src={createImageUrlBanner(randomMovie?.backdrop_path ?? "", 0, "original")}></img>
        </section>
    )
}
