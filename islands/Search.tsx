/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

export default function Search() {
  const [searchText, onTextChange] = useState("");
  const onClickSearch = () => {
    if (searchText.trim()) {
      window.location.href = `/search/${searchText}`;
    }
  };
  const onKeyPress = (event: any) => {
    if (event.keyCode === 13) {
      onClickSearch();
    }
  };
  const btn = tw`px-2 py-1 border(gray-100 1) hover:bg-gray-200`;
  return (
    <div class={tw`w-full flex  justify-center my-10`}>
      <div
        class={tw` text-black  h-10 w-6/12  items-center justify-center bg-white flex px-1 rounded-md`}
      >
        <input
          value={searchText}
          placeholder="Search movies and shows"
          onKeyUp={onKeyPress}
          onChange={(e: any) => onTextChange(e.target.value)}
          onSubmit={() => (window.location.href = `/search/${searchText}`)}
          class={tw`h-10  w-full text-black  focus:outline-none`}
        />
        <img src="/search.svg" class={tw`h-8 `} onClick={onClickSearch} />
      </div>
    </div>
  );
}
