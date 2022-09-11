/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps } from "$fresh/server.ts";

const MovieCard=(props:PageProps)=>{
    return(
        <div>
            <img/>
            <h1>title</h1>
            <p>movie description</p>
            <p>rating</p>
        </div>
    )
}

export default MovieCard