import React, { useEffect, useRef, useState, MouseEvent } from 'react'
import Modal from './Modal'

import { createImageUrl } from '../common/utilis'
import YouTube from 'react-youtube'
import { fetchRequest, fetchVideoInfo } from '../common/api'
import { ENDPOINT } from '../common/endpoints'

import PlayIcon from "@heroicons/react/24/solid/PlayCircleIcon"
import LikeIcon from "@heroicons/react/24/outline/HandThumbUpIcon"
import PlusIcon from "@heroicons/react/24/outline/PlusIcon"
import ChevronDown from "@heroicons/react/24/outline/ChevronDownIcon"
import { Position } from 'common/types'


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

export type MovieCardProp = {
  poster_path: string
  id: number
  title: string
}



export default function MovieCard({ poster_path, id, title }: MovieCardProp) {

  const [isOpen, setIsOpen] = useState(false)
  const [videoInfo, setVideoInfo] = useState<MovieVideoInfo | null>(null)
  const movieCardRef = useRef<HTMLSelectElement>(null)

  const [position, setposition] = useState<Position | null>(null)
  const [hidePoster, sethidePoster] = useState(false)
 


  async function onMouseEnter(event: any) {

    let calculatePosition = movieCardRef.current?.getBoundingClientRect()
    let top = (calculatePosition?.top ?? 0) - 100;
    let left = (calculatePosition?.left ?? 0) - 100


    if (left < 0) {
      left = calculatePosition?.left as number
    }
    let totalWidth = left + 470;
    if (totalWidth > document.body.clientWidth) {
      left = left - (totalWidth - document.body.clientWidth)
    }


    setposition({ top, left })
    const [videoInfo] = await fetchVideoInfo(id.toString())
    setVideoInfo(videoInfo)
    setIsOpen(true)

  }


  useEffect(() => {
    movieCardRef.current?.addEventListener("click", onMouseEnter);
    () => movieCardRef.current?.removeEventListener("click", onMouseEnter)
  }, [])


  useEffect(() => {
    if (videoInfo?.key) {
      setTimeout(() => {
        sethidePoster(true)
      }, 800)
    }
    if (!isOpen) {
      sethidePoster(false)
    }

  }, [videoInfo])


  function onClose(value: boolean) {
    console.log(value, "value");
    setIsOpen(value)
  }


  function closeModal() {
    setIsOpen(false)
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
      <Modal isOpen={isOpen} onClose={onClose} key={`${id}-${Math.random()}`} title={""} closeModal={closeModal} position={position}>

        <section className=' aspect-square transition-[height] duration-500 ease-in'>
          <img src={createImageUrl(poster_path, 400,)} alt={title} className={`w-full ${hidePoster? "invisible h-0": "visible h-full"}`} />



          <YouTube 
           className={`w-full ${!hidePoster? "invisible h-0": "visible h-full"}`}  opts={{
            width: "400",
            height: "400",
            showinfo: 0,
            showTitle: false,
         
            playerVars: {
              autoplay: 1,
              playsinline: 1,
              controls: 0,
              loop: 1
             
              

            },
          }} videoId={videoInfo?.key} ></YouTube>

          
          <section className='flex items-center justify-between p-6 '>
            <ul className='flex items-center justify-evenly gap-4'>
              <li className='h-12 w-12 ' >
                <button className='h-full w-full '>
                  <PlayIcon></PlayIcon>
                </button>
              </li>
              <li className='h-12 w-12 ' >
                <button className='h-full w-full'>
                  <PlusIcon></PlusIcon>
                </button>
              </li>
              <li className='h-12 w-12' >
                <button className='h-full w-full'>
                  <LikeIcon></LikeIcon>
                </button>
              </li>
            </ul>
            <ul className='flex items-center justify-evenly gap-4'>
              <li className='h-12 w-12' >
                <button className='h-full w-full'>
                  <ChevronDown></ChevronDown>
                </button>
              </li>
            </ul>
          </section>
        </section>
      </Modal>
    </>
  )
}
