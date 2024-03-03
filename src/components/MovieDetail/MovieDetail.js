import React , {useEffect} from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncMovieorShowDetail,getMovieOrShowDetail } from '../../features/movies/movieSlice';

const MovieDetail = () => {
    const {imdbID} = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getMovieOrShowDetail);
    console.log(data);
    useEffect(() => {
        dispatch(fetchAsyncMovieorShowDetail(imdbID));
    }, [dispatch,imdbID]);
    return (
        <div>
            MovieDetail
        </div>
    );
};

export default MovieDetail;