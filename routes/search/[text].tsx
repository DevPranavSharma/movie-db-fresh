/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
interface SearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
interface SearchData {
  Search: [SearchResult];
  Response: string;
  totalResults: string;
}
export const handler: Handlers<SearchData | null> = {
  async GET(_, ctx) {
    const { text } = ctx.params;
    const API_KEY = Deno.env.toObject().API_KEY;
    const resp = await fetch(`https://www.omdbapi.com/?s=${text}&apikey=${API_KEY}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const searchResults = await resp.json();
    return ctx.render(searchResults);
  },
};
const MovieCard = ({ result }: { result: SearchResult }) => {
  return (
    <a
      href={`/details/${result.imdbID}`}
      class={tw`w-full md:w-1/2  my-2 flex flex-column font-sans`}
    >
      <img class={tw` w-1/4 min-h-1/4`} src={result.Poster} />
      <div class={tw`p-3 flex-column justify-center items-center`}>
        <div class={tw`text-xl`}>{result.Title}</div>
        <div class={tw`text-lg my-2 text-yellow-600`}>
          {result.Year} {result.Type}
        </div>
      </div>
    </a>
  );
};
export default function SearchResults({ data }: PageProps<SearchData>) {
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
    <body class={tw`p-4 mx-auto w-screen min-h-screen bg-black text-white`}>
      <div class={tw`w-full flex flex-col p-10 `}>
        <div class={tw`text-4xl justify-center items-center flex`}>
          <img src="/popcorn.svg" class={tw`w-10 h-10 m-1`} />
          Search Results
        </div>
        <p class={tw`my-6 align-center justify-center flex`}>
          You have {data.Search.length} results for your search
        </p>
        <div class={tw`flex flex-column flex-wrap`}>
          {data.Search && data?.Search.map((result: SearchResult) => <MovieCard result={result} />)}
        </div>
      </div>
    </body>
  );
}
