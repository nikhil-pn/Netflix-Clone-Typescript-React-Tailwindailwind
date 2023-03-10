import React, { useEffect } from "react";
import { fetchRequest, MovieResponse, MovieResult } from "../common/api";
import { ENDPOINT } from "../common/endpoints";

export default function Browse() {
  async function fetchPopularMovies() {
    const popularMovies = await fetchRequest<MovieResponse<MovieResult>>(
      ENDPOINT.MOVIES_POPULAR
    );

    console.log(popularMovies);
  }

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <section>
      <section>Banner Image</section>
      <section className="row">Categories</section>
    </section>
  );
}
