/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
interface MovieData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [{ Source: string; Value: string }];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}
export const handler: Handlers<MovieData | null> = {
  async GET(_, ctx) {
    const { imdbId } = ctx.params;
    const API_KEY = Deno.env.toObject().API_KEY;
    const resp = await fetch(`https://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${API_KEY}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const movieData = await resp.json();
    return ctx.render(movieData);
  },
};
const CategoryValue = ({ category, value }: { category: string; value: string }) => {
  return (
    <span>
      <span class={tw`text-lg text-yellow-400`}> {category} </span>{" "}
      <span class={tw`font-light`}>{value}</span>
    </span>
  );
};
export default function SearchResults({ data }: PageProps<MovieData>) {
  if (!data || data.Response === "False") {
    return (
      <div class={tw`p-4 mx-auto w-screen min-h-screen bg-black text-white`}>
        <p class={tw` text-4xl my-6 align-center justify-center flex`}>
          Some error occurred , please try again with a different search
        </p>
      </div>
    );
  }
  return (
    <div class={tw`p-4 mx-auto w-screen min-h-screen bg-black text-white`}>
      <div class={tw`w-full flex flex-col p-5 md:p-10 `}>
        <div class={tw`text-4xl justify-center items-center flex`}>
          {/* <img src="/popcorn.svg" class={tw`w-10 h-10 m-1`}/> */}
          {data.Title} ({data.Year})
        </div>
        <div class={tw`w-full flex flex-wrap flex-column my-5 items-end`}>
          <img src={data.Poster} class={tw` sm:w-full md:w-1/4 `} />
          <div class={tw`m-2 flex-1 md:mx-5`}>
            <div>
              <div class={tw` flex flex-row items-center `}>
                <img src="/rating.svg" class={tw` w-5 h-5 mr-2`} />
                <p>
                  {data.imdbRating} ({data.imdbVotes})
                </p>
              </div>
            </div>
            <p class={tw`sm:my-0 md:my-3`}>
              <CategoryValue category={"Director"} value={data.Director} />
            </p>
            <p class={tw`sm:my-0 md:my-3`}>
              <CategoryValue category={"Actors"} value={data.Actors} />
            </p>
            <p class={tw`sm:my-0 md:my-3`}>
              <CategoryValue category={"Genre"} value={data.Genre} />
              <CategoryValue category={"Runtime"} value={data.Runtime} />
            </p>
          </div>
        </div>
        <div>{data.Plot}</div>
      </div>
      {/* <Counter start={3} /> */}
    </div>
  );
}
