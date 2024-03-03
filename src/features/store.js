import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movies/movieSlice";

export const store = configureStore({
    reducer: {
        // Define a top-level state field named `movies`, handled by `moviesReducer`
        movies: movieReducer,
    },
})