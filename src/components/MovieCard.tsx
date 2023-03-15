import React, { useEffect, useRef, useState } from 'react'
import Modal from './Modal'

import { createImageUrl } from '../common/utilis'
import YouTube from 'react-youtube'

const CARD_WIDTH = 200

type MovieCardProp = {
  poster_path: string
  id: number
  title: string
}


export default function MovieCard({ poster_path, id, title }: MovieCardProp) {

  const [isOpen, setIsOpen] = useState(false)
  const movieCardRef = useRef<HTMLSelectElement>(null)


  function onMouseEnter(event: any) {
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
      <section  ref={movieCardRef} key={id} className=" aspect-square rounded-md  h-[200px] w-[200px] flex-none overflow-hidden">
        <img
          loading="lazy"
          className="w-full h-full "
          src={createImageUrl(poster_path, CARD_WIDTH)}
          alt={title}
        />

      </section>
      <Modal isOpen={isOpen} onClose={onClose} key={id} title={title}>
        <YouTube videoId='EXeTwQWrcwY'></YouTube>
      </Modal>
    </>
  )
}
