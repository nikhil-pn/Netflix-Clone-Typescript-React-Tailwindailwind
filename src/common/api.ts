
import { ENDPOINT } from "./endpoints";
import { MovieVideoResult, MovieVideoInfo } from "components/MovieCard";

export type MovieResult = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number | string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  [k: string]: unknown;
}[];

export type MovieResponse<T> = {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
  [k: string]: unknown;
}

export async function fetchRequest<T>(endpoint: string) {
  const url = new URL(endpoint, import.meta.env.VITE_BASE_API);
  url.searchParams.append("api_key", import.meta.env.VITE_API_KEY);

  const response = await fetch(url);
  return response.json() as Promise<T>;
}


export async function fetchVideoInfo(id: string) {
  
  const response = await fetchRequest<MovieVideoResult<MovieVideoInfo[]>>(
    ENDPOINT.MOVIES_VIDEO.replace("{movie_id}", id.toString())
  )
  return response.results.filter(result => result.site.toLocaleLowerCase() === "youtube")
}