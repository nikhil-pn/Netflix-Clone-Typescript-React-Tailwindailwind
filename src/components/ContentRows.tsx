import React, { useState, useEffect } from "react";

import { MovieResult, MovieResponse, fetchRequest } from "../common/api";
import { ENDPOINT } from "../common/endpoints";

type RowProp = {
  endpoint: string;
  title: string;
};

export default function Contentrows({ title, endpoint }: RowProp) {
  const [rowData, setRowData] = useState<MovieResult[]>([]);
  async function fetchRowData() {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(endpoint);
    setRowData(response.results);
    console.log(response);
  }

  useEffect(() => {
    fetchRowData();
  }, []);

  console.log(rowData, "rowdata");

  const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URI;

  return (
    <>
      <section>
        <h2 className="mb-2">{title}</h2>
        <section className="  overflow-x-auto flex flex-nowrap ">
          {rowData?.map((item) => {
            const { id, title, poster_path } = item;
            console.log(id, title, poster_path);
            return (
              <section key={id} className=" inline-block h-[200px] w-[200px] flex-none">
                <img
                  className="w-full h-full object-contain"
                  src={baseImageUrl + poster_path}
                  alt="g"
                />
              </section>
            );
          })}
        </section>
      </section>
    </>
  );
}
