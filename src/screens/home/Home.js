import React, { useContext, useState } from "react";
import './Home.css';
import MovieData from '../../common/moviesData.js';
import ImageList from './ImageList.js';
import RegularImageList from './RegularImageList';
import FilterCard from './FilterCard.js';
import AppContext from "../../AppContext";
import Header from "../../common/header/Header";

function Home() {
    const [state, setState] = useState({
        movieName: '',
        genreName: [],
        personName: [],
        startDate: '',
        endDate: '',
        name: '',
    })
    const context = useContext(AppContext);
    context.setBookShowValue(false)

    return (<div>
        <Header/>
        {context.setBookShowValue(false)}
        {context.setBookShowValue(false)}
        <div className="heading">
            <span>Upcoming Movies</span>
        </div>
        <div className="imageListDiv">
            <ImageList className="imageList" movieData={MovieData} />
        </div>
        <div className="flex-container">
            <div className="left">
                <RegularImageList imageOnClick={context.setBookShowValue} filterState={state} movieData={MovieData} />
            </div>
            <div className="right">
                <FilterCard setFilterState={setState} />
            </div>
        </div>
    </div>
    );
}

export default Home;