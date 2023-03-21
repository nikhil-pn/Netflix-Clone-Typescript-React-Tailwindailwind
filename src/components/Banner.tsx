import { fetchRequest, fetchVideoInfo, MovieResponse, MovieResult } from '../common/api'
import React, { useEffect, useState } from 'react'
import { ENDPOINT } from '../common/endpoints'
import { createImageUrlBanner } from '../common/utilis'
import { MovieVideoInfo } from './MovieCard'
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube'
import VideoPlayer from "./VideoPlayer"

export default function Banner() {
    const [randomMovie, setRandomMovie] = useState<MovieResult>()

    const [videoInfo, setvideoInfo] = useState<MovieVideoInfo>()

    const [backdrop, setbackdrop] = useState(false)
    const [hidePoster, sethidePoster] = useState(false)
    const options: YouTubeProps["opts"] = {
        width: document.body.clientWidth,
        height: "1200",
        playerVars: {
            autoplay: 1,
            playsinline: 1,
            controls: 0,
            loop: 1,
            showinfo: 0,

          
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

        setRandomMovie(randomSelection)

        setTimeout(() => {
            sethidePoster(true)
        }, 800)

    }
    useEffect(() => {

        fetchPopularMovies()
    }, [])

    function onStateChange(event: YouTubeEvent<number>) {
        // video finshed playing
        if (event.data === 0) {
            sethidePoster(false)
            setbackdrop(false)
        } else if (event.data === 1) {
            sethidePoster(true)
            setbackdrop(true)
        }
    }
    return (
        <section className=' relative aspect-video h-[800px] w-full -z-10'>
            <img className={hidePoster ? `h-0 invisible` : `h-full  visible `} src={createImageUrlBanner(randomMovie?.backdrop_path ?? "", 0, "original")}></img>

            {videoInfo ? <YouTube videoId={videoInfo?.key} id="banner-video"    opts={options} className={`${hidePoster ? `visible h-full w-full` : `invisible h-0`} absolute -mt-48`} onStateChange={onStateChange}></YouTube> : null}



             {/* <VideoPlayer videoId={videoInfo?.key} ></VideoPlayer> */}

            {/* {backdrop?<section className='absolute top-0 left-0 z-[1] h-full w-full bg-dark/60'></section> : null } */}

            <section className='z-1 absolute bottom-16 ml-16 max-w-sm flex-col gap-2'>

                {randomMovie ?
                    <>
                        <h2 className='text-6xl'>{randomMovie.title}</h2>
                        <p className=' text-sm line-clamp-3'>{randomMovie.overview}</p>
                        <section className='flex gap-2'>
                            <button className='w-[100px] bg-white p-2 text-dark rounded-md '>Play</button>
                            <button className='w-[100px] bg-zinc-400/50 p-2 text-white rounded-md '>More Info</button>
                        </section>

                    </>
                    : null}
                {/* 
                {console.log(randomMovie, "randomMovie")
                } */}
            </section>
        </section>
    )
}
