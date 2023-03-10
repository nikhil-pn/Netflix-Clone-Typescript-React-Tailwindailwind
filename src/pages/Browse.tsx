import React, { useEffect } from "react";
import { fetchRequest, MovieResponse, MovieResult } from "../common/api";
import { ENDPOINT } from "../common/endpoints";
import Contentrow from "../components/ContentRows";

export default function Browse() {
  return (
    <section>
      <section>Banner Image</section>
      <Contentrow endpoint={ENDPOINT.MOVIES_POPULAR} title="New & Popular"></Contentrow>
      <Contentrow endpoint={ENDPOINT.MOVIES_TOP_RATED} title="TOP rated"></Contentrow>
      <Contentrow endpoint={ENDPOINT.MOVIES_NOW_PLAYING} title="Now Playing"></Contentrow>
    </section>
  );
}
