import React, { useState, useEffect } from "react";

import { MovieResult, MovieResponse, fetchRequest } from "../common/api";
import { ENDPOINT } from "../common/endpoints";

type RowProp = {
  endpoint: string;
  title: string;
};
const CARD_WIDTH = 200
export default function Contentrows({ title, endpoint }: RowProp) {
  const [rowData, setRowData] = useState<MovieResult[]>([]);
  async function fetchRowData() {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(endpoint);
    setRowData(response.results);
    console.log(response);
  }

  function createImageUrl(path: string, width: number) {
    const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URI;
    const result = `${baseImageUrl}/w${width}${path}`
    console.log(result, "result");
    return result;

  }
  useEffect(() => {
    fetchRowData();
  }, []);

  console.log(rowData, "rowdata");


  return (
    <>
      <section>
        <h2 className="mb-4">{title}</h2>
        <section className="">
          <section className="gap-2   flex flex-nowrap overflow-hidden ">
            {rowData?.map((item) => {
              const { id, title, poster_path } = item;
              console.log(id, title, poster_path);
              return (
                <section key={id} className=" aspect-square rounded-md  h-[200px] w-[200px] flex-none overflow-hidden">
                  <img
                    loading="lazy"
                    className="w-full h-full "
                    src={createImageUrl(poster_path, CARD_WIDTH)}
                    alt="g"
                  />
                </section>
              );
            })}
          </section>
        </section>
      </section>
    </>
  );
}
