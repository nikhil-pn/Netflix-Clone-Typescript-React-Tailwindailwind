import { fetchRequest, fetchVideoInfo, MovieResponse, MovieResult } from '../common/api'
import React, { useEffect, useState } from 'react'
import { ENDPOINT } from '../common/endpoints'
import { createImageUrlBanner } from '../common/utilis'
import { MovieVideoInfo } from './MovieCard'
import YouTube, { YouTubeProps } from 'react-youtube'

export default function Banner() {
    const [randomMovie, setRandomMovie] = useState<MovieResult>()

    const [videoInfo, setvideoInfo] = useState<MovieVideoInfo>()

    const options: YouTubeProps["opts"] = {
        width: document.body.clientWidth,
        height: "800",
        playerVars: {
            autoplay: 1,
            playsinline: 1,
            controls: 0,
            loop: 1
        }
    }

    function getRandomIndex(last: number) {
        return Math.floor(Math.random() * (last - 1))
    }

    async function fetchPopularMovies() {
        const response = await fetchRequest<MovieResponse<MovieResult[]>>(ENDPOINT.MOVIES_POPULAR)
        const filteredMovies = response.results.filter((movie) => movie.backdrop_path)

        const randomSelection = filteredMovies[getRandomIndex(filteredMovies.length)]

        const videoInfo = await fetchVideoInfo(randomSelection.id.toString())

        setvideoInfo(videoInfo[0])
        // setRandomMovie()
    }
    useEffect(() => {

        fetchPopularMovies()
    }, [])

    return (
        <section className=' relative aspect-video h-[800px] w-full'>
            {/* <img src={createImageUrlBanner(randomMovie?.backdrop_path ?? "", 0, "original")}></img> */}

            <YouTube videoId={videoInfo?.key} id="banner-video" opts={options}></YouTube>

        </section>
    )
}
