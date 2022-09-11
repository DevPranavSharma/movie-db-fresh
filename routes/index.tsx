/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import Search from "../islands/Search.tsx";

export default function Home() {
  return (
    <body class={tw`p-4 mx-auto w-screen h-screen bg-black text-white`}>
      <div class={tw`w-full flex flex-col p-10 `}>
        <div class={tw`text-4xl justify-center items-center flex`}>
          <img src="/popcorn.svg" class={tw`w-10 h-10 m-1`} />
          Movies database
        </div>
        <p class={tw`my-6 align-center justify-center flex`}>
          Find ratings and information about your favorite movie and TV shows.
        </p>
        <Search />
      </div>
    </body>
  );
}
