import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom';
import {
    fetchAsyncMovies,
    fetchAsyncShows,
  } from "../../features/movies/movieSlice";
import user from "../../images/user.png";
import "./Header.scss";

const Header = () => {
    const [term, setTerm] = useState("");
    const dispatch = useDispatch();
    const submitHandler = (e) => {
      console.log(`The button has been clicked:-${term}`);
      e.preventDefault();
      if (term === "") return alert("Please enter search term!");
        dispatch(fetchAsyncMovies(term));
        dispatch(fetchAsyncShows(term));
        setTerm("");
    };
    return (
        <div className='header'>
            <Link to='/' className='home-link'>
                <div className='logo'>Theatre hub</div>
            </Link>
            <div className="search-bar">
                <form onSubmit={submitHandler}>
                <input
                    type="text"
                    value={term}
                    placeholder="Search Movies or Shows"
                    onChange={(e) => { 
                        setTerm(e.target.value);
                    }}
                />
                <Link to='/' className='home-link'>
                    <button type="submit">
                        <i className="fa fa-search"></i>
                    </button>
                </Link>
                </form>
            </div>
            <div className='user-image'>
                <img src={user} alt="user" />
            </div>
        </div>
    );
};

export default Header;