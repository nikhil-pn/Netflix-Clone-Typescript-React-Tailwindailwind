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
    const popularMovies = await fetchRequest<MovieResponse<MovieResult>>(
      ENDPOINT.MOVIES_POPULAR
    );
    setRowData(popularMovies.results);
    console.log(popularMovies);
  }

  useEffect(() => {
    fetchRowData();
  }, []);

  return (
    <section>
      <h2>{title}</h2>
      <section></section>
    </section>
  );
}
