import React, { useEffect } from "react";
import { fetchRequest, MovieResponse, MovieResult } from "../common/api";
import { ENDPOINT } from "../common/endpoints";
import Contentrows from "../components/ContentRows";

export default function Browse() {
  return (
    <section>
      <section>Banner Image</section>
      <Contentrows endpoint={ENDPOINT.MOVIES_POPULAR} title="New & Popular"></Contentrows>
    </section>
  );
}
