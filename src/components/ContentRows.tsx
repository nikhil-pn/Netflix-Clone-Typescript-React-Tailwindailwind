import React, { useState, useEffect, useRef } from "react";

import { MovieResult, MovieResponse, fetchRequest } from "../common/api";
import { ENDPOINT } from "../common/endpoints";
import CheveronLeft from "@heroicons/react/24/outline/ChevronLeftIcon"
import CheveronRight from "@heroicons/react/24/outline/ChevronRightIcon"
import PageIndicator from "./PageIndicator";
import Modal from "./Modal";
import MovieCard from "./MovieCard";

type RowProp = {
  endpoint: string;
  title: string;
};
const CARD_WIDTH = 200
export default function Contentrows({ title, endpoint }: RowProp) {
  const sliderRef = useRef<HTMLSelectElement>(null)
  const [rowData, setRowData] = useState<MovieResult[]>([]);
  const [transalteX, setTransalteX] = useState(0)
  const cardsPerPage = useRef(0)
  const containerRef = useRef<HTMLSelectElement>(null)
  const [pageCount, setpageCount] = useState(0)

  const [currentPage, setCurrentPage] = useState(0)

  const disablePrev = currentPage === 0
  const disableNext = currentPage + 1 === pageCount

  

  async function fetchRowData() {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(endpoint);
    setRowData(response.results);
  }


  function onNextClick() {

    if (sliderRef.current) {
      let updatedTranslateX = transalteX - getTransalteXvalue()
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`

      setTransalteX(updatedTranslateX)
      setCurrentPage(currentPage + 1)
    }
  }
  function onPrevClick() {
    if (sliderRef.current) {
      let updatedTranslateX = transalteX + getTransalteXvalue()
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`
      setTransalteX(updatedTranslateX)
      setCurrentPage(currentPage - 1)


    }
  }


  function getTransalteXvalue() {
    let translateXLocal = 0
    if (sliderRef.current) {
      translateXLocal = ((cardsPerPage.current * CARD_WIDTH) / sliderRef.current.clientWidth) * 100
    }
    return translateXLocal
  }

  useEffect(() => {
    if (rowData?.length) {
      if (containerRef.current) {
        cardsPerPage.current = Math.floor(containerRef.current.clientWidth / CARD_WIDTH)
      }
      setpageCount(Math.ceil(rowData.length / cardsPerPage.current))
    }

  }, [rowData.length])

  useEffect(() => {
    fetchRowData();
  }, []);



  return (
    <>
      <section className="row-container hover:cursor-pointer ml-12 ">
        <h2 className="mb-4 text-xl font-semi-bold ">{title} </h2>
        <PageIndicator className="mb-4 opacity-0 transition-opacity duration-300 ease-in" pagesCount={pageCount} currentPage={currentPage}></PageIndicator>
        <section ref={containerRef} className="gap-2 relative  flex flex-nowrap overflow-hidden mb-8 ">

          {!disableNext ? (
            <button onClick={onNextClick} className=" absolute right-0 w-12 h-full z-[1] bg-black/25 opacity-0 transition-opacity duration-300 ease-in">
              <CheveronRight className="text-white"></CheveronRight>
            </button>
          ) : null
          }

          {!disablePrev ? (
            <button onClick={onPrevClick} className=" absolute h-full w-12 bg-black/25 z-[1] opacity-0 transition-opacity duration-300 ease-in">
              <CheveronLeft></CheveronLeft>
            </button>
          ) : null
          }

          <section ref={sliderRef} className=" flex gap-2 transition-transform  duration-700 ease-linear">

            {rowData?.map((item) => {
              const { id, title, poster_path }: any = item;
              return (
                <MovieCard key={item.id} {...item}></MovieCard>
              );
            })}
          </section>
        </section>

      </section>
    </>
  );
}
