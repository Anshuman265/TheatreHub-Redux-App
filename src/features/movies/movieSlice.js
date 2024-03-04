import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";


export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies', 
    async (term) => {
        const response = await movieApi.get(
            `?apiKey=${APIKey}&s=${term}&type=movie`
        );
        return response.data;
    }
);

export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows', 
    async (term) => {
        const response = await movieApi.get(
            `?apiKey=${APIKey}&s=${term}&type=series`
        );
        return response.data;
    }
);

export const fetchAsyncMovieorShowDetail = createAsyncThunk(
    'movies/fetchAsyncMovieorShowDetail', 
    async (id) => {
        const response = await movieApi.get(
            `?apiKey=${APIKey}&i=${id}&plot=full`
        );
        return response.data;
    }
);



const initialState = {
   movies: {},   
   shows: {},
   selectedMovieOrShow:{}
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectedMovieOrShow = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncMovies.pending, (state) => {
            console.log("Pending");
            // No explicit state change necessary for pending state
        });
        builder.addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
            console.log("Fetched Successfully");
            return { ...state, movies: payload }; // Explicitly return the updated state
        });          
        builder.addCase((fetchAsyncMovies.rejected),() =>{
            console.log("Rejected");
            return;
        });
        builder.addCase((fetchAsyncShows.fulfilled),(state, { payload }) =>{
            console.log("Fetched Successfully");
            return { ...state, shows: payload };
        });
        builder.addCase((fetchAsyncMovieorShowDetail.fulfilled),(state, { payload }) =>{
            console.log("Fetched Successfully");
            return { ...state, selectedMovieOrShow: payload };
        });
    }
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getMovieOrShowDetail = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;