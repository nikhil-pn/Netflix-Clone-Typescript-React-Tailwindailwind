import React, { useEffect, useRef, useState } from 'react'
import Modal from './Modal'

import { createImageUrl } from '../common/utilis'
import YouTube from 'react-youtube'
import { fetchRequest } from '../common/api'
import { ENDPOINT } from '../common/endpoints'

const CARD_WIDTH = 200


export type MovieVideoResult<T> = {
  id: number
  results: T;
  [k: string]: unknown
}

export type MovieVideoInfo = {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
  [k: string]: unknown
}

type MovieCardProp = {
  poster_path: string
  id: number
  title: string
}


export default function MovieCard({ poster_path, id, title }: MovieCardProp) {

  const [isOpen, setIsOpen] = useState(false)
  const [videoInfo , setVideoInfo ] = useState<MovieVideoInfo | null >(null)
  const movieCardRef = useRef<HTMLSelectElement>(null)

  async function fetchVideoInfo() {
    const response = await fetchRequest<MovieVideoResult<MovieVideoInfo[]>>(
      ENDPOINT.MOVIES_VIDEO.replace("{movie_id}", id.toString())
    )
    return response.results.filter(result => result.site.toLocaleLowerCase() === "youtube")

  }

  async function onMouseEnter(event: any) {
    const [videoInfo] = await fetchVideoInfo()
    setVideoInfo(videoInfo)
    setIsOpen(true)
  }

  useEffect(() => {
    movieCardRef.current?.addEventListener("mouseenter", onMouseEnter);
    () => movieCardRef.current?.removeEventListener("mouseenter", onMouseEnter)
  }, [])



  function onClose(value: boolean) {
    console.log(value, "value");

    setIsOpen(value)
  }

  return (
    <>
      <section ref={movieCardRef} key={id} className=" aspect-square rounded-md  h-[200px] w-[200px] flex-none overflow-hidden">
        <img
          loading="lazy"
          className="w-full h-full "
          src={createImageUrl(poster_path, CARD_WIDTH)}
          alt={title}
        />

      </section>
      <Modal isOpen={isOpen} onClose={onClose} key={id} title={title}>
        <YouTube opts={{
          width: "450",
          playerVars: {
            autoPlay: 1,
            playsinline: 1,
            controls: 0
          },
        }} videoId={videoInfo?.key}></YouTube>
      </Modal>
    </>
  )
}
